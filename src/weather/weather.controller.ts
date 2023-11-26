import { Body, Catch, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/user/entity/user.entity';
import { GetWeatherDto } from './dto/weather.dto';
import { WeatherService } from './weather.service';
import { WeatherLogInterceptor } from './weatherLog.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(WeatherLogInterceptor)
@Controller('weather')
@Catch()
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post()
  async getСurrentWeather(@Body() getWeatherDto: GetWeatherDto, @UserDecorator() user: User): Promise<any> {
    const weather = await this.weatherService.getWeather(getWeatherDto, user);

    return weather;
  }
}
