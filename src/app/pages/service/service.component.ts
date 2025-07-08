import { Component, HostListener,AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var YT: any;

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent  implements AfterViewInit {
  services = [
    {
      title: 'Desarrollo web',
      shortDesc: 'Creamos sitios web modernos, responsivos y optimizados.',
      Desc1: 'Desarrollo de sitios web responsivos (desktop, móvil, PWA)',
      Desc2: 'Integración CMS (WordPress, Strapi)',
      Desc3: 'SEO on-page y analítica integrada',
      Desc4: 'Conexión nativa con CRM y automatización de leads',

      videoId: 'yxigH7sFQoQ',
      placeholder: 'assets/assetsService/webDev.png',
      iconColor: 'text-blue-600',
      icon: `<svg fill="none" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-blue-500 hover:bg-blue-600',
      reverse: false
    },
    {
      title: '3D',
      shortDesc: 'Identidades visuales impactantes y logotipos memorables.',
      Desc1:'Modelado 3D (Blender, Rhino) y renders fotorealistas',
      Desc2:'Impresión 3D (DFM, SLA) de prototipos y piezas finales',
      Desc3:'Post procesado, lijado, pintado y ensamblaje',

      videoId: 'YM1kGZX2NqE',
      placeholder: 'https://placehold.co/600x350/28a745/ffffff?text=Dise%C3%B1o+Gr%C3%A1fico',
      iconColor: 'text-green-600',
      icon: `<svg fill="none" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-green-500 hover:bg-green-600',
      reverse: true
    },
    {
      title: 'Branding',
      shortDesc: 'Mejoramos tu visibilidad online en buscadores.',
      Desc1:'Desarrollo de identidad visual y manual de marca',
      Desc2:'Diseño UX/UI para webs y apps',
      Desc3:'Planillas de material gráfico (redes, papelería digital)',
      Desc4:'Mockups interactivos en Figma con componentes reutilizables',
      videoId: 'YM1kGZX2NqE',
      placeholder: 'assets/assetsService/webDev.png',
      iconColor: 'text-red-600',
      icon: `<svg fill="black" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-red-500 hover:bg-red-600',
      reverse: false
    },
    {
      title: 'Automatización de procesos',
      shortDesc: 'Mejoramos tu visibilidad online en buscadores.',
      Desc1:'Implementación de CRMs (HubSpot, Zoho) y ERPs ligeros',
      Desc2:'Creación y despliegue de chatbots (WhatsApp, web)',
      Desc3:'Flujos automatizados de marketing (email, SMS, notificaciones)',
      Desc4:'Dashboards personalizados con métricas clave',

      videoId: 'h4qpl73Asno',
      placeholder: 'https://placehold.co/600x350/dc3545/ffffff?text=Consultor%C3%ADa+SEO',
      iconColor: 'text-red-600',
      icon: `<svg fill="none" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-red-500 hover:bg-red-600',
      reverse: true
    },
    {
      title: 'Producción multimedia',
      shortDesc: 'Mejoramos tu visibilidad online en buscadores.',
      Desc1:'Producción de videos corporativos y publicitarios (hasta 4k)',
      Desc2:'Animación 2D/3D y motion graphics',
      Desc3:'Fotografía de producto y lifestyle',
      Desc4:'Integración de renders 3D en piezas audiovisuales',

      videoId: '1u03j0qZFgY',
      placeholder: 'https://placehold.co/600x350/dc3545/ffffff?text=Consultor%C3%ADa+SEO',
      iconColor: 'text-red-600',
      icon: `<svg fill="none" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-red-500 hover:bg-red-600',
      reverse: false
    },
    {
      title: 'Cursos y Talleres',
      shortDesc: 'Mejoramos tu visibilidad online en buscadores.',
      Desc1:'Cursos online/presenciales en Web, 3D y automatización',
      Desc2:'Plataforma e-learning con video, quizzes y foros',
      Desc3:'Certificación interna con aval de Metamorfo Digital',
      Desc4:'Acceso a sandbox de prácticas y mentorías post-curso',

      videoId: 'FaYmELGj_0c',
      placeholder: 'https://placehold.co/600x350/dc3545/ffffff?text=Consultor%C3%ADa+SEO',
      iconColor: 'text-red-600',
      icon: `<svg fill="none" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-red-500 hover:bg-red-600',
      reverse: true
    },
       {
      title: 'Sublimacion',
      shortDesc: 'Transformamos tus ideas en productos únicos: ropa, tazas, accesorios y más, ideales para regalos, eventos o promoción de marca.',
      Desc1:'Personalización de tazas, textiles y regalos únicos',
      Desc2:'Ropa sublimada para empresas, eventos y equipos',
      Desc3:'Artículos promocionales con tu logo o diseño',
      Desc4:'Diseño gráfico, previsualización y entrega rápida',

      videoId: '1u03j0qZFgY',
      placeholder: 'https://placehold.co/600x350/dc3545/ffffff?text=Consultor%C3%ADa+SEO',
      iconColor: 'text-red-600',
      icon: `<svg fill="none" stroke="currentColor" ... ></svg>`,
      buttonClass: 'bg-red-500 hover:bg-red-600',
      reverse: false
    },
  ];

  scrollToService(title: string) {
  const anchorId = this.getAnchorId(title);
  const targetElement = document.getElementById(anchorId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Activar reproducción del video correspondiente
    const videoId = targetElement.getAttribute('data-video-id');
    const playerElement = document.getElementById(`player-${videoId}`);
    const placeholder = targetElement.querySelector('.video-placeholder') as HTMLElement;

    if (videoId && playerElement && (window as any).YT) {
      const player = new (window as any).YT.Player(playerElement, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: videoId
        },
        events: {
          onReady: (event: any) => {
            placeholder.style.opacity = '0';
            playerElement.classList.remove('youtube-player-hidden');
            playerElement.classList.add('youtube-player-visible');
            event.target.playVideo();
          }
        }
      });
    }
  }
}

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    (window as any).onYouTubeIframeAPIReady = this.initYouTubePlayers.bind(this);
  }

  initYouTubePlayers() {
    this.services.forEach(service => {
      new YT.Player(`player-${service.videoId}`, {
        videoId: service.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          mute: 1,
          playlist: service.videoId
        },
        events: {
          onReady: (event: any) => {
            const block = document.querySelector(`[data-video-id="${service.videoId}"]`);
            if (!block) return;
            const placeholder = block.querySelector('.video-placeholder') as HTMLElement;
            const playerDiv = block.querySelector(`#player-${service.videoId}`) as HTMLElement;

            block.addEventListener('mouseenter', () => {
              placeholder.style.opacity = '0';
              playerDiv.classList.remove('youtube-player-hidden');
              playerDiv.classList.add('youtube-player-visible');
              event.target.playVideo();
            });

            block.addEventListener('mouseleave', () => {
              event.target.stopVideo();
              placeholder.style.opacity = '1';
              playerDiv.classList.remove('youtube-player-visible');
              playerDiv.classList.add('youtube-player-hidden');
            });
          }
        }
      });
    });
  }

  getSlideInClass(reverse: boolean, index: number, type: 'card' | 'video') {
    const base = reverse
      ? type === 'card' ? 'animate-slideInRight' : 'animate-slideInLeft'
      : type === 'card' ? 'animate-slideInLeft' : 'animate-slideInRight';
    return base;
  }

  getDelay(index: number, type: 'card' | 'video') {
    const base = type === 'card' ? 0.2 : 0.4;
    return `${base + index * 0.4}s`;
  }
  getAnchorId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}

}