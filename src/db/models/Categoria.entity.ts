import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Produto from './Produto.entity';

@ObjectType()
@Entity({ name: 'categorias' })
export default class Categoria {
  
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associação
  @OneToMany(
    () => Produto,
    produto => produto.categoriaConnection,
  )
  produtoConnection: Promise<Produto[]>;
}