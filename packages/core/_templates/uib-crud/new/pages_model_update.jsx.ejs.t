---
to: pages/<%= name.toLowerCase() %>/update.jsx
---
import page from 'src/hoc/page';
import <%= h.capitalize(name) %>FormUpdate from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-form--update';

export default page(<%= h.capitalize(name) %>FormUpdate);
