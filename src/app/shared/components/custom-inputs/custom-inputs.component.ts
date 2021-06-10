import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validation } from '../../interfaces/slide';

@Component({
  selector: 'app-custom-inputs',
  templateUrl: './custom-inputs.component.html',
  styleUrls: ['./custom-inputs.component.scss'],
})
export class CustomInputsComponent {
  @Input() field: FormControl;
  @Input() label: string;
  @Input() type = 'text';
  @Input() validations: Validation[];
}
