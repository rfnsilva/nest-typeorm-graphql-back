import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Categoria from '../db/models/Categoria.entity';
import CategoriaInput from './inputs/categoria.input';

@Resolver(() => Categoria)
export default class CategoriaResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todas as categorias
  @Query(() => [Categoria])
  public async getCategorias(): Promise<Categoria[]> {
    return this.repoService.categoriaRepo.find();
  }

  //retorna uma categoria
  @Query(() => Categoria, { nullable: true })
  public async getCategoria(@Args('id') id: number): Promise<Categoria> {
    return this.repoService.categoriaRepo.findOne(id);
  }

  //adiciona uma categoria
  @Mutation(() => Categoria)
  public async createCategoria(
    @Args('data') input: CategoriaInput,
  ): Promise<Categoria> {
    let categoria = this.repoService.categoriaRepo.create({
      nome: input.nome.toLocaleLowerCase().trim(),
    })

    return await this.repoService.categoriaRepo.save(categoria);
  }
}