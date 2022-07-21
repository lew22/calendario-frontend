

export interface Event{
    // _id?: String;
    // name: String;
    // user?: String;
    // description: String;
    // createdAt?: Date
    _id?: String;
    start: Date;
    end: Date;
    title: String;
    color:{
        primary: String,
        secondary: String
    },
    actions:{
        label: String,
        a11yLabel: String
    },
    allDay : Boolean;
    draggable: Boolean;
    resizable :{
        beforeStart: Boolean,
        afterEnd: Boolean
    }
}