import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  private scriptURL = 'https://script.google.com/macros/s/AKfycbzMz4TxmdbiejiVJJsUpMCDooBKElmJjya-oH5ogxVDjb8KsSo0IRalIEdHrYHf7VtS/exec';

  ngAfterViewInit(): void {
    const form = document.getElementById('form') as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value || '';
    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
    const codigo = (document.getElementById('codeContry') as HTMLInputElement)?.value || '';
    const telefono = (document.getElementById('telefono') as HTMLInputElement)?.value || '';
    const mensaje = (document.getElementById('mensaje') as HTMLInputElement)?.value || '';

    const formData = { nombre, email, codigo, telefono, mensaje };

    fetch(this.scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(() => {
        (document.getElementById('nombre') as HTMLInputElement).value = '';
        (document.getElementById('email') as HTMLInputElement).value = '';
        (document.getElementById('codeContry') as HTMLInputElement).value = '';
        (document.getElementById('telefono') as HTMLInputElement).value = '';
        (document.getElementById('mensaje') as HTMLInputElement).value = '';
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  }


   showMap = false;

  toggleMap() {
    this.showMap = !this.showMap;


}}
