import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class FornecedorInput {
  @Field()
  readonly nome: string;

  @Field()
  readonly cnpj: string;

  @Field()
  readonly endereco: string;

  @Field()
  readonly telefone: string;

}

@InputType()
export class DeleteInput {
  @Field()
  readonly id: number;

}
