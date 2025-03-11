import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  transferForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,private taskService: TaskService) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]], // Amount must be at least 1
      message: ['', [Validators.required]],
      account: ['', [Validators.required, Validators.email]]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.transferForm.valid) {
      console.log('Transfer Form Submitted:', this.transferForm.value);
      // Call your transfer API here
      const transferData = this.transferForm.value;
      this.taskService.transferFunds(transferData).subscribe({
        next: (response) => {
          console.log('Transfer successful:', response);
          alert('Transfer successful');
        },
        error: (error) => {
          console.error('Error during transfer:', error);
          alert('Transfer failed');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Navigate back to the dashboard
  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}