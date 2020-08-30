import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  senha: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}