import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AllTodosComponent } from './components/all-todos/all-todos.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from  '@angular/common/http';
import { AuthIntercepterService } from './services/auth-intercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllTodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthIntercepterService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
