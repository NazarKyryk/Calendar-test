import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import * as moment from "moment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EventData } from "../../model/event";

@Component({
  selector: "app-day-info",
  templateUrl: "./day-info.component.html",
  styleUrls: ["./day-info.component.css"],
})
export class DayInfoComponent implements OnInit {
  @Input() monthChosenDay: moment.Moment;
  @Input() eventData: EventData[] = JSON.parse(localStorage.getItem("eventFormData") || "[]")
  @Output() isEventFormClose = new EventEmitter<boolean>();
  @Output() eventDayInfoData = new EventEmitter<EventData[]>();
  editIndex: number = -1;
  filteredData!: EventData[];
  eventEditForm!: FormGroup;
  editedEventData?: EventData;

  ngOnInit(): void {
    this.filteredData = this.eventData.filter(
      (item: EventData) =>
        item.eventDate === this.monthChosenDay.format("YYYY-MM-DD")
    );
    this.eventEditForm = new FormGroup({
      eventName: new FormControl("", [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern("^^([a-zA-Z ]+|[А-ЩЬЮЯҐЄІЇа-щьюяґєії][а-щьюяґєії]*)$"),
      ]),
      typeOfDay: new FormControl(""),
    });
  }

  closeDialog() {
    this.isEventFormClose.emit(false);
    this.eventDayInfoData.emit(JSON.parse(localStorage.getItem("eventFormData") || "[]"));
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.editedEventData = Object.assign({}, this.filteredData[index]);

    this.eventEditForm.setValue({
      eventName: this.editedEventData.eventName,
      typeOfDay: this.editedEventData.typeOfDay,
    });
  }

  onReturn() {
    this.editIndex = -1;
  }

  onSave(index: number) {
    const editedData: EventData = {
      eventName: this.eventEditForm.value.eventName,
      typeOfDay: this.eventEditForm.value.typeOfDay,
      eventDate: this.filteredData[index].eventDate,
      duration: this.filteredData[index].duration,
    };
    const eventIndex = this.eventData.findIndex((event) => event.eventName === this.editedEventData.eventName);
    if (eventIndex !== -1) {
      this.eventData[eventIndex] = editedData;
      localStorage.setItem("eventFormData", JSON.stringify(this.eventData));
      this.filteredData = this.eventData.filter(
        (item: EventData) =>
          item.eventDate === this.monthChosenDay.format("YYYY-MM-DD")
      );
    }
    this.onReturn();
  }

  deleteEvent(index: number) {
    this.eventData.splice(index, 1);
    localStorage.setItem("eventFormData", JSON.stringify(this.eventData));
  }
}
