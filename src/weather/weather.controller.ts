import { Body, Catch, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/auth.guard';
import { GetWeatherDto } from './dto/weather.dto';
import { Weather } from './weather.interface';
import { WeatherService } from './weather.service';
import { WeatherLogInterceptor } from './weatherLog.interceptor';

@ApiTags('Weather')
@ApiHeader({
  name: 'Authorization',
  description: 'access_token',
  example:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJjaG9wb3ozMzIzIiwiZmlvIjoiYXNkYXNkYXNkYXNkc2FkIiwiaWF0IjoxNzAxMDE5OTkwLCJleHAiOjE3MDExMDYzOTB9.o36TSLUmwXD2eRzFbHcOQ8n_JPJYlcBBHSUIiVa6eFg',
})
@UseGuards(AccessTokenGuard)
@UseInterceptors(WeatherLogInterceptor)
@Controller('weather')
@Catch()
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Return weather' })
  @ApiBody({ type: GetWeatherDto })
  @Post()
  async getСurrentWeather(@Body() getWeatherDto: GetWeatherDto): Promise<Weather> {
    const weather = await this.weatherService.getWeather(getWeatherDto);

    return weather;
  }
}
