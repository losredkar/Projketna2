import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Poem {
  // Osnovni URL do tvoje tabele v Supabase
  private apiUrl = 'https://gatkayxisttqdkwhjzug.supabase.co/rest/v1/poems';
  // spodnji 2 vrstici dodal da se kliče samo ob osvežitvi ne vsakič ob odprtju
  private poemsSubject = new BehaviorSubject<any[]>([]);
  public poems$ = this.poemsSubject.asObservable();
  constructor(private http: HttpClient) {}

  /**
   * Pridobi vse poezije iz baze.
   * Interceptor bo avtomatsko dodal apikey in žeton!
   */

  getPoems(): void {
    this.http.get<any[]>(`${this.apiUrl}?select=*&order=created.desc`).subscribe({
      next: (data) => {
        this.poemsSubject.next(data); // tukaj dobijo vsi nove podatke ki poslusajo
      },
      error: (err) => console.error('Napaka pri pridobivanju poezij:', err)
    });
  }


  /**
   * Dodajanje nove poezije
   */
  addPoem(poemData: { title: string; content: string; author_name: string; user_id: string }): Observable<any> {
    return this.http.post(this.apiUrl, poemData).pipe(
      tap(() => this.getPoems()) // takojsna posodobitev elementov na home page-u
    );
  }

  deletePoem(id: number): Observable<any> {
  // URL-ju dodamo filter ?id=eq.X, da povemo katero vrstico brisati
  const url = `${this.apiUrl}?id=eq.${id}`;

  return this.http.delete(url).pipe(
    tap(() => this.getPoems()) // Takoj osvežimo seznam, da poezija izgine s strani
  );
  }

}
