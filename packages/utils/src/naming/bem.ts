/**
 * E.G.
 *
 * Modal-login--default
 * Notification--error
 *
 * @param block Encapsulates a standalone entity that is meaningful on its own.
 *   While blocks can be nested and interact with each other, semantically they
 *   remain equal; there is no precedence or hierarchy. Holistic entities
 *   without DOM representation (such as controllers or models) can be blocks
 *   as well.
 * @param element Parts of a block and have no standalone meaning. Any element
 *   is semantically tied to its block.
 * @param modifier Flags on blocks or elements. Use them to change appearance,
 *   behavior or state.
 */

// export const bemName = <B, E, M>({ b, e, m }: BEM<B, E, M>) => {
//   let className = '';
//
//   if (b && e && m) {
//     className = `${b}-${e}--${m}`;
//   } else if (b && e) {
//     className = `${b}-${e}`;
//   } else if (b && m) {
//     className = `${b}--${m}`;
//   }
//
//   return className;
// };

// export const bemClassName = <B, E, M>(bemClass: BEM<B, E, M>) => {
//     return `.${bemName(bemClass)}`;
//   };
//
// type BemNameProps = { className?: string; bem?: BEM };
//
// export const withBemName = ({ className = '', bem = {} }: BemNameProps) =>
// { return `${className} ${bemName(bem)}`.trim(); };

/**
 *
 * @param {B} b
 * @param {E} e
 * @param {M} m
 * @return {{bemName: string; bemClass: string}}
 */
export const initBem = <B, E, M>() => (b: B, e: E, m: M) => {
  let bemName = '';

  if (b && e && m) {
    bemName = `${b}-${e}--${m}`;
  } else if (b && e) {
    bemName = `${b}-${e}`;
  } else if (b && m) {
    bemName = `${b}--${m}`;
  }

  const bemClass = `.${bemName}`;

  return {
    bemName,
    bemClass,
  };
};
