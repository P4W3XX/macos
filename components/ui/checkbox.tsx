import { Check } from "lucide-react";

export default function Checkbox({
  label,
  checked,
  onChange,
  labelClassName,
}: CheckboxProps) {
  return (
    <label className="flex items-center relative select-none w-fit">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="appearance-none relative h-6 w-6 border border-gray-300 checked:border-0 inset-shadow-sm/30  rounded-[7px] bg-transparent checked:bg-blue-600 checked:border-transparent transition-colors"
      />
      {checked && (
        <Check
          size={18}
          strokeWidth={3}
          className=" absolute inset-0 left-0.5 top-1 text-white"
        />
      )}
      <span className={`ml-1 text-white !${labelClassName}`}>{label}</span>
    </label>
  );
}
interface CheckboxProps {
  label: string;
  checked: boolean;
  labelClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
