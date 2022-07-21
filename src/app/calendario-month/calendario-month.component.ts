
import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
  } from '@angular/core';
  
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
  
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { Event } from '../interfaces/Event';
  import { EventService } from 'src/app/services/event.service';
  import { Router } from '@angular/router'
  import { pluck } from 'rxjs/operators';

  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
  
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
    selector: 'month',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
      `
        h3 {
          margin: 0 0 10px;
        }
  
        pre {
          background-color: #f5f5f5;
          padding: 15px;
        }
      `,
    ],
    templateUrl: './calendario-month.html',
    styleUrls: ['./calendario.component.css']
  })
  
  export class CalendarioMonthComponent {
    
   @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;
    view: CalendarView = CalendarView.Month;
    title ='calendario-frontend';

    CalendarView = CalendarView;
  
    viewDate: Date = new Date();
    "strictPropertyInitialization": false

    modalData?: {
      action: string;
      event: CalendarEvent;
    };
  
    actions: CalendarEventAction[] = [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter((iEvent) => iEvent !== event);
          this.handleEvent('Deleted', event);
        },
      },
    ];
  
    refresh = new Subject<void>();
  
    // events: CalendarEvent[] = [
    //   {
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: colors.red,
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    //   {
    //     start: startOfDay(new Date()),
    //     title: 'An event with no end date',
    //     color: colors.yellow,
    //     actions: this.actions,
    //   },
    //   {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: 'A long event that spans 2 months',
    //     color: colors.blue,
    //     allDay: true,
    //   },
    //   {
    //     start: addHours(startOfDay(new Date()), 2),
    //     end: addHours(new Date(), 2),
    //     title: 'A draggable and resizable event',
    //     color: colors.yellow,
    //     actions: this.actions,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   },
    //   {
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: colors.red,
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   },
    // ];
  
        //get
        datos: any
        events: CalendarEvent[] = [];
        
        //create
        evento: Event = {
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
          title: 'test',
          color: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
          },
          actions: {
            label: "<i class=\"fas fa-fw fa-pencil-alt\"></i>",
            a11yLabel: "Edit"
          },
          allDay: true,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        }

    activeDayIsOpen: boolean = true;
  
    constructor(private modal: NgbModal,
      private eventService: EventService,
      private router: Router,
      ) {}
  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      events = this.events
      console.log("los eventos al hacer click",events)
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }
  
    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
    addEvent(){
      // this.events = [
      //   ...this.events,
      //   {
      //     title: 'New event',
      //     start: startOfDay(new Date()),
      //     end: endOfDay(new Date()),
      //     color: colors.red,
      //     draggable: true,
      //     resizable: {
      //       beforeStart: true,
      //       afterEnd: true,
      //     },
      //   },
      // ];
      this.eventService.createEvents(this.evento)
      .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/'])
      },
      err => console.log(err)
      )

    }

    getEvents(){
      this.eventService.getEvents()
      .pipe(
        pluck('body')
      )
      .subscribe(
        res => {
          this.datos = res
          this.events = this.datos;
          // console.log("Datos",this.datos)
          // this.events = this.datos
          // console.log("Eventos",this.events)
        },
        err => console.log(err)
      )
      
      this.events.forEach(event => {
        event.start = new Date(event.start);
        // event.end = new Date(event.end);
      });

      console.log("Los eventos al traerlos",this.events)
    }
    
    deleteEvent(eventToDelete: CalendarEvent) {
      this.events = this.events.filter((event) => event !== eventToDelete);
    }
  
    setView(view: CalendarView) {
      this.view = view;
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
  }
  