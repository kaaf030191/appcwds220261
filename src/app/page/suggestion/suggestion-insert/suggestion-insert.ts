import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Api } from '../../../api/api';
import { apiofficegetall, apisuggestioninsert, Apisuggestioninsert$Params } from '../../../api/functions';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
	selector: 'app-suggestion-insert',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		TextareaModule,
		ButtonModule,
		FileUploadModule,
		SelectModule
	],
	templateUrl: './suggestion-insert.html',
	styleUrl: './suggestion-insert.css',
})

export class SuggestionInsert implements OnInit {
	private confirmationService = inject(ConfirmationService);
	private messageService = inject(MessageService);

	frmInsertSuggestion: FormGroup;

	listOffice: any[] = [];

	fileQuantity: number = 0;
	fileRowList: any[] = [];
	listFile: any[] = [];

	get personFullNameFb() { return this.frmInsertSuggestion.controls['personFullName']; }
	get officeFb() { return this.frmInsertSuggestion.controls['office']; }
	get descriptionFb() { return this.frmInsertSuggestion.controls['description']; }

	constructor(
		private formBuilder: FormBuilder,
		private api: Api
	) {
		this.frmInsertSuggestion = this.formBuilder.group({
			'personFullName': ['', []],
			'office': ['', [Validators.required]],
			'description': ['', [Validators.required]]
		});
	}

	ngOnInit(): void {
		this.initialization();
	}

	private initialization(): void {
		this.api.invoke(apiofficegetall).then((response: any) => {
			const apiResponseData = typeof response === 'string' ? JSON.parse(response) : response;

			this.listOffice = apiResponseData.listOffice;
		});
	}

	addFile(): void {
		this.fileQuantity++;

		this.fileRowList.push({
			'id': 'file' + this.fileQuantity
		});
	}

	removeFile(element: any): void {
		let tempElement = JSON.parse(JSON.stringify(element));

		let positionTemp = this.fileRowList.indexOf(element);

		this.fileRowList.splice(positionTemp, 1);

		let indexTemp = 0;

		this.listFile.every((value) => {
			if(value.name == tempElement.id) {
				return false;
			}

			indexTemp++;

			return true;
		});

		this.listFile.splice(indexTemp, 1);
	}

	onFileSelect(event: any, name: string): void {
		const file: Blob = event.currentFiles ? event.currentFiles[0] : event.files[0];

		this.listFile.push({
			'name': name,
			'file': file
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
				let filesToSend: Blob[] = [];

				this.listFile.forEach((element: any) => {
					filesToSend.push(element.file);
				});

				const bodyParams: Apisuggestioninsert$Params = {
					body: {
						idOffice: this.officeFb.value.idOffice,
						personFullName: this.personFullNameFb.value,
						description: this.descriptionFb.value,
						files: filesToSend
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