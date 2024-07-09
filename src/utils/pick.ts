export function pick<T, K extends keyof T>(obj: T, ...props: K[]): Pick<T, K> {
  return props.reduce(
    (acc, prop) => {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        acc[prop] = obj[prop]
      }
      return acc
    },
    {} as Pick<T, K>,
  )
}
