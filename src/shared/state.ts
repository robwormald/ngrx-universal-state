import {Effect, Actions} from '@ngrx/effects'
import {PLATFORM_ID, Injectable, Inject} from '@angular/core'
import {isPlatformServer, } from '@angular/common'
import 'rxjs/Rx'

export interface User {
	id: number,
	name: string;
}

export function users(state:User[] = [], action){
	switch(action.type){
		case 'ADD_USERS':
		  return action.payload;
		default:
		  return state;
	}
}

@Injectable()
export class AppEffects {
	constructor(@Inject(PLATFORM_ID) private platformId, public actions:Actions){
		console.log('bootstrapping effects....');
	}

	@Effect()
	onBootstrap = this.actions.ofType('ADD_INITIAL_USERS')
	  .filter(action => isPlatformServer(this.platformId))
	  .do(() => console.log('adding initial users, should not run on client side'))
	  .map(action => ({type: 'ADD_USERS', payload: [{id: 1, name: 'Rob'}, {id: 2, name: 'Vikram'}]}))
}
