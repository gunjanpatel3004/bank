import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilePhone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const accountData = this.registerForm.value;

    this.authService.createAccount(accountData).subscribe(
      (response: any) => {
        console.log('Account created successfully', response);
        this.router.navigate(['/activate'], {
          queryParams: { email: accountData.email },
        });
      },
      (error: any) => {
        console.error('Error creating account', error);
        this.errorMessage = 'Error creating account. Please try again later.';
      }
    );
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
