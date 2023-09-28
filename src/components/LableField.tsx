import React from 'react';
interface LabelFieldProps {
    text: string;
}
const LabelField: React.FC<LabelFieldProps> = ({ text }) => {
    return <label className="block mr-2.5 mb-2 text-sm font-medium text-gray-900 dark:text-white">{text}</label>;
};

export default LabelField;
