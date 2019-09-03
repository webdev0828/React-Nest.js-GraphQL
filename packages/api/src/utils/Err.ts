interface IErr {
  type?: string;
  name?: string;
  message?: string;
  code?: number;
}

export default class Err extends Error {
  public type = '';
  public name = '';
  public message = '';
  public code = 0;

  constructor(settings: IErr) {
    super();

    this.type = settings.type || 'Application';
    this.name = settings.name || 'AppError';
    this.code = settings.code || 0;
    this.message = settings.message || 'An error occurred.';

    Error.captureStackTrace(this, Err);
  }
}
