import { InputProps } from '@/app/types/Forms';
export default function Input({
  type,
  id,
  isPeer,
  placeholder,
  required,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      className={`border-2 border-gray-600 w-full rounded-[4px] h-14 pt-4 pl-3 ${
        isPeer && 'peer transition focus:outline-none focus:border-blue-500'
      }`}
      placeholder={isPeer ? ' ' : placeholder}
      required={required}
    />
  );
}
