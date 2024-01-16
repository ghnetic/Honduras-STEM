import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Press from 'src/app/interfaces/press.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PressService } from 'src/app/services/press.service';
import Swal from 'sweetalert2';


let PRESS: Press[];
@Component({
  selector: 'app-press-info',
  templateUrl: './press-info.component.html',
  styleUrls: ['./press-info.component.css']
})
export class PressInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'company', 'dayOne', 'timeRegisteredOne', 'acciones'];
  dataSource: any;
  closeResult = '';
  pressForm: any;
  idPress: any;


  constructor(
    private pressService: PressService,
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

  getPress(press: Press) {
    this.pressService.getPress(press)
      .subscribe(response => {
        console.log(response);
        Swal.fire(
          'Información de la Prensa',
          'Nombre: ' + response['name']
          + '\n Teléfono: ' + response['phone']
          + '\n Correo: ' + response['email']
          + '\n Empresa: ' + response['company'],
          'info'
        );
      });
  }

  sendPress() {
    this.addForm();
    this.pressService.addPress(this.pressForm)
    .then(response=> {
      this.idPress=response.id;
      this.modalService.dismissAll();
      this.registeredSuccess();
    })
    .catch(error => console.log(error));
  }

  addForm() {
    const timeRegistered= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    this.pressForm = {
      'name': (<HTMLInputElement>document.getElementById('nameP')).value,
      'phone': (<HTMLInputElement>document.getElementById('phoneP')).value,
      'email': (<HTMLInputElement>document.getElementById('emailP')).value,
      'company': (<HTMLInputElement>document.getElementById('companyP')).value,
      'dayOne': true,
      'dayTwo': false,
      'timeRegisteredOne': timeRegistered,
    }
  }


  registerAsistence(id:string, dayOne:boolean){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if(!dayOne){
      this.pressService.updatePressForm(id,{'timeRegisteredOne': timeFinished, 'dayOne': true })
      .then(response=>{
        Swal.fire({
          title: '¡BIEN!',
          text: 'Prensa registrada',
          icon: 'success'
        });
      })
      .catch(error=> console.log(error));
    }
  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado a la Prensa',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.pressService.getPresses().subscribe(Presses => {
      PRESS = Presses;
      this.dataSource = new MatTableDataSource(PRESS);
    });
  }

  deletePress(Press: Press) {
    Swal.fire({
      title: '¿Estás segura?',
      text: "¡No podrás deshacer los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pressService.deletePress(Press);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a esta prensa.',
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
