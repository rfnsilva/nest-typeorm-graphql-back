import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Venda from '../db/models/Venda.entity';
import VendaInput from './inputs/venda.input';

@Resolver(() => Venda)
export default class VendaResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todas as vendas
  @Query(() => [Venda])
  public async getVendas(): Promise<Venda[]> {
    return this.repoService.vendaRepo.find();
  }

  //retorna uma venda
  @Query(() => Venda, { nullable: true })
  public async getVenda(@Args('id') id: number): Promise<Venda> {
    return this.repoService.vendaRepo.findOne(id);
  }

  //adiciona uma venda
  @Mutation(() => Venda)
  public async createVenda(
    @Args('data') input: VendaInput,
  ): Promise<Venda> {
    let venda = this.repoService.vendaRepo.create({
      nome_produto: input.nome_produto,
      valor_produto: input.valor_produto
    })

    return await this.repoService.vendaRepo.save(venda);
  }
}