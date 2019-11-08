export const compose = (...fns) => (point) =>
  fns.reduceRight((acc, fn) => fn(acc), point)