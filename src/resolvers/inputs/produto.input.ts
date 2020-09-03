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

  @Field()
  readonly estoque: number;
  
  @Field()
  readonly checked: boolean;
}

@InputType()
export class ProdutoDeleteInput {
  @Field()
  readonly id: number;

}

@InputType()
export class ProdutoUpdateInput {
  @Field()
  readonly id: number;
  
  @Field()
  readonly nome: string;

  @Field()
  readonly cnpj: string;

  @Field()
  readonly endereco: string;

  @Field()
  readonly telefone: string;

  @Field()
  readonly estoque: number;
  
  @Field()
  readonly checked: boolean;

}

