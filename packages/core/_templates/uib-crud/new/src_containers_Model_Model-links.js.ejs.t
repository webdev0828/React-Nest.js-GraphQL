---
to: src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-links.js
---
const <%= name.toLowerCase() %>Links = [
  {
    route: 'home',
    title: 'Home',
  },
  {
    route: '<%= name.toLowerCase() %>.index',
    title: 'All',
  },
  {
    route: '<%= name.toLowerCase() %>.create',
    title: 'Add New',
  },
];

export default <%= name.toLowerCase() %>Links;
