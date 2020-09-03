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
import Fornecedor from './Fornecedor.entity';

@ObjectType()
@Entity({ name: 'produto' })
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
  @Column()
  estoque: number;

  @Field()
  @Column()
  checked: boolean;

  @Field()
  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @Field()
  @Column({ name: 'fornecedor_id' })
  fornecedorId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Categoria)
  categoria: Categoria;

  @Field(() => Fornecedor)
  fornecedor: Fornecedor;

  // Associação

  @ManyToOne(
    () => Categoria,
    categoria => categoria.produtoConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'categoria_id' })
  categoriaConnection: Promise<Categoria>;

  @ManyToOne(
    () => Fornecedor,
    fornecedor => fornecedor.produtoConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedorConnection: Promise<Fornecedor>;
}