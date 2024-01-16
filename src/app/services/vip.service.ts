import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import Vip from '../interfaces/vip.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VipService {

  constructor(private firestore: Firestore) { }

  getVip(Vip: Vip){
    const VipRef = doc(this.firestore, 'Vip', `${Vip.id}`);
    return docData(VipRef);
  }

  addVip(Vip: Vip){
    const VipRef = collection(this.firestore, 'Vip'); //Creamos la colleccion en la BD por si no existe
    return addDoc(VipRef, Vip); //Enviamos el nombre de la collection y luego enviamos los datos del formulario
  }

  updateVipForm(Vip: string, form:any){
    const VipRef = doc(this.firestore, `Vip/${Vip}`);
    return updateDoc(VipRef, form)
  }


  getVipes(): Observable<Vip[]>{
    const VipRef = collection(this.firestore, 'Vip');
    return collectionData(VipRef, {idField: 'id'}) as Observable<Vip[]>;
  }

  deleteVip(Vip: Vip){
    const VipRef = doc(this.firestore, `Vip/${Vip.id}`);
    return deleteDoc(VipRef);
  }

  updateVip(Vip: Vip, form:any){
    const VipRef = doc(this.firestore, `Vip/${Vip.id}`);
    return updateDoc(VipRef, form)
  }

}
