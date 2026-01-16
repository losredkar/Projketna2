import { Component } from '@angular/core';
import { Auth } from '../../../../Core/Services/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
user = {
    name: '', // To bo tvoje prikazno ime
    email: '',
    pass: ''
  };

  confirmed = false;
  errorMsg: string | null = null;

  constructor(private authService: Auth, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log("Klik na registracijo")
    if (form.valid) {
      const credentials = {
        email: this.user.email,
        password: this.user.pass,
        displayName: this.user.name // Pošljemo samo ime
      };

      this.authService.signup(credentials).subscribe({
        next: (res) => {
          console.log('Registracija uspela!')

          alert('Registracija uspela!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMsg = 'Napaka pri registraciji.';
          console.log('Napaka pri registraciji.')

        }
      });
    }
  }
}
