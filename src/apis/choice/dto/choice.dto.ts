import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChoiceInput {
  @Field()
  contents: string;

  @Field(() => Int)
  score: number;
}
