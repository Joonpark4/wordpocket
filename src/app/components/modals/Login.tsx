import Link from 'next/link';
import Label from '@/app/components/forms/Label';
import Input from '@/app/components/forms/Input';
export default function Login() {
  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          By logging in, you accept our&nbsp;
          <Link className="text-blue-500 hover:text-blue-700" href="#">
            privacy policy
          </Link>
          .
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex">
          <div className="flex flex-col grow">
            <div className="relative">
              <Input type="email" id="email" required isPeer={true} />
              <Label id="email" text="Email" isPeer={true} />
            </div>
            {/* 이메일 먼저 받고 회원이 없으면 비밀번호 받기 */}
            {/* <div className="relative">
              <Input type="password" id="password" required isPeer={true} />
              <Label id="password" text="password" isPeer={true} />
            </div> */}
          </div>
          <div className="flex justify-center items-center w-24">
            <button className="w-full h-full p-1 mx-2 py-3 rounded-md bg-[#4285F4] text-white">
              Login
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          <span className="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
          <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
        </div>
        <button className="w-full p-1 rounded-md bg-[#4285F4] text-white">
          <div className="flex items-center justify-center">
            <svg
              className=" w-5 h-5 mr-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" x2="12" y1="8" y2="8" />
              <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
              <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
            </svg>
            Login with Google
          </div>
        </button>
      </div>
    </div>
  );
}
