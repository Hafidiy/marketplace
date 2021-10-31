import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { QueryDto } from "../common/models/query.dto";
import { FeedbackService } from "./feedback.service";
import { FeedbackDto } from "./models/feedback.dto";
import { IFeedback } from "./models/feedback.interface";

@Controller('api/feedbacks')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  getFeedbacks(
    @Query() queryDto: QueryDto
  ): Promise<{ feedbacks: IFeedback[] }> {
    return this.feedbackService.getFeedbacks(queryDto);
  }

  @Post()
  createFeedback(@Body() body: FeedbackDto): Promise<{ feedback: IFeedback }> {
    return this.feedbackService.createFeedback(body);
  }

  @Get('/:id')
  getFeedbackById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ feedback: IFeedback }> {
    return this.feedbackService.getFeedback({ id });
  }

  @Delete('/:id')
  deleteFeedback(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.feedbackService.deleteFeedback(id);
  }

  @Put('/:id')
  updateFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FeedbackDto,
  ): Promise<{ feedback: IFeedback }> {
    return this.feedbackService.updateFeedback(id, body);
  }
}
