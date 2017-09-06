import 'zone.js'
import {platformBrowser} from '@angular/platform-browser';
import {AppClientModuleNgFactory} from './client/app.module.client.ngfactory';

platformBrowser()
  .bootstrapModuleFactory(AppClientModuleNgFactory);
