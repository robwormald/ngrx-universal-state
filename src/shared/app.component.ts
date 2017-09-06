import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {Store} from '@ngrx/store'

@Component({
	selector: 'ngrx-demo-app',
	template: `
	  <h1>Hello NgRx Demo App</h1>
	  <ul>
	    <li *ngFor="let user of users | async">{{user.name}}</li>
	  </ul>
	`
})
export class AppComponent {
	constructor(public store:Store<any>){}
	users = this.store.select(state => state.users);
	ngOnInit(){
		this.store.dispatch({type: 'ADD_INITIAL_USERS'})
	}
}
