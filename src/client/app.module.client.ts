import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppModule} from '../shared/app.module'
import {AppComponent} from '../shared/app.component'
import {INITIAL_STATE} from '@ngrx/store'

export function getInitialNgRxState(){
	return window['__NGRX_INITIAL_STATE__'] || {}
}


@NgModule({
	imports: [
		BrowserModule.withServerTransition({appId: 'ngrx-demo'}),
		AppModule,

	],
	bootstrap: [AppComponent],
	providers: [{ provide: INITIAL_STATE, useFactory: getInitialNgRxState }]
})
export class AppClientModule {
	ngDoBootstrap(){
		console.log('bootstrapped');
	}
}
