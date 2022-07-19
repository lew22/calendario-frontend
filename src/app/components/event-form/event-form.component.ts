import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/Event';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  event: Event = {
    name: '',
    description:''
  };

  constructor(
    private eventService: EventService,
    private router: Router
    ) { }

  ngOnInit(): void {
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
