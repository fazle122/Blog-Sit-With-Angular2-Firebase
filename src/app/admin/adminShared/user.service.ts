import { Injectable } from '@angular/core';
import{CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate{
    userLoggedIn:boolean = false;
    loggedInUser:string;
    authUser:any;

    constructor(private router:Router)
    {
        var config = {
            apiKey: "AIzaSyDoum5zNeUeonLYPJ_L9KLawGmsKqbA9vc",
            authDomain: "blogsitewithangular2.firebaseapp.com",
            databaseURL: "https://blogsitewithangular2.firebaseio.com",
            projectId: "blogsitewithangular2",
            storageBucket: "blogsitewithangular2.appspot.com",
            messagingSenderId: "344583866661"
          };
          firebase.initializeApp(config);
    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url :string):boolean{
        if(this.userLoggedIn)
        {
            return true;
        }
        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .catch(function(error){
                alert(`${error.message} please try again!`)
            })
    }

    verifyUser(){
        this.authUser = firebase.auth().currentUser;
        if(this.authUser){
            alert(`Wellcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail:string,loginPassword:string){
        firebase.auth().signInWithEmailAndPassword(loginEmail,loginPassword)
            .catch(function(error){
                alert(`${error.message} unable to login , try again!`);
            })
    }

    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            alert(`logged out`);
        }, function(error){
            alert(`${error.message} unable to logout.try again!`);
        });
    }

}