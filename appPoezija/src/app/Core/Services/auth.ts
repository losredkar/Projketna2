import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private supabaseUrl = 'https://gatkayxisttqdkwhjzug.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhdGtheXhpc3R0cWRrd2hqenVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MzYxMzYsImV4cCI6MjA4MjQxMjEzNn0.mkCYDzWQOFhWE1owlwCovH2cKvKFa0VdmaBcPXr87Tw';

  // shranjuje stanje (če null --> noben prijavljen), Behavior subject
  private currentUserSubject = new BehaviorSubject<any>(null);

  // observable, ki ga  komponente poslušajo, da vejo kaj spreminjati, npr. prikaz gumba odjava TODO (header...)
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient) {

    // imamo uporabnika ze shranjenega, poglej?
    const user = localStorage.getItem('supabase_user');
    if (user) {
      // ce je prijavljen ga poslje v curr user
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // za prijavo (TDF obrazec jo klice)
 login(credentials: any): Observable<any> {
  // url od baze za povezavo nanjo
  const loginUrl = 'https://gatkayxisttqdkwhjzug.supabase.co/auth/v1/token?grant_type=password';

  return this.http.post<any>(loginUrl, {
    email: credentials.email,
    password: credentials.password
  }, {
    headers: {
      'apikey': this.supabaseKey,
      'Content-Type': 'application/json'
    }
  }).pipe(
    tap(response => {
      // Supabase vrne objekt, kjer je žeton v response.session.access_token, se preden dobimo odg od baze
      const token = response.session?.access_token; // vzame jwt zeton
      const user = response.user;

      if (token) {
        localStorage.setItem('supabase_token', token); // shranimo da ga interceptor potem prebere za branje poezij
        localStorage.setItem('supabase_user', JSON.stringify(user)); //shranimo userja za kasneje
        this.currentUserSubject.next(user); // prijava uspela, posodobi curr user
      }
    })
  );
}
  // brisanje local storage
  logout() {
    localStorage.removeItem('supabase_token');
    localStorage.removeItem('supabase_user');
    this.currentUserSubject.next(null);
  }

}
