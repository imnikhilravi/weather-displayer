import { Component, OnInit } from '@angular/core';
import { ForecastData, ForecastDetails, WeatherDetails } from '../core/models/weatherDetails.model';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  title = 'Weather Displayer';
  themeColor: string = 'Light';
  zipFilter: any;
  zipCode: number | undefined;
  weatherDetails: WeatherDetails = new WeatherDetails();
  forecastData: ForecastData = new ForecastData;
  isDark: boolean = false;
  showCurrentWeather: boolean = false;
  showForecastWeather: boolean = false;

  constructor(private forecastService: WeatherService) { }

  ngOnInit() {
  }

  getWeatherForecast() {
    this.forecastService.getWeatherForecast(this.zipCode).subscribe(
      res => {
        this.forecastData = new ForecastData();
        this.forecastData.name = res.city.name;
        for (var i = 7; i < res.list.length; i = i + 8)
        {
          var details = new ForecastDetails();
          details.date = res.list[i].dt_txt;
          details.maxTemperature = res.list[i].main.temp_max;
          details.minTemperature = res.list[i].main.temp_min;
          details.prediction = res.list[i].weather[0].description;
          details.icon = res.list[i].weather[0].icon;
          details.feelsLike = res.list[i].main.feels_like;
          this.forecastData.details.push(details);
        }
        this.showCurrentWeather = false;
        this.showForecastWeather = true;
      }
    )
  }

   getCurrentWeather() {
    this.forecastService.getCurrentWeather(this.zipCode).subscribe(
      res => {
        this.weatherDetails.cityName = res.name;
        this.weatherDetails.prediction = res.weather[0].description;
        this.weatherDetails.currentTemperature = res.main.temp;
        this.weatherDetails.icon = res.weather[0].icon;
        this.weatherDetails.maxTemperature = res.main.temp_max;
        this.weatherDetails.minTemperature = res.main.temp_min;
        this.weatherDetails.feelsLike = res.main.feels_like;
        this.showCurrentWeather = true;
        this.showForecastWeather = false;
      }
    )
  }


  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) this.themeColor = 'Dark';
    else this.themeColor = 'Light';
  }
}