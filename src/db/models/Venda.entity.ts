import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'venda' })
export default class Venda {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome_produto: string;

  @Field()
  @Column()
  valor_produto: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}