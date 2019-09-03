---
to: pages/<%= name.toLowerCase() %>/create.jsx
---
import <%= h.capitalize(name) %>FormCreate from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-form--create';
import page from 'src/hoc/page';

export default page(<%= h.capitalize(name) %>FormCreate);
