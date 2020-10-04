import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { MainService } from './services/main-service.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { TokenVerifyService } from './services/token-verify.service';
import {ConnectionServiceModule} from 'ng-connection-service';  
 

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatInboxComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ConnectionServiceModule,
    RouterModule.forRoot([])
  ],
  providers: [ MainService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenVerifyService,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
