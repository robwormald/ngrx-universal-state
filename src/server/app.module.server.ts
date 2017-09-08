import {NgModule, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {ServerModule, BEFORE_APP_SERIALIZED} from '@angular/platform-server'
import {AppClientModule} from '../client/app.module.client'
import {AppComponent} from '../shared/app.component'
import {Store, INITIAL_STATE} from '@ngrx/store'

//DANGER WILL ROBINSON
//DO NOT USE THIS IN PRODUCTION
//IT WILL KILL YOU AND IT WILL HURT THE WHOLE TIME YOU ARE DYING
//TODO(security): use Sanitizer API?
function serializeNgRxState(state){
	return `window.__NGRX_INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}`
}


export function setNgRxState(doc: any, store:Store<any>) {
	return () => {
		let initialState;
		store.subscribe(state => {
			initialState = state;
		});
		console.log('setting transfer state...')
		const scriptTag = doc.createElement('script');
		scriptTag.setAttribute('type', 'text/javascript');
		scriptTag.innerHTML = serializeNgRxState(initialState);
		doc.head.appendChild(scriptTag);
	};
}

@NgModule({
	imports: [ServerModule, AppClientModule],
	bootstrap: [AppComponent],
	providers: [
		{ provide: INITIAL_STATE, useValue: {}},
		{ provide: BEFORE_APP_SERIALIZED, multi: true, useFactory: setNgRxState, deps: [DOCUMENT, Store] },
	]
})
export class AppServerModule {
	ngDoBootstrap(){
		console.log('bootstrapped server');
	}
}
