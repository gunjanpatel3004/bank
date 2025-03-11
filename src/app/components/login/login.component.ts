import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';
    errorSubject: Subject<string> = new Subject<string>();
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });

      this.errorSubject.subscribe((message) => {
        this.errorMessage = message;
      });
    }

    login() {
      console.log("Form submit")
      console.log(this.loginForm)
      const {email,password} = this.loginForm.value;

      this.authService.login(email,password, this.errorSubject)
    }

    navigateToRegister() {
      this.router.navigate(['/register']); // Navigate to the register page
    }
  }
