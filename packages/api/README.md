# Getting Started

1. `yarn dev`
   <!-- 3. Install [UIB ESLint](https://gitlab.com/codelabstudios/uib-eslint) -->

## What is done so far

- When we access `server/app/controllers/api.js` by visiting the URL, Mongoose schema is dynamically built from `server/data/schema.json`
- Currently, visiting `api.js` will add a model to the DB from `data.json`

## What needs to be done

- Create `controllers/delete.js`, access via `/delete`
- Create `data/delete-data.json`, look at deleting nodes in https://www.prisma.io/docs/prisma-graphql-api/reference/mutations-qwe2/

```json
{
  "action": "delete",
  "model": "Restaurant",
  "where": {
    "id": "some-id-here"
  }
}
```

The delete should also automatically delete any relationships, so `Menu` would be deleted as well.
