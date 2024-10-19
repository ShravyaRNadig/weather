import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import axios from 'axios';
import {Weather} from '../models';
import {WeatherRepository} from '../repositories';

export class WeatherController {
  constructor(
    @repository(WeatherRepository)
    public weatherRepository: WeatherRepository,
  ) { }

  @post('/weathers')
  @response(200, {
    description: 'Weather model instance',
    content: {'application/json': {schema: getModelSchemaRef(Weather)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weather, {
            title: 'NewWeather',
            exclude: ['temperature'],
          }),
        },
      },
    })
    weather: Omit<Weather, 'Temperature'>,
  ): Promise<Weather> {
    return this.weatherRepository.create(weather);
  }

  @get('/weathers/count')
  @response(200, {
    description: 'Weather model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Weather) where?: Where<Weather>,
  ): Promise<Count> {
    return this.weatherRepository.count(where);
  }

  @get('/weathers')
  @response(200, {
    description: 'Array of Weather model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Weather, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Weather) filter?: Filter<Weather>,
  ): Promise<Weather[]> {
    return this.weatherRepository.find(filter);
  }

  @patch('/weathers')
  @response(200, {
    description: 'Weather PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weather, {partial: true}),
        },
      },
    })
    weather: Weather,
    @param.where(Weather) where?: Where<Weather>,
  ): Promise<Count> {
    return this.weatherRepository.updateAll(weather, where);
  }

  @get('/weathers/{id}')
  @response(200, {
    description: 'Weather model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Weather, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Weather, {exclude: 'where'}) filter?: FilterExcludingWhere<Weather>
  ): Promise<Weather> {
    return this.weatherRepository.findById(id, filter);
  }

  @patch('/weathers/{id}')
  @response(204, {
    description: 'Weather PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weather, {partial: true}),
        },
      },
    })
    weather: Weather,
  ): Promise<void> {
    await this.weatherRepository.updateById(id, weather);
  }

  @put('/weathers/{id}')
  @response(204, {
    description: 'Weather PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weather: Weather,
  ): Promise<void> {
    await this.weatherRepository.replaceById(id, weather);
  }

  @del('/weathers/{id}')
  @response(204, {
    description: 'Weather DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weatherRepository.deleteById(id);
  }

  @get('/weather/{city}')
  @response(200, {
    description: 'Fetch weather data for a specific city',
    content: {'application/json': {schema: {}}},
  })
  async fetchWeather(@param.path.string('city') city: string): Promise<any> {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    return response.data;
  }
}
