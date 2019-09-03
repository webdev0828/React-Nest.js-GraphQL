---
to: pages/<%= name.toLowerCase() %>/detail.jsx
---
import page from 'src/hoc/page';
import <%= h.capitalize(name) %>Detail from 'src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-detail';

export default page(<%= h.capitalize(name) %>Detail);
