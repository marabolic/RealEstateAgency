import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReCardComponent } from './re-card.component';

describe('ReCardComponent', () => {
  let component: ReCardComponent;
  let fixture: ComponentFixture<ReCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
