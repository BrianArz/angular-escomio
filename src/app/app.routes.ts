import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginGuard } from './guards/login/login.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/auth/admin.guard';
import { MessagesComponent } from './components/messages/messages.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';

import * as APP from './utils/protocols/common.protocols';

export const routes: Routes = [
    { path: APP.LOGIN , component: LoginComponent, canActivate: [LoginGuard] },
    { path: APP.CREATE_ACCOUNT , component: CreateAccountComponent, canActivate: [LoginGuard] },

    { path: APP.ESCOMIO , component: ChatLayoutComponent, canActivate: [AuthGuard] },
    
    { path: APP.ABOUT, component: AboutComponent },
    
    { path: APP.WELCOME , component: WelcomeComponent, canActivate: [AdminGuard] },
    { path: APP.USERS, component: UsersComponent, canActivate: [AdminGuard] },
    { path: APP.MESSAGES, component: MessagesComponent, canActivate: [AdminGuard] },
    { path: APP.SUGGESTIONS, component: SuggestionsComponent, canActivate: [AdminGuard] },

    { path: '', redirectTo: APP.ABOUT, pathMatch: 'full'},
    { path: '**', redirectTo: APP.ABOUT, pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }