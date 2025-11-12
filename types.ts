
export interface Letter {
  id: number;
  title: string;
  content: string;
  author: string;
  specialNote?: {
    type: string;
    text: string;
  };
}
