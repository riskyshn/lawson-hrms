import { Select } from 'jobseeker-ui'

type TableRowDropdownProps = {
  count: number
  onChange: (selectedRowCount: number) => void
}

const TableRowDropdown: React.FC<TableRowDropdownProps> = ({ count, onChange }) => {
  const handleChange = (selectedValue: string) => {
    const parsedValue = parseInt(selectedValue)
    onChange(parsedValue)
  }

  return (
    <div>
      <Select
        className="w-20"
        hideSearch={true}
        onChange={handleChange}
        options={[
          { label: '8', value: '8' },
          { label: '16', value: '16' },
          { label: '32', value: '32' },
          { label: '64', value: '64' },
        ]}
        value={String(count)}
      />
    </div>
  )
}

export default TableRowDropdown
