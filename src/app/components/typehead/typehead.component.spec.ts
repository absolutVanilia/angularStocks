import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeheadComponent } from './typehead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Input } from '@angular/core';

describe('TypeheadComponent', () => {
  let component: TypeheadComponent;
  let fixture: ComponentFixture<TypeheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TypeheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Form Element with an Input element', () => {
    const initialRender:HTMLElement= fixture.nativeElement;
    const formElement= initialRender.querySelector('form');
    const inputElement= initialRender.querySelector('form input');
    expect(formElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
  });

  it('should emit typing event on typing', () => {
    spyOn(component.typingEvent, 'emit');
    component.inputFormControl.setValue('example');
    component.onTypingHandler();
    expect(component.typingEvent.emit).toHaveBeenCalledWith(['autocomplete', 'example']);
  });
});
