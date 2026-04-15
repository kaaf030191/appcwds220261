import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
	providedIn: 'root',
})

export class GeneralService {
	constructor(
		private httpClient: HttpClient
	) {}

	getIndex(): Observable<any> {
		return this.httpClient.get(`${environment.basePath}/general/index`);
	}
}