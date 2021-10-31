import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IFeedback {
    id: number;
    name: string;
}

export interface IFeedbackPaginated extends IPaginated {
    feedbacks: IFeedback[];
}