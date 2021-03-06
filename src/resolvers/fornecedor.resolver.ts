import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Fornecedor from '../db/models/Fornecedor.entity';
import FornecedorInput, { FornecedorDeleteInput, FornecedorUpdateInput } from './inputs/fornecedor.input';
import { PubSub } from 'graphql-subscriptions';

//REAL TIME
export const pubSub = new PubSub();

@Resolver(() => Fornecedor)
export default class FornecedorResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os fornecedores
  @Query(() => [Fornecedor])
  public async getFornecedores(): Promise<Fornecedor[]> {
    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});
  }

  //retorna um fornecedor
  @Query(() => Fornecedor, { nullable: true })
  public async getFornecedor(@Args('id') id: number): Promise<Fornecedor> {
    return this.repoService.fornecedorRepo.findOne(id);
  }

  //adiciona um fornecedor
  @Mutation(() => [Fornecedor])
  public async createFornecedor(
    @Args('data') input: FornecedorInput,
  ): Promise<Fornecedor[]> {
    let fornecedor = this.repoService.fornecedorRepo.create({
      nome: input.nome,
      cnpj: input.cnpj,
      endereco: input.endereco,
      telefone: input.telefone
    })

    await this.repoService.fornecedorRepo.save(fornecedor);

    //cria conta referente ao fornecedor q esta sendo criado
    let conta = this.repoService.contaRepo.create({
      valor: 0,
      fornecedorId: fornecedor.id
    })

    await this.repoService.contaRepo.save(conta);

    pubSub.publish('fornecedorAdded', { fornecedorAdded: fornecedor });

    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});

  }

  //atualiza um fornecedor
  @Mutation(() => [Fornecedor])
  public async updateFornecedor(
    @Args('data') input: FornecedorUpdateInput,
  ): Promise<Fornecedor[]> {
    await this.repoService.fornecedorRepo.update(input.id, {...input});

    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});

  }

  //deleta um fornecedor pelo id
  @Mutation(() => [Fornecedor])
  public async deleteFornecedor(
    @Args('data') input: FornecedorDeleteInput,
  ): Promise<Fornecedor[]> {
    const result = await this.repoService.fornecedorRepo.delete(input.id);

    const fornecedor = await this.repoService.fornecedorRepo.find();

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    pubSub.publish('fornecedorDeleteAdded', { fornecedorDeleteAdded: fornecedor });

    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});
  }

  //SUBSCRIPTIONS

  //adicionar
  @Subscription(() => Fornecedor)
  fornecedorAdded() {
    console.log('web_socket connection sucess !')
    return pubSub.asyncIterator('fornecedorAdded');
  }
  //deletar
  @Subscription(() => [Fornecedor])
  fornecedorDeleteAdded() {
    return pubSub.asyncIterator('fornecedorDeleteAdded');
  }
}