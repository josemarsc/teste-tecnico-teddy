import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedUsersComponent } from './selected-users.component';

describe('SelectedUsersComponent', () => {
  let component: SelectedUsersComponent;
  let fixture: ComponentFixture<SelectedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
