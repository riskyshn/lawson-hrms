export default function genOptions(items: string[]) {
  return items.map((item) => ({ label: item, value: item }))
}
