import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class VendaInput {

  @Field()
  readonly nome_produto: string;

  @Field()
  readonly valor_produto: number;

}
