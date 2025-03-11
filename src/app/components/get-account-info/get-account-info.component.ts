import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-get-account-info',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule for ngModel
  templateUrl: './get-account-info.component.html',
  styleUrls: ['./get-account-info.component.scss']
})
export class GetAccountInfoComponent implements OnInit {
  accounts: any[] = [];

  constructor(private taskService: TaskService,private router: Router) {}

  ngOnInit(): void {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.taskService.getAccounts().subscribe({
      next: (response) => {
        console.log('Fetched Accounts:', response);
        this.accounts = response.accounts;
      },
      error: (error) => {
        console.error('Error fetching account info:', error);
      },
    });
  }
  
   // Navigate back to the dashboard
   goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
