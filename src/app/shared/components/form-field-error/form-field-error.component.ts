import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {

    if (this.control.invalid && this.control.touched) {
      if (this.control.errors.required) {
        return 'Dado obrigatório';
      } else if ( this.control.errors.email ) {
        return 'Formato de e-mail inválido';
      } else if ( this.control.errors.minlength ) {
        const requiredLength = this.control.errors.minlength.requiredLength;
        return `Deve ter no mínimo ${requiredLength} caracteres`;
      } else {
        return 'Campo com erro';
      }
    }

    return null;
  }
}
