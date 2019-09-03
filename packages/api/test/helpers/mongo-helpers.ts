import { Schema } from 'mongoose';

export const ToSchemaType = (nameType: string) => {
  switch (nameType) {
    case 'String':
      return String;
    case 'Number':
      return Number;
    case 'Date':
      return Date;
    case 'Buffer':
      return Buffer;
    case 'ObjectId':
      return Schema.Types.ObjectId;
    case 'Array':
      return Array;
    case 'Decimal128':
      return Schema.Types.Decimal128;
    case 'Map':
      return Map;
    default:
      return String;
  }
};
