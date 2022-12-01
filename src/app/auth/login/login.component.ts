import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  emailPattern: any = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  
  constructor(private router: Router, private authService: AuthService) {
    this.formLogin = this.createForm();
  }

  createForm() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  async submit() {
    if (this.formLogin.valid) {
      const resp = await this.authService.login(this.formLogin.value.email, this.formLogin.value.password).catch(err => {
        console.log(err);
      });
      if (resp) {
        console.log('User logged in');
      }
    }
  }

  async register() {
    // this.router.navigate(['/user/register']);
    if (this.formLogin.valid) {
      const resp = await this.authService.register(this.formLogin.value.email, this.formLogin.value.password).catch(err => {
        console.log(err);
      });
      if (resp) {
        console.log('User created');
      }
    }
  }
}
