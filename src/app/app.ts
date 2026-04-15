import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneralService } from './api/general-service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css'
})

export class App {
	constructor(
		private generalService: GeneralService
	) {}

	ngOnInit(): void {
		this.generalService.getIndex().subscribe({
			next: (resposne: any) => {
				console.log(resposne);
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}
}