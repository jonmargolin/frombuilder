import { RootState } from './store';

export const selectFormBuilder = (state: RootState) => state.formBuilder;

export const selectFields = (state: RootState) => selectFormBuilder(state).fields;

export const selectCountryField = (state: RootState) => selectFields(state).find((field) => field.variable === 'Country');

export const selectCountryFieldValue = (state: RootState) => {
    const countryField = selectCountryField(state);
    return countryField ? countryField.value : '';
};
export const selectFieldsLength = (state: RootState) => {
    const fields = selectFields(state);
    return fields.length;
};
