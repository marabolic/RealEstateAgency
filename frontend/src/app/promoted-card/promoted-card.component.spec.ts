import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedCardComponent } from './promoted-card.component';

describe('PromotedCardComponent', () => {
  let component: PromotedCardComponent;
  let fixture: ComponentFixture<PromotedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
