import { Form } from '@codelab/component';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_LINK_MUTATION } from 'src/components/Element/Element-queries--getAll';
import { IRouterPage } from 'src/route/Router';

const LinkModalEdit = ({ element }) => {
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;
  const link = element.config.link;
  const fields = link.getEditFormFields();
  return (
    <Form
      mutation={UPDATE_LINK_MUTATION}
      fields={fields}
      submitButton={{ text: 'Update Element' }}
      onSubmit={(values, { mutate }) =>
        link.updateLink({
          pageSlug,
          values,
          mutate,
        })
      }
      onComplete={() => {}}
    />
  );
};

export default LinkModalEdit;
