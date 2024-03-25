import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: 'welcome' , component: WelcomeComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
    { path: '**', redirectTo: 'welcome', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }