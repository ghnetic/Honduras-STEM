import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  constructor(private authService: AuthService,
    private router: Router){

  }

  loginGoogle(){
    this.authService.loginGoogle()
    .then(response=> {
      this.router.navigate(['/admin/dashboard']);
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
      Swal.fire('¡Oh no!', 'Ha habido un problema iniciando sesión', 'error');
    })
  }
}
