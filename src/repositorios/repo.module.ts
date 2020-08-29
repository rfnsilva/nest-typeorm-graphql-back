import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import Produto from '../db/models/Produto.entity';
import Categoria from '../db/models/Categoria.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Produto,
      Categoria
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {

}
export default RepoModule;