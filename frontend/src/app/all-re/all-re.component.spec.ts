import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReComponent } from './all-re.component';

describe('AllReComponent', () => {
  let component: AllReComponent;
  let fixture: ComponentFixture<AllReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
