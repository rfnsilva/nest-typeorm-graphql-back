import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import Categoria from '../db/models/Categoria.entity';
import Fornecedor from '../db/models/Fornecedor.entity';
import CategoriaInput, { CategoriaUpdateInput, CategoriaDeleteInput} from './inputs/categoria.input';
import { context } from 'src/db/loaders';
import { PubSub } from 'graphql-subscriptions';

//REAL TIME
export const pubSub = new PubSub();

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

  //retorna todas as categorias de acordo com a fornecedor
  @Query(() => [Categoria])
  public async getCategoriasFornecedor(
    @Args('fornecedorId') fornecedorId: number,
  ): Promise<Categoria[]> {
    return this.repoService.categoriaRepo.find({
      where: { fornecedorId },
    });
  }

  //adiciona uma categoria
  @Mutation(() => [Categoria])
  public async createCategoria(
    @Args('data') input: CategoriaInput,
  ): Promise<Categoria[]> {
    let categoria = this.repoService.categoriaRepo.create({
      nome: input.nome,
      fornecedorId: input.fornecedorId
    })

    await this.repoService.categoriaRepo.save(categoria);

    pubSub.publish('categoriaAdded', { categoriaAdded: categoria });

    return this.repoService.categoriaRepo.find({order: {id: 'ASC'}});

  }

  //atualiza uma categoria
  @Mutation(() => [Categoria])
  public async updateCategoria(
    @Args('data') input: CategoriaUpdateInput,
  ): Promise<Categoria[]> {
    await this.repoService.categoriaRepo.update(input.id, {...input});

    return this.repoService.categoriaRepo.find({order: {id: 'ASC'}});

  }

  //deleta uma categoria pelo id
  @Mutation(() => [Categoria])
  public async deleteCategoria(
    @Args('data') input: CategoriaDeleteInput,
  ): Promise<Categoria[]> {

    const categoria = await this.repoService.categoriaRepo.findOne(input.id);

    const result = await this.repoService.categoriaRepo.delete(input.id);

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    pubSub.publish('categoriaAdded', { categoriaAdded: categoria });

    return this.repoService.categoriaRepo.find({order: {id: 'ASC'}});

  }
  
  @ResolveField(() => Fornecedor, { name: 'fornecedor' })
  public async getFornecedor(
    @Parent() parent: Categoria,
    @Context() { FornecedorLoader }: typeof context,
  ): Promise<Fornecedor> {
    return FornecedorLoader.load(parent.fornecedorId); // DataLoader
  }

  //SUBSCRIPTIONS
  @Subscription(() => Categoria)
  categoriaAdded() {
    return pubSub.asyncIterator('categoriaAdded');
  }
}