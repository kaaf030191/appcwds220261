import { Component, inject, OnInit } from '@angular/core';
import { OptionMenuService } from '../../../observable/option-menu/option-menu.service';

@Component({
	selector: 'app-follow-up-view',
	imports: [],
	templateUrl: './view.html',
	styleUrl: './view.css',
})

export class FollowUpView implements OnInit {
	private optionMenuService = inject(OptionMenuService);

	ngOnInit(): void {
		this.optionMenuService.sendData('followup');
	}
}