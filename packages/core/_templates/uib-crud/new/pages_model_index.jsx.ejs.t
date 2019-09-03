---
to: pages/<%= name.toLowerCase() %>/index.jsx
---
import <%= h.capitalize(name) %>List from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-list';
import page from 'src/hoc/page';

export default page(<%= h.capitalize(name) %>List);
