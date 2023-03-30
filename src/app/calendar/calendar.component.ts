import { WeekService } from './services/week.service';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { GenerateCalendarService } from './services/generate-calendar.service';
import { EventData } from '../model/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  eventDayInfoData: EventData[] = []
  months: { display: string; value: number }[] = [];
  mode: 'month' | 'week' = 'month';
  currentWeek: moment.Moment[] = [];
  daysOfWeek: moment.Moment[] = [];
  weeks: moment.Moment[][] = [];
  times: moment.Moment[] = [];
  currentDate: moment.Moment = moment();
  years: number[] = [];
  isEventFormOpen: boolean = false;

  constructor(private generateCalendarService: GenerateCalendarService, private weekService: WeekService) { }

  ngOnInit() {
    this.generateCalendar();
  }

  openDialog() {
    this.isEventFormOpen = true;
  }

  formStatus(data: boolean) {
    this.isEventFormOpen = data
  }

  onCreatorDataReceive(data: EventData[]) {
    this.eventDayInfoData = data
  }
  onMonthEventDataReturn(data:  EventData[]) {
    this.eventDayInfoData = data;
  }

  generateCalendar() {
    const { weeks, daysOfWeek, times, months, years, currentDate } = this.generateCalendarService.generateCalendar(this.currentDate, this.mode);
    this.weeks = weeks;
    this.daysOfWeek = daysOfWeek;
    this.times = times;
    this.months = months;
    this.years = years;
    this.currentDate = currentDate;
  }

  previousYear() {
    this.currentDate.subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear() {
    this.currentDate.add(1, 'year');
    this.generateCalendar();
    console.log(this.weeks);
  }

  previousMonth() {
    this.currentDate.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.generateCalendar();
  }

  nextWeek() {
    if (this.currentDate) {
      this.currentDate.add(1, 'week');
      this.currentWeek = this.weekService.getWeek(this.currentDate);
      const { weeks } = this.generateCalendarService.generateCalendar(this.currentDate, 'week');
      this.weeks = weeks;
    }
  }

  previousWeek() {
    if (this.currentDate) {
      this.currentDate.subtract(1, 'week');
      this.currentWeek = this.weekService.getWeek(this.currentDate);
      const { weeks } = this.generateCalendarService.generateCalendar(this.currentDate, 'week');
      this.weeks = weeks;
    }
  }
}
