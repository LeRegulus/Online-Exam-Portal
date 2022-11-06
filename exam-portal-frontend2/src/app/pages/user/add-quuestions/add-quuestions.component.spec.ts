import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuuestionsComponent } from './add-quuestions.component';

describe('AddQuuestionsComponent', () => {
  let component: AddQuuestionsComponent;
  let fixture: ComponentFixture<AddQuuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
