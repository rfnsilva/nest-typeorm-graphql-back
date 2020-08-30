import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne
} from 'typeorm';
import Fornecedor from './Fornecedor.entity';

@ObjectType()
@Entity({ name: 'conta' })
export default class Conta {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  valor: number;

  @Field()
  @Column({ name: 'fornecedor_id', unique: true })
  fornecedorId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Fornecedor)
  fornecedor: Fornecedor;

  // Associação

  @OneToOne(() => Fornecedor, { primary: true })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedorConnection: Promise<Fornecedor>;

}