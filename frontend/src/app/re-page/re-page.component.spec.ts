import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RePageComponent } from './re-page.component';

describe('RePageComponent', () => {
  let component: RePageComponent;
  let fixture: ComponentFixture<RePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
