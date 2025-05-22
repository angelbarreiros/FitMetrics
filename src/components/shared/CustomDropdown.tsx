export interface OptionInterface {
    Id: number;
    Name: string;
}

export type CustomDropdownProps = {
    options: OptionInterface[];
    bgColor: string;
    textColor: string;
    id: string;
    name: string;
    defaultOption?: OptionInterface;
    getValue: (selectedOption: number) => void;
    disabled?: boolean;
    placeholder?: string;
};

export const CustomDropdown = ({ options, bgColor, id, name, defaultOption, textColor, getValue, disabled, placeholder }: CustomDropdownProps) => {
    const defaultValue = defaultOption ? defaultOption.Id.toString() : "";
    return (
        <label htmlFor={id} title={name} className="flex flex-col w-full ">
            <select
                name={name}
                id={id}
                onChange={(e) => getValue(Number(e.target.value))}
                disabled={disabled}
                defaultValue={defaultValue}
                className={`text-lg text-${textColor} bg-${bgColor} rounded-default px-4 py-2 md:mix-w-60 sm:mix-w-28 truncate `}
            >
                {!defaultOption && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {defaultOption && (
                    <option value={defaultOption.Id} >
                        {defaultOption.Name}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.Id} value={option.Id}>
                        {option.Name}
                    </option>
                ))}
            </select>
        </label>
    );
};
export default CustomDropdown;