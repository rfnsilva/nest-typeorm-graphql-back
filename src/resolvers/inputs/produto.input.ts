import { Field, InputType } from '@nestjs/graphql';

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

  @Field()
  readonly fornecedorId: number;
}
