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

  @Output() typingEvent = new EventEmitter();
  @Output() selectionEvent = new EventEmitter();
  @Input()  autoCompleteData!: [[string, string]];
  @Input() toggleMode!: string;

  debouncer:any;

  onTypingHandler() {
    if (this.inputFormControl.valid) {
      clearTimeout(this.debouncer);
      this.debouncer = setTimeout(()=>{this.typingEvent.emit(["autocomplete", this.inputFormControl.value])}, 500)
    }
  }

  onSelectionHandler() {
    this.selectionEvent.emit([this.toggleMode, this.inputFormControl.value]);
  }
}
