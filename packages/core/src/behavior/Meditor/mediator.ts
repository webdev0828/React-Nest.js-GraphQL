interface IMediator {
  notify(sender, event);
}

export class ComponentMediator implements IMediator {
  notify(sender, event) {
    console.log('notify');
    console.log(sender, event);
  }
}
