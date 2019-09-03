import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';

/**
 * Loads file content
 */
const typesArray = fileLoader(path.join(__dirname, '**/*.graphql'));

/**
 * Convert to typeDefs
 */
const typesMerged = mergeTypes(typesArray);

export default typesMerged;
