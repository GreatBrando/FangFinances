import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router' 
import { AuthService } from '../auth.service'
import { AlertController } from '@ionic/angular'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public alert: AlertController,    
    private auth: AuthService,
    public router: Router
    ) { }

  ngOnInit() {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
     this.auth.signIn(this.loginForm.value).subscribe(
      user => {
        let role = user['role'];
        if (role == 'USER') {
          this.router.navigateByUrl('/tabs/tab1');
        } 
      },
      async err => {

        let alert = await this.alert.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
}
