import React from 'react';
import { Input as AInput } from 'antd';
import styled, { withTheme } from 'styled-components';
import ThemeProvider from 'src/form/ThemeProvider';
import { Field, getIn } from 'formik';

// color: ${props => props.theme.color.danger};
const ValidationErrors = styled.div`
  min-height: 1.5rem;
  color: ${props => props.theme.color.danger};
`;

const InputArray = props => {
  // console.log(props);

  const { field, form } = props;
  const errors = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  // console.log("errors", errors);
  // console.log("name", field.name);
  // console.log("touch", touched);

  return (
    <ThemeProvider>
      <React.Fragment>
        <AInput {...field} />
        <ValidationErrors>
          {/* {touched[field.name] && errors[field.name] && errors[field.name]} */}
          {touched && errors ? errors : null}
        </ValidationErrors>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default InputArray;
