import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CategoriaInput {
  @Field()
  readonly nome: string;
}