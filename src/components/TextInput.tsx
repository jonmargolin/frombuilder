import React from 'react';

interface TextInputProps {
    type: 'text' | 'number';
    value: string | number;
    onChange: (newValue: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ type, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type={type}
            value={value}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
};

export default TextInput;
