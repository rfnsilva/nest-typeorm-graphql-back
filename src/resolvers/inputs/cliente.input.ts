import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class ClienteInput {
  @Field()
  readonly nome: string;

  @Field()
  readonly email: string;

  @Field()
  readonly senha: string;

}
