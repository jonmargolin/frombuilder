import React, { useEffect, useState } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { FieldName, numbersOptions, operatorOptions } from '../utils/const';
import { useSelector } from 'react-redux';
import { selectCountryFieldValue, selectFieldsLength } from '../store/formBuilderSlice';
import LabelField from './LableField';
import { CiCircleRemove } from 'react-icons/ci';

interface FieldProps {
    field: {
        variable: string;
        operator: string;
        value: string;
    };
    variableOptions: string[];
    onVariableChange: (selectedValue: string) => void;
    onOperatorChange: (selectedValue: string) => void;
    onValueChange: (newValue: string) => void;
    onRemoveField: () => void;
    countryList: string[];
    cityList: { country: string; city: string[] }[];
    index: number;
}

const Field: React.FC<FieldProps> = ({
    field,
    onVariableChange,
    onOperatorChange,
    onValueChange,
    onRemoveField,
    variableOptions,
    countryList,
    cityList,
    index,
}) => {
    const [filteredCityList, setFilteredCityList] = useState<string[]>([]);
    const countryFieldValue = useSelector(selectCountryFieldValue);
    const fieldsLength = useSelector(selectFieldsLength);
    useEffect(() => {
        if (field.variable === FieldName.city) {
            // Filter the city list based on the selected country
            const citiesForSelectedCountry = cityList.find((item) => item.country === countryFieldValue)?.city || [];
            setFilteredCityList(citiesForSelectedCountry);
        }
    }, [countryList, cityList, field.variable, countryFieldValue]);
    return (
        <div key={index} className="mb-4 flex my-4">
            <div className="flex items-baseline mr-2.5">
                <LabelField text={'Variable'} />
                <SelectInput options={variableOptions} value={field.variable} onChange={onVariableChange} />
            </div>
            <div className="flex items-baseline mr-2.5">
                <LabelField text="Operator" />
                <SelectInput options={operatorOptions} value={field.operator} onChange={onOperatorChange} />
            </div>
            {field.variable === FieldName.country || field.variable === FieldName.city ? (
                // Render a dropdown when "Country" is selected
                <div className="flex items-baseline mr-2.5">
                    <LabelField text="Value" />
                    <SelectInput
                        options={field.variable === FieldName.country ? countryList : filteredCityList}
                        value={field.value}
                        onChange={onValueChange}
                    />
                </div>
            ) : (
                // Render a text or number input for other variables
                <div className="flex items-baseline mr-2.5">
                    <LabelField text="Value" />
                    <TextInput type={numbersOptions.includes(field.operator) ? 'number' : 'text'} value={field.value} onChange={onValueChange} />
                </div>
            )}

            <button
                type="button"
                onClick={onRemoveField}
                disabled={fieldsLength === 1}
                className={`text-white ${fieldsLength !== 1 ? 'bg-red-700' : 'bg-red-300'}  ${
                    fieldsLength !== 1 ? 'hover:bg-red-800' : ''
                } focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
            >
                <CiCircleRemove />
            </button>
        </div>
    );
};

export default Field;
