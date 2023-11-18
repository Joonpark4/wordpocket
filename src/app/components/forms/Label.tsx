import { LabelProps } from '@/app/types/Forms';
export default function Label({ id, text, isPeer }: LabelProps) {
  return (
    <label
      htmlFor={id}
      className={`absolute font-semibold text-gray-400 transition ease-in-out left-3 top-4
              ${
                isPeer &&
                'peer-focus:-translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-4  peer-valid:scale-75 peer-valid:-translate-x-2 peer-valid:-translate-y-4'
              }`}
    >
      {text}
    </label>
  );
}
