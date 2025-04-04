'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/app/_components/ui/something';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/app/_components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover';
import { useState } from 'react';

interface Props {
    options: { value: string; label: string; subLabel?: string }[];
    selectOptionString: string;
    noResultsMessage: string;
    searchPlaceholder: string;
    value: string;
    handleSelect: (value: string) => void;
}

export const Combobox = ({
    options,
    selectOptionString,
    noResultsMessage,
    searchPlaceholder,
    value,
    handleSelect,
}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] font-normal justify-between"
                >
                    {value ? options.find((option) => option.value === value)?.label : selectOptionString}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{noResultsMessage}.</CommandEmpty>
                        <CommandGroup>
                            {options
                                .sort((a, b) => a.label.localeCompare(b.label))
                                .map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            handleSelect(currentValue === value ? '' : currentValue);
                                            setOpen(false);
                                        }}
                                        className="flex-col items-start"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    value === option.value ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                            <div>{option.label}</div>
                                        </div>
                                        {option.subLabel && (
                                            <div className="text-stone-500 ml-8">{option.subLabel}</div>
                                        )}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
