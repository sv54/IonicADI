import { Component } from '@angular/core';
import { LocalNotifiactionService } from '../local-notifiaction.service';
import { format, parseISO } from 'date-fns'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public id: number | undefined;
  public title: any;
  public body: any;
  public today = Date.now();
  formattedString = ''

  constructor(private localNotification: LocalNotifiactionService) {
    this.setToday();
  }

  setToday(){
    this.formattedString = format(parseISO(format(Date.now(), 'yyyy-MM-dd HH:mm')), 'HH:mm,  d/MMM/yy')
  }

  async sendLocalNotification () {
    const randomId = Math.floor(Math.random() * 10000) + 1;
    this.body = "Ejemplo de una notificacion"
    await this.localNotification.showLocalNotification(randomId, "Notificacion Prueba", this.body, Date.now() + 100 ).then(r => {console.log('Notification Sent', r, Date.now() + 100)})
  }

}
