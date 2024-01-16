import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import Coach from '../interfaces/coach.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private firestore: Firestore) { }

  getCoach(coach: Coach){
    const coachRef = doc(this.firestore, 'Coach', `${coach.id}`);
    return docData(coachRef);
  }

  addCoach(coach: Coach){
    const coachRef = collection(this.firestore, 'Coach'); //Creamos la colleccion en la BD por si no existe
    return addDoc(coachRef, coach); //Enviamos el nombre de la collection y luego enviamos los datos del formulario
  }

  updateCoachForm(coach: string, form:any){
    const coachRef = doc(this.firestore, `Coach/${coach}`);
    return updateDoc(coachRef, form)
  }


  getCoaches(): Observable<Coach[]>{
    const coachRef = collection(this.firestore, 'Coach');
    return collectionData(coachRef, {idField: 'id'}) as Observable<Coach[]>;
  }

  deleteCoach(coach: Coach){
    const coachRef = doc(this.firestore, `Coach/${coach.id}`);
    return deleteDoc(coachRef);
  }

  updateCoach(id:string, form:any){
    const coachRef = doc(this.firestore, `coach/${id}`);
    return updateDoc(coachRef, form)
  }

}
