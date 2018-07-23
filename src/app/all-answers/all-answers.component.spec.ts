import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnswersComponent } from './all-answers.component';

describe('AllAnswersComponent', () => {
  let component: AllAnswersComponent;
  let fixture: ComponentFixture<AllAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
