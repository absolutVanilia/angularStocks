import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-typehead',
  templateUrl: 'typehead.component.html',
  styleUrls: ['typehead.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class TypeheadComponent {
  inputFormControl = new FormControl('',
  {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^[^\\s]+.*$')],
  });

  @Output() onTyping = new EventEmitter();
  @Output() onSelection = new EventEmitter();
  @Input()  autoCompleteData!: [[string, string]];
  @Input() toggleMode!: string;

  onTypingHandler() {
    if (this.inputFormControl.valid) {
      this.onTyping.emit(["autocomplete", this.inputFormControl.value]);
    }
  }

  onSelectionHandler() {
    this.onSelection.emit([this.toggleMode, this.inputFormControl.value]);
  }
}
