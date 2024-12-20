interface IResult {
  message?: string;
  data?: [] | object;
}

export interface IResponse {
  status: number;
  result: IResult;
}
