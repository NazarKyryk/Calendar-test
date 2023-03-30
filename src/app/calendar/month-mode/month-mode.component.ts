import { EventData } from "../../model/event";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-month-mode",
  templateUrl: "./month-mode.component.html",
  styleUrls: ["./month-mode.component.css"],
})
export class MonthModeComponent {
  @Input() daysOfWeek: moment.Moment[] = [];
  @Input() weeks: moment.Moment[][] = [];
  @Input() currentDate: moment.Moment = moment();
  @Input() eventDayInfoData: EventData[]
  @Output() eventDataReceiver = new EventEmitter<EventData[]>();
  isDayInfoOpen: boolean = false;
  monthChosenDay: moment.Moment;

  onDataReceived(data: boolean) {
    this.isDayInfoOpen = data;
  }
  eventLocalData(data: EventData[]) {
    this.eventDayInfoData = data;
  }

  openDialogInfo(day: moment.Moment) {
    this.isDayInfoOpen = true;
    this.monthChosenDay = day;
    this.eventDataReceiver.emit(this.eventDayInfoData)
  }

  isEventDay(day: moment.Moment) {
    const eventDates = this.eventDayInfoData.map((item: EventData) => item.eventDate)
    return JSON.stringify(eventDates).includes(day.format("YYYY-MM-DD"));
  }
}
