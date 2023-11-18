import Link from 'next/link';
import { ModalTopProps } from '@/app/types/Modals';
export default function ModalTop({ title, subtitle, text }: ModalTopProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-lg font-medium">{subtitle}</h2>
      <p className="text-zinc-500 dark:text-zinc-400">
        {text}
      </p>
    </div>
  );
}
