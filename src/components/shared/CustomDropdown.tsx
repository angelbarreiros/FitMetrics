export interface OptionInterface {
    id: string;
    name: string;
}
export type CustomDropdownProps = {
    options: OptionInterface[];
    bgColor: string;
    id: string;
    name: string;
    defaultOption?: OptionInterface;
    onChange: (selectedOption: string) => void;
    disabled?: boolean;

}
export const CustomDropdown = (props: CustomDropdownProps) => {
    return (
        <label htmlFor={props.id} title={props.name}   >
            <select
                name={props.name}
                id={props.id}
                onChange={(e) => props.onChange(e.target.value)}
                disabled={props.disabled}
                className={`text-lg text-text bg-${props.bgColor} rounded-default px-4 py-2 md:max-w-60 sm:max-w-28 truncate`}
            >
                {props.defaultOption && (
                    <option className="text-sm truncate" value={props.defaultOption.id}>
                        {props.defaultOption.name}
                    </option>
                )}
                {props.options.map((option, index) => (
                    <option className="text-sm truncate" key={index} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </label>
    )
}