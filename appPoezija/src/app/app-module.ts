import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footer } from './Shared/Components/footer/footer';
import { Header } from './Shared/Components/header/header';
import { Login } from './Features/Authentication/Pages/login/login';
import { SignUp } from './Features/Authentication/Pages/sign-up/sign-up';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Core/Interceptors/auth-interceptor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Home } from './Features/Home/pages/home/home';
import { Add } from './Features/Home/pages/add/add/add';
import { Userstats } from './Features/Home/pages/userstats/userstats/userstats';
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
    HttpClientModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
