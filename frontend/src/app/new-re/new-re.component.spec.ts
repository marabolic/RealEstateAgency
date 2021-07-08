import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReComponent } from './new-re.component';

describe('NewReComponent', () => {
  let component: NewReComponent;
  let fixture: ComponentFixture<NewReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
