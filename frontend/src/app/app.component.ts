import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { MainService } from './services/main-service.service';
import { ConnectionService } from 'ng-connection-service';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMessage: string;
  messageList:  string[] = [];
  isConnected= true;
  noInternetConnection: boolean;

  constructor(private chatService: ChatService,
    public service: MainService, 
    private connectionService: ConnectionService,) { 
      this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = this.isConnected;
        if (this.isConnected) {
          this.noInternetConnection = false;
        }
        else {
          this.noInternetConnection = true;
        }
      })
    }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }
}