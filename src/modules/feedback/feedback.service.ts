import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryDto } from "../common/models/query.dto";
import { FeedbackDto } from "./models/feedback.dto";
import { Feedback } from "./models/feedback.entity";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async getFeedbacks(query?: QueryDto) {
    let { page, count } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    if(count && typeof count === 'string'){
      count = parseInt(count)
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [feedbacks, total] = await this.feedbackRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return { feedbacks, meta: {
      total,
      page,
      last_page: Math.ceil(total / count)
    } };
  }

  async createFeedback(
    data: FeedbackDto,
  ): Promise<{ feedback: Feedback }> {
    const { name } = data;

    try {
      const newFeedback = await this.feedbackRepository.save({ name });
      return { feedback: newFeedback };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Feedback already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getFeedback(condition): Promise<{ feedback: Feedback }> {
    const feedback = await this.feedbackRepository.findOne(condition);

    if(!feedback){
        throw new NotFoundException();
    }

    return { feedback };
  }

  async deleteFeedback(id: number): Promise<void> {
    const result = await this.feedbackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateFeedback(
    id: number,
    data: FeedbackDto,
  ): Promise<{ feedback: Feedback }> {
    const { name } = data;

    const { feedback } = await this.getFeedback({ id });

    try {
      const updatedFeedback = await this.feedbackRepository.save({
        ...feedback,
        name,
      });

      return { feedback: updatedFeedback };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Feedback already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
