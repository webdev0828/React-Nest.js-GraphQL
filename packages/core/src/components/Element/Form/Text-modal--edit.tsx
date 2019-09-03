import { Form } from '@codelab/component';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_TEXT_MUTATION } from 'src/components/Element/Element-queries--getAll';
import { IRouterPage } from 'src/route/Router';

const TextModalEdit = ({ element }) => {
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;
  const text = element.config.text;
  const fields = text.getEditFormFields();
  return (
    <Form
      mutation={UPDATE_TEXT_MUTATION}
      fields={fields}
      submitButton={{ text: 'Update Element' }}
      onSubmit={(values, { mutate }) =>
        text.updateText({
          pageSlug,
          values,
          mutate,
        })
      }
      onComplete={() => {}}
    />
  );
};

export default TextModalEdit;
