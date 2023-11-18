import { ButtonProps } from '@/app/types/Buttons';
export default function BgPositionBtn({ content, width, height }: ButtonProps) {
  return (
    <button
      className={`${width} ${height} p-1 rounded-md text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-300% duration-500 ease-in-out bg-left hover:bg-right`}
    >
      {content}
    </button>
  );
}
