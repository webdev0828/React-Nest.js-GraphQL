import { Form } from '@codelab/component';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_BUTTON_MUTATION } from 'src/components/Element/Element-queries--getAll';
import { IRouterPage } from 'src/route/Router';

const ButtonModalEdit = ({ element }) => {
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;
  const button = element.config.button;
  const fields = button.getEditFormFields();
  return (
    <Form
      mutation={UPDATE_BUTTON_MUTATION}
      fields={fields}
      submitButton={{ text: 'Update Element' }}
      onSubmit={(values, { mutate }) =>
        button.updateButton({ pageSlug, values, mutate })
      }
      onComplete={() => {}}
    />
  );
};

export default ButtonModalEdit;
