import { OptionProps } from 'jobseeker-ui'

export default function emmbedToOption(data?: IGeneralDataEmmbed): OptionProps | undefined {
  if (!data) return undefined
  return {
    // @ts-expect-error
    label: data.name || data.title || data.label,
    value: data.oid,
  }
}
