import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResForUserComponent } from './res-for-user.component';

describe('ResForUserComponent', () => {
  let component: ResForUserComponent;
  let fixture: ComponentFixture<ResForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
