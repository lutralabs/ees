import React from 'react';
import { MemoizedSVG } from '../MemoizedSVG';
import { SOCIALS } from '@/utils';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full flex justify-between max-sm:flex-col max-sm:items-center items-end p-3 max-h-[4rem] max-sm:gap-y-4 max-sm:pt-12 max-sm:pb-24">
      <div className="flex items-center h-full max-sm:justify-center gap-x-4 max-sm:gap-x-2">
        {Object.values(SOCIALS).map((social) => (
          <Link href={social.urlPrefix!} key={social.key} target="_blank">
            <MemoizedSVG
              height={24}
              width={24}
              key={social.key}
              fill="#000000"
              className="opacity-50"
              src={social.icon}
            />
          </Link>
        ))}
      </div>
      <div className="items-end h-full justify-end max-sm:justify-center">
        <p className="justify-end text-sm text-slate-500 max-sm:text-center dark:text-slate-400">
          © {new Date().getFullYear()} Lutra Labs
        </p>
      </div>
    </div>
  );
}
