import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class QuestionInput {
  @Field()
  content: string;
}
