import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { IncidentsComponent } from './pages/incidents/incidents';
import { AddIncidentComponent } from './pages/add-incident/add-incident';
import { AssetsComponent } from './pages/assets/assets';
import { ThreatsComponent } from './pages/threats/threats';
import { AddAssetComponent } from './pages/assets/add-assets';
import { AddThreatComponent } from './pages/threats/add-threat';
import { NewIncidentComponent } from './pages/new-incident/new-incident';
import { ReportsComponent } from './pages/reports/reports';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './pages/guards/auth-guard';
import { AssignIncidentComponent } from './pages/assign-incident/assign-incident';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incidents', component: IncidentsComponent },
  { path: 'add-incident', component: AddIncidentComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'threats', component: ThreatsComponent },
  { path: 'add-assets', component: AddAssetComponent },
{ path: 'add-threat', component: AddThreatComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'incidents/new', component: NewIncidentComponent },
  { path: 'assign-incident/:id', component: AssignIncidentComponent }
];
