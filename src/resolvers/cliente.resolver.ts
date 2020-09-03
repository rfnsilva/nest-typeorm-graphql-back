import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Cliente from '../db/models/Cliente.entity';
import ClienteInput, {ClienteDeleteInput, ClienteUpdateInput} from './inputs/cliente.input';
import { PubSub } from 'graphql-subscriptions';

//REAL TIME
export const pubSub = new PubSub();

@Resolver(() => Cliente)
export default class ClienteResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os clientes
  @Query(() => [Cliente])
  public async getClientes(): Promise<Cliente[]> {
    return this.repoService.clienteRepo.find();
  }

  //retorna um cliente
  @Query(() => Cliente, { nullable: true })
  public async getCliente(@Args('id') id: number): Promise<Cliente> {
    return this.repoService.clienteRepo.findOne(id);
  }

  //adiciona um cliente
  @Mutation(() => [Cliente])
  public async createCliente(
    @Args('data') input: ClienteInput,
  ): Promise<Cliente[]> {
    let cliente = this.repoService.clienteRepo.create({
      nome: input.nome,
      email: input.email,
      senha: input.senha,

    })

    await this.repoService.clienteRepo.save(cliente);

    pubSub.publish('clienteAdded', { clienteAdded: cliente });

    return this.repoService.clienteRepo.find({order: {id: 'ASC'}});

  }

  //atualiza uma categoria
  @Mutation(() => [Cliente])
  public async updateCliente(
    @Args('data') input: ClienteUpdateInput,
  ): Promise<Cliente[]> {
    await this.repoService.clienteRepo.update(input.id, {...input});

    return this.repoService.clienteRepo.find({order: {id: 'ASC'}});

  }

  //deleta uma categoria pelo id
  @Mutation(() => [Cliente])
  public async deleteCategoria(
    @Args('data') input: ClienteDeleteInput,
  ): Promise<Cliente[]> {
    const result = await this.repoService.clienteRepo.delete(input.id);

    const cliente = await this.repoService.clienteRepo.find();

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    pubSub.publish('clienteDeleteAdded', { clienteDeleteAdded: cliente });

    return this.repoService.clienteRepo.find({order: {id: 'ASC'}});

  }

  //SUBSCRIPTIONS

  //adicionar
  @Subscription(() => Cliente)
  clienteAdded() {
    return pubSub.asyncIterator('clienteAdded');
  }
  //deletar
  @Subscription(() => [Cliente])
  clienteDeleteAdded() {
    return pubSub.asyncIterator('clienteDeleteAdded');
  }
}