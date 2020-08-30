import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoService from './repo.service';

import Produto from '../db/models/Produto.entity';
import Categoria from '../db/models/Categoria.entity';
import Fornecedor from '../db/models/Fornecedor.entity';
import Venda from '../db/models/Venda.entity';
import Cliente from '../db/models/Cliente.entity';
import Conta from '../db/models/Conta.entity';
import User from '../db/models/User.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Produto,
      Categoria,
      Fornecedor,
      Venda,
      Cliente,
      User,
      Conta
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {

}

//modulo que exporta os repositorios
export default RepoModule;