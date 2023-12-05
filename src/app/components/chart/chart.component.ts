import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartData } from '../../models/data.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnChanges {
  view: [number, number] = [700, 400];

  @Input() multi!: ChartData[];
  @Input() toggleMode: string = "daily";

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  // xAxisLabel: string = "daily";
  yAxisLabel: string = 'Stock Price [USD]';
  timeline: boolean = true;
  colorScheme = "solar"
  gradient = true

  onResize(event:any) {
    console.log(event)
    if(event.target.innerWidth<1200){
    this.view = [event.target.innerWidth / 1.35, 400];
    }
}

  ngOnChanges(changes: SimpleChanges) {
  //   if (changes["toggleMode"]) {
  //   this.xAxisLabel = this.toggleMode === "daily" ? 'Last 30 days' : 'Last 12 months';
  // }
}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
