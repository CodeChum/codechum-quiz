export const ITEM_TYPES = {
  multiple_choice: 'multiple_choice',
  multiple_answer: 'multiple_answer',
};

export type ItemType = keyof typeof ITEM_TYPES;

export type Option = {
  id: string;
  text: string;
};

export type Item = {
  id: string;
  question: string;
  type: string;
  options: Array<Option>;
};

export type ItemWithAnswer = {
  id: string;
  question: string;
  type: string;
  options: Array<Option>;
  answer: string[];
};
