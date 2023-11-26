import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { GetWeatherDto } from './dto/weather.dto';
import { WeatherLog } from './entity/weatherLog.entity';
import { Weather } from './weather.interface';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherLog)
    private weatherLogRepository: Repository<WeatherLog>,
    private configService: ConfigService,
  ) {}

  async getWeather(getWeatherDto: GetWeatherDto, user: User): Promise<Weather> {
    const baseUrl = this.configService.get('WEATHER_API_BASE_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');

    const weatherData: Weather = await (
      await fetch(`${baseUrl}/current.json?q=${getWeatherDto.city}&lang=${getWeatherDto.language}&key=${apiKey}`)
    ).json();

    return weatherData;
  }

  async getWeatherLogs() {
    return await this.weatherLogRepository.find();
  }

  async logWeatherResult(user: User, temp: number = null, status: HttpStatus) {
    const log = this.weatherLogRepository.create({
      user_id: user.id,
      action_time: Date.now(),
      request_result: status,
      temp_c: temp,
    });

    await this.weatherLogRepository.save(log);
  }
}
