export interface Question{
  questId: number,
  content: string,
  image: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer: string,
  quiz: {
    title: string,
    description: string,
    maxMarks: number,
    numberOfQuestions: number,
    active: boolean,
    category: {
      cid: number,
      title : string,
      description : string,
    },
    qid: number
  }
}
