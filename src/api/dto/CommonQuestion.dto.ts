export interface CommonQuestionDto {
  id: string;
  order: number;
  question: string;
  answer: string;
}
export interface AddCommonQuestion {
  question: string;
  answer: string;
}
export interface ModifyCommonQuestion {
  id: string;
  question: string;
  answer: string;
  order: number;
}
export interface DeleteCommonQuestion {
  id: string;
}
