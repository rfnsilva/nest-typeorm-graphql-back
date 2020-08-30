import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Produto from '../db/models/Produto.entity';
import Categoria from '../db/models/Categoria.entity';
import Fornecedor from '../db/models/Fornecedor.entity';
import Venda from '../db/models/Venda.entity';
import Cliente from '../db/models/Cliente.entity';
import User from '../db/models/User.entity';
import Conta from '../db/models/Conta.entity';

@Injectable()
class RepoService {
  public constructor(

    //serviço que injeta os repositorios no codigo
    @InjectRepository(Produto) public readonly produtoRepo: Repository<Produto>,
    @InjectRepository(Categoria) public readonly categoriaRepo: Repository<Categoria>,
    @InjectRepository(Fornecedor) public readonly fornecedorRepo: Repository<Fornecedor>,
    @InjectRepository(Venda) public readonly vendaRepo: Repository<Venda>,
    @InjectRepository(Conta) public readonly contaRepo: Repository<Conta>,
    @InjectRepository(Cliente) public readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ){}
}

export default RepoService;