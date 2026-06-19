import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { Api } from '../../../api/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { apisuggestiongetbycode } from '../../../api/functions';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-follow-up-view',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		InputMaskModule,
		RadioButtonModule
	],
	templateUrl: './view.html',
	styleUrl: './view.css',
})

export class FollowUpView implements OnInit {
	private changeDetectorRef = inject(ChangeDetectorRef);
	private optionMenuService = inject(OptionMenuService);
	private messageService = inject(MessageService);

	frmFollowUp: FormGroup;

	frmFollowUpInitValue: any = {};

	dataReponse: any = {};

	get codeFb() { return this.frmFollowUp.controls['code']; }
	get typeFb() { return this.frmFollowUp.controls['type']; }

	constructor(
		private formBuilder: FormBuilder,
		private api: Api
	) {
		this.frmFollowUpInitValue = {
			'code': '',
			'type': 'suggestion'
		};

		this.frmFollowUp = this.formBuilder.group({
			'code': [this.frmFollowUpInitValue.code, []],
			'type': [this.frmFollowUpInitValue.type, []]
		});
	}

	ngOnInit(): void {
		this.optionMenuService.sendData('followup');
	}

	onChangeType(): void {
		this.onKeyUpTxtCode();
	}

	onKeyUpTxtCode(): void {
		if(this.codeFb.value.replace('_', '').length == 7) {
			this.api.invoke(apisuggestiongetbycode, { code: this.codeFb.value }).then((response: any) => {
				const apiResponseData = typeof response === 'string' ? JSON.parse(response) : response;
				switch(apiResponseData.type) {
					case 'success':
						this.dataReponse = apiResponseData;

						break;
					
					case 'warning':
						break;

					case 'error':
						break;

					case 'expcetion':
						break;
				}

				this.changeDetectorRef.markForCheck();
				this.changeDetectorRef.detectChanges();
			}).catch((error: any) => {
				this.messageService.add({ severity: 'error', summary: 'Exception', detail: 'Algo ocurrió mal.' });
			});
		}
	}
}