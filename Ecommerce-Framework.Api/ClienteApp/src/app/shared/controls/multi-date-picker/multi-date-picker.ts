import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStructMult } from './date.struct.mult';

const equals = (one: NgbDateStructMult, two: NgbDateStructMult) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStructMult, two: NgbDateStructMult) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStructMult, two: NgbDateStructMult) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const corSelecionada = "custom-day selected";
@Component({
  selector: 'ngb-multi-date-picker',
  templateUrl: 'multi-date-picker.html',
  styleUrls: ['multi-date-picker.css']
})


export class NgbMultiDatePicker implements OnInit {

  hoveredDate: NgbDateStructMult;
  markDisabled;
  fromDate: NgbDateStructMult;
  toDate: NgbDateStructMult;

  @Input() datesSelected: NgbDateStructMult[] = [];

  @Output() datesSelectedChange = new EventEmitter<{dates: NgbDateStructMult[],date: NgbDateStructMult}>();

  constructor() { this.updateDisabledDates(); }

  ngOnInit(): void { }

  onDateSelection(event: any, date: NgbDateStructMult) {

    event.target.parentElement.blur();  //make that not appear the outline

    let index = this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year && f.banco);
    if (index >= 0) {
      this.datesSelectedChange.emit({dates: this.datesSelected,date: date});
      return;
    }

    if (!this.fromDate && !this.toDate) {
      if (event.ctrlKey == true)  //If is CrtlKey pressed
        this.fromDate = date;
      else
        this.addDate(date);

        this.datesSelectedChange.emit({dates: this.datesSelected,date: date});

    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.addRangeDate(this.fromDate, this.toDate);
      this.fromDate = null;
      this.toDate = null;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  addDate(date: NgbDateStructMult) {
    date.cor = corSelecionada;
    let index = this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year);
    if (index >= 0)       //If exist, remove the date
      this.datesSelected.splice(index, 1);
    else   //a simple push
      this.datesSelected.push(date);
  }
  addRangeDate(fromDate: NgbDateStructMult, toDate: NgbDateStructMult) {
    fromDate.cor = corSelecionada;
    toDate.cor = corSelecionada;
    //We get the getTime() of the dates from and to
    let from = new Date(fromDate.year + "-" + fromDate.month + "-" + fromDate.day).getTime();
    let to = new Date(toDate.year + "-" + toDate.month + "-" + toDate.day).getTime();
    for (let time = from; time <= to; time += (24 * 60 * 60 * 1000)) //add one day
    {
      let date = new Date(time);
      //javascript getMonth give 0 to January, 1, to February...
      this.addDate({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        banco: false,
        selecionado: "",
        cor: corSelecionada,
        diaBloqueado: false
      });
    }
    this.datesSelectedChange.emit({dates: this.datesSelected,date: null});
  }
  //return true if is selected
  isDateSelected(date: NgbDateStructMult) {
    const info = this.datesSelected.find(f => f.day == date.day && f.month == date.month && f.year == date.year);
    if (info) {
      if (info.diaBloqueado) {
        this.updateDisabledDates()
      }
      return (info.cor);
    }
    return (null);
  }

  updateDisabledDates() {
    this.markDisabled = (date: NgbDate) => {
      const info = this.datesSelected.find(f => f.day == date.day && f.month == date.month && f.year == date.year);
      if (info) {
        if (info.diaBloqueado) {
          return true;
        }
      }
    };
  }

  isHovered = (date: NgbDateStructMult) => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = (date: NgbDateStructMult) => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = (date: NgbDateStructMult) => equals(date, this.fromDate);
  isTo = (date: NgbDateStructMult) => { equals(date, this.toDate) };
}
