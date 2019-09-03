import './Form.scss';
import * as Yup from 'yup';
import { Field, FieldArray, Form, Formik } from 'formik';
import { compose, defaultProps, withHandlers } from 'recompose';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { keyBy } from 'lodash';
import styled from 'styled-components';
import ThemeProvider from 'src/form/ThemeProvider';
import InputArray from '../Input/InputArray';
import Input from '../Input/Input';

const Title = styled.h1`
  color: red;
`;

const FormSchema = Yup.object().shape({
  models: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    }),
  ),
});

const withDefaultProps = defaultProps({
  fields: [
    {
      type: 'text',
      name: 'Menu',
      placeholder: 'Model Name',
    },
    {
      inputType: 'text',
      name: '',
      placeholder: 'Model Name',
    },
  ],
});

const FormArray = props => {
  console.log(props);
  return (
    <ThemeProvider>
      <React.Fragment>
        <Formik
          initialValues={props.initialValues()}
          validationSchema={FormSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              console.log('submit!');
              console.log(props.fields);
              actions.setSubmitting(false);
              // props.create();
            }, 600);
          }}
          render={props => (
            <Form>
              <FieldArray
                name="models"
                render={arrayHelpers => (
                  <div>
                    {props.values.Models.map((model, index) => (
                      <div key={index}>
                        <Field
                          name={`models.${index}.name`}
                          placeholder={`models.${index}.placeholder`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          component={InputArray}
                        />
                      </div>
                    ))}
                  </div>
                )}
              />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          )}
        />
      </React.Fragment>
    </ThemeProvider>
  );
};

FormArray.propTypes = {
  create: PropTypes.func,
};

export default compose(
  withDefaultProps,
  withHandlers({
    initialValues: (props: any) => event => {
      console.log(props);
      return { models: props.fields.map(field => field) };
    },
  }),
)(FormArray);
