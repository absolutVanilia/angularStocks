import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { RequestType } from '../models/request.model';
import { Autocomplete } from '../models/autocomplete.model';
import { DailyData, MonthlyData } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiKey = "NKHGL9O85N1MO7O8" //"NKHGL9O85N1MO7O8";

  constructor() { }

  http = inject(HttpClient);

  getData(type: RequestType, symbol: string) {

    if (type === "autocomplete") {
      return this.http.get<Autocomplete>(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${this.apiKey}`)
    }

    if (type === "daily") {
      return this.http.get<DailyData>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`)
    }

    if (type === "monthly") {
      return this.http.get<MonthlyData>(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${this.apiKey}`)
    }
    return this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=a&apikey=${this.apiKey}`);
  }
  
}


