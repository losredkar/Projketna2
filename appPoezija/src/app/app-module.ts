import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footer } from './Shared/Components/footer/footer';
import { Header } from './Shared/Components/header/header';
import { Login } from './Features/Authentication/Pages/login/login';
import { SignUp } from './Features/Authentication/Pages/sign-up/sign-up';

@NgModule({
  declarations: [
    App,
    Footer,
    Header,
    Login,
    SignUp
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
