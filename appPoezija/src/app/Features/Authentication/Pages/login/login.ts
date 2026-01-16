import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../../Core/Services/auth';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    constructor(
      private authService: Auth,
      private router: Router
  ) {}

  // sprozi se ko kliknemo na prijavni gumb
  onSubmit(form: NgForm) {
    // Če obrazec ni veljaven, ne naredimo nič
    if (form.invalid) return;

    // Preberemo in shranimo podatke iz obrazca za prijavo
    const credentials = {
      email: form.value.email,
      password: form.value.password
    };

    console.log('Poskus prijave s podatki:', credentials);

    // Pokličemo login metodo iz auth service
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Prijava uspešna!', response);
        // ce pridemo do sem je prijava uspesna && preusmeri na domaco stran TODO
        this.router.navigate(['/home']);
      },
      // izpisi napako
      error: (err) => {
        console.error('Napaka pri prijavi:', err);
        alert('Prijava ni uspela. Preverite podatke.');
      }
    });
  }
}
