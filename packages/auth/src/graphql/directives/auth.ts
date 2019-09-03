import { defaultFieldResolver, GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    console.log('visitFieldDefinition');
    // field.isDeprecated = true;
    // field.deprecationReason = this.args.reason;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return {
        id: 0,
        username: 'Hi',
      };
    };
  }

  // public visitEnumValue(value: GraphQLEnumValue) {
  //   value.isDeprecated = true;
  //   value.deprecationReason = this.args.reason;
  // }
}

export default AuthDirective;
