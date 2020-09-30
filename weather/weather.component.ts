import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeathersService } from '../weathers.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  weatherSearchForm: FormGroup;
  @ViewChild('locationName') locationNames: ElementRef;
  sunlight: boolean;
  preview = true;
  cloud: boolean;
  Rain: boolean;
  clearSky: boolean;
  snow: boolean;
  weatherCondition: any;
  calculate: number;
  constructor( 
    private weathers: WeathersService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): any {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });
  }
  sendToApi(): any {
  this.weathers.getWeather(this.locationNames.nativeElement.value).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.getCelsius(this.weatherData.main.temp, this.weatherData.weather[0]);
    });
  }

  getCelsius(value, weather): any {
    const minus = (value - 32);
    const divide = (minus / (5 / 9));
    this.calculate = (minus * divide) / 10000;
    this.weatherCondition = weather.main;
    if(weather.main === 'Rain') {
      this.Rain = true;
      this.preview = false;
      this.cloud = false;
      this.sunlight = false;
      this.snow = false;
    } else if(weather.main === 'Clouds') {
      this.cloud = true;
      this.preview = false;
      this.sunlight = false;
      this.snow = false;
      this.Rain = false;
    } else if(weather.main === 'Clear') {
      this.sunlight = true;
      this.preview = false;
      this.cloud = false;
      this.snow = false;
      this.Rain = false;
    } else if(weather.main === 'Mist') {
      this.snow = true;
      this.preview = false;
      this.cloud = false;
      this.sunlight = false;
      this.Rain = false;
    }
  }
}
