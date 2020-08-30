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
import Categoria from './Categoria.entity';

@ObjectType()
@Entity({ name: 'fornecedor' })
export default class Fornecedor {
  
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  cnpj: string;

  @Field()
  @Column()
  endereco: string;

  @Field()
  @Column()
  telefone: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associação
  
  @OneToMany(
    () => Categoria,
    categoria => categoria.fornecedorConnection,
  )
  categoriaConnection: Promise<Categoria[]>;

  @OneToMany(
    () => Produto,
    produto => produto.categoriaConnection,
  )
  produtoConnection: Promise<Produto[]>;
}