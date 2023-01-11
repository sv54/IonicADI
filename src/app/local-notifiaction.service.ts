import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotifiactionService {

  constructor() { }

  async showLocalNotification(id: number, title: string, text: string, h: any, m:any){
    this
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: text,
          id: id,
          autoCancel: true,
          schedule: { every: 'minute'
            // on: {hour:h, minute:m},
            // allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }

        }
      ]
    })
    console.log("Notificacion enviada para (h:"+h+" ,m:"+m+")")
  }  
  async showLocalNotificationNow(id: number, title: string, text: string, time: any){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: text,
          id: id,
          schedule: {
            at: new Date(),
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }

        }
      ]
    })
  }
  async DefaultNotification(){
    await LocalNotifications.schedule({
      notifications: [
        {
          // 1
          title: "Buenos dias",
          body: "Es importante hidratarse bien despues de dormir",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:9, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 2
          title: "Hora de tomar agua!",
          body: 'Siempre lleva agua si vas a salir de casa!',
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:11, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 3
          title: "Hora de tomar agua!",
          body: "Si no te gusta el sabor de agua, puedes añadir un trozo de fruta o exprimir un poco de limon!",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:13, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 4
          title: "Hora de comer!",
          body: "No te olvides de tomar al menos un vaso de agua! Es bueno para la digestion",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:14, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 5
          title: "Hora de tomar agua!",
          body: "Sabias que es recomendable tomar 8 vasos de agua al dia!",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:16, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 6
          title: "Hora de tomar agua!",
          body: "Sabias que es recomendable tomar 8 vasos de agua al dia!",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:18, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 7
          title: "Hora de cenar",
          body: "No te olvides de llevar un vaso de agua",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:20, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
        {
          // 8
          title: "Hora de tomar agua!",
          body: "Deja un vaso con agua en la mesita de noche",
          id: Math.floor(Math.random() * 10000) + 1,
          schedule: {
            on: {hour:22, minute: 0},
            allowWhileIdle: true,
            //at: new Date(m),
            // every: 'day'
          }
        },
      ]
    })
  }
  async getPending(){
    return await LocalNotifications.getPending()
  }
}
