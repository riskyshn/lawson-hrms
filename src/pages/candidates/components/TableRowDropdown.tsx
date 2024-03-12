import { Select } from 'jobseeker-ui'

type TableRowDropdownProps = {
  onChange: (selectedRowCount: number) => void
  count: number
}

const TableRowDropdown: React.FC<TableRowDropdownProps> = ({ onChange, count }) => {
  const handleChange = (selectedValue: string | number) => {
    const parsedValue = parseInt(selectedValue.toString())
    onChange(parsedValue)
  }

  return (
    <div>
      <Select
        className="w-20"
        options={[
          { label: '8', value: 8 },
          { label: '16', value: 16 },
          { label: '32', value: 32 },
          { label: '64', value: 64 },
        ]}
        hideSearch={true}
        value={count}
        onChange={handleChange}
      />
    </div>
  )
}

export default TableRowDropdown
