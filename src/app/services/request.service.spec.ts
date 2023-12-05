import { TestBed } from '@angular/core/testing';
import { RequestService } from './request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Autocomplete } from '../models/autocomplete.model';
import { InitService } from './init.service';
import { DailyData, MonthlyData } from '../models/data.model';

describe('RequestService', () => {
  let requestService: RequestService;
  let HTTPController: HttpTestingController;
  let initService: InitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestService, InitService]
    });
    requestService = TestBed.inject(RequestService);
    HTTPController = TestBed.inject(HttpTestingController);
    initService = TestBed.inject(InitService);
  });

  it('should be created', () => {
    expect(requestService).toBeTruthy();
  });

  describe('tests for getData', () => {
    it('should return an Observable<Autocomplete>', (doneFn) => {
      //Arrange
      const mockAutocomplete: Autocomplete = initService.autoComplete;

      //Act
      requestService.getData("autocomplete", "tesco").subscribe((data) => {
        //Assert
        expect(data).toEqual(mockAutocomplete);
        doneFn();
      });

      //HTTP configuration
      const request = HTTPController.expectOne("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo");
      request.flush(mockAutocomplete);
      HTTPController.verify();
    });

    it('should return an Observable<MonthlyData>', (doneFn) => {
      //Arrange
      const mockMonthlyData: MonthlyData = initService.monthlyDataInit;

      //Act
      requestService.getData("monthly", "IBM").subscribe((data) => {
        //Assert
        expect(data).toEqual(mockMonthlyData);
        doneFn();
      });

      //HTTP configuration
      const request = HTTPController.expectOne("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo");
      request.flush(mockMonthlyData);
      HTTPController.verify();
    });

    it('should return an Observable<DailyData>', (doneFn) => {
      //Arrange
      const mockDailyData: DailyData = initService.dailyDataInit;

      //Act
      requestService.getData("daily", "IBM").subscribe((data) => {
        //Assert
        expect(data).toEqual(mockDailyData);
        doneFn();
      });

      //HTTP configuration
      const request = HTTPController.expectOne("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo");
      request.flush(mockDailyData);
      HTTPController.verify();
    });
  });
});
