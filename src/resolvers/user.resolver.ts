import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../repositorios/repo.service';
import User from '../db/models/User.entity';
import UserInput from './inputs/user.input';

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  //retorna todos os usuarios
  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  //retorna um usuario
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  //adiciona um usuario
  @Mutation(() => User)
  public async createUser(
    @Args('data') input: UserInput,
  ): Promise<User> {
    let user = this.repoService.userRepo.create({
      nome: input.nome,
      email: input.email,
      senha: input.senha
    })

    return await this.repoService.userRepo.save(user);
  }
}