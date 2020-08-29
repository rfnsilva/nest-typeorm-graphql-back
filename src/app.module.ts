import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormConfig from './config/orm';
import repoModule from './repositorios/repo.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig), repoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
