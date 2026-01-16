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
  //prikaze obestilu v html pod gumbom ce je ok al ne signup
  errorMsg: string | null = null;
  successMsg: string | null = null;
  constructor(private authService: Auth, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log("Klik na registracijo")
    this.errorMsg = null;
    this.successMsg = null;
    if (form.valid) {
      const credentials = {
        email: this.user.email,
        password: this.user.pass,
        displayName: this.user.name // Pošljemo samo ime
      };

      this.authService.signup(credentials).subscribe({
        next: (res) => {
          console.log('Registracija uspela!')
          this.successMsg = 'Registracija uspela! Preusmerjanje na login...';
          //alert('Registracija uspela!');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          if (err.error && err.error.msg) {
            this.errorMsg = err.error.msg; // npr. "User already registered"
          } else {
            this.errorMsg = 'Prišlo je do nepredvidene napake. Poskusite znova.';
          }
          console.log('Napaka pri registraciji.')

        }
      });
    }
  }
}
