import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from 'src/apis/answer/entities/answer.entity';

@ObjectType()
@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column('simple-array', { nullable: true })
  @Field(() => [Int], { nullable: true })
  questionNumbers: number[];

  @OneToMany(() => Answer, (answer) => answer.survey)
  answers: Answer[];
}
