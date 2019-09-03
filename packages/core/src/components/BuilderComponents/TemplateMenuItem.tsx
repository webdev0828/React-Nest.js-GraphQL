import { Model } from 'src/components/BuilderComponents/interfaces';
import { IElement } from 'src/components/Element/Element';

export interface ITemplateMenuItem {
  title: string;
  items: Model<ITemplateMenuItem>[];
  children: Model<IElement>;
}

export class TemplateMenuItem implements Model<ITemplateMenuItem> {
  public id: string;
  public title: string;
  public items: Model<ITemplateMenuItem>[];
  public children: Model<IElement>;

  constructor({ id, title, items, children }: Model<ITemplateMenuItem>) {
    this.id = id;
    this.title = title;
    this.items = TemplateMenuItem.mapTemplateMenuItems(items);
    this.children = children;
  }

  static mapTemplateMenuItems(
    items: Model<ITemplateMenuItem>[],
  ): Model<ITemplateMenuItem>[] {
    return items.map(
      (item: Model<ITemplateMenuItem>) => new TemplateMenuItem(item),
    );
  }
}
