import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Vip from 'src/app/interfaces/vip.interface';
import { AuthService } from 'src/app/services/auth.service';
import { VipService } from 'src/app/services/vip.service';
import Swal from 'sweetalert2';

let VIP: Vip[];

@Component({
  selector: 'app-vip-info',
  templateUrl: './vip-info.component.html',
  styleUrls: ['./vip-info.component.css']
})
export class VipInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'company', 'dayOne', 'timeRegisteredOne', 'acciones'];
  dataSource: any;
  closeResult = '';
  vipForm: any;
  idVip: any;


  constructor(
    private vipService: VipService,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
    ){}

    open(content:any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getVip(vip: Vip) {
    this.vipService.getVip(vip)
      .subscribe(response => {
        console.log(response);
        Swal.fire(
          'Información de la persona vip',
          'Nombre: ' + response['name']
          + '\n Teléfono: ' + response['phone']
          + '\n Correo: ' + response['email']
          + '\n Empresa: ' + response['company'],
          'info'
        );
      });
  }

  sendVip() {
    this.addForm();
    this.vipService.addVip(this.vipForm)
    .then(response=> {
      this.idVip=response.id;
      this.modalService.dismissAll();
      this.registeredSuccess();
    })
    .catch(error => console.log(error));
  }

  addForm() {
    const timeRegistered= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    this.vipForm = {
      'name': (<HTMLInputElement>document.getElementById('nameV')).value,
      'phone': (<HTMLInputElement>document.getElementById('phoneV')).value,
      'email': (<HTMLInputElement>document.getElementById('emailV')).value,
      'company': (<HTMLInputElement>document.getElementById('companyV')).value,
      'dayOne': true,
      'dayTwo': false,
      'timeRegisteredOne': timeRegistered,
    }
  }


  registerAsistence(id:string, dayOne:boolean){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if(!dayOne){
      this.vipService.updateVipForm(id,{'timeRegisteredOne': timeFinished, 'dayOne': true })
      .then(response=>{
        Swal.fire({
          title: '¡BIEN!',
          text: 'Vip registrado',
          icon: 'success'
        });
      })
      .catch(error=> console.log(error));
    }
  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado a la persona Vip',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.vipService.getVipes().subscribe(Vips => {
      VIP = Vips;
      this.dataSource = new MatTableDataSource(VIP);
    });
  }

  deleteVip(Vip: Vip) {
    Swal.fire({
      title: '¿Estás segura?',
      text: "¡No podrás deshacer los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminarlo!'
    }).then((result) => {
      //borrar esto
      if(result.isDenied){
        console.log("Que mal")
      }
      //hasta aqui
      if (result.isConfirmed) {
        this.vipService.deleteVip(Vip);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a esta persona.',
          'success'
        );
      }
    });
  }

  logout() {
    this.authService.logoutAdmin()
    .then(()=>this.router.navigate(['/loginAdmin'])
    )
    .catch(error=> console.log(error));

  }




}
