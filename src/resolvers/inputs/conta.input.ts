import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class ContaInput {
  @Field()
  readonly valor: number;

  @Field()
  readonly fornecedorId: number;

}
