import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldName, OperatorOptions } from '../utils/const';
import { Field } from '../utils/types';

// Define the initial state
const initialState: { fields: Array<Field> } = {
    fields: [{ variable: FieldName.devices, operator: 'Equals', value: '' }],
};

// Create a slice of the state and reducers
const formBuilderSlice = createSlice({
    name: 'formBuilder',
    initialState,
    reducers: {
        addField: (state) => {
            if (state.fields.length < 4) {
                state.fields.push({ variable: FieldName.devices, operator: OperatorOptions.equals, value: '' });
            }
        },
        removeField: (state, action: PayloadAction<number>) => {
            if (state.fields.length > 1) {
                state.fields.splice(action.payload, 1);
            }
        },
        updateField: (state, action: PayloadAction<{ index: number; field: Field }>) => {
            state.fields[action.payload.index] = action.payload.field;
            const cityIndex = state.fields.findIndex((field) => field.variable === FieldName.city);
            const countryIndex = state.fields.findIndex((field) => field.variable === FieldName.country);
            if (countryIndex === -1 && cityIndex !== -1) {
                state.fields.splice(cityIndex, 1);
            }
        },
    },
});

// Export the slice actions and reducer
export const { addField, removeField, updateField } = formBuilderSlice.actions;

// Create the Redux store
export const store = configureStore({
    reducer: {
        formBuilder: formBuilderSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
