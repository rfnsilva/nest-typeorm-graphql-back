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
import ContaInput, {ContaDeleteInput, ContaUpdateInput} from './inputs/conta.input';
import Conta from '../db/models/Conta.entity';

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
  @Mutation(() => [Conta])
  public async createConta(
    @Args('data') input: ContaInput,
  ): Promise<Conta[]> {
    let conta = this.repoService.contaRepo.create({
      valor: input.valor,
      fornecedorId: input.fornecedorId
    })

    await this.repoService.contaRepo.save(conta);

    return this.repoService.contaRepo.find({order: {id: 'ASC'}});

  }

  //atualiza uma conta
  @Mutation(() => [Conta])
  public async updateConta(
    @Args('data') input: ContaUpdateInput,
  ): Promise<Conta[]> {
    await this.repoService.contaRepo.update(input.id, {...input});

    return this.repoService.contaRepo.find({order: {id: 'ASC'}});

  }

  //deleta uma conta pelo id
  @Mutation(() => [Conta])
  public async deleteConta(
    @Args('data') input: ContaDeleteInput,
  ): Promise<Conta[]> {
    const conta = await this.repoService.contaRepo.findOne(input.id);
    
    await this.repoService.contaRepo.remove(conta);

    return this.repoService.contaRepo.find({order: {id: 'ASC'}});

  }
}