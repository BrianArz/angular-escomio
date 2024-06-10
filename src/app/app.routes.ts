import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginGuard } from './guards/login/login.guard';
import { AuthGuard } from './guards/auth/auth.guard';

import * as APP from './utils/protocols/common.protocols';

export const routes: Routes = [
    { path: APP.LOGIN , component: LoginComponent, canActivate: [LoginGuard] },
    { path: APP.CREATE_ACCOUNT , component: CreateAccountComponent, canActivate: [LoginGuard] },

    { path: APP.WELCOME , component: WelcomeComponent },

    { path: APP.ESCOMIO , component: ChatLayoutComponent, canActivate: [AuthGuard] },

    { path: '', redirectTo: APP.WELCOME, pathMatch: 'full'},
    { path: '**', redirectTo: APP.WELCOME, pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }