import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAccountByEmailComponent } from './get-account-by-email.component';

describe('GetAccountByEmailComponent', () => {
  let component: GetAccountByEmailComponent;
  let fixture: ComponentFixture<GetAccountByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAccountByEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAccountByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
