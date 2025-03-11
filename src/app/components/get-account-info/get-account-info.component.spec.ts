import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAccountInfoComponent } from './get-account-info.component';

describe('GetAccountInfoComponent', () => {
  let component: GetAccountInfoComponent;
  let fixture: ComponentFixture<GetAccountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAccountInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
