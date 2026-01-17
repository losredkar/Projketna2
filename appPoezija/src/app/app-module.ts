import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footer } from './Shared/Components/footer/footer';
import { Header } from './Shared/Components/header/header';
import { Login } from './Features/Authentication/Pages/login/login';
import { SignUp } from './Features/Authentication/Pages/sign-up/sign-up';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './Core/Interceptors/auth-interceptor';
import { FormsModule } from '@angular/forms';
import { Home } from './Features/Home/pages/home/home';
import { Add } from './Features/Home/pages/add/add/add';
import { Userstats } from './Features/Home/pages/userstats/userstats/userstats';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    App,
    Footer,
    Header,
    Login,
    SignUp,
    Home,
    Add,
    Userstats

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
