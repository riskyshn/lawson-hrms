export default function yupOptionError(item: any) {
  return item?.value?.message || item?.message
}
