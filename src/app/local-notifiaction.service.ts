import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotifiactionService {

  constructor() { }

  async showLocalNotification(id: number, title: string, text: string, m: any){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: text,
          id: id,
          schedule: {
            at: new Date(m)
          }
        }
      ]
    })
  }
}
