import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service'
import { Event } from '../../interfaces/Event'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }
  
  getEvents(){
    this.eventService.getEvents()
    .subscribe(
      res => {
        //le pasamos un objeto y nos devuelve un array
        this.events = Object.values(res);
        console.log(this.events)
      },
      err => console.log(err)
    )
  }

}
