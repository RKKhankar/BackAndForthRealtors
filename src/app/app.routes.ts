import { Routes } from '@angular/router';
import { PropertiesComponent } from './features/properties/properties';
import { PropertyDetailComponent } from './features/property-detail/property-detail';
import { ContactComponent } from './features/contact/contact';
import { LoginComponent } from './features/login/login';
import { AboutComponent } from './features/about/about';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },

  {
    path: 'properties',
    component: PropertiesComponent,
    canActivate: [authGuard]
  },

  {
    path: 'property/:id',
    component: PropertyDetailComponent,
    canActivate: [authGuard]
  },

  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent }

  
];