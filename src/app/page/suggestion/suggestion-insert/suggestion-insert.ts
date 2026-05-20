import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { Api } from '../../../api/api';
import { apisuggestioninsert, Apisuggestioninsert$Params } from '../../../api/functions';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-suggestion-insert',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		TextareaModule,
		ButtonModule
	],
	templateUrl: './suggestion-insert.html',
	styleUrl: './suggestion-insert.css',
})

export class SuggestionInsert {
	private confirmationService = inject(ConfirmationService);
	private messageService = inject(MessageService);

	frmInsertSuggestion: FormGroup;

	get personFullNameFb() { return this.frmInsertSuggestion.controls['personFullName']; }
	get idOfficeFb() { return this.frmInsertSuggestion.controls['idOffice']; }
	get descriptionFb() { return this.frmInsertSuggestion.controls['description']; }

	constructor(
		private formBuilder: FormBuilder,
		private api: Api
	) {
		this.frmInsertSuggestion = this.formBuilder.group({
			'personFullName': ['', [Validators.required]],
			'idOffice': ['', []],
			'description': ['', [Validators.required]]
		});
	}

	sendInsertSuggestion(event: Event): void {
		if(!this.frmInsertSuggestion.valid) {
			this.frmInsertSuggestion.markAllAsTouched();
			this.frmInsertSuggestion.markAsDirty();

			this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete y corrija todos los datos faltantes.' });

			return;
		}

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Confirmar operación?',
			header: 'Confirmación',
			icon: 'pi pi-info-circle',
			rejectLabel: 'Cancel',
			rejectButtonProps: {
				label: 'Cancelar',
				severity: 'secondary',
				outlined: true
			},
			acceptButtonProps: {
				label: 'Aceptar',
				severity: 'primary'
			},
		
			accept: () => {
				const bodyParams: Apisuggestioninsert$Params = {
					body: {
						idOffice: 'f884319e-123d-4fd1-8e80-fd26be9101ed',
						personFullName: this.personFullNameFb.value,
						description: this.descriptionFb.value
					}
				};

				this.api.invoke(apisuggestioninsert, bodyParams).then((response: any) => {
					const apiResponseData = typeof response === 'string' ? JSON.parse(response) : response;
					switch(apiResponseData.type) {
						case 'success':
							this.messageService.add({ severity: 'success', summary: 'Correcto', detail: apiResponseData.listMessage[0] });
							break;
						
						case 'warning':
							break;

						case 'error':
							break;

						case 'expcetion':
							break;
					}
				}).catch((error: any) => {
					this.messageService.add({ severity: 'error', summary: 'Exception', detail: 'Algo ocurrió mal.' });
				});
			},
			reject: () => {}
		});
	}
}