import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SplittingTextComponent } from '../../components/splitting-text/splitting-text.component';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA,ViewChild,
  ElementRef,
  OnDestroy,
  Input, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeaponWheelComponent } from '../../components/weapon-wheel/weapon-wheel.component';
import { MetaballsComponent } from '../../components/metaballs/metaballs.component';
import gsap from 'gsap';
import InertiaPlugin from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterModule,NavbarComponent,WeaponWheelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapperRef') wrapperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() dotSize = 4;
  @Input() gap = 15;
  @Input() baseColor = '#ffffff';
  @Input() activeColor = '#5227FF';
  @Input() proximity = 150;
  @Input() speedTrigger = 100;
  @Input() shockRadius = 250;
  @Input() shockStrength = 5;
  @Input() maxSpeed = 5000;
  @Input() resistance = 750;
  @Input() returnDuration = 1.5;


  
  private dots: Dot[] = [];
  private pointer = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  };
  private circlePath!: Path2D;
  private animationFrameId!: number;
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    this.circlePath = new Path2D();
    this.circlePath.arc(0, 0, this.dotSize / 2, 0, Math.PI * 2);

    this.buildGrid();
    this.animateDots();

    this.resizeObserver = new ResizeObserver(() => this.buildGrid());
    this.resizeObserver.observe(this.wrapperRef.nativeElement);

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('click', this.onClick);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('click', this.onClick);
  }

  private buildGrid() {
    const canvas = this.canvasRef.nativeElement;
    const wrapper = this.wrapperRef.nativeElement;

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + this.gap) / (this.dotSize + this.gap));
    const rows = Math.floor((height + this.gap) / (this.dotSize + this.gap));
    const cell = this.dotSize + this.gap;

    const gridW = cell * cols - this.gap;
    const gridH = cell * rows - this.gap;

    const startX = (width - gridW) / 2 + this.dotSize / 2;
    const startY = (height - gridH) / 2 + this.dotSize / 2;

    this.dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        });
      }
    }
  }

  private animateDots = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const proxSq = this.proximity * this.proximity;

    for (const dot of this.dots) {
      const ox = dot.cx + dot.xOffset;
      const oy = dot.cy + dot.yOffset;
      const dx = dot.cx - this.pointer.x;
      const dy = dot.cy - this.pointer.y;
      const dsq = dx * dx + dy * dy;

      let style = this.baseColor;
      if (dsq <= proxSq) {
        const dist = Math.sqrt(dsq);
        const t = 1 - dist / this.proximity;
        const color = this.mixColors(this.baseColor, this.activeColor, t);
        style = color;
      }

      ctx.save();
      ctx.translate(ox, oy);
      ctx.fillStyle = style;
      ctx.fill(this.circlePath);
      ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(this.animateDots);
  };

  private mixColors(hex1: string, hex2: string, t: number) {
    const c1 = this.hexToRgb(hex1);
    const c2 = this.hexToRgb(hex2);
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);
    return `rgb(${r},${g},${b})`;
  }

  private hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }

  private onMouseMove = (e: MouseEvent) => {
    const now = performance.now();
    const pr = this.pointer;
    const dt = pr.lastTime ? now - pr.lastTime : 16;
    const dx = e.clientX - pr.lastX;
    const dy = e.clientY - pr.lastY;

    let vx = (dx / dt) * 1000;
    let vy = (dy / dt) * 1000;
    let speed = Math.hypot(vx, vy);
    if (speed > this.maxSpeed) {
      const scale = this.maxSpeed / speed;
      vx *= scale;
      vy *= scale;
      speed = this.maxSpeed;
    }

    pr.lastTime = now;
    pr.lastX = e.clientX;
    pr.lastY = e.clientY;
    pr.vx = vx;
    pr.vy = vy;
    pr.speed = speed;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    pr.x = e.clientX - rect.left;
    pr.y = e.clientY - rect.top;

    for (const dot of this.dots) {
      const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
      if (
        speed > this.speedTrigger &&
        dist < this.proximity &&
        !dot._inertiaApplied
      ) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);
        const pushX = dot.cx - pr.x + vx * 0.005;
        const pushY = dot.cy - pr.y + vy * 0.005;
        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance: this.resistance },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: this.returnDuration,
              ease: 'elastic.out(1,0.75)',
            });
            dot._inertiaApplied = false;
          },
        });
      }
    }
  };

  private onClick = (e: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    for (const dot of this.dots) {
      const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
      if (dist < this.shockRadius && !dot._inertiaApplied) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);
        const falloff = Math.max(0, 1 - dist / this.shockRadius);
        const pushX = (dot.cx - cx) * this.shockStrength * falloff;
        const pushY = (dot.cy - cy) * this.shockStrength * falloff;

        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance: this.resistance },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: this.returnDuration,
              ease: 'elastic.out(1,0.75)',
            });
            dot._inertiaApplied = false;
          },
        });
      }
    }
  };
}