import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = "lista"

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(private storage: Storage) {
    this.init()
   }

   async init(){
    this.storage.create();
   }

   async getData(key: string) {
    const resul = await this.storage.get(key)
    if(resul == null || Number.isNaN(resul)) {
      return 0
    }
    return resul
   }

   async addData(key: string, item: number){
    return this.storage.set(key, item)
   }

   async getToggle() {
    const resul = await this.storage.get('toggle')
    if(resul == null || resul == undefined) {
      return true
    }
    return resul
   }

   async setToggle(item: boolean){
    return this.storage.set('toggle', item)
   }

   async getToggle2() {
    const resul = await this.storage.get('toggle2')
    if(resul == null || resul == undefined) {
      return true
    }
    return resul
   }

   async setToggle2(item: boolean){
    return this.storage.set('toggle2', item)
   }

   async removeItem(key: string){
    return this.storage.set(key, 0)
   }

}
