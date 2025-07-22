import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, signOut, onAuthStateChanged, signInWithRedirect, getRedirectResult } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  loading = false;

  private authorizedEmail = 'samm17mf@gmail.com'; // Cambia por el correo de tu cliente

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    // Manejar resultado si viene de redirect (móvil)
    getRedirectResult(this.auth)
      .then(result => {
        const user = result?.user;
        if (user) {
          if (this.isAuthorized(user.email)) {
            this.router.navigate(['/admin']);
          } else {
            alert('No tienes acceso autorizado.');
            signOut(this.auth);
          }
        }
      })
      .catch(err => {
        console.error('Error al recuperar resultado de redirección:', err);
      });

    // Verificar sesión activa y redirigir si autorizado
    onAuthStateChanged(this.auth, user => {
      if (user?.email === this.authorizedEmail) {
        this.router.navigate(['/admin']);
      }
    });
  }

  login() {
    this.loading = true;
    this.error = '';

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/admin']))
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.error = 'Usuario no encontrado';
        } else if (err.code === 'auth/wrong-password') {
          this.error = 'Contraseña incorrecta';
        } else {
          this.error = 'Error al iniciar sesión';
        }
      })
      .finally(() => this.loading = false);
  }

  async loginWithFacebook() {
    this.error = '';
    this.loading = true;
    const provider = new FacebookAuthProvider();

    try {
      if (this.isMobile()) {
        // En móvil usar redirect para abrir app nativa si está instalada
        await signInWithRedirect(this.auth, provider);
        // la ejecución se pausa y la app recarga después del login
      } else {
        // En escritorio usar popup para mejor experiencia
        const result = await signInWithPopup(this.auth, provider);
        const loggedUser = result.user;
        if (this.isAuthorized(loggedUser.email)) {
          this.router.navigate(['/admin']);
        } else {
          this.error = 'No tienes acceso autorizado.';
          await signOut(this.auth);
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      this.error = 'Error al iniciar sesión con Facebook';
    } finally {
      this.loading = false;
    }
  }

  private isAuthorized(email: string | null): boolean {
    return email === this.authorizedEmail;
  }

  private isMobile(): boolean {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod/i.test(ua);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}