import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaremailComponent } from './confirmaremail.component';

describe('ConfirmaremailComponent', () => {
  let component: ConfirmaremailComponent;
  let fixture: ComponentFixture<ConfirmaremailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaremailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaremailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
