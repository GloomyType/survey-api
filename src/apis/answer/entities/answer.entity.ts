import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Survey } from 'src/apis/survey/entities/survey.entity';

@ObjectType()
@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column('simple-array', { nullable: true })
  @Field(() => [Int], { nullable: true })
  answerNumbers: number[];

  @Column()
  @Field(() => Int)
  scoreSum: number;

  @ManyToOne(() => Survey, (survey) => survey.answers)
  survey: Survey;
}
