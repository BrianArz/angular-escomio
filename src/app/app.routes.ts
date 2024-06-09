import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';

// Common Protocols
import * as APP from './utils/protocols/common.protocols';
import { CreateAccountComponent } from './components/create-account/create-account.component';

export const routes: Routes = [
    { path: APP.LOGIN , component: LoginComponent },
    { path: APP.WELCOME , component: WelcomeComponent },
    { path: APP.ESCOMIO , component: ChatLayoutComponent },
    { path: APP.CREATE_ACCOUNT , component: CreateAccountComponent },
    { path: '', redirectTo: APP.WELCOME, pathMatch: 'full'},
    { path: '**', redirectTo: APP.WELCOME, pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }