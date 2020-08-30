import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  getTeste(): string {
    return 'PRONTO CARALHOOO !!';
  }
}
