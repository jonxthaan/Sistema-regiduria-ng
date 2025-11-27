import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Padron } from './pages/padron/padron';
export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'padron', component: Padron},
    {path: '**', redirectTo: '' }
];

