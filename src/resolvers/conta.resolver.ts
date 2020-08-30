import {
  Args,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import RepoService from '../repositorios/repo.service';
import ContaInput from './inputs/conta.input';
import Conta from '../db/models/Conta.entity';
import Fornecedor from '../db/models/Fornecedor.entity';
import { context } from 'src/db/loaders';

//export const pubSub = new PubSub();

@Resolver(() => Conta)
export default class ContaResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todas as contas
  @Query(() => [Conta])
  public async getContas(): Promise<Conta[]> {
    return this.repoService.contaRepo.find();
  }

  //retorna todas as contas de acordo com o fornecedor
  @Query(() => [Conta])
  public async getContaFornecedor(
    @Args('fornecedorId') fornecedorId: number,
  ): Promise<Conta[]> {
    return this.repoService.contaRepo.find({
      where: { fornecedorId },
    });
  }

  //retorna uma conta
  @Query(() => Conta, { nullable: true })
  public async getConta(@Args('id') id: number): Promise<Conta> {
    return this.repoService.contaRepo.findOne(id);
  }

  //adiciona uma conta
  @Mutation(() => Conta)
  public async createConta(
    @Args('data') input: ContaInput,
  ): Promise<Conta> {
    const conta = this.repoService.contaRepo.create({
      valor: input.valor,
      fornecedorId: input.fornecedorId
    });

    const response = await this.repoService.contaRepo.save(conta);

    return response;
  }
  
  @ResolveField(() => Fornecedor, { name: 'fornecedor' })
  public async getFornecedor(
    @Parent() parent: Conta,
    @Context() { FornecedorLoader }: typeof context,
  ): Promise<Fornecedor> {
    return FornecedorLoader.load(parent.fornecedorId); // DataLoader
  }
}