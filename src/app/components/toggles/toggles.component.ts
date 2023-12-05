import { Component, EventEmitter, Output } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-toggles',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './toggles.component.html',
  styleUrl: './toggles.component.css'
})
export class TogglesComponent {

   @Output() onToggle = new EventEmitter();

   onToggleHandler(event: any) {
     this.onToggle.emit((event.target as HTMLLabelElement).innerText.toLocaleLowerCase());
   }

}
