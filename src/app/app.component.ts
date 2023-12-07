import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TypeheadComponent } from "./components/typehead/typehead.component";
import { ChartComponent } from "./components/chart/chart.component";
import { TogglesComponent } from "./components/toggles/toggles.component";
import { RequestService } from './services/request.service';
import { RequestType } from './models/request.model';
import { Autocomplete } from './models/autocomplete.model';
import { ChartData } from './models/data.model';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet,
              TypeheadComponent,
              ChartComponent,
              TogglesComponent]
})
export class AppComponent {

  private requestService = inject(RequestService);

  alertRenderStatus = false;
  alertMessage = signal('Out of tokens');
  processedAutocompleteData: any = [];
  processedDailyData: any = [];
  processedMonthlyData: any = [];
  symbol: string = "";
  dataChart!: ChartData[];
  toggleMode: string = "daily";

  //change alert render state
  changeAlertRender(){
    this.alertRenderStatus = false;
  }
  
  //call the API for Autocomplete
  typeheadAutocompleteListener(event: ['autocomplete', string]) {

    this.requestService.getData(event[0], event[1]).subscribe({
      next: (data: any) => {
        this.processedAutocompleteData.length = 0;
        if(data.hasOwnProperty('Information')){
          this.alertMessage.set('You are out of API tokens.')
          this.alertRenderStatus = true;
          setTimeout(()=>{this.changeAlertRender()}, 3000);
        }
    
        if(data["bestMatches"].length){
          for (let match in data["bestMatches"]) {
            this.processedAutocompleteData.push([data["bestMatches"][match]["1. symbol"], data["bestMatches"][match]["2. name"]]);
          }
        } else {
          this.alertMessage.set('There are no matches for your search')
          this.alertRenderStatus = true;
          setTimeout(()=>{this.changeAlertRender()}, 3000);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Call the API for the chart data
  typeheadListener(event: [RequestType, string]) {

    if (event[1] !== this.symbol && (event[0] === "daily" || event[0] === "monthly")) {
      this.symbol = event[1];
      this.processedDailyData.length = 0;
      this.processedMonthlyData.length = 0;
    }
    
    this.requestService.getData(event[0], event[1]).subscribe({
      next: (data: any) => {
        switch (event[0]) {
          case "daily":
            this.processChartData("daily", data);
            break;
          case "monthly":
            this.processChartData("monthly", data);
            break;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private processChartData(type: RequestType, data: any) {
    if (type === "daily") {
      let firstDay: Date | string | null = null;
      let result = [];
      for (let day in data['Time Series (Daily)']) {
        if (!firstDay) {
          firstDay = new Date(day);
          firstDay.setMonth(firstDay.getMonth() - 1);
          firstDay = firstDay.toISOString().substring(0, 10);
        }

        if (day >= firstDay) {
          result.unshift({
            name: day,
            value: data['Time Series (Daily)'][day]['4. close'],
          });
        }
      }

      result = [
        {
          name: data["Meta Data"]["2. Symbol"],
          series: result,
        },
      ];

      this.processedDailyData = result;
      this.dataChart = result;

    } else if (type === "monthly") {
      let firstMonth: Date | string | null = null;
      let result = [];
      for (let month in data['Monthly Time Series']) {
        if (!firstMonth) {
          firstMonth = new Date(month);
          firstMonth.setFullYear(firstMonth.getFullYear() - 1);
          firstMonth = firstMonth.toISOString().substring(0, 7);
        }

        let monthName = month.substring(0, 7);

        if (monthName >= firstMonth) {
          result.unshift({
            name: monthName,
            value: data['Monthly Time Series'][month]['4. close'],
          });
        }
      }

      result = [
        {
          name: data['Meta Data']['2. Symbol'],
          series: result,
        },
      ];

      this.processedMonthlyData = result;
      this.dataChart = result;
    }
  }

  onTogglesListener(event: string) {
    if (this.symbol) {
      this.toggleMode = event;
      if (this.toggleMode === "daily") {
        if (this.processedDailyData.length!==0) {
          this.dataChart = this.processedDailyData;
        } else {
          this.typeheadListener(["daily", this.symbol]);
        }
      } else if (this.toggleMode === "monthly") {
        console.log(this.toggleMode);
        if (this.processedMonthlyData.length!==0) {
          this.dataChart = this.processedMonthlyData;
        } else {
          this.typeheadListener(["monthly", this.symbol]);
        }
      }
    }
  }
}
