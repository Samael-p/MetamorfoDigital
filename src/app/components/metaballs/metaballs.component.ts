import { Component } from '@angular/core';

import {ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Renderer,
  Program,
  Mesh,
  Triangle,
  Transform,
  Vec3,
  Camera,
} from 'ogl';

@Component({
  selector: 'app-metaballs',
  templateUrl: './metaballs.component.html',
  styleUrls: ['./metaballs.component.scss']
})
export class MetaballsComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  @Input() color: string = '#1E1E3F ';
  @Input() cursorBallColor: string = '#1E1E3F';
  @Input() speed: number = 0.3;
  @Input() hoverSmoothness: number = 0.09;
  @Input() animationSize: number = 45;
  @Input() ballCount: number = 19;
  @Input() clumpFactor: number = 1.4;
  @Input() cursorBallSize: number = 3;
  @Input() enableTransparency: boolean = true;
  @Input() enableMouseInteraction: boolean = true;

  private renderer!: Renderer;
  private animationId!: number;

  ngOnInit(): void {
    this.initMetaBalls();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    const gl = this.renderer?.gl;
    if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  private initMetaBalls(): void {
    const container = this.canvasContainer.nativeElement;
    const dpr = 1;
    this.renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: true });
    const gl = this.renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, {
      left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10,
    });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r1, g1, b1] = this.parseHexColor(this.color);
    const [r2, g2, b2] = this.parseHexColor(this.cursorBallColor);

    const metaBallsUniform: Vec3[] = Array.from({ length: 50 }, () => new Vec3(0, 0, 0));

    const program = new Program(gl, {
      vertex: this.vertexShader,
      fragment: this.fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: this.animationSize },
        iBallCount: { value: this.ballCount },
        iCursorBallSize: { value: this.cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: this.clumpFactor },
        enableTransparency: { value: this.enableTransparency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const ballParams = this.generateBallParams(this.ballCount);
    const mouseBallPos = { x: 0, y: 0 };
    let pointerInside = false;
    let pointerX = 0, pointerY = 0;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;
      program.uniforms["iResolution"].value.set(gl.canvas.width, gl.canvas.height, 0);
    };
    window.addEventListener('resize', resize);
    resize();

    const onPointerMove = (e: PointerEvent) => {
      if (!this.enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) * dpr;
      pointerY = (rect.height - (e.clientY - rect.top)) * dpr;
    };
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', () => pointerInside = true);
    container.addEventListener('pointerleave', () => pointerInside = false);

    const startTime = performance.now();
    const update = (t: number) => {
      this.animationId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms["iTime"].value = elapsed;

      for (let i = 0; i < ballParams.length; i++) {
        const p = ballParams[i];
        const dt = elapsed * this.speed * p.dtFactor;
        const th = p.st + dt;
       const scale = p.baseScale * this.clumpFactor;
const x = Math.cos(th);
const y = Math.sin(th + dt * p.toggle);
metaBallsUniform[i].set(x * p.baseScale * this.clumpFactor, y * p.baseScale * this.clumpFactor, p.radius);


      }

      const targetX = pointerInside ? pointerX : gl.canvas.width / 2;
      const targetY = pointerInside ? pointerY : gl.canvas.height / 2;
      mouseBallPos.x += (targetX - mouseBallPos.x) * this.hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * this.hoverSmoothness;
      program.uniforms["iMouse"].value.set(mouseBallPos.x, mouseBallPos.y, 0);

      this.renderer.render({ scene, camera });
    };
    this.animationId = requestAnimationFrame(update);
  }

  private parseHexColor(hex: string): [number, number, number] {
    const c = hex.replace('#', '');
    return [
      parseInt(c.substring(0, 2), 16) / 255,
      parseInt(c.substring(2, 4), 16) / 255,
      parseInt(c.substring(4, 6), 16) / 255
    ];
  }

  private generateBallParams(count: number) {
    const fract = (x: number) => x - Math.floor(x);
    const hash31 = (p: number) => {
      let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
      const r_yzx = [r[1], r[2], r[0]];
      const dot = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);
      return r.map((val) => fract(val + dot));
    };
    const hash33 = (v: number[]) => {
      let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
      const r_yzx = [p[1], p[0], p[2]];
      const dot = p[0] * (r_yzx[0] + 33.33) + p[1] * (r_yzx[1] + 33.33) + p[2] * (r_yzx[2] + 33.33);
      p = p.map((val) => fract(val + dot));
      return p;
    };
    const balls = [];
    for (let i = 0; i < count; i++) {
      const h1 = hash31(i + 1);
      const st = h1[0] * 2 * Math.PI;
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
      const baseScale = 5 + h1[1] * (10 - 5);
      const h2 = hash33(h1);
      const toggle = Math.floor(h2[0] * 2);
      const radius = 0.5 + h2[2] * (2 - 0.5);
      balls.push({ st, dtFactor, baseScale, toggle, radius });
    }
    return balls;
  }

  vertexShader = `#version 300 es
  precision highp float;
  layout(location = 0) in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;

  fragmentShader = `#version 300 es
  precision highp float;
  uniform vec3 iResolution;
  uniform float iTime;
  uniform vec3 iMouse;
  uniform vec3 iColor;
  uniform vec3 iCursorColor;
  uniform float iAnimationSize;
  uniform int iBallCount;
  uniform float iCursorBallSize;
  uniform vec3 iMetaBalls[50];
  uniform float iClumpFactor;
  uniform bool enableTransparency;
  out vec4 outColor;
  float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
  }
  void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
      if (i >= iBallCount) break;
      m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
    }
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
      float alpha1 = m1 / total;
      float alpha2 = m2 / total;
      cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
  }`;
}
