import { Component } from '@angular/core';
import { LocalNotifiactionService } from '../local-notifiaction.service';
import { format, parseISO } from 'date-fns'
import { StorageService } from '../storage.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    id: number | undefined;
    title: any;
    body: any;
    today = Date.now();
    formattedDateTime = ''
    day = ''
    vecesHoy: number = 0;
    h = 0
    m = 0
    enviarNotif = false;


    constructor(private localNotification: LocalNotifiactionService, private StorageService: StorageService) {
        this.setToday();
        this.sendLocalNotification()
    }

    async toggle(permiso: any){
      this.enviarNotif = permiso.checked
      console.log(this.enviarNotif)
    }
    async setToday() {
        this.formattedDateTime = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'HH:mm,  dd/MM/yy')
        this.day = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'dd/MM/yy')
        this.vecesHoy = parseInt(await this.StorageService.getData(this.day))
        console.log(this.vecesHoy)
    }

    async addOne() {
        console.log(this.enviarNotif)
        this.vecesHoy = this.vecesHoy + 1
        await this.StorageService.addData(this.day, this.vecesHoy)
    }
    async minusOne(){
      if(this.vecesHoy > 0){
        this.vecesHoy = this.vecesHoy - 1
        await this.StorageService.addData(this.day, this.vecesHoy)
      }
    }

    async removeData() {
        this.vecesHoy = 0
        await this.StorageService.removeItem(this.day)
    }

    async showData() {
        console.log(await this.StorageService.getData(this.day))
    }

    async sendLocalNotification() {
        // await this.localNotification.showLocalNotification(randomId, "Time for a glass of water", this.body, this.h, this.m)
        //     .then(r => { console.log('Notification Sent', r) })
        await this.localNotification.DefaultNotification()
    }

    async sendLocalNotificationNow() {
        console.log("Enviando notificacion")
      const randomId = Math.floor(Math.random() * 10000) + 1;
      this.body = "It's time to drink some water! 8 glasses of water is the goal!"
      await this.localNotification.showLocalNotification(randomId, "Time for a glass of water", this.body, this.h, Date.now() + 1000)
    }

    save(h:any,m:any){
      this.h = parseInt(h.value)
      this.m = parseInt(m.value)
    }

}
