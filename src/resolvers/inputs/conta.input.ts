import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class ContaInput {
  @Field()
  readonly valor: number;

  @Field()
  readonly fornecedorId: number;

}

@InputType()
export class ContaDeleteInput {
  @Field()
  readonly id: number;

}

@InputType()
export class ContaUpdateInput {
  @Field()
  readonly id: number;
  
  @Field()
  readonly valor: number;

  @Field()
  readonly fornecedorId: number;

}
