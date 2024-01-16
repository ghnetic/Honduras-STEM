import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Coach from 'src/app/interfaces/coach.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CoachService } from 'src/app/services/coach.service';
import Swal from 'sweetalert2';


let COACH: Coach[];

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.component.html',
  styleUrls: ['./coach-info.component.css']
})
export class CoachInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'school', 'dayOne', 'timeRegisteredOne','participants', 'acciones'];
  dataSource: any;
  closeResult = '';
  coachForm: any;
  idCoach: any;
  CoachParticipants: any;



  constructor(
    private coachService: CoachService,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService
    ){}


    open(content:any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    openParticipants(content:any, coach:any) {
      this.CoachParticipants = coach;
      console.log(this.CoachParticipants)
      //this.getInfoCoach();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCoach(coach: Coach) {
    this.coachService.getCoach(coach)
      .subscribe(response => {
        Swal.fire(
          'Información del Coach',
          'Nombre: ' + response['name']
          + '\n Escuela: ' + response['school'],
          'info'
        );
      });
  }

  getInfoCoach(){
    this.coachService.getCoach(this.CoachParticipants)
    .subscribe(response =>{
      console.log(response);
    })
  }

  sendCoach() {
    this.addForm();
    this.coachService.addCoach(this.coachForm)
    .then(response=> {
      this.idCoach=response.id;
      this.modalService.dismissAll();
      this.registeredSuccess();
    })
    .catch(error => console.log(error));
  }

  addForm() {
    const timeRegistered= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    this.coachForm = {
      'name': (<HTMLInputElement>document.getElementById('nameC')).value,
      'phone': (<HTMLInputElement>document.getElementById('phoneC')).value,
      'email': (<HTMLInputElement>document.getElementById('emailC')).value,
      'school': (<HTMLInputElement>document.getElementById('schoolC')).value,
      'shirt': (<HTMLInputElement>document.getElementById('shirtC')).value,
      'dayOne': false,
      'dayTwo': false,
      'participants': [
        {
          'name': 'Sofia',
          'shirt': 'XL',
          'dayOne': false,
          'timeRegistered': ''
        },
        {
          'name': 'Juan Luis',
          'shirt': 'XS',
          'dayOne': false,
          'timeRegistered': ''
        }
      ],
      'timeRegisteredOne': '',
      'timeRegisteredTwo': ''
    }
  }


  registerAsistence(id:string, dayOne:boolean){
    const timeFinished= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    if(!dayOne){
      this.coachService.updateCoachForm(id,{'timeRegisteredOne': timeFinished, 'dayOne': true })
      .then(response=>{
        Swal.fire({
          title: '¡BIEN!',
          text: 'Coach registrado',
          icon: 'success'
        });
      })
      .catch(error=> console.log(error));
    }
  }

  registeredSuccess() {
    Swal.fire({
      title: '¡BIEN!',
      text: 'Hemos registrado al Coach',
      icon: 'success'
    });
  }

  ngOnInit(): void {
    this.coachService.getCoaches().subscribe(Coaches => {
      COACH = Coaches;
      this.dataSource = new MatTableDataSource(COACH);
    });
  }

  deleteCoach(coach: Coach) {
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
        this.coachService.deleteCoach(coach);
        Swal.fire(
          '¡Eliminado!',
          'Has eliminado a este coach',
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
