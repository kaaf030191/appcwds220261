import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Api } from './api/api';
import { apigeneralindex } from './api/functions';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css'
})

export class App {
	constructor(
		private api: Api
	) {}

	ngOnInit(): void {
		this.api.invoke(apigeneralindex).then((response: any) => {
			const apiResponseData = typeof response === 'string' ? JSON.parse(response) : response;
			console.log(apiResponseData);
		}).catch((error: any) => {
			console.log(error);
		});
	}
}