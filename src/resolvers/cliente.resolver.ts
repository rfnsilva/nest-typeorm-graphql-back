import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Cliente from '../db/models/Cliente.entity';
import ClienteInput from './inputs/cliente.input';

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

    return this.repoService.clienteRepo.find({order: {id: 'ASC'}});

  }
}