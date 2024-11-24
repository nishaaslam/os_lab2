import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainLayoutComponent } from './pages/Layout-folder/main-layout/main-layout.component';
import { HistoryComponent } from './pages/history/history.component';
import { AccountFormComponent } from './pages/account-form/account-form.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundError } from 'rxjs';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'signup',
        component: SignUpComponent
    },
    {
        path:'',
        component: MainLayoutComponent,
        canActivate:[authGuard],
        children:[
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
              },
            {path:'dashboard',component:DashboardComponent},
            {path:'history',component:HistoryComponent},
            {path:'account',component:AccountFormComponent},

        ]
    },
    {path:"**",component:NotFoundComponent}
];
