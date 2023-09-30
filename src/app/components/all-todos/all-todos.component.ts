import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {MatIconModule} from '@angular/material/icon';




@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit {
  newTodo: string = '';

  todos: any = [];
  error = "";
  popupOpen = false;
  changeValue:string = '';

  constructor(private http: HttpClient,private renderer: Renderer2, private el: ElementRef) { }

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    } catch (e) {
      this.error = 'Fehler beim laden';
    }
  }

  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }


  change(todo:any) {
    this.showPopup(todo.id);
    this.changeValue = todo.titel;
  }

  showPopup(id:number){
    const element = this.el.nativeElement.querySelector(`#todo${id}`);
    this.renderer.removeClass(element, 'd-none');
  }

  cancel(id:number){
    const element = this.el.nativeElement.querySelector(`#todo${id}`);
    this.renderer.addClass(element, 'd-none');
  }

  updateTodo(id: number){
    const url = `${environment.baseUrl}/todos/${id}/`;
    const data = {
      "titel": this.changeValue,
    }
    return lastValueFrom(this.http.patch(url, data));
  }

 

  //funktioniert
  addTodo() {
    const url = environment.baseUrl + '/todos/';
    const data = {
      "titel": this.newTodo,
    }
    try {
      return lastValueFrom(this.http.post(url, data));
    } catch(e){
      console.log('Folgender Fehler', e);
      return false;
    }
  }

//funktioniert
deleteTodo(id: number) {
  const url = `${environment.baseUrl}/todos/${id}`; // DELETE api/heroes/42
  return lastValueFrom(this.http.delete(url));
}












  // JS Way
  // loadTodos() {
  //   const url = environment.baseUrl + '/todos/';
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', 'Token ' + localStorage.getItem('token'))

  //   return lastValueFrom(this.http.get(url,
  //     {headers: headers}));
  // }
}


