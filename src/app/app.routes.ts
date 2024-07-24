import { Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LogographyComponent } from './components/logography/logography.component';
import { TextMetaPageComponent } from './components/text-meta-page/text-meta-page.component';

export const routes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'paragraph', component: TextMetaPageComponent},
    { path: 'logography', component: LogographyComponent }
];
