interface ICRUDVisitor {
  create();

  update();

  delete();
}

interface IForm {
  createForm();

  updateForm();

  deleteForm();
}

class App {}

class User {
  accept(visitor: ICRUDVisitor) {
    visitor.create(visitor);
  }
}

abstract class ModelAbstractFactory {
  static createApp(): App {
    return new App();
  }

  static createUser(): User {
    return new User();
  }
}
