import { Routes } from '@angular/router';
import { SuggestionInsert } from './page/suggestion/suggestion-insert/suggestion-insert';
import { ComplaintInsert } from './page/complaint/complaint-insert/complaint-insert';

export const routes: Routes = [
	{ path: 'suggestion/insert', component: SuggestionInsert },
	{ path: 'complaint/insert', component: ComplaintInsert }
];