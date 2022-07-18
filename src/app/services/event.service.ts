import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Event } from '../interfaces/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  BASE_URL: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

    getEvents(): Observable<Event[]>{
      return this.http.get<Event[]>(`${this.BASE_URL}/evento`)
    }

    getEvent(id:string): Observable<Event>{
      return this.http.get<Event>(`${this.BASE_URL}/evento/${id}`)
    }

    createEvents(event: Event):Observable<Event>{
      return this.http.post<Event>(`${this.BASE_URL}/evento/create`,event)
    }

    deleteEvents(id:string){
      return this.http.delete<Event>(`${this.BASE_URL}/evento/delete?eventId=${id}`)
    }

    updateEvents(id: string,event: Event): Observable<Event>{
      return this.http.put<Event>(`${this.BASE_URL}/evento/update?eventId=${id}`,event)
    }


}
