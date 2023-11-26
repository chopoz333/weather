import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherService } from './weather.service';

@Injectable()
export class WeatherLogInterceptor implements NestInterceptor {
  constructor(private weatherService: WeatherService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (response.statusCode === 201) response.status(200);

    return next.handle().pipe(
      map(data => {
        try {
          this.weatherService.logWeatherResult(request.user, data?.current?.temp_c, response.statusCode);
        } finally {
          return data;
        }
      }),
    );
  }
}
