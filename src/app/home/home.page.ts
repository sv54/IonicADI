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
    enviarNotif = true;
    texto = ""


    constructor(private localNotification: LocalNotifiactionService, private StorageService: StorageService) {
        this.setup();
        this.sendLocalNotification()
    }



    async setup() {

        this.formattedDateTime = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'HH:mm,  dd/MM/yy')
        this.day = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'dd/MM/yy')

        this.vecesHoy = parseInt(await this.StorageService.getData(this.day))
        console.log(this.vecesHoy)

        this.asignarTexto()

        const toggle = await this.StorageService.getToggle()
        this.enviarNotif = toggle
    }

    async addOne() {
        console.log(this.enviarNotif)
        this.vecesHoy = this.vecesHoy + 1
        await this.StorageService.addData(this.day, this.vecesHoy)
        this.asignarTexto()
    }
    async minusOne(){
      if(this.vecesHoy > 0){
        this.vecesHoy = this.vecesHoy - 1
        await this.StorageService.addData(this.day, this.vecesHoy)
        this.asignarTexto()
      }
    }

    async removeData() {
        this.vecesHoy = 0
        await this.StorageService.removeItem(this.day)
    }

    async showData() {
        console.log(await this.StorageService.getData(this.day))
        console.log(typeof await this.StorageService.getData(this.day))
        console.log(this.enviarNotif)
    }

    async sendLocalNotification() {
        // await this.localNotification.showLocalNotification(randomId, "Time for a glass of water", this.body, this.h, this.m)
        //     .then(r => { console.log('Notification Sent', r) })
        await this.localNotification.DefaultNotification()
    }

    async toggle(permiso: any){
      if(!permiso.checked){
        await this.StorageService.setToggle(true)
        this.enviarNotif = permiso.checked
      }
      else{
        await this.StorageService.setToggle(false)
        this.enviarNotif = permiso.checked

      }

    }

    async sendLocalNotificationNow() {
      console.log("Enviando notificacion")
      const randomId = Math.floor(Math.random() * 10000) + 1;
      this.body = "It's time to drink some water! 8 glasses of water is the goal!"
      await this.localNotification.showLocalNotification(randomId, "Time for a glass of water", this.body, this.h, Date.now() + 1000)
    }

    asignarTexto(){
      if(this.vecesHoy == 0){
        this.texto = "Es hora de comenzar el dia! "
      }
      else if(this.vecesHoy < 3 && this.vecesHoy > 0){
        this.texto = "Bueno comienzo! Llevas: "
      }
      else if(this.vecesHoy > 2 && this.vecesHoy < 6){
        this.texto = "LLevas buen ritmo! Sigue asi! Ya son: "
      }
      else if(this.vecesHoy > 5 && this.vecesHoy < 8){
        this.texto = "Ya casi esta por hoy! Ya van: "
      }
      else if(this.vecesHoy > 7){
        this.texto = "Ya cumpliste por hoy! Buen trabajo! "
      }
    }

    save(h:any,m:any){
      this.h = parseInt(h.value)
      this.m = parseInt(m.value)
    }

}
