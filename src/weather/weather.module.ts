import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherLog } from './entity/weatherLog.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherLogInterceptor } from './weatherLog.interceptor';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([WeatherLog])],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherLogInterceptor],
})
export class WeatherModule {}
