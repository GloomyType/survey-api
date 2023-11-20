import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Choice } from 'src/apis/choice/entities/choice.entity';

@ObjectType()
@Entity()
@Unique(['id'])
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  content: string;

  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];
}
