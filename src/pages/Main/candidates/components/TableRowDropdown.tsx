import { Select } from 'jobseeker-ui';
import React, { useState } from 'react';

type TableRowDropdownProps = {
    onChange: (selectedRowCount: number) => void;
};

const TableRowDropdown: React.FC<TableRowDropdownProps> = ({ onChange }) => {
    const [value, setValue] = useState<number>(8); // Initial value

    const handleChange = (selectedValue: string | number) => {
        const parsedValue = parseInt(selectedValue.toString());
        setValue(parsedValue);
        onChange(parsedValue);
    };

    return (
        <div>
            <Select className='w-20'
                options={[
                    { label: '8', value: 8, },
                    { label: '16', value: 16 },
                    { label: '32', value: 32 },
                    { label: '64', value: 64 }
                ]}
                hideSearch={true}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default TableRowDropdown;
