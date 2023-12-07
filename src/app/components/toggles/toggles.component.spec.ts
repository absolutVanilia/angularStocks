import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglesComponent } from './toggles.component';

describe('TogglesComponent', () => {
  let component: TogglesComponent;
  let fixture: ComponentFixture<TogglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TogglesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const timeGroup:HTMLElement= fixture.debugElement.nativeElement.querySelector('mat-button-toggle-group');
    const timeGroupToogle = Array.from(timeGroup.getElementsByTagName('mat-button-toggle'));
    expect(timeGroupToogle).toBeTruthy();
    expect(timeGroupToogle[0].getAttribute('value')).toBe('daily');
    expect(timeGroupToogle[1].getAttribute('value')).toBe('monthly');
  });

  it('should emit ontoggle', () => {
    spyOn(component.onToggle, 'emit');
    const clickEventTarget = {innerText: "hola"}
    component.onToggleHandler(clickEventTarget);
    expect(component.onToggle.emit).toHaveBeenCalledWith('hola');
  });
});
  