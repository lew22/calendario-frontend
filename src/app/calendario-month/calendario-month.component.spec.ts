import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {CalendarioMonthComponent} from './calendario-month.component'


describe('CalendarioMonthComponent ', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CalendarioMonthComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CalendarioMonthComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calendario-frontend'`, () => {
    const fixture = TestBed.createComponent(CalendarioMonthComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('calendario-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CalendarioMonthComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('calendario-frontend app is running!');
  });
});
