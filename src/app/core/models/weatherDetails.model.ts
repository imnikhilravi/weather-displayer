export class WeatherDetails{
    public cityName!: string;
    public prediction!: string;
    public currentTemperature!: number;
    public minTemperature!: number;
    public maxTemperature!: number;
    public icon!: string;
    public feelsLike!: number;
}

export class ForecastDetails extends WeatherDetails{
    public date!: string;
}

export class ForecastData {
    public name!: string;
    public details : Array<ForecastDetails> = new Array<ForecastDetails>();
}