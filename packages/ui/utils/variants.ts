// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export default function variants<T extends string, T2 extends any>(items: Record<T, T2>) {
  return (key?: T): T2 => {
    return items[key || (Object.keys(items)[0] as T)]
  }
}
