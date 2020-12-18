class AppError {
  public readonly massege: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.massege = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
