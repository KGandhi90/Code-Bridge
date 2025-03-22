import { Link } from "react-router-dom";
import React from "react";
import { Card, CardContent } from "../../components/ui/card";

export const Homepage = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="overflow-hidden border border-solid border-[#373535] [background:linear-gradient(180deg,rgba(32,29,124,1)_0%,rgba(55,53,53,1)_100%)] w-full max-w-[1440px] h-[1024px] relative">
        {/* Decorative element */}
        <div className="absolute w-[1024px] h-[119px] top-[452px] left-[-452px] bg-[#363535] rotate-90 shadow-[0px_8px_16.6px_#00000040]" />

        {/* Logo */}
        <div className="absolute w-[90px] h-[90px] top-[68px] left-[15px]">
          <div className="relative w-[68px] h-[68px] top-[11px] left-[11px] bg-[url(/rectangle-1.svg)] bg-[100%_100%]">
            <div className="absolute w-[30px] h-[30px] top-[11px] left-[19px] bg-white rounded-[15px]" />
            <img
              className="absolute w-[52px] h-[22px] top-[45px] left-2"
              alt="Intersect"
              src="/intersect.svg"
            />
          </div>
        </div>

        {/* Main content */}
        <Card className="border-none max-w-[1214px] mx-auto">
          <CardContent className="p-0">
            {/* Heading */}
            <h1 className="absolute w-[1058px] top-[41px] left-[113px] [font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-[78px] text-center tracking-[0] leading-normal">
              <span className="[font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-[78px] tracking-[0]">
                Welcome to{" "}
              </span>
              <span className="[font-family:'Glancyr-Bold',Helvetica] font-bold">
                Code-Bridge
              </span>
            </h1>

            {/* Main text content */}
            <div className="absolute w-[989px] top-[207px] left-[225px] [font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-4xl tracking-[0] leading-normal">
              <p>
                <span className="[font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-4xl tracking-[0]">
                  Imagine having a
                </span>
                <span className="text-5xl">&nbsp;</span>
                <span className="[font-family:'Glancyr-Bold',Helvetica] font-bold text-5xl">
                  groundbreaking idea
                </span>
                <span className="text-5xl">&nbsp;</span>
                <span className="[font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-4xl tracking-[0]">
                  but being
                </span>
                <span className="text-5xl">&nbsp;</span>
                <span className="[font-family:'Glancyr-Bold',Helvetica] font-bold text-5xl">
                  held back
                </span>
                <span className="[font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-4xl tracking-[0]">
                  —not by skill, but
                </span>
                <span className="text-5xl">&nbsp;</span>
                <span className="[font-family:'Glancyr-Bold',Helvetica] font-bold text-5xl">
                  by language.
                  <br />
                </span>
              </p>

              <p className="mt-8">
                <span className="text-[32px]">But</span>
                <span className="text-2xl">&nbsp;</span>
                <span className="[font-family:'Glancyr-Bold',Helvetica] font-bold text-[40px]">
                  programming isn&apos;t about English
                </span>
                <span className="text-2xl">
                  —it&apos;s about logic and creativity. Language shouldn&apos;t
                  be a barrier to innovation.
                </span>
              </p>

              <p className="mt-8">
                <span className="[font-family:'Glancyr-Regular',Helvetica] font-normal text-white text-4xl tracking-[0]">
                  Code-Bridge breaks these limits, translating, teaching, and
                  empowering developers in their native language—so anyone,
                  anywhere, can code freely.
                </span>
              </p>

              <div className="mt-16 text-2xl">
                <p>Sign up to start translating programming languages</p>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="underline hover:text-blue-300">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expand icon */}
        <img
          className="absolute w-[51px] h-[51px] top-[935px] left-[35px]"
          alt="Expand"
          src="/expand.svg"
        />
      </div>
    </div>
  );
};