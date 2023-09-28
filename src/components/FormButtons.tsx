import React from 'react';
interface FormButtonsProps {
    addField: () => void;
    fieldsLength: number;
    onSubmit: () => void;
}
const FormButtons: React.FC<FormButtonsProps> = ({ addField, fieldsLength, onSubmit }) => {
    return (
        <div className="flex">
            <button
                type="button"
                className={` ${fieldsLength === 4 ? 'bg-blue-300' : 'bg-blue-500'}  shadow-xl ${
                    fieldsLength !== 4 ? 'hover:bg-blue-700' : ''
                } text-white font-bold py-2 px-4 rounded-full mr-2.5`}
                onClick={() => addField()}
                disabled={fieldsLength === 4}
            >
                Add Field
            </button>
            <button
                className=" bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full px-4"
                type="button"
                onClick={() => onSubmit()}
            >
                Submit
            </button>
        </div>
    );
};

export default FormButtons;
