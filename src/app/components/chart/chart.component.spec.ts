import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
