import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './Features/Authentication/Pages/login/login';
import { SignUp } from './Features/Authentication/Pages/sign-up/sign-up';
import { Home} from './Features/Home/pages/home/home';
import { Add } from './Features/Home/pages/add/add/add';
import { authGuard } from './Core/guards/auth-guard';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'signup', component: SignUp},
  {path: 'home', component: Home, canActivate: [authGuard]},
  {path: 'add', component: Add, canActivate :[authGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
