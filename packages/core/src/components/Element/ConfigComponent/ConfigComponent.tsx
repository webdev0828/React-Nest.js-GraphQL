import { INPUT_TYPES } from '@codelab/component';
import gql from 'graphql-tag';
import {
  ConfigButton,
  IConfigButton,
} from 'src/components/BuilderComponents/Config/ConfigButton';
import {
  ConfigForm,
  IConfigForm,
} from 'src/components/BuilderComponents/Config/ConfigForm';
import {
  ConfigHeading,
  IConfigHeading,
} from 'src/components/BuilderComponents/Config/ConfigHeading';
import {
  ConfigIcon,
  IConfigIcon,
} from 'src/components/BuilderComponents/Config/ConfigIcon';
import {
  ConfigImage,
  IConfigImage,
} from 'src/components/BuilderComponents/Config/ConfigImage';
import {
  ConfigLink,
  IConfigLink,
} from 'src/components/BuilderComponents/Config/ConfigLink';
import {
  ConfigMenu,
  IConfigMenu,
} from 'src/components/BuilderComponents/Config/ConfigMenu';
import {
  ConfigParagraph,
  IConfigParagraph,
} from 'src/components/BuilderComponents/Config/ConfigParagraph';
import {
  ConfigText,
  IConfigText,
} from 'src/components/BuilderComponents/Config/ConfigText';
import { Model } from 'src/components/BuilderComponents/interfaces';
import {
  ButtonSize,
  ButtonType,
  ComponentType,
  FormFieldType,
  HeadingType,
  IconType,
} from 'src/graphql/__generated__/graphql-api';

export interface IConfigComponent {
  type: ComponentType;
  form?: Model<IConfigForm>;
  button?: Model<IConfigButton>;
  menu?: Model<IConfigMenu>;
  icon?: Model<IConfigIcon>;
  heading?: Model<IConfigHeading>;
  paragraph?: Model<IConfigParagraph>;
  image?: Model<IConfigImage>;
  link?: Model<IConfigLink>;
  text?: Model<IConfigText>;
}

export class ConfigComponent implements Model<IConfigComponent> {
  public id: string;
  public type: ComponentType;
  form?: Model<IConfigForm>;
  button?: Model<IConfigButton>;
  menu?: Model<IConfigMenu>;
  icon?: Model<IConfigIcon>;
  heading?: Model<IConfigHeading>;
  paragraph?: Model<IConfigParagraph>;
  image?: Model<IConfigImage>;
  link?: Model<IConfigLink>;
  text?: Model<IConfigText>;

  static fragments = () => gql`
    fragment ConfigComponentFragment on ConfigComponent {
      id
      type
      form {
        ...ConfigFormFragment
      }
      button {
        ...ConfigButtonFragment
      }
      element {
        id
      }
      menu {
        id
      }
      icon {
        ...ConfigIconFragment
      }
      heading {
        ...ConfigHeadingFragment
      }
      paragraph {
        ...ConfigParagraphFragment
      }
      image {
        ...ConfigImageFragment
      }
      link {
        ...ConfigLinkFragment
      }
      text {
        ...ConfigTextFragment
      }
    }
    ${ConfigForm.fragments()}
    ${ConfigButton.fragments()}
    ${ConfigIcon.fragments()}
    ${ConfigHeading.fragments()}
    ${ConfigParagraph.fragments()}
    ${ConfigImage.fragments()}
    ${ConfigLink.fragments()}
    ${ConfigText.fragments()}
  `;

  constructor(config: Model<IConfigComponent>) {
    this.id = config.id;
    this.type = config.type;

    switch (this.type) {
      case ComponentType.Form:
        if (!config.form) return;
        this.form = new ConfigForm(config.form);
        break;
      case ComponentType.Button:
        if (!config.button) return;
        this.button = new ConfigButton(config.button);
        break;
      case ComponentType.Menu:
        if (!config.menu) return;
        this.menu = new ConfigMenu(config.menu);
        break;
      case ComponentType.Icon:
        if (!config.icon) return;
        this.icon = new ConfigIcon(config.icon);
        break;
      case ComponentType.Heading:
        if (!config.heading) return;
        this.heading = new ConfigHeading(config.heading);
        break;
      case ComponentType.Paragraph:
        if (!config.paragraph) return;
        this.paragraph = new ConfigParagraph(config.paragraph);
        break;
      case ComponentType.Image:
        if (!config.image) return;
        this.image = new ConfigImage(config.image);
        break;
      case ComponentType.Link:
        if (!config.link) return;
        this.link = new ConfigLink(config.link);
        break;
      case ComponentType.Text:
        if (!config.text) return;
        this.text = new ConfigText(config.text);
        break;
      default:
        break;
    }
  }

  static getCreateFormFields(type) {
    switch (type) {
      case ComponentType.Form:
        const formTypeOptions = Object.keys(FormFieldType).map(type => ({
          label: type,
          value: type,
        }));
        return [
          {
            inputType: INPUT_TYPES.Text,
            name: 'name',
            placeholder: 'Input Form Name',
            validation: [{ required: true, msg: 'Required!!' }],
          },
          {
            inputType: INPUT_TYPES.Select,
            fieldArray: {
              name: 'FormField',
            },
            name: 'type',
            options: formTypeOptions,
            placeholder: 'Select Form Field Type',
          },
          {
            inputType: INPUT_TYPES.Text,
            fieldArray: {
              name: 'FormField',
            },
            name: 'fieldname',
            placeholder: 'Input Form Field Name',
          },
          {
            inputType: INPUT_TYPES.Text,
            fieldArray: {
              name: 'FormField',
            },
            name: 'placeholder',
            placeholder: 'Input Form Field PlaceHolder',
          },
          {
            inputType: INPUT_TYPES.Text,
            fieldArray: {
              name: 'FormField',
            },
            name: 'label',
            placeholder: 'Input Form Field Label',
          },
          {
            inputType: INPUT_TYPES.Text,
            fieldArray: {
              name: 'FormField',
            },
            name: 'value',
            placeholder: 'Input Form Field Value',
          },
        ];
      case ComponentType.Button:
        const buttonTypeOptions = Object.keys(ButtonType).map(type => ({
          label: type,
          value: type,
        }));
        const sizeOptions = Object.keys(ButtonSize).map(size => ({
          label: size,
          value: size,
        }));
        return [
          {
            inputType: INPUT_TYPES.Select,
            name: 'type',
            options: buttonTypeOptions,
            placeholder: 'Select Button Type',
            validation: [{ required: true, msg: 'Required!!' }],
          },
          {
            inputType: INPUT_TYPES.Select,
            name: 'size',
            options: sizeOptions,
            placeholder: 'Select Button Size',
            validation: [{ required: true, msg: 'Required!!' }],
          },
          {
            inputType: INPUT_TYPES.Checkbox,
            name: 'ghost',
            defaultValue: true,
          },
          {
            inputType: INPUT_TYPES.Checkbox,
            name: 'block',
            defaultValue: true,
          },
        ];
      case ComponentType.Heading:
        const headingTypeOptions = Object.keys(HeadingType).map(type => ({
          label: type,
          value: type,
        }));
        return [
          {
            inputType: INPUT_TYPES.Select,
            name: 'type',
            options: headingTypeOptions,
            placeholder: 'Select Heading Type',
            validation: [{ required: true, msg: 'Required!!' }],
          },
          {
            inputType: INPUT_TYPES.Text,
            name: 'text',
            placeholder: 'Input Heading Text',
            validation: [{ required: true, msg: 'Required!!' }],
          },
        ];
      case ComponentType.Image:
        return [
          {
            inputType: INPUT_TYPES.Text,
            name: 'src',
            placeholder: 'Input Image Src',
            validation: [{ required: true, msg: 'Required!!' }],
          },
          {
            inputType: INPUT_TYPES.Checkbox,
            name: 'responsive',
            defaultValue: true,
          },
        ];
      case ComponentType.Menu:
        return [
          {
            inputType: INPUT_TYPES.Text,
            fieldArray: {
              name: 'CssPropertyValue',
            },
            name: 'text',
            type: 'string',
            label: 'CSS Property',
          },
          {
            inputType: INPUT_TYPES.Text,
            fieldArray: {
              name: 'CssPropertyValue',
            },
            name: 'items',
            type: 'string',
            label: 'CSS Value',
          },
        ];
      case ComponentType.Paragraph:
        return [
          {
            inputType: INPUT_TYPES.Text,
            name: 'text',
            placeholder: 'Input Paragraph Text',
            validation: [{ required: true, msg: 'Required!!' }],
          },
        ];
      case ComponentType.Text:
        return [
          {
            inputType: INPUT_TYPES.Text,
            name: 'text',
            placeholder: 'Input Text',
            validation: [{ required: true, msg: 'Required!!' }],
          },
        ];
      case ComponentType.Icon:
        const iconTypeOptions = Object.keys(IconType).map(type => ({
          label: type,
          value: type,
        }));
        return [
          {
            inputType: INPUT_TYPES.Select,
            name: 'type',
            options: iconTypeOptions,
            placeholder: 'Select Icon Type',
            validation: [{ required: true, msg: 'Required!!' }],
          },
        ];
      case ComponentType.Link:
        return [
          {
            inputType: INPUT_TYPES.Text,
            name: 'href',
            placeholder: 'Input Link Href',
            validation: [{ required: true, msg: 'Required!!' }],
          },
        ];
    }
    return [];
  }

  static mapConfigButtons(
    configs: Model<IConfigComponent>[],
  ): Model<IConfigComponent>[] {
    return configs.map(
      (config: Model<IConfigComponent>) => new ConfigComponent(config),
    );
  }
}
