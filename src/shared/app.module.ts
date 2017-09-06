import {NgModule} from '@angular/core'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {AppComponent} from './app.component'
import {CommonModule} from '@angular/common'
import {AppEffects, users} from './state'


@NgModule({
	imports: [
		StoreModule.forRoot({users}),
		EffectsModule.forRoot([AppEffects]),
		CommonModule
	],
	declarations: [AppComponent],
	exports: [AppComponent],
	providers: [AppEffects]
})
export class AppModule {}
