'use client';
import Link from 'next/link';
import Label from '@/app/components/forms/Label';
import Input from '@/app/components/forms/Input';
import Image from 'next/image';
import nextjs from '@/../public/img/nextjs-logotype-light-background.png';
import BgPositionBtn from '../buttons/BgPositionBtn';
import { useState } from 'react';
import TwoTabBtn from '../buttons/TwoTabBtn';
export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="z-10 absolute flex justify-center items-center top-0 left-0 bg-gray-500 bg-opacity-40 w-full h-full">
      <div className="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700 animate-fadeIn">
        <div className="space-y-2 text-center">
          <TwoTabBtn tab1='Log-in' tab2='Sign-in' isFirstTab={isLogin} setIsFirstTab={setIsLogin} />
          <h2 className="text-lg font-medium min-w-[300px]">
            {isLogin ? "Welcome! Pls login to your account." : "Thank you for joining us!"}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            You can check the&nbsp;
            <Link className="text-blue-400 hover:text-blue-700" href="#">
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
          />
        </div>
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
