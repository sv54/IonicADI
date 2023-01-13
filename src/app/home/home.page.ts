import { Component } from '@angular/core';
import { LocalNotifiactionService } from '../local-notifiaction.service';
import { format, parseISO } from 'date-fns'
import { StorageService } from '../storage.service'
import { CancelOptions, LocalNotifications } from '@capacitor/local-notifications';
import { EChartsOption} from 'echarts';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],

})
export class HomePage {
    options: any
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
    reminderAgua = false;
    texto = ""


    constructor(private localNotification: LocalNotifiactionService, private StorageService: StorageService) {
        this.setup();
        if(this.enviarNotif){
          this.cancelLocalNotification()
          this.sendLocalNotification()
        }
    }
    async setup() {

        await this.loadChart()

        this.formattedDateTime = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'HH:mm,  dd/MM/yy')
        this.day = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'dd/MM/yy')

        this.vecesHoy = parseInt(await this.StorageService.getData(this.day))

        this.asignarTexto()

        const toggle = await this.StorageService.getToggle()
        this.enviarNotif = toggle

        const toggle2 = await this.StorageService.getToggle2()
        this.reminderAgua = toggle2

        // await this.StorageService.addData("16/01/23", 7)
        // await this.StorageService.addData("15/01/23", 7)
        // await this.StorageService.addData("14/01/23", 8)
        // await this.StorageService.addData("13/01/23", 6)
        // await this.StorageService.addData("12/01/23", 7)
        // await this.StorageService.addData("11/01/23", 5)
        // await this.StorageService.addData("10/01/23", 3)
        // await this.StorageService.addData("9/01/23", 4)
        // await this.StorageService.addData("8/01/23", 3)
        // await this.StorageService.addData("7/01/23", 1)
        // await this.StorageService.addData("6/01/23", 2)



        //await this.loadChart()

    }

    getWeek(){
      this.StorageService.getLastWeek()
    }

    async loadChart(){
      // var {keys,values}= await this.StorageService.getChartData()
      var {week,values}= await this.StorageService.getLastWeek()


      this.options = {

        color: ['#3398DB'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: week,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Test',
            type: 'bar',
            barWidth: '60%',
            data: values
          }
        ]
      };
      // console.log(this.options.series)
      // console.log(this.options.xAxis)

      // this.options.xAxis = {
      //   type: 'category',
      //   data: keys,
      //   axisTick: {
      //     alignWithLabel: true
      //   }
      // }
      // this.options.series=
      // [
      //   {
      //     name: 'Test',
      //     type: 'bar',
      //     barWidth: '60%',
      //     data: values
      //   }
      // ]
    }

    async addOne() {
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

    async cancelLocalNotification() {
      let option:CancelOptions={
        notifications:[
          {id:1},
          {id:2},
          {id:3},
          {id:4},
          {id:5},
          {id:6},
          {id:7},
          {id:8}
        ]
      }
      LocalNotifications.cancel(option);
  }

    async toggle(permiso: any){
      if(!permiso.checked){
        await this.StorageService.setToggle(true)
        this.enviarNotif = permiso.checked
        this.sendLocalNotification()
      }else{
        await this.StorageService.setToggle(false)
        this.enviarNotif = permiso.checked
        this.cancelLocalNotification()
      }
    }

    async reminder(permiso2: any){
      if(!permiso2.checked){
        await this.StorageService.setToggle2(true)
        this.reminderAgua = permiso2.checked
        this.sendLocalNotificationNow()
      }else{
        await this.StorageService.setToggle2(false)
        this.reminderAgua = permiso2.checked
        this.cancelLocalNotificationNow()
      }
    }

    async sendLocalNotificationNow() {
      console.log("Enviando notificacion")
      const randomId = 100 //Math.floor(Math.random() * 10000) + 1;
      this.body = "It's time to drink some water! 8 glasses of water is the goal!"
      await this.localNotification.showLocalNotification(randomId, "Time for a glass of water", this.body)
    }

    async cancelLocalNotificationNow() {
      let option2:CancelOptions={
        notifications:[
          {id:100}
        ]
      }
      LocalNotifications.cancel(option2);
  }

    asignarTexto(){
      if(this.vecesHoy == 0){
        this.texto = "Es hora de comenzar el dia! "
      }
      else if(this.vecesHoy < 3 && this.vecesHoy > 0){
        this.texto = "Bueno comienzo! Llevas: "
      }
      else if(this.vecesHoy > 2 && this.vecesHoy < 6){
        this.texto = "Llevas buen ritmo! Sigue asi! Ya son: "
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



    async onChartInit(event:any){

    }
}
