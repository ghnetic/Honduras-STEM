import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import Press from '../interfaces/press.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PressService {

  constructor(private firestore: Firestore) { }

  getPress(Press: Press){
    const PressRef = doc(this.firestore, 'Press', `${Press.id}`);
    return docData(PressRef);
  }

  addPress(Press: Press){
    const PressRef = collection(this.firestore, 'Press'); //Creamos la colleccion en la BD por si no existe
    return addDoc(PressRef, Press); //Enviamos el nombre de la collection y luego enviamos los datos del formulario
  }

  updatePressForm(Press: string, form:any){
    const PressRef = doc(this.firestore, `Press/${Press}`);
    return updateDoc(PressRef, form)
  }


  getPresses(): Observable<Press[]>{
    const PressRef = collection(this.firestore, 'Press');
    return collectionData(PressRef, {idField: 'id'}) as Observable<Press[]>;
  }

  deletePress(Press: Press){
    const PressRef = doc(this.firestore, `Press/${Press.id}`);
    return deleteDoc(PressRef);
  }

  updatePress(Press: Press, form:any){
    const PressRef = doc(this.firestore, `Press/${Press.id}`);
    return updateDoc(PressRef, form)
  }

}
