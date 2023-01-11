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

   getData(key: string) {
    return this.storage.get(key) || 0
   }

   async addData(key: string, item: number){
    return this.storage.set(key, item)
   }

   async removeItem(key: string){
    return this.storage.set(key, 0)
   }

}
