import { Form } from '@codelab/component';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_IMAGE_MUTATION } from 'src/components/Element/Element-queries--getAll';
import { IRouterPage } from 'src/route/Router';

const ImageModalEdit = ({ element }) => {
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;
  const image = element.config.image;
  const fields = image.getEditFormFields();
  return (
    <Form
      mutation={UPDATE_IMAGE_MUTATION}
      fields={fields}
      submitButton={{ text: 'Update Element' }}
      onSubmit={(values, { mutate }) =>
        image.updateImage({
          pageSlug,
          values,
          mutate,
        })
      }
      onComplete={() => {}}
    />
  );
};

export default ImageModalEdit;
