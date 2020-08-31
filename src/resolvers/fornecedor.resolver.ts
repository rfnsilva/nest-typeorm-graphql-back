import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Fornecedor from '../db/models/Fornecedor.entity';
import FornecedorInput, { DeleteInput } from './inputs/fornecedor.input';

@Resolver(() => Fornecedor)
export default class FornecedorResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os fornecedores
  @Query(() => [Fornecedor])
  public async getFornecedores(): Promise<Fornecedor[]> {
    return this.repoService.fornecedorRepo.find();
  }

  //retorna um fornecedor
  @Query(() => Fornecedor, { nullable: true })
  public async getFornecedor(@Args('id') id: number): Promise<Fornecedor> {
    return this.repoService.fornecedorRepo.findOne(id);
  }

  //adiciona um fornecedor
  @Mutation(() => Fornecedor)
  public async createFornecedor(
    @Args('data') input: FornecedorInput,
  ): Promise<Fornecedor> {
    let fornecedor = this.repoService.fornecedorRepo.create({
      nome: input.nome,
      cnpj: input.cnpj,
      endereco: input.endereco,
      telefone: input.telefone
    })

    return await this.repoService.fornecedorRepo.save(fornecedor);
  }

  //deleta um fornecedor pelo id
  @Mutation(() => [Fornecedor])
  public async deleteFornecedor(
    @Args('data') input: DeleteInput,
  ): Promise<Fornecedor[]> {
    const fornecedor = await this.repoService.fornecedorRepo.findOne(input.id);

    await this.repoService.fornecedorRepo.remove(fornecedor);

    return this.repoService.fornecedorRepo.find();;
  }
}