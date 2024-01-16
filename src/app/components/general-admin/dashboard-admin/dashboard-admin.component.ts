import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  constructor(private authService: AuthService,
    private router: Router){

  }

  logout() {
    this.authService.logoutAdmin()
    .then(()=>this.router.navigate(['/loginAdmin'])
    )
    .catch(error=> console.log(error));

  }

}
