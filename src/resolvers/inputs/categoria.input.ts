import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CategoriaInput {
  @Field()
  readonly nome: string;

  @Field()
  readonly fornecedorId: number;
}

@InputType()
export class CategoriaDeleteInput {
  @Field()
  readonly id: number;

}

@InputType()
export class CategoriaUpdateInput {
  @Field()
  readonly id: number;
  
  @Field()
  readonly nome: string;

  @Field()
  readonly fornecedorId: number;

}

