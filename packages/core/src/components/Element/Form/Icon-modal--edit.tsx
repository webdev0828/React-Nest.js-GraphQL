import { Form } from '@codelab/component';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_ICON_MUTATION } from 'src/components/Element/Element-queries--getAll';
import { IRouterPage } from 'src/route/Router';

const IconModalEdit = ({ element }) => {
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;
  const icon = element.config.icon;
  const fields = icon.getEditFormFields();
  return (
    <Form
      mutation={UPDATE_ICON_MUTATION}
      fields={fields}
      submitButton={{ text: 'Update Element' }}
      onSubmit={(values, { mutate }) =>
        icon.updateIcon({
          pageSlug,
          values,
          mutate,
        })
      }
      onComplete={() => {}}
    />
  );
};

export default IconModalEdit;
