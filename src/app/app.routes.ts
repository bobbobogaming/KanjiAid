import { Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LogographyComponent } from './components/logography/logography.component';
import { TextMetaPageComponent } from './components/text-meta-page/text-meta-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { EditTrainingSetsComponent } from './components/edit-training-sets/edit-training-sets.component';

export const routes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'paragraph', component: TextMetaPageComponent},
    { path: 'quiz', component: QuizPageComponent},
    { path: 'logography', component: LogographyComponent },
    { path: 'trainingset', component: EditTrainingSetsComponent }
];
