import { Module } from "@nestjs/common";
import { FeedbackModule } from "src/modules/feedback/feedback.module";
import { FeedbackSeederService } from "./feedbacks.services";

@Module({
    imports: [FeedbackModule],
    providers: [FeedbackSeederService],
    exports: [FeedbackSeederService],
  })
  export class FeedbackSeederModule {}