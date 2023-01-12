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

   async removeItem(key: string){
    return this.storage.set(key, 0)
   }

}
