import { Model } from 'src/components/BuilderComponents/interfaces';
import {
  ITemplateMenuItem,
  TemplateMenuItem,
} from 'src/components/BuilderComponents/TemplateMenuItem';

export interface IConfigMenu {
  items: Model<ITemplateMenuItem>[];
}

export class ConfigMenu implements Model<IConfigMenu> {
  public id: string;
  public items: Model<ITemplateMenuItem>[];

  constructor({ id, items }: Model<IConfigMenu>) {
    this.id = id;
    this.items = TemplateMenuItem.mapTemplateMenuItems(items);
  }

  static mapConfigIcons(configs: Model<IConfigMenu>[]): Model<IConfigMenu>[] {
    return configs.map((config: Model<IConfigMenu>) => new ConfigMenu(config));
  }
}
