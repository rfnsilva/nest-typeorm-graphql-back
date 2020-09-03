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
import Produto from '../db/models/Produto.entity';
import ProdutoInput, { ProdutoDeleteInput, ProdutoUpdateInput } from './inputs/produto.input';
import Categoria from '../db/models/Categoria.entity';
import Fornecedor from '../db/models/Fornecedor.entity';
import { context } from 'src/db/loaders';

//REAL TIME
export const pubSub = new PubSub();

@Resolver(() => Produto)
export default class ProdutoResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os produtos
  @Query(() => [Produto])
  public async getProdutos(): Promise<Produto[]> {
    return this.repoService.produtoRepo.find();
  }

  //retorna todos os produtos de acordo com a categoria
  @Query(() => [Produto])
  public async getProdutosCategoria(
    @Args('categoriaId') categoriaId: number,
  ): Promise<Produto[]> {
    return this.repoService.produtoRepo.find({
      where: { categoriaId },
    });
  }

  //retorna um produto
  @Query(() => Produto, { nullable: true })
  public async getProduto(@Args('id') id: number): Promise<Produto> {
    return this.repoService.produtoRepo.findOne(id);
  }

  //adiciona um produto
  @Mutation(() => [Produto])
  public async createProduto(
    @Args('data') input: ProdutoInput,
  ): Promise<Produto[]> {
    let produto = this.repoService.produtoRepo.create({
      nome: input.nome,
      descricao: input.descricao,
      valor: input.valor,
      categoriaId: input.categoriaId,
      fornecedorId: input.fornecedorId,
    })

    await this.repoService.produtoRepo.save(produto);

    pubSub.publish('produtoAdded', { produtoAdded: produto });

    return this.repoService.produtoRepo.find({order: {id: 'ASC'}});

  }

  //deleta um produto pelo id
  @Mutation(() => [Produto])
  public async deleteProduto(
    @Args('data') input: ProdutoDeleteInput,
  ): Promise<Produto[]> {
    const result = await this.repoService.produtoRepo.delete(input.id);

    const produto = await this.repoService.produtoRepo.find();

    if (result.affected === 0) {
      console.log('erro ao deletar')
      throw new Error('erro ao deletar')
    }

    pubSub.publish('produtoDeleteAdded', { produtoDeleteAdded: produto });

    return this.repoService.produtoRepo.find({order: {id: 'ASC'}});
  }

  //atualiza um produto
  @Mutation(() => [Produto])
  public async updateProduto(
    @Args('data') input: ProdutoUpdateInput,
  ): Promise<Produto[]> {
    await this.repoService.produtoRepo.update(input.id, {...input});

    return this.repoService.produtoRepo.find({order: {id: 'ASC'}});

  }
  
  @ResolveField(() => Categoria, { name: 'categoria' })
  public async getCategoria(
    @Parent() parent: Produto,
    @Context() { categoriaLoader }: typeof context,
  ): Promise<Categoria> {
    return categoriaLoader.load(parent.categoriaId); // DataLoader
  }
  
  @ResolveField(() => Fornecedor, { name: 'fornecedor' })
  public async getFornecedor(
    @Parent() parent: Produto,
    @Context() { FornecedorLoader }: typeof context,
  ): Promise<Fornecedor> {
    return FornecedorLoader.load(parent.fornecedorId); // DataLoader
  }

  //SUBSCRIPTIONS

  //adicionar
  @Subscription(() => Produto)
  produtoAdded() {
    return pubSub.asyncIterator('produtoAdded');
  }
  //deletar
  @Subscription(() => [Produto])
  produtoDeleteAdded() {
    return pubSub.asyncIterator('produtoDeleteAdded');
  }
}