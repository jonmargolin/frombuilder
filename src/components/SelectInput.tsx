import React from 'react';
interface SelectInputProps {
    options: string[];
    value: string;
    onChange: (selectedValue: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, value, onChange }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            {options.map((option, index) => (
                <option key={option + index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
