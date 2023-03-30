import { EventData } from "./../../model/event";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { WeekService } from "../services/week.service";

@Component({
  selector: "app-week-mode",
  templateUrl: "./week-mode.component.html",
  styleUrls: ["./week-mode.component.css"],
})
export class WeekModeComponent implements OnInit {
  @Input() currentDate?: moment.Moment;
  @Input() weeks: moment.Moment[][] = [];
  @Input() times: moment.Moment[] = [];
  @Input() currentWeek: moment.Moment[] = [];
  @Input() eventDayInfoData: EventData[] ;
  editIndex: number = -1;
  eventEditForm!: FormGroup;
  editEventData!: EventData;

  constructor(private weekService: WeekService) { }

  ngOnInit(): void {
    this.eventEditForm = new FormGroup({
      eventName: new FormControl("", [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern("^^([a-zA-Z ]+|[А-ЩЬЮЯҐЄІЇа-щьюяґєії][а-щьюяґєії]*)$"),
      ]),
      typeOfDay: new FormControl(""),
    });
    this.currentDate = moment();
    this.currentWeek = this.weekService.getWeek(this.currentDate);
  }

  onDelete(index: number) {
    this.eventDayInfoData.splice(index, 1);
    localStorage.setItem(
      "eventFormData",
      JSON.stringify(this.eventDayInfoData)
    );
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.editEventData = Object.assign({}, this.eventDayInfoData[index]);

    this.eventEditForm.setValue({
      eventName: this.editEventData.eventName,
      typeOfDay: this.editEventData.typeOfDay,
    });
  }

  onReturn() {
    this.editIndex = -1;
  }
  onSave(index: number) {
    const editedData: EventData = {
      eventName: this.eventEditForm.value.eventName,
      typeOfDay: this.eventEditForm.value.typeOfDay,
      eventDate: this.eventDayInfoData[index].eventDate,
      duration: this.eventDayInfoData[index].duration,
    };
    this.eventDayInfoData[index] = editedData;
    localStorage.setItem(
      "eventFormData",
      JSON.stringify(this.eventDayInfoData)
    );
    this.onReturn();
  }
}
