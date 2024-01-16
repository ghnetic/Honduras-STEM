import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import General from '../interfaces/general.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private firestore: Firestore) { }

  getGeneral(General: General){
    const GeneralRef = doc(this.firestore, 'General', `${General.id}`);
    return docData(GeneralRef);
  }

  addGeneral(General: General){
    const GeneralRef = collection(this.firestore, 'General'); //Creamos la colleccion en la BD por si no existe
    return addDoc(GeneralRef, General); //Enviamos el nombre de la collection y luego enviamos los datos del formulario
  }

  updateGeneralForm(General: string, form:any){
    const GeneralRef = doc(this.firestore, `General/${General}`);
    return updateDoc(GeneralRef, form)
  }


  getGenerales(): Observable<General[]>{
    const GeneralRef = collection(this.firestore, 'General');
    return collectionData(GeneralRef, {idField: 'id'}) as Observable<General[]>;
  }

  deleteGeneral(General: General){
    const GeneralRef = doc(this.firestore, `General/${General.id}`);
    return deleteDoc(GeneralRef);
  }

  updateGeneral(General: General, form:any){
    const GeneralRef = doc(this.firestore, `General/${General.id}`);
    return updateDoc(GeneralRef, form)
  }

}
