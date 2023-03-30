import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthModeComponent } from './calendar/month-mode/month-mode.component';
import { WeekModeComponent } from './calendar/week-mode/week-mode.component';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { DayInfoComponent } from './calendar/day-info/day-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MonthModeComponent,
    WeekModeComponent,
    EventCreatorComponent,
    DayInfoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
