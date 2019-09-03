import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import Link from 'src/route/Link';

interface IBreadcrumb {
  links: any;
  route: any;
}

const Breadcrumb = ({ links, route }: IBreadcrumb) => {
  // console.log(links);
  // console.log(route);

  // Get current index
  let currentIndex = 0;

  links.forEach((link, index) => {
    if (link.route === route.name) currentIndex = index;
  });

  const filteredLinks = links.filter((link, index) => index <= currentIndex);

  // console.log('currentIndex', currentIndex);

  return (
    <AntBreadcrumb>
      {filteredLinks.map(link => (
        <AntBreadcrumb.Item key={link.route}>
          <Link route={link.route}>
            <a>{link.title}</a>
          </Link>
        </AntBreadcrumb.Item>
      ))}
    </AntBreadcrumb>
  );
};
export default Breadcrumb;
