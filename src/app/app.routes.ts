import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActivateComponent } from './components/activate/activate.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { GetAccountInfoComponent } from './components/get-account-info/get-account-info.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { GetAccountByEmailComponent } from './components/get-account-by-email/get-account-by-email.component';



export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'activate', component: ActivateComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'get-account-info', component: GetAccountInfoComponent },
    { path: 'transfer', component: TransferComponent },
    { path: 'deposit', component: DepositComponent },
    { path: 'withdraw', component: WithdrawComponent },
    { path: 'transaction-history', component: TransactionHistoryComponent },
    { path: 'getAccountbyEmail',component:GetAccountByEmailComponent},
    { path: '**', redirectTo: '' }

];