
interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label?: string;
    name: string;
    className?: string;
    value: string;
    getValue: (value: string) => void;
}

export const PrincipalFormField = ({ label, name, value, getValue, ...rest }: FormFieldProps) => (
    <div className="flex flex-col" >
        <label
            className="block text-sm font-medium text-text-secundary/70"
            htmlFor={name}>
            {label}
        </label>
        <input
            className="mt-1 block w-full px-4 py-2 border text-text-secundary border-gray-300 rounded-default focus:border-primary  "
            id={name}
            name={name}
            value={value}
            onChange={e => getValue(e.target.value)}
            {...rest}
        />
    </div>
);

export default PrincipalFormField;