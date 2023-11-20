import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerInput } from './dto/answer.dto';
import { Survey } from 'src/apis/survey/entities/survey.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async findOne(id: number): Promise<Answer> {
    return this.answerRepository.findOne({ where: { id } });
  }

  async create(answerInput: AnswerInput, id: number): Promise<Answer> {
    const { userId, answerNumbers, scoreSum } = answerInput;
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    const answer = this.answerRepository.create({
      userId,
      answerNumbers,
      scoreSum,
      survey,
    });

    return this.answerRepository.save(answer);
  }

  async update(id: number, answerInput: AnswerInput): Promise<Answer> {
    const { userId, answerNumbers, scoreSum } = answerInput;
    const answer = await this.answerRepository.findOne({ where: { id } });

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    answer.userId = userId;
    answer.answerNumbers = answerNumbers;
    answer.scoreSum = scoreSum;

    return this.answerRepository.save(answer);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.answerRepository.delete(id);
    return result.affected > 0;
  }
}
