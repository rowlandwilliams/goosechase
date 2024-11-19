import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { PasswordInputWithValidationPasswordValidator } from './PasswordInputWithValidationPasswordValidator/PasswordInputWithValidationPasswordValidator';
import { Input } from '@/app/_components/ui/input';
import { type SignUpDetailsOption } from '@/types/user-flow';
import { FormFieldWithHeader } from '@/app/_components/Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Lock } from 'lucide-react';

interface Props {
    option: SignUpDetailsOption;
    validationAchieved?: boolean;
    includeValidation?: boolean;
    passwordValidator?: ReactNode;
}

export const PasswordInputWithValidation = ({
    option,
    validationAchieved = false,
    includeValidation = true,
    passwordValidator = <PasswordInputWithValidationPasswordValidator password={option.value} />,
}: Props) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleClickOutside = useCallback((event: Event) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setIsInputFocused(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [handleClickOutside]);

    return (
        <FormFieldWithHeader
            title={option.label}
            key={option.label}
            required
            validated={option.value.length > 0 ? validationAchieved : undefined}
        >
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 stroke-stone-500" />
                </div>
                <Input
                    ref={inputRef}
                    className="p-2.5 pl-10 "
                    data-cy={option.dataCy}
                    onBlur={handleBlur}
                    onChange={(e) => option.handleChange(e)}
                    onFocus={handleFocus}
                    required
                    type={option.inputType}
                    value={option.value}
                    placeholder={option.label}
                />
            </div>
            {includeValidation && isInputFocused && option.value.length > 0 && passwordValidator}
        </FormFieldWithHeader>
    );
};
