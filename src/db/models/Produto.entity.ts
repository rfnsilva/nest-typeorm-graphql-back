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

@Entity({ name: 'produtos' })
export default class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  valor: number;

  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associação
  @ManyToOne(
    () => Categoria,
    categoria => categoria.produtoConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'categoria_id' })
  categoriaConnection: Promise<Categoria>;
}