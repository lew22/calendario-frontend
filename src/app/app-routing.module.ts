import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { EventListComponent } from './components/event-list/event-list.component';
import {CalendarioMonthComponent} from './calendario-month/calendario-month.component'
import {EventFormComponent} from './components/event-form/event-form.component'

const routes: Routes = [
  {
    path:'',
    component: CalendarioMonthComponent
  },
  // {
  //   path:'calendario',
  //   component: CalendarioMonthComponent
  // },
  {
    path:'eventlist',
    component: EventListComponent
  },
  {
    path:'event',
    component: EventListComponent
  },
  {
    path:'event/create',
    component: EventFormComponent
  },
  {
    path:'event/edit/:id',
    component: EventFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
