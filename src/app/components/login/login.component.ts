import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor( private as:AuthService, private router: Router) { }


  async login() {
  
    try {
      let resp:any  = await this.as.loginWithUsernameAndPassword(this.username , this.password);
      console.log(resp);
      localStorage.setItem('token', resp.token)
      this.router.navigateByUrl('/todos')
    } catch (e) {
      alert('Fehlgeschlagen')
      
    }
  }
}
