import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addField, removeField, updateField } from '../store/store';
import Field from './Field';
import { useCityCountryData } from '../hook/useCityCountryData';
import { FieldName, OperatorOptions, variableOptions } from '../utils/const';
import FormButtons from './FormButtons';


const FormBuilder: React.FC = () => {
    const dispatch = useDispatch();
    const fields = useSelector((state: RootState) => state.formBuilder.fields);
    const { cityList, countryList } = useCityCountryData();
    const handleSubmit = () => {
        console.log(fields);
    };

    const isCountrySelected = fields.some((field) => field.variable === FieldName.country);

    const handleVariableChange = (index: number, selectedValue: string) => {
        dispatch(
            updateField({
                index,
                field: {
                    variable: selectedValue,
                    operator: OperatorOptions.equals,
                    value: selectedValue === FieldName.country ? countryList[0] : '',
                },
            })
        );
    };

    const handleOperatorChange = (index: number, selectedValue: string) => {
        const field = fields[index];
        const updatedField = { ...field, operator: selectedValue, value: '' };

        dispatch(updateField({ index, field: updatedField }));
    };
    const addFieldDispatch = () => {
        dispatch(addField());
    };
    const handleValueChange = (index: number, newValue: string) => {
        const updatedField = { ...fields[index], value: newValue };
        dispatch(updateField({ index, field: updatedField }));
    };

    return (
        <div className="shadow-xl w-fit bg-sky-50 p-3">
            <h1>Form Builder</h1>
            <form className="flex justify-center flex-col" onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <Field
                        key={index}
                        field={field}
                        variableOptions={isCountrySelected ? variableOptions : variableOptions.filter((option) => option !== FieldName.city)}
                        onVariableChange={(selectedValue) => handleVariableChange(index, selectedValue)}
                        onOperatorChange={(selectedValue) => handleOperatorChange(index, selectedValue)}
                        onValueChange={(newValue) => handleValueChange(index, newValue)}
                        onRemoveField={() => dispatch(removeField(index))}
                        countryList={countryList}
                        cityList={cityList}
                        index={index}
                    />
                ))}
                <FormButtons addField={addFieldDispatch} fieldsLength={fields.length} onSubmit={handleSubmit} />
            </form>
        </div>
    );
};

export default FormBuilder;
