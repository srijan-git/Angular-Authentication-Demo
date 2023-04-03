import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData: any;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.GetByCode(this.loginForm.value.username).subscribe((res) => {
        this.userData = res;
        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('userName', this.userData.id);
            sessionStorage.setItem('userRole', this.userData.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact admin', 'Inactive user..');
          }
        } else {
          this.toastr.error('Invalid Credentials...');
        }
      });
    }
  }
}
