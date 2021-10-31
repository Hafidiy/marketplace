import { Injectable } from "@nestjs/common";
import { FeedbackService } from "src/modules/feedback/feedback.service";
import { IFeedback } from "src/modules/feedback/models/feedback.interface";
import { initialFeedbacks } from "src/seeder/data/feedbacks";

@Injectable()
export class FeedbackSeederService {
  constructor(private feedbackService: FeedbackService) {}

  async create(): Promise<IFeedback[]> {
    const feedbacks: IFeedback[] = [];

    for (let i = 0; i < initialFeedbacks.length; i++) {
      // console.log('name: ', initialFeedbacks[i].name);
      try {
        const { feedback } = await this.feedbackService.createFeedback(
          initialFeedbacks[i],
        );

        // console.log('feedback: ', feedback);
        feedbacks.push(feedback);
      } catch (err) {
        console.log('Error feedback service', err);
        Promise.reject(err);
      }
    }

    // console.log('feedbacks: ', feedbacks);
    return feedbacks;
  }
}
