import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Padron } from './pages/padron/padron';
import { Convocatorias } from './pages/convocatorias/convocatorias';
import { Monitoreo } from './pages/monitoreo/monitoreo';
export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'padron', component: Padron},
    {path: 'convocatorias', component: Convocatorias},
    {path: 'monitoreo', component: Monitoreo},
    {path: '**', redirectTo: '' }
];

