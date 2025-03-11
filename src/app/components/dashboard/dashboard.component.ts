import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; // Import NavbarComponent
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Ensure standalone is true
  imports: [NavbarComponent], // Add NavbarComponent here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  balance: number = 0; // Initialize balance
  finalBalance: number = 0; // Initialize finalBalance
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private taskService: TaskService,private router: Router) {}

  ngOnInit() {
    this.getAccountBalance();
  }

  getAccountBalance() {
    this.isLoading = true;
    this.taskService.getBalance().subscribe({
      next: (response) => {
        this.balance = response.balance;
        this.finalBalance = response.finalBalance;
        this.isLoading = false;
        console.log(
          'Fetched Account Balance:',response.balance
        );
      },
      error: (error) => {
        this.errorMessage = 'Error fetching account balance.';
        this.isLoading = false;
        console.error('Error fetching account balance:', error);
      },
    });
  }

  getAccountInfo() {
    this.router.navigate(['/get-account-info']);
  }

  navigateToTransfer() {
    this.router.navigate(['/transfer']); // Navigate to the TransferComponent
  }

  navigateToDeposit() {
    this.router.navigate(['/deposit']); // Navigate to the DepositComponent
  }

  goBackToDashboard() {
    this.router.navigate(['/dashboard']); // Navigate back to the dashboard
  }

  navigateToWithdraw() {
    this.router.navigate(['/withdraw']); // Navigate to the WithdrawComponent
  }

  navigateToTransactionHistory() {
    this.router.navigate(['/transaction-history']); // Navigate to the TransactionHistoryComponent
  }

  navigatetoAccountEmail() {
    this.router.navigate(['/getAccountbyEmail']);
  }

}