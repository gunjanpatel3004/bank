import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if using ngModel
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode'; // Ensure jwtDecode is imported

@Component({
  selector: 'app-get-account-by-email',
  templateUrl: './get-account-by-email.component.html',
  styleUrls: ['./get-account-by-email.component.scss'],
  standalone: true, // If using standalone components
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule here
})
export class GetAccountByEmailComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  mobilenumber: string = '';

  emailInput: string = '';
  selectedAccount: any = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAccountInformantion();
  }

  getAccountInformantion() {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.emailInput = decoded.email; // Extract email from token
      console.log('Decoded Email:', this.emailInput);

      this.taskService.getAccountByEmail(this.emailInput).subscribe(
        (response: any) => {
          console.log('Account Info:', response.account);

          this.email = response.account.email;
          this.firstname = response.account.firstName;
          this.lastname = response.account.lastName;
          this.mobilenumber = response.account.mobilePhone;
        },
        (error) => console.error('Error fetching account info:', error)
      );
    }
  }
}