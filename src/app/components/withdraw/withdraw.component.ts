import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  withdrawForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService) {
    this.withdrawForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]] // Amount must be at least 1
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.withdrawForm.valid) {
      console.log('Transfer Form Submitted:', this.withdrawForm.value);
      // Call your transfer API here
      const transferData = this.withdrawForm.value;
      this.taskService.withdrawFunds(transferData).subscribe({
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