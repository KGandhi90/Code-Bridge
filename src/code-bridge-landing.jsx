import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CodeBridgeLanding() {
  return (
    <div className="min-h-screen bg-[#373535] text-white p-6 md:p-12 lg:p-24">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <Avatar className="h-14 w-14 bg-[#504aff] border-none">
            <AvatarFallback className="bg-[#504aff] text-white">CB</AvatarFallback>
            <AvatarImage src="/placeholder.svg?height=56&width=56" alt="User" />
          </Avatar>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-16">
          Welcome to <span className="text-[#504aff]">Code-Bridge</span>
        </h1>

        <div className="space-y-8">
          <p className="text-3xl md:text-4xl font-medium">
            Imagine having a <span className="text-[#504aff]">groundbreaking idea</span> but being{" "}
            <span className="text-[#504aff]">held back</span>—not by skill, but{" "}
            <span className="text-[#504aff]">by language.</span>
          </p>

          <p className="text-2xl md:text-3xl font-medium">
            But <span className="text-[#504aff]">programming isn't about English</span>
            <span className="text-xl md:text-2xl block mt-2">
              —it's about logic and creativity. Language shouldn't be a barrier to innovation.
            </span>
          </p>

          <p className="text-2xl md:text-3xl font-medium mt-8">
            Code-Bridge breaks these limits, translating, teaching, and empowering developers in their native
            language—so anyone, anywhere, can code freely.
          </p>
        </div>

        <div className="mt-24 space-y-2">
          <p className="text-xl">Sign up to start translating programming languages</p>
          <p className="text-xl">
            Already have an account? <span className="cursor-pointer">Log in</span>.
          </p>
        </div>

        <div className="mt-24">
          <button className="border border-white/30 p-3 hover:bg-white/10 transition-colors">
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
