import { mountForm } from 'src/form/utils/utils';

describe('Slider', () => {
  const field = {
    inputType: 'slider',
    value: 25,
    type: 'string',
    label: 'Basic Slider',
    name: 'slider',
    validation: [],
  };

  const formWrapper = mountForm({ fields: [field] });
  const SliderWrapper = formWrapper.find('AppSlider').first();

  it('have correct default value', () => {
    expect(SliderWrapper.props()).toMatchObject({
      value: field.value,
    });
  });

  it('have correct name attribute', () => {
    expect(SliderWrapper.props()).toMatchObject({
      name: field.name,
    });
  });
});
