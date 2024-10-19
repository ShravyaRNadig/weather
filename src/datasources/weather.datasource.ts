import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Weather',
  connector: 'memory',
  localStorage: '',
  file: './data/db.json'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class WeatherDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Weather';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Weather', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
