import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Produto from '../db/models/Produto.entity';
import Categoria from '../db/models/Categoria.entity';

@Injectable()
class RepoService {
  public constructor(

    //serviço que injeta os repositorios no codigo
    @InjectRepository(Produto) public readonly produtoRepo: Repository<Produto>,
    @InjectRepository(Categoria) public readonly categoriaRepo: Repository<Categoria>,
  ){}
}

export default RepoService;