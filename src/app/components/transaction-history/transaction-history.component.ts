import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent {
  days: number = 25;
  transactions: any[] = [];

  constructor(private taskService: TaskService,private router: Router) {}
  ngOnInit() {
    this.getTransactionHistory();
  }
  getTransactionHistory() {
    this.taskService.getTransactionHistory(this.days).subscribe({
      next: (response) => {
        this.transactions = response.statement;
        console.log('Transaction History:', this.transactions);
      },
      error: (error) => {
        console.error('Error fetching transaction history:', error);
      },
    });
  }

  // Navigate back to the dashboard
  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
