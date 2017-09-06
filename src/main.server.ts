import 'zone.js/dist/zone-node'
import {AppServerModuleNgFactory} from './server/app.module.server.ngfactory';
import {readFileSync} from 'fs'
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import {Request, Response} from 'express';
import {platformServer, renderModuleFactory } from '@angular/platform-server';
import {INITIAL_STATE} from '@ngrx/store'

import { enableProdMode } from '@angular/core';
enableProdMode();
const app = express();
const port = 8000;
const baseUrl = `http://localhost:${port}`;

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('public', {index: false}));

app.get('/', function(req, res){

	renderModuleFactory(AppServerModuleNgFactory, {
		document: readFileSync('public/index.html').toString(),
		extraProviders: [],
    url: '/'
  })
	.then(body => {
		console.log('returning response to client');
		res.send(body);
	})
	.catch(err => {
		res.send(500);
	})
})

app.listen(port, () => {
	console.log(`Listening at ${baseUrl}`);
});
