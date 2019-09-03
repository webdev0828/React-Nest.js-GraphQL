abstract class Command {
  public abstract execute();

  public abstract undo();
}

export default class CreateCommand extends Command {
  constructor() {
    super();
  }

  public execute() {
    console.log('execute create');
  }

  public undo() {
    console.log('undo create');
  }
}
