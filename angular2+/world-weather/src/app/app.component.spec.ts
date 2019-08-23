import { TestBed, async, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;
  let app: AppComponent;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          FormsModule
        ],
        providers: [
          AppComponent
        ],
        declarations: [
          AppComponent
        ]
      }).compileComponents();

      injector = getTestBed();
      httpMock = injector.get(HttpTestingController);
      app = injector.get(AppComponent);
      app.city = 'Columbus';
      app.country = 'United States';
  }));

  afterEach(() => { 
    httpMock.verify();
  });

  it('App should be created', () => {
    expect(app).toBeTruthy();
  });
  
  it('App should have title "WorldWeather"', () => {
    expect(app.title).toEqual('WorldWeather');
  });

  describe('Get Weather', () => {
    it('If City and Country values are not blank, http "GET" request should be made and return a json responseType', () => {

      app.getWeather();

      expect(app.submitted).toEqual(true);
      expect(app.complete).toEqual(true);
      expect(app.configUrl).toEqual(this.configUrl = `http://api.openweathermap.org/data/2.5/weather?q=${app.city},${app.country}&units=imperial&APPID=${app.wk}`);

      const req = httpMock.expectOne(`${app.configUrl}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('json');
    });

    it('If City or Country are left blank, complete should be false', () => {
      app.city = '';
      app.getWeather();
      expect(app.complete).toEqual(false);
    });
  });

  describe('Clear Weather', () => {
    it('The City and Country values should be blank', () => {
      app.clearWeather();
      expect(app.city).toEqual('');
      expect(app.country).toEqual('');
    });
  });
})
