import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import Volunteer from '../interfaces/volunteer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private firestore: Firestore) { }

  getVolunteer(Volunteer: Volunteer){
    const VolunteerRef = doc(this.firestore, 'Volunteer', `${Volunteer.id}`);
    return docData(VolunteerRef);
  }

  addVolunteer(Volunteer: Volunteer){
    const VolunteerRef = collection(this.firestore, 'Volunteer'); //Creamos la colleccion en la BD por si no existe
    return addDoc(VolunteerRef, Volunteer); //Enviamos el nombre de la collection y luego enviamos los datos del formulario
  }

  updateVolunteerForm(Volunteer: string, form:any){
    const VolunteerRef = doc(this.firestore, `Volunteer/${Volunteer}`);
    return updateDoc(VolunteerRef, form)
  }


  getVolunteers(): Observable<Volunteer[]>{
    const VolunteerRef = collection(this.firestore, 'Volunteer');
    return collectionData(VolunteerRef, {idField: 'id'}) as Observable<Volunteer[]>;
  }

  deleteVolunteer(Volunteer: Volunteer){
    const VolunteerRef = doc(this.firestore, `Volunteer/${Volunteer.id}`);
    return deleteDoc(VolunteerRef);
  }

  updateVolunteer(id:string, form:any){
    const VolunteerRef = doc(this.firestore, `Volunteer/${id}`);
    return updateDoc(VolunteerRef, form)
  }

}
