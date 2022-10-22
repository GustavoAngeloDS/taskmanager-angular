import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormTabComponent } from './dialog-form-tab.component';

describe('DialogFormTabComponent', () => {
  let component: DialogFormTabComponent;
  let fixture: ComponentFixture<DialogFormTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
