import "./form-field.scss";

type FormFieldProps = {
  className: string;
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>, valueType: string) => void;
  value: string;
  valueType: string;
}

export default function FormField({
  className,
  placeholder,
  name,
  type,
  required,
  value,
  handleChangeInput,
  valueType }: FormFieldProps) {

  return (
    <div className={`${className} form-field`}>
      <label className="form-field__label">{name}</label>
      <input
        onChange={(e) => handleChangeInput(e, valueType)}
        className="form-field__input"
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required} />
    </div>
  );
}