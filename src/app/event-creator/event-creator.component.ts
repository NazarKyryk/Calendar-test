import { EventData } from "../model/event";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-event-creator",
  templateUrl: "./event-creator.component.html",
  styleUrls: ["./event-creator.component.css"],
})
export class EventCreatorComponent implements OnInit {
  @Input() isEventFormOpen: boolean;

  eventDayInfoData: EventData[] = JSON.parse(localStorage.getItem("eventFormData") || "[]");

  @Output() isEventFormClose = new EventEmitter<boolean>();
  @Output() creationEventFormData = new EventEmitter<EventData[]>();
  currentDate: string = moment().format("dddd");
  eventCreationForm: FormGroup;

  ngOnInit(): void {
    this.eventCreationForm = new FormGroup({
      eventName: new FormControl("", [
        Validators.required,
        Validators.pattern("^^([a-zA-Z ]+|[А-ЩЬЮЯҐЄІЇа-щьюяґєії][а-щьюяґєії]*)$"),
        Validators.maxLength(20),
      ]),
      eventDate: new FormControl(moment().format("YYYY-MM-DD")),
      typeOfDay: new FormControl("Simple day"),
      duration: new FormControl(""),
    });
  }

  closeDialog() {
    this.isEventFormClose.emit(false);
  }

  onSubmit() {
    const valueFromForm = this.eventCreationForm.value;
    const eventDate = moment(valueFromForm.eventDate);
    this.eventDayInfoData.push(valueFromForm);
    localStorage.setItem(
      "eventFormData",
      JSON.stringify(this.eventDayInfoData)
    );
    if (valueFromForm.duration === "endOfWeek") {
      const daysUntilEndOfWeek = moment.duration(
        7 - eventDate.isoWeekday(),
        "days"
      );

      for (let i = 1; i <= daysUntilEndOfWeek.days(); i++) {
        const newEventDate = moment(eventDate)
          .add(i, "days")
          .format("YYYY-MM-DD");
        const newFormData = { ...valueFromForm, eventDate: newEventDate };
        this.eventDayInfoData.unshift(newFormData);
        localStorage.setItem(
          "eventFormData",
          JSON.stringify(this.eventDayInfoData)
        );
      }
    }
    if (valueFromForm.duration === "endOfMonth") {
      const daysUntilEndOfMonth = moment.duration(
        eventDate.daysInMonth() - eventDate.date(),
        "days"
      );

      for (let i = 1; i <= daysUntilEndOfMonth.days(); i++) {
        const newEventDate = moment(eventDate)
          .add(i, "days")
          .format("YYYY-MM-DD");
        const newFormData = { ...valueFromForm, eventDate: newEventDate };
        this.eventDayInfoData.unshift(newFormData);
        localStorage.setItem(
          "eventFormData",
          JSON.stringify(this.eventDayInfoData)
        );
      }
    }
    this.creationEventFormData.emit(this.eventDayInfoData);
    this.closeDialog();
  }
}
