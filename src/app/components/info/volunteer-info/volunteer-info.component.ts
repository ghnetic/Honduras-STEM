import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Volunteer from 'src/app/interfaces/volunteer.interface';
import { VolunteerService } from 'src/app/services/volunteer.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

let VOLUNTEERS: Volunteer[];

@Component({
  selector: 'app-volunteer-info',
  templateUrl: './volunteer-info.component.html',
  styleUrls: ['./volunteer-info.component.css']
})
export class VolunteerInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'shirt', 'dayOne', 'timeRegisteredOne','timeOutOne', 'acciones'];
  dataSource: any;
  totalVolunteerDayOne: number = 0;
  totalVolunteerDayTwo: number =0;
  volunteerDayOne: any[] = [];
  volunteerDayTwo: any[] = [];
  closeResult = '';
  volunteerForm: any;
  idVolunteer: any;


  constructor(
    private volunteerService: VolunteerService,
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

  getVolunteer(volunteer: Volunteer) {
    this.volunteerService.getVolunteer(volunteer)
      .subscribe(response => {
        console.log(response);
        Swal.fire(
          'Información del voluntario',
          'Nombre: ' + response['name']
          + '\n Teléfono: ' + response['phone']
          + '\n Correo: ' + response['email']
          + '\n Talla Camisa: ' + response['shirt'],
          'info'
        )
      })
  }

  sendVolunteer() {
    this.addForm();
    this.volunteerService.addVolunteer(this.volunteerForm)
    .then(response=> {
      this.idVolunteer=response.id;
      this.modalService.dismissAll();
      this.registeredSuccess();
    })
    .catch(error => console.log(error));
  }

  addForm() {
    this.volunteerForm = {
      'name': (<HTMLInputElement>document.getElementById('nameV')).value,
      'phone': (<HTMLInputElement>document.getElementById('phoneV')).value,
      'email': (<HTMLInputElement>document.getElementById('emailV')).value,
      'shirt': (<HTMLInputElement>document.getElementById('shirtV')).value,
      'dayOne': false,
      'dayTwo': false,
      'timeRegisteredOne': '---',
      'timeOutOne': '---',
      'timeRegisteredTwo': '---',
      'timeOutTwo': '---'
    }
  }

  dayFinished(id:string){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    this.volunteerService.updateVolunteer(id,{'timeOutOne': timeFinished})
    .then(response=>{
      Swal.fire({
        title: '¡BIEN!',
        text: 'Voluntario ha terminado el dia',
        icon: 'success'
      });
    })
    .catch(error=> console.log(error));
  }

  registerAsistence(id:string, dayOne:boolean){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if(!dayOne){
      this.volunteerService.updateVolunteer(id,{'timeRegisteredOne': timeFinished, 'dayOne': true })
      .then(response=>{
        Swal.fire({
          title: '¡BIEN!',
          text: 'Voluntario ha empezado el dia',
          icon: 'success'
        });
      })
      .catch(error=> console.log(error));
    }
  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado el voluntario',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.volunteerDayOne = [];
    this.volunteerDayTwo = [];
    this.volunteerService.getVolunteers().subscribe(Volunteers => {
      VOLUNTEERS = Volunteers;
      for (let item of Volunteers) {
        if (item.dayOne) {
          this.volunteerDayOne.push(item);
        }
        if (item.dayTwo) {
          this.volunteerDayTwo.push(item);
        }
      }
      this.totalVolunteerDayOne = this.volunteerDayOne.length;
      this.totalVolunteerDayTwo = this.volunteerDayTwo.length;
      this.dataSource = new MatTableDataSource(VOLUNTEERS);
    });
  }

  deleteVolunteer(Volunteer: Volunteer) {
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
        this.volunteerService.deleteVolunteer(Volunteer);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado este registro.',
          'success'
        );
      }
    })
    this.volunteerDayOne = [];
    this.volunteerDayTwo = [];
  }

  logout() {
    this.authService.logoutAdmin()
    .then(()=>this.router.navigate(['/loginAdmin'])
    )
    .catch(error=> console.log(error));
  }




}
