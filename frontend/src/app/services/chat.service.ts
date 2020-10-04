import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../message';
// import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) { }

  public sendMessage(Message) {
    this.socket.emit('new-message', Message);
  }
  
  public getMessages = () => {
    return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
    });
  }
}


