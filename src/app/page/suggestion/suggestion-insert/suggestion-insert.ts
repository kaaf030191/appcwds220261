import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-suggestion-insert',
	imports: [
		FormsModule,
		InputTextModule,
		TextareaModule,
		ButtonModule
	],
	templateUrl: './suggestion-insert.html',
	styleUrl: './suggestion-insert.css',
})

export class SuggestionInsert {}