import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent {
  activateForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activateForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      activationCode: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.activateForm.invalid) return;

    const { email, activationCode } = this.activateForm.value;

    this.authService.activateAccount(email, activationCode).subscribe(
      (response: any) => {
        console.log('Account activated successfully', response);
        this.successMessage = 'Account activated successfully!';
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error activating account', error);
        this.errorMessage = 'Invalid activation code or email.';
        this.successMessage = '';
      }
    );
  }
}
