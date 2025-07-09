import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  
})
export class FooterComponent {
abrirWhatsApp(): void {
  const phone = '59175480182';
  const message = 'Hola, quisiera más información';
  const encodedMsg = encodeURIComponent(message);

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  if (isMobile) {
    // Abre la app de WhatsApp en el móvil
    window.location.href = `https://wa.me/${phone}?text=${encodedMsg}`;
  } else {
    // Abre WhatsApp Web en escritorio
    window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`, '_blank');
  }
}

anioActual: number = new Date().getFullYear();

}
