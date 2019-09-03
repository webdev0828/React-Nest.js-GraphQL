import { useModal } from '@codelab/component';
import { ModalIDs } from '@codelab/system';
import { Icon } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_PAGE_MUTATION } from 'src/components/Page/Page--queries';
import { IRouterPage } from 'src/route/Router';

const PageListSettings = ({ page }) => {
  const { query } = useRouter<IRouterPage>();
  const appSlug = query!.app;
  const { openModal } = useModal(ModalIDs.PageUpdate);
  return (
    <>
      <Mutation mutation={DELETE_PAGE_MUTATION}>
        {deletePage => (
          <Icon type="close" onClick={() => page.delete(appSlug, deletePage)} />
        )}
      </Mutation>
      <Icon type="setting" onClick={openModal({ data: { page } })} />
    </>
  );
};

export default PageListSettings;
