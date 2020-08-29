import { Controller, Get } from '@nestjs/common';
import RepoService from './repositorios/repo.service';

@Controller()
export class AppController {
  constructor(private readonly repoService: RepoService) {}

  //teste get count categorias
  @Get()
  async getHello(): Promise<string> {
    return `qtd categorias: ${await this.repoService.categoriaRepo.count()}`;
  }
}
