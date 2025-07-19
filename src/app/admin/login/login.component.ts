import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithPopup, FacebookAuthProvider, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/admin']))
      .catch(err => this.error = 'Credenciales incorrectas');
  }

   async loginWithFacebook() {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(this.auth, provider);
      const loggedUser = result.user;

      // ⚠️ Verifica que sea la persona autorizada por email
      const authorizedEmail = 'samm17mf@gmail.com';
      if (loggedUser.email === authorizedEmail) {
        this.router.navigate(['/admin']); // redirige al panel admin
      } else {
        alert('No tienes acceso autorizado.');
        await signOut(this.auth);
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  goHome() {
  this.router.navigate(['/']);
  }
}
