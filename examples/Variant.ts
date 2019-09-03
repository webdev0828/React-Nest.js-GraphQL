class Variant {
  constructor(title) {}
  addCSSRule(css: MyCSSRule) {
    // Store rule to class member
  }

  exportData() {}
}

class Tag {}

class MyCSSRule {
  constructor({ rule, value }) {
    // Create a CSS rule
  }
}

const ButtonPrimaryVariant = new Variant('Button Primary');

const CSSMargin = new MyCSSRule({ rule: 'margin-top', value: 15 });
const CSSBackgroundColor = new MyCSSRule({
  rule: 'background-color',
  value: 15,
});

ButtonPrimaryVariant.addCSSRule(CSSMargin);
ButtonPrimaryVariant.addCSSRule(CSSBackgroundColor);

// Same thing with Tag

// Then when the user clicks Create Variant, we will export all the data needed to create the Variant with exportData() and pass that into our GraphQL mutation as parameters.

// You may need to flatten the data for GraphQL to take the argument as parameter, or you could make the GraphQL input an object like so https://stackoverflow.com/questions/42722888/graphql-js-node-express-how-to-pass-object-as-graphql-query-argument
