import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import Participant from '../interfaces/participant.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private firestore: Firestore) { }

  getParticipant(Participant: Participant){
    const ParticipantRef = doc(this.firestore, 'Participant', `${Participant.id}`);
    return docData(ParticipantRef);
  }

  addParticipant(Participant: Participant){
    const ParticipantRef = collection(this.firestore, 'Participant'); //Creamos la colleccion en la BD por si no existe
    return addDoc(ParticipantRef, Participant); //Enviamos el nombre de la collection y luego enviamos los datos del formulario
  }

  updateParticipantForm(Participant: string, form:any){
    const ParticipantRef = doc(this.firestore, `Participant/${Participant}`);
    return updateDoc(ParticipantRef, form)
  }


  getParticipantes(): Observable<Participant[]>{
    const ParticipantRef = collection(this.firestore, 'Participant');
    return collectionData(ParticipantRef, {idField: 'id'}) as Observable<Participant[]>;
  }

  deleteParticipant(Participant: Participant){
    const ParticipantRef = doc(this.firestore, `Participant/${Participant.id}`);
    return deleteDoc(ParticipantRef);
  }

  updateParticipant(Participant: Participant, form:any){
    const ParticipantRef = doc(this.firestore, `Participant/${Participant.id}`);
    return updateDoc(ParticipantRef, form)
  }

}
