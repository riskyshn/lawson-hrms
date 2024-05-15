import { OptionProps } from 'jobseeker-ui'
import { IGeneralDataEmmbed } from '../types'

export function emmbedToOption(data?: IGeneralDataEmmbed): OptionProps | undefined {
  if (!data) return undefined
  return {
    // @ts-expect-error
    label: data.name || data.title || data.label,
    value: data.oid,
  }
}

export function emmbedToOptions(resp?: { content?: Array<IGeneralDataEmmbed> }): OptionProps[] {
  return (
    resp?.content?.map((el) => ({
      // @ts-expect-error
      label: el.name || el.title || el.label,
      value: el.oid,
    })) || []
  )
}
