import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeheadComponent } from './typehead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
});
