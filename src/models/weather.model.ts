import {Entity, model, property} from '@loopback/repository';

@model()
export class Weather extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'number',
  })
  temperature?: number;

  @property({
    type: 'string',
  })
  description?: string;

  // Define other properties as needed

  constructor(data?: Partial<Weather>) {
    super(data);
  }
}
