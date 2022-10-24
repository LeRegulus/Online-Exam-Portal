export interface Quiz{

  qid : number,
  title : string,
  description : string,
  maxMarks : number,
  numberOfQuestions : number,
  active : boolean,
  category : {
    cid: number
    title : string,
    description : string,
  },

}
