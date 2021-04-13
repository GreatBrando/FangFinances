import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  oldPassword: string = ""
	newPassword: string = ""
  confirmPassword: string = ""

  busy: boolean = false;

  constructor(
    public alert: AlertController,
    public user: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async updatePassword(){
    const { oldPassword, newPassword, confirmPassword } = this
		
    if(newPassword !== confirmPassword) {
      this.showAlert("Error!", "Passwords Do Not Match")
			return console.error("Passwords don't match")
		}

    if(!this.oldPassword) {
			this.busy = false
			return this.showAlert('Error!', 'You have to enter a password')
		}

		try {
			await this.user.reAuth(this.user.getEmail(), this.oldPassword)
		} catch(error) {
			this.busy = false
			return this.showAlert('Error!', 'Wrong password!')
		}

		if(this.confirmPassword) {
      await this.user.updatePassword(this.confirmPassword)
      this.router.navigateByUrl('/settings')
      return this.showAlert('Success!', 'Password Updated')
		}

  }

    async showAlert(header: string, message: string){
    const alert = await this.alert.create({
        header,
        message,
        buttons: ["Ok"]
    })
     await alert.present()
  }

}
