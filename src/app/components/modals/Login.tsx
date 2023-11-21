'use client';
import Link from 'next/link';
import Label from '@/app/components/forms/Label';
import Input from '@/app/components/forms/Input';
import Image from 'next/image';
import nextjs from '@/../public/img/nextjs-logotype-light-background.png';
import BgPositionBtn from '../buttons/BgPositionBtn';
import { useState } from 'react';
import TwoTabBtn from '../buttons/TwoTabBtn';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  async function handleSubmit(e: any) {
    e.preventDefault();
    const requestedEmail = email;
    const requestedPassword = password;
    const result = await signIn('credentials', {
      redirect: false,
      requestedEmail,
      requestedPassword,
    });
    console.log(result);

    // 아래는 폼데이터를 받아오는 예시 코드, 작성 중단
    // const formData = new FormData(e.target);
    // const username = formData.get('email');
    // const password = formData.get('password');

    // const result = await signIn('credentials', {
    //   redirect: true,
    //   username,
    //   password,
    // });
  }

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="z-10 absolute flex justify-center items-center top-0 left-0 bg-gray-500 bg-opacity-40 w-full h-full">
      <div className="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700 animate-fadeIn">
        <div className="space-y-2 text-center">
          <TwoTabBtn
            tab1="Log-in"
            tab2="Sign-in"
            isFirstTab={isLogin}
            setIsFirstTab={setIsLogin}
          />
          <h2 className="text-lg font-medium min-w-[300px]">
            {isLogin
              ? 'Welcome! Pls login to your account.'
              : 'Thank you for joining us!'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            You can check the&nbsp;
            <Link className="text-blue-400 hover:text-blue-700" href="#">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex flex-col grow gap-2">
              <div className="relative">
                <input
                  type={'email'}
                  id={'email'}
                  className={`border-2 border-gray-600 w-full rounded-[4px] h-12 pt-4 pl-3 peer transition focus:outline-none focus:border-blue-500`}
                  required={true}
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <label
                  htmlFor={'email'}
                  className={`absolute font-semibold text-gray-400 transition ease-in-out left-3 top-4 peer-focus:-translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-4  peer-valid:scale-75 peer-valid:-translate-x-2 peer-valid:-translate-y-4
                `}
                >
                  {'Email'}
                </label>
              </div>
              <div className="relative">
                <input
                  type={'password'}
                  id={'password'}
                  className={`border-2 border-gray-600 w-full rounded-[4px] h-12 pt-4 pl-3 peer transition focus:outline-none focus:border-blue-500`}
                  required={true}
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                <label
                  htmlFor={'password'}
                  className={`absolute font-semibold text-gray-400 transition ease-in-out left-3 top-4 peer-focus:-translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-4  peer-valid:scale-75 peer-valid:-translate-x-2 peer-valid:-translate-y-4
                `}
                >
                  {'Password'}
                </label>
              </div>
              {/* 컴포넌트 분리는 추후 적용 */}
              {/* <div className="relative">
                <Input type="email" id="email" required isPeer={true} />
                <Label id="email" text="Email" isPeer={true} />
              </div>
              <div className="relative">
                <Input type="password" id="password" required isPeer={true} />
                <Label id="password" text="password" isPeer={true} />
              </div> */}
              {/* 이메일 먼저 받고 회원이 없으면 비밀번호 받기 */}
            </div>
            <div className="flex justify-center items-center w-24 px-2">
              <BgPositionBtn content="Login" width="w-full" height="h-full" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            <span className="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          </div>
          <BgPositionBtn
            content={
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
            }
            width="w-full"
            height=""
            type="submit"
          />
        </form>
        <div className="w-full flex justify-end items-center gap-2">
          <div className="font-bold">Powered by</div>{' '}
          <Image
            src={nextjs}
            alt="v0_logo"
            className="animate-neon"
            width={60}
          />{' '}
        </div>
      </div>
    </div>
  );
}
