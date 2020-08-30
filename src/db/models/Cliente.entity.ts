import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import Produto from './Produto.entity';

@ObjectType()
@Entity({ name: 'cliente' })
export default class Cliente {
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
  
  //associação

  @ManyToMany(() => Produto, { lazy: true })
  @JoinTable({
      name: 'cliente_produtos_produto',
      joinColumn: {
          name: 'cliente_id',
          referencedColumnName: 'id'
      },
      inverseJoinColumn: {
          name: 'produto_id',
          referencedColumnName: 'id'
      }
  })
  @Field(() => [Produto])
  produtos: Promise<Produto[]>;
  
}