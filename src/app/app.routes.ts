import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Padron } from './pages/padron/padron';
import { Convocatorias } from './pages/convocatorias/convocatorias';
import { Monitoreo } from './pages/monitoreo/monitoreo';
import { InicioEscuela } from './pages/inicio-escuela/inicio-escuela';
import { RegistroParticipacion } from './pages/registro-participacion/registro-participacion';
import { Login } from './pages/login/login';
export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'padron', component: Padron},
    {path: 'convocatorias', component: Convocatorias},
    {path: 'monitoreo', component: Monitoreo},
    {path: 'inicio-escuela', component: InicioEscuela},
    {path: 'registro-participacion', component: RegistroParticipacion},
    {path: 'login', component: Login},
    {path: '**', redirectTo: '' }
];

