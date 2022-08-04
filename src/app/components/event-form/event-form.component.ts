import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/Event';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router'
import {FormGroup, FormControl,FormBuilder} from '@angular/forms';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const day = today.getDay()

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  event: Event = {
    start:new Date(),
    end:new Date(),
    // end:new Date,
    title: '',
    color:colors.red,
    actions: []
    // color:{        
    // primary: '#ad2121',
    // secondary: '#FAE3E3'},
    // actions: []
    // allDay: false,
    // draggable: false,
    // resizable: {
    //   beforeStart: false,
    //   afterEnd: false
    // }
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

  ngOnInit(): void {
    console.log(this.calendar.getToday())
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  
  submitEvent(){
    this.eventService.createEvents(this.event)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/'])
      },
      err => console.log(err)
    )
  }

}
