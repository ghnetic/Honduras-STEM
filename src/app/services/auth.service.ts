import { Injectable } from "@angular/core";
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  constructor(
    private auth: Auth
  ){
  }

  logoutAdmin(){
    return signOut(this.auth);
  }

  loginGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

}
