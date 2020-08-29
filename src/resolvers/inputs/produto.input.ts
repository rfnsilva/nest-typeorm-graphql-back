import { Field, InputType } from '@nestjs/graphql';
import CategoriaInput from './categoria.input';

@InputType()
export default class ProdutoInput {
  @Field()
  readonly nome: string;

  @Field()
  readonly descricao: string;

  @Field()
  readonly valor: number;

  @Field()
  readonly categoriaId: number;
}


/*
  @InputType()
  export class DeleteProdutoInput {
    @Field()
    readonly id: number;

    @Field()
    readonly userId: number;
  }
*/