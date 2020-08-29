import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Categoria from './Categoria.entity';

@ObjectType()
@Entity({ name: 'produtos' })
export default class Produto {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  descricao: string;

  @Field()
  @Column()
  valor: number;

  @Field()
  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Categoria)
  categoria: Categoria;

  // Associação
  @ManyToOne(
    () => Categoria,
    categoria => categoria.produtoConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'categoria_id' })
  categoriaConnection: Promise<Categoria>;
}