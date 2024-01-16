import { Routes, RouterModule } from "@angular/router";
import { Component, ModuleWithProviders } from "@angular/core";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { VolunteerInfoComponent } from "./components/info/volunteer-info/volunteer-info.component";
import { CoachInfoComponent } from "./components/info/coach-info/coach-info.component";
import { DashboardAdminComponent } from "./components/general-admin/dashboard-admin/dashboard-admin.component";
import { LoginAdminComponent } from "./components/general-admin/login-admin/login-admin.component";
import { VipInfoComponent } from "./components/info/vip-info/vip-info.component";
import { PressInfoComponent } from "./components/info/press-info/press-info.component";
import { GeneralInfoComponent } from "./components/info/general-info/general-info.component";
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';


const appRoute: Routes=[
  {path: '', redirectTo: '/welcome', pathMatch:'full'},
  {path: 'welcome', component:WelcomeComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},

  //Admin es el componente padre
  {path: 'admin', children: [
    {path:'dashboard', component: DashboardAdminComponent},
    {path: 'info', children: [
      {path:'volunteer', component: VolunteerInfoComponent},
      {path:'coach', component: CoachInfoComponent},
      {path:'vip', component: VipInfoComponent},
      {path:'press', component: PressInfoComponent},
      {path:'general', component: GeneralInfoComponent}
    ]},
  ], ...canActivate(()=> redirectUnauthorizedTo(['/loginAdmin']))}
]

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any>= RouterModule.forRoot(appRoute, {useHash: false});
