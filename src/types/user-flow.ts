import { type ReactNode, type ChangeEvent } from 'react';

export type InputType =
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'url'
    | 'checkbox'
    | 'radio'
    | 'submit'
    | 'reset'
    | 'file'
    | 'date'
    | 'color'
    | 'range'
    | 'hidden';

export type SignUpSelectOptions = 'companySize' | 'jobTitle' | 'howDidYouHear' | 'age';

export interface SignUpDetailsOption {
    label: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputType: InputType;
    value: string;
    required: boolean;
    passwordValidator: ReactNode;
    validationAchieved: boolean;
    isSelect?: { selectOptions: string[]; signUpUserKey: SignUpSelectOptions };
    dataCy?: string;
}

export type SignUpDetailsOptions = SignUpDetailsOption[];
