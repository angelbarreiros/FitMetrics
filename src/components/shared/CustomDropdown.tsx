export interface OptionInterface {
    id: string;
    name: string;
}
export type CustomDropdownProps = {
    options: OptionInterface[];
    bgColor: string;
    textColor: string;
    id: string;
    name: string;
    defaultOption?: OptionInterface;
    getValue: (selectedOption: string) => void;
    disabled?: boolean;

}
export const CustomDropdown = ({
    options,
    bgColor,
    id,
    name,
    defaultOption,
    textColor,
    getValue,
    disabled,

}: CustomDropdownProps) => {
    return (
        <label htmlFor={id} title={name}>
            <select
                name={name}
                id={id}
                onChange={(e) => getValue(e.target.value)}
                disabled={disabled}
                className={`text-lg text-${textColor} bg-${bgColor} rounded-default px-4 py-2 md:max-w-60 sm:max-w-28 truncate`}

            >
                {defaultOption && (
                    <option className="text-sm truncate" value={defaultOption.id}>
                        {defaultOption.name}
                    </option>
                )}
                {options.map((option, index) => (
                    <option className="text-sm truncate" key={index} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </label>
    );
};