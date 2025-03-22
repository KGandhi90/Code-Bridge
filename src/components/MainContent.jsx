import Navbar from "./Navbar";

const MainContent = () => {
  return (
    <div className="flex-1 text-white p-4 md:p-8 ml-16 h-screen overflow-hidden">
      <div className="max-w-4xl h-full flex flex-col justify-between py-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-[#504aff]">Code-Bridge</span>
          </h1>

          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-medium">
              Imagine having a <span className="text-[#504aff]">groundbreaking idea</span> but being{" "}
              <span className="text-[#504aff]">held back</span>—not by skill, but{" "}
              <span className="text-[#504aff]">by language.</span>
            </p>

            <p className="text-lg md:text-xl font-medium">
              But <span className="text-[#504aff]">programming isn't about English</span>
              <span className="text-base md:text-lg block mt-1">
                —it's about logic and creativity. Language shouldn't be a barrier to innovation.
              </span>
            </p>

            <p className="text-lg md:text-xl font-medium mt-4">
              Code-Bridge breaks these limits, translating, teaching, and empowering developers in their native
              language—so anyone, anywhere, can code freely.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-base">Sign up to start translating programming languages</p>
          <p className="text-base">
            Already have an account?{" "}
            <span className="cursor-pointer hover:text-[#504aff] transition-colors">Log in</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;