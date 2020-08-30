import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserInput {
  @Field()
  readonly nome: string;

  @Field()
  readonly email: string;

  @Field()
  readonly senha: string;

}
