import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagDeleteComponent } from './dialog-tag-delete.component';

describe('DialogTagDeleteComponent', () => {
  let component: DialogTagDeleteComponent;
  let fixture: ComponentFixture<DialogTagDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTagDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
