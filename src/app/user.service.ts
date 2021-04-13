import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


interface user{
    email: string,
    uid: string

}



@Injectable()
export class UserService {
    private user: user
    uid: string    


	constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

	}

	setUser(user: user) {
		this.user = user
	}

    read_UserInfo() {
        return this.firestore.collection('users').snapshotChanges();
	}

    async reAuth(email: string, password: string) {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
		return this.afAuth.currentUser.then(u => u.reauthenticateWithCredential(credential))
	}

	updatePassword(newpassword: string) {
		return firebase.auth().currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return firebase.auth().currentUser.updateEmail(newemail)
	}

    getUID(): string {
		return firebase.auth().currentUser.uid
	}
	
	update_User(record){
		return this.firestore.collection('users').doc(this.getUID()).update(record);
	}
    
    getEmail(): string {
		return firebase.auth().currentUser.email
	}


}