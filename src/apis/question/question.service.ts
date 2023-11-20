import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestion(content: string): Promise<Question> {
    const question = this.questionRepository.create({ content });
    return await this.questionRepository.save(question);
  }

  async getAllQuestions(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async getQuestionById(id: number): Promise<Question> {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async updateQuestion(id: number, content: string): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id } });
    question.content = content;
    return await this.questionRepository.save(question);
  }

  async deleteQuestion(id: number): Promise<boolean> {
    const result = await this.questionRepository.delete(id);
    return result.affected > 0;
  }
}
