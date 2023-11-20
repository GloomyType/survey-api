import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/apis/question/entities/question.entity';

@ObjectType()
@Entity()
@Unique(['id'])
export class Choice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  questionId: number;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int)
  score: number;

  @Column({ default: 0 })
  @Field(() => Int)
  order: number;

  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;
}
