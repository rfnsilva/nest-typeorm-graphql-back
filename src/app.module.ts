import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import AppService from './app.service';

import * as ormConfig from './config/orm';

import repoModule from './repositorios/repo.module'

import CategoriaResolver from './resolvers/categoria.resolver';
import ProdutoResolver from './resolvers/produto.resolver';
import VendaResolver from './resolvers/venda.resolver';
import ContaResolver from './resolvers/conta.resolver';
import FornecedorResolver from './resolvers/fornecedor.resolver';
import UserResolver from './resolvers/user.resolver';
import ClienteResolver from './resolvers/cliente.resolver';

import { context } from './db/loaders';

const gqlImports = [
  CategoriaResolver,
  ProdutoResolver,
  VendaResolver,
  UserResolver,
  FornecedorResolver,
  ContaResolver,
  ClienteResolver
];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    repoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true,
      context,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
