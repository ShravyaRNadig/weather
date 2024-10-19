import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WeatherDataSource} from '../datasources';
import {Weather} from '../models';

export class WeatherRepository extends DefaultCrudRepository<
  Weather,
  typeof Weather.prototype.temperature
> {
  constructor(
    @inject('datasources.Weather') dataSource: WeatherDataSource,
  ) {
    super(Weather, dataSource);
  }
}
