import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

// Common Protocols
import * as APP from './utils/protocols/common.protocols';

export const routes: Routes = [
    { path: APP.LOGIN , component: LoginComponent },
    { path: APP.WELCOME , component: WelcomeComponent },
    { path: '', redirectTo: APP.WELCOME, pathMatch: 'full'},
    { path: '**', redirectTo: APP.WELCOME, pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }