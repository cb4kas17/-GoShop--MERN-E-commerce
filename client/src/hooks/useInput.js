import { useReducer, useCallback } from 'react';

const useInput = (validateValue, initialValueParams) => {
    let initialValue = {
        value: initialValueParams || '',
        isTouched: false,
    };

    const inputReducer = (state, action) => {
        if (action.type === 'INPUT_VALUE') {
            return {
                value: action.value,
                isTouched: state.isTouched,
            };
        }
        if (action.type === 'BLUR') {
            return {
                value: state.value,
                isTouched: true,
            };
        }
        if (action.type === 'RESET') {
            return {
                value: '',
                isTouched: false,
            };
        }
        return initialValue;
    };
    const [inputState, dispatchInput] = useReducer(inputReducer, initialValue);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;
    const valueChangeHandler = (e) => {
        dispatchInput({ type: 'INPUT_VALUE', value: e.target.value });
    };
    const inputBlurHandler = () => {
        dispatchInput({ type: 'BLUR' });
    };
    const reset = () => {
        dispatchInput({ type: 'RESET' });
    };
    const manualSetValue = useCallback((value) => {
        dispatchInput({ type: 'INPUT_VALUE', value: value });
    }, []);
    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        manualSetValue,
    };
};

export default useInput;
