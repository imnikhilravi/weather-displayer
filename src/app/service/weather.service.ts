import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) { }

  getWeatherForecast(zipCode: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?zip="+zipCode+",us&APPID="+this.apiKey+"&units=imperial" );
  }

  getCurrentWeather(zipCode: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&APPID="+this.apiKey+"&units=imperial" );
  }
}
