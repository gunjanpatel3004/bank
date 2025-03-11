import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  depositForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private taskService: TaskService) {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]], // Amount must be at least 1
      message: ['', [Validators.required]],
      email:['',[Validators.required]]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.depositForm.valid) {
      console.log('Transfer Form Submitted:', this.depositForm.value);
      // Call your transfer API here
      const transferData = this.depositForm.value;
      this.taskService.depositFunds(transferData).subscribe({
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