/**
 * Curries mutateWith() with mutation function, which takes in form data
 *
 * @param mutate GraphQL mutation function from AWS
 */
export const mutateWith = mutate => data => {
  return mutate({ variables: { input: data } });
};
