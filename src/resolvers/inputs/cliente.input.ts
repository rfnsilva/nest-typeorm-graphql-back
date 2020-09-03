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

@InputType()
export class ClienteDeleteInput {
  @Field()
  readonly id: number;

}

@InputType()
export class ClienteUpdateInput {
  @Field()
  readonly id: number;

  @Field()
  readonly nome: string;

  @Field()
  readonly email: string;

  @Field()
  readonly senha: string;

}
