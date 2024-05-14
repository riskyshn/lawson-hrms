export type AccordionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  items: Array<{
    header: string
    body: React.ReactNode
  }>
}
