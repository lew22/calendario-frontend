import { CalendarEventAction } from "angular-calendar";
import { Color } from "./color"

export interface Event{
    // _id?: String;
    // name: String;
    // user?: String;
    // description: String;
    // createdAt?: Date
    _id?: string;
    start: Date;
    end?: Date;
    title: string;
    color?: Color;
    actions?: CalendarEventAction[];
    link?: string;
    // color:{
    //     primary: string,
    //     secondary: string
    // },
    // actions: {
    //     label: string,
    //     a11yLabel: string
    // };
    // allDay : Boolean;
    // draggable: Boolean;
    // resizable :{
    //     beforeStart: Boolean,
    //     afterEnd: Boolean
    // }
}
