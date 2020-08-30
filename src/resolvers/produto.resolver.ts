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
import ProdutoInput from './inputs/produto.input';
import Categoria from '../db/models/Categoria.entity';
import Fornecedor from '../db/models/Fornecedor.entity';
import { context } from 'src/db/loaders';

//export const pubSub = new PubSub();

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
  @Mutation(() => Produto)
  public async createProduto(
    @Args('data') input: ProdutoInput,
  ): Promise<Produto> {
    const produto = this.repoService.produtoRepo.create({
      nome: input.nome,
      descricao: input.descricao,
      valor: input.valor,
      categoriaId: input.categoriaId,
      fornecedorId: input.fornecedorId
    });

    const response = await this.repoService.produtoRepo.save(produto);

    //pubSub.publish('produtoAdded', { produtoAdded: produto });

    return response;
  }
/*
  @Mutation(() => Message)
  public async deleteMessage(
    @Args('data') input: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne(input.id);

    if (!message || message.userId !== input.userId)
      throw new Error(
        'Message does not exists or you are not the message author',
      );

    const copy = { ...message };

    await this.repoService.messageRepo.remove(message);

    return copy;
  }
*/

  /*comunicação em real time
  @Subscription(() => Produto)
  produtoAdded() {
    return pubSub.asyncIterator('produtoAdded');
  }*/
  
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
}