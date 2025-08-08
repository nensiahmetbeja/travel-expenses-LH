import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUser } from './end-user';

describe('EndUser', () => {
  let component: EndUser;
  let fixture: ComponentFixture<EndUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
