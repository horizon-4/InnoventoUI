import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {
    username: "",
    password: "",
    token:""
  }

   errorMsg = new String();  

  loginForm: any;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl("", [Validators.required]),
      'password': new FormControl("", [Validators.required])
    })

    sessionStorage.setItem("token",this.user.token)
  }



  get userName() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  public login() {
    
    if (this.user.username != "" || this.user.password != "") {
      if (this.loginForm.valid) {
        this.loginService.authenticate(this.user).subscribe(
          (data) => {
            this.user = data;
            sessionStorage.setItem("token","Bearer "+this.user.token)
            console.log("TOKEN -->"+sessionStorage.getItem("token"));
            this.router.navigate(['instituteDashboard']);
          },
          (error) => {
            // user not in database or password mismatch --> 401 
            console.error(error);
            this.errorMsg="Please recheck your email & password";
          }
        );
      }
    }
  }
}