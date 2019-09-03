import { Form } from '@codelab/component';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_PARAGRAPH_MUTATION } from 'src/components/Element/Element-queries--getAll';
import { IRouterPage } from 'src/route/Router';

const ParagraphModalEdit = ({ element }) => {
  const { query } = useRouter<IRouterPage>();
  const pageSlug = query!.page;
  const paragraph = element.config.paragraph;
  const fields = paragraph.getEditFormFields();
  return (
    <Form
      mutation={UPDATE_PARAGRAPH_MUTATION}
      fields={fields}
      submitButton={{ text: 'Update Element' }}
      onSubmit={(values, { mutate }) =>
        paragraph.updateParagraph({
          pageSlug,
          values,
          mutate,
        })
      }
      onComplete={() => {}}
    />
  );
};

export default ParagraphModalEdit;
