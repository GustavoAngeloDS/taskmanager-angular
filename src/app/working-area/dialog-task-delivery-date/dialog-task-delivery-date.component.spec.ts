import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskDeliveryDateComponent } from './dialog-task-delivery-date.component';

describe('DialogTaskDeliveryDateComponent', () => {
  let component: DialogTaskDeliveryDateComponent;
  let fixture: ComponentFixture<DialogTaskDeliveryDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskDeliveryDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskDeliveryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
