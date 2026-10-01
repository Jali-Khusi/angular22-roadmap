import { Routes } from '@angular/router';
import { BasicLanding } from '../Basic/basic-landing/basic-landing';
import { AdvanceLanding } from '../advance/advance-landing/advance-landing';
import { Angular1722LandComponent } from '../Angular17-22/angular17-22-land-component/angular17-22-land-component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'basic' },
	{ path: 'basic', component: BasicLanding },
	{ path: 'basic/:topic', component: BasicLanding },
	{ path: 'advance', component: AdvanceLanding },
	{ path: 'angular17-22', component: Angular1722LandComponent },
    
	{ path: '**', redirectTo: 'basic' },
];
