import { Model } from 'src/components/BuilderComponents/interfaces';

export interface IFieldValue {
  key: string;
  value: string;
}

export class FieldValue implements Model<IFieldValue> {
  public id: string;
  public key: string;
  public value: string;

  constructor(fieldValue: Model<IFieldValue>) {
    this.id = fieldValue.id;
    this.key = fieldValue.key;
    this.value = fieldValue.value;
  }

  static mapFieldValues(
    fieldValues: Model<IFieldValue>[] = [],
  ): Model<IFieldValue>[] {
    return fieldValues.map(
      (fieldValue: Model<IFieldValue>) => new FieldValue(fieldValue),
    );
  }
}

export default FieldValue;
