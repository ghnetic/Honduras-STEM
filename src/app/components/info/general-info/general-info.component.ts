import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import General from 'src/app/interfaces/general.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

let GENERAL: General[];

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'dayOne', 'timeRegisteredOne', 'acciones'];
  dataSource: any;
  closeResult = '';
  generalForm: any;
  idGeneral: any;


  constructor(
    private generalService: GeneralService,
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

  getGeneral(general: General) {
    this.generalService.getGeneral(general)
      .subscribe(response => {
        console.log(response);
        Swal.fire(
          'Información de la Persona',
          'Nombre: ' + response['name']
          + '\n Teléfono: ' + response['phone'],
          'info'
        );
      });
  }

  sendGeneral() {
    this.addForm();
    this.generalService.addGeneral(this.generalForm)
    .then(response=> {
      this.idGeneral=response.id;
      this.modalService.dismissAll();
      this.registeredSuccess();
    })
    .catch(error => console.log(error));
  }

  addForm() {
    const timeRegistered= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    this.generalForm = {
      'name': (<HTMLInputElement>document.getElementById('nameG')).value,
      'phone': (<HTMLInputElement>document.getElementById('phoneG')).value,
      'dayOne': true,
      'dayTwo': false,
      'timeRegisteredOne': timeRegistered,
    }
  }


  registerAsistence(id:string, dayOne:boolean){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if(!dayOne){
      this.generalService.updateGeneralForm(id,{'timeRegisteredOne': timeFinished, 'dayOne': true })
      .then(response=>{
        Swal.fire({
          title: '¡BIEN!',
          text: 'Persona registrada',
          icon: 'success'
        });
      })
      .catch(error=> console.log(error));
    }
  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado a la Persona General',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.generalService.getGenerales().subscribe(General => {
      GENERAL = General;
      this.dataSource = new MatTableDataSource(GENERAL);
    });
  }

  deleteGeneral(general: General) {
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
        this.generalService.deleteGeneral(general);
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
