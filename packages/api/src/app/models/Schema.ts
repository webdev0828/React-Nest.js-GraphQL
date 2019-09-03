import * as mongoose from 'mongoose';
import { JsonModel, ModelField, ModelsQueryRes } from 'src/app/models/Query';
import { toSchemaType } from 'src/utils/mongo-helpers';

export default class Schema {
  private static _instance;
  public models: {
    [key: string]: mongoose.Model<mongoose.Document, {}>;
  }[] = [];

  constructor({ data: { models } }: ModelsQueryRes) {
    /**
     * Return instance if already exists
     */
    if (!!Schema._instance) {
      return Schema._instance;
    }

    Schema._instance = this;

    /**
     * Go through each model data & create a Mongoose model
     */
    models.forEach((model: JsonModel) => {
      const { name } = model;
      const schema = Schema.buildMongooseSchema(model);
      this.models[name] = mongoose.model(name, schema);
    });
  }

  static buildSchema(
    schema: mongoose.SchemaDefinition,
    field: ModelField,
  ): mongoose.SchemaDefinition {
    const fieldRef = field.key;
    const fieldType: mongoose.SchemaTypeOpts<any> = {
      type: toSchemaType(field.type),
    };
    schema[fieldRef] = fieldType;

    // Manually add ID field for GraphCMS
    schema['graphcms_id'] = String;

    return schema;
  }

  static buildMongooseSchema(model: JsonModel): mongoose.Schema {
    // Dynamically add schema here
    const schema: mongoose.SchemaDefinition = model.fields.reduce(
      (schema, field) => Schema.buildSchema(schema, field),
      {},
    );

    return new mongoose.Schema(schema);
  }
}
