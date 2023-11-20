import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choice } from './entities/choice.entity';
import { ChoiceInput } from './dto/choice.dto';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
  ) {}

  async createChoice(questionId: number, input: ChoiceInput): Promise<Choice> {
    const { contents, score } = input;
    const order = await this.calculateNextOrder(questionId);

    const choice = this.choiceRepository.create({
      question: { id: questionId },
      contents,
      score,
      order,
    });
    return await this.choiceRepository.save(choice);
  }

  private async calculateNextOrder(questionId: number): Promise<number> {
    const lastChoice = await this.choiceRepository.findOne({
      where: { question: { id: questionId } },
      order: { order: 'DESC' },
    });

    return lastChoice ? lastChoice.order + 1 : 0;
  }

  async getAllChoicesByQuestionId(questionId: number): Promise<Choice[]> {
    return await this.choiceRepository.find({
      where: { question: { id: questionId } },
      order: { order: 'ASC' },
    });
  }

  async getChoiceById(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOne({ where: { id } });

    if (!choice) {
      throw new NotFoundException('Choice not found');
    }

    return choice;
  }

  async updateChoice(id: number, choiceInput: ChoiceInput): Promise<Choice> {
    const { contents, score } = choiceInput;
    const choice = await this.choiceRepository.findOne({ where: { id } });

    if (!choice) {
      throw new NotFoundException('Choice not found');
    }

    choice.contents = contents;
    choice.score = score;

    return await this.choiceRepository.save(choice);
  }

  async deleteChoice(id: number): Promise<boolean> {
    const result = await this.choiceRepository.delete(id);
    return result.affected > 0;
  }
}
