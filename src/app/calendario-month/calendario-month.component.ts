
import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    OnInit,
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
    isToday,
  } from 'date-fns';
  
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { Event } from '../interfaces/Event';
  import { EventService } from 'src/app/services/event.service';
  import { Router } from '@angular/router'
  import { pluck } from 'rxjs/operators';
  import {FlatpickrDefaultsInterface} from 'src/flatpickdefaults'
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

import {Directive,ElementRef,AfterViewInit} from '@angular/core';

const colors: any = {
    red: {
      primary: '#EF9A9A',
      secondary: '#FAE3E3',
    },
    verde: {
      primary: '#A5D6A7',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#FFCC80',
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
    styleUrls: ['./calendario.component.css'],
  })
  
  export class CalendarioMonthComponent implements AfterViewInit{
  
  locale: string = 'es';   
  
  //modals
  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;
  @ViewChild('modalContentAdd', { static: true }) modalContentAdd?: TemplateRef<any>;
  @ViewChild('modalContentEdit', { static: true }) modalContentEdit?: TemplateRef<any>;

  // // flatpick
  // @ViewChild('mydiv') element: ElementRef| null = null;

  // options: FlatpickrDefaultsInterface = {
  // };

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
          this.handleEvent('Deleted', event);
          this.events = this.events.filter((iEvent) => iEvent !== event);
        },
      },
    ];
    

    refresh = new Subject<void>();

    test: Event[] = []

    testD: Event[] = []

    testU: Event[] = []

    arr: Event[] = [{
      start: new Date(),
      end:new Date(),
      title: "sad",
      color: colors.red,
      actions: []
    }]

    events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    // }, 
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
    ];

    eventA: Event = {
      title:'testing',
      start:new Date(),
      end:new Date(),
      color: colors.red,
      actions: []
      // end:new Date()
    }

    eventU?: Event = {
      title:'',
      start:new Date(),
      end:new Date(),
      color: colors.red,
      actions: []
      // end:new Date()
    }

    selectedColor:string = "#EF9A9A";
    // colorToAdd:string = '#EC407A';
    colorPalette:Array<any> = [
      // {
      //   preview: '#9c27b0e0', 
      //   variants:['#9c27b0','#9c27b0de','#9c27b0bd','#9c27b09c','#9c27b075','#9c27b047']
      // },
      '#EF9A9A',
      '#A5D6A7',
      '#FFCC80'
    ]

    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    // }, 
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

    activeDayIsOpen: boolean = true;
  
    constructor(private modal: NgbModal,
      private eventService: EventService,
      private router: Router
      ) {
        
        this.getEvents()
        
      }
    
    ngAfterViewInit(){
      // console.log(this.modalContentAdd?.elementRef.nativeElement)
      // this.element = this.modalContentAdd?.elementRef.nativeElement
      // this.options.appendTo = this.modalContentAdd?.elementRef.nativeElement
    }
 
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      console.log(date,events)

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
      
      if(action == 'Edited'){
        this.modalData = { event, action };
        this.modal.open(this.modalContentEdit, { centered: true,size: 'lg' });
        
        // this.eventU = event
        // console.log(this.eventU)
        // console.log(this.modalData)
      } else if (action == 'Deleted'){
        this.deleteEvent(event)
        // this.modalData = { event, action };
        // this.modal.open(this.modalContent, { centered: true,size: 'lg' });
      }
    }

    openModalAdd(){
      this.modal.open(this.modalContentAdd,{centered: true , size: 'lg' })
    }

    addEvent(){

      console.log(this.eventA)
      delete this.eventA.actions
      // this.modal.dismissAll()
      this.eventService.createEvents(this.eventA)
      .subscribe(
      res => {
        console.log(res);
        // this.router.navigate(['/'])
        this.modal.dismissAll()
        this.refresh.next()
      },
      err => console.log(err)
      )
      window.location.reload()
    }

    getEvents(){
      this.eventService.getEvents()
      // .pipe(
      //   pluck('body')
      // )
      .subscribe(
        res => {
          let response = JSON.stringify(res)
          // console.log(response)
          const objeto = JSON.parse(response);
          // console.log(objeto.body)
          this.test= objeto.body
          // let objIndex = this.test.findIndex((obj => obj.title == 'test'));
          // console.log("index's",objIndex)
          // console.log("before update: ", this.test)
          for(let i = 0; i < this.test.length ; i++){
            //CAMBIO DE FORMATO DATE
            let startdate = this.test[i].start
            let enddate = this.test[i].end!
            this.test[i].start = new Date(startdate)
            this.test[i].end! = new Date(enddate!)
            //ADICION DE ACTIONS
            this.test[i].actions = this.actions
          }
          // console.log("befoe update: ", this.test)
          this.events = this.events.concat(this.test)
          console.log(this.events)
          // this.invoices = objeto.BOM.BO.OINV.row;
          // console.log(this.invoices);
          
          this.refresh.next()
        },
        err => console.log(err)
      )
      
    }

    updateEvent(){
      if(this.modalData == undefined){
        console.log("modalData is undefined")
      }else{
        //guardar info
        let data = this.modalData?.event
        console.log("data",data)
        this.eventU = data
        console.log("eventu",this.eventU)
        // obtener id
        delete this.eventU.actions
        let response = JSON.stringify(this.eventU)
        const objeto = JSON.parse(response);
        this.testU = objeto
        let arrUpdate = Object.values(this.testU)
        console.log("Event a actualizar",arrUpdate)
        let id = arrUpdate[1]

        this.modal.dismissAll()

        this.eventService.updateEvents(id.toString(),this.eventU).subscribe(
          res =>{
            console.log(res)
            for(let i = 0; i < this.test.length ; i++){
              //ADICION DE ACTIONS
              this.test[i].actions = this.actions
            }

            this.refresh.next()
          },
          err => console.log(err)
          )
      }
    }

    deleteEvent(eventToDelete: CalendarEvent) {
      this.events = this.events.filter((event) => event !== eventToDelete);

      let response = JSON.stringify(eventToDelete)
      const objeto = JSON.parse(response);
      this.testD = objeto
      let arrDelete = Object.values(this.testD)
      console.log("Event a eliminar",arrDelete)
      let id = arrDelete[1]
      this.modal.dismissAll()
      this.eventService.deleteEvents(id.toString()).subscribe(
        res =>{
          console.log(res)
          this.refresh.next()
        },
        err => console.log(err)
      )
    }
  
    setView(view: CalendarView) {
      this.view = view;
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = true;
    }

  }
  