import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Fornecedor from '../db/models/Fornecedor.entity';
import FornecedorInput, { DeleteInput, UpdateInput } from './inputs/fornecedor.input';

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

    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});

  }

  //atualiza um fornecedor
  @Mutation(() => [Fornecedor])
  public async updateFornecedor(
    @Args('data') input: UpdateInput,
  ): Promise<Fornecedor[]> {
    await this.repoService.fornecedorRepo.update(input.id, {...input});

    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});

  }

  //deleta um fornecedor pelo id
  @Mutation(() => [Fornecedor])
  public async deleteFornecedor(
    @Args('data') input: DeleteInput,
  ): Promise<Fornecedor[]> {
    const fornecedor = await this.repoService.fornecedorRepo.findOne(input.id);
    
    await this.repoService.fornecedorRepo.remove(fornecedor);

    return this.repoService.fornecedorRepo.find({order: {id: 'ASC'}});

  }
}