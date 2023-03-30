import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WeekService {
  constructor() {}

  getWeek(date: moment.Moment): moment.Moment[] {
    let startOfWeek = date.clone().startOf("week");
    let days: moment.Moment[] = [];

    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.clone().add(i, "day"));
    }
    return days;
  }
}
