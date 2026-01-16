import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Auth } from '../Services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSerivce: Auth){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('supabase_token'); // je v lokalni shrambi brksalnika ue jwt zeton ki ga shrani auth service ob prijavi

    // ker so http zahtevki nespremenljivi ga kloniramo
const authReq = request.clone({
  setHeaders: {
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhdGtheXhpc3R0cWRrd2hqenVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MzYxMzYsImV4cCI6MjA4MjQxMjEzNn0.mkCYDzWQOFhWE1owlwCovH2cKvKFa0VdmaBcPXr87Tw',
    ...(token && { Authorization: `Bearer ${token}` })
  }
});

    // posredujemo supabase zahtevek in ujamemo napako ce npr potece zeton, potem odjavimo ce potece
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Če baza vrne 401 (Unauthorized), pomeni, da je žeton potekel, odjavimo uporabnika
        if (error.status === 401) {
          console.warn('Žeton je neveljaven ali potekel. Odjavljam uporabnika...');

          this.authSerivce.logout();
        }
        return throwError(() => error);
      })
    );;
  }
}


// interceptor potreben za posredovanje http zahtevkov do baze supabase (ge tin post)
// da ne rabimo rocno pisati vse pri vsakem zahtevku --> avtomatsko
