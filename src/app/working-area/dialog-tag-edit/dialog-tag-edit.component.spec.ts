import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagEditComponent } from './dialog-tag-edit.component';

describe('DialogTagEditComponent', () => {
  let component: DialogTagEditComponent;
  let fixture: ComponentFixture<DialogTagEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTagEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
