import { Injectable } from "@angular/core";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class GenerateCalendarService {
  isEventFormOpen: boolean = false;
  generateCalendar(
    currentDate: moment.Moment,
    mode: "month" | "week"
  ): {
    weeks: moment.Moment[][];
    daysOfWeek: moment.Moment[];
    times: moment.Moment[];
    months: { display: string; value: number }[];
    years: number[];
    currentDate: moment.Moment;
  } {
    const weeks: moment.Moment[][] = [];
    const daysOfWeek: moment.Moment[] = [];
    const times: moment.Moment[] = [];
    const months: { display: string; value: number }[] = [];
    const years: number[] = [];
    const today: moment.Moment = moment();

    const startOfMonth = moment(currentDate).startOf("month").startOf("week");
    const endOfMonth = moment(currentDate).endOf("month").endOf("week");

    for (
      let day = startOfMonth;
      day.isBefore(endOfMonth);
      day = day.add(1, "day")
    ) {
      if (day.weekday() === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(moment(day));
    }

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(moment().weekday(i));
    }

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(moment().hour(hour).minute(minute));
      }
    }

    months.push(
      ...moment.months().map((month, index) => ({
        display: month,
        value: index,
      }))
    );

    years.push(
      ...Array.from({ length: 20 }, (_, i) => moment().year() - 10 + i)
    );

    if (mode === "week") {
      currentDate = moment().startOf("week");
    }

    return { weeks, daysOfWeek, times, months, years, currentDate };
  }
}
