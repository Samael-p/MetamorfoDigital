import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  
})
export class FooterComponent {
whatsappLink: string = '';

ngOnInit() {
  const phone = '59175480182';
  const message = 'Hola, quisiera más información';
  const encodedMsg = encodeURIComponent(message);

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  this.whatsappLink = isMobile
    ? `https://wa.me/${phone}?text=${encodedMsg}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
}


anioActual: number = new Date().getFullYear();

}
