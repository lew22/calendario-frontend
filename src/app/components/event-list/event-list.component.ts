import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service'
import { Event } from '../../interfaces/Event'
import { daysToWeeks } from 'date-fns';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  // data: Event[] = [];
  datos: any

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }
  
  getEvents(){
    this.eventService.getEvents()
    .pipe(
      pluck('body')
    ).subscribe(
      res => {
        this.datos = res;
        console.log(this.datos)
      },
      err => console.log(err)
    )
  }

}
