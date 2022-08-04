import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarioMonthComponent } from './calendario-month/calendario-month.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import {MatNativeDateModule} from '@angular/material/core';

// import 'flatpickr/dist/flatpickr.css';
import { FlatpickrModule } from 'angularx-flatpickr';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { ObjToArrayPipe } from './objToArray';
import { NgxColorsModule } from 'ngx-colors';

@NgModule({
  declarations: [
    AppComponent,
    CalendarioMonthComponent,
    NavbarComponent,
    EventListComponent,
    EventFormComponent,
    ObjToArrayPipe
  ],
  imports: [ 
    NgbModule,
    NgxColorsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
