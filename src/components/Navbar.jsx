import { X, Menu } from "lucide-react";

const Navbar = ({ isExpanded, toggleNav }) => {
  return (
    <div className={`fixed h-screen bg-[#222222] transition-all duration-300 z-10 ${isExpanded ? "w-64" : "w-16"}`}>
      <div className="flex flex-col h-full justify-between p-3">
        <div>
          <div className="flex items-center mb-6">
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-[#5751fe] flex items-center justify-center text-white mr-2">
                <span className="text-sm">CB</span>
              </div>
            </div>
            {isExpanded && <div className="text-white text-lg font-bold">Code-Bridge</div>}
          </div>

          {/* Nav items */}
          {isExpanded && (
            <div className="text-white/70 text-sm">
              <div className="hover:text-white cursor-pointer">Stack Overflow</div>
              <div className="hover:text-white cursor-pointer">Theme</div>
              <div className="hover:text-white cursor-pointer">Login</div>
            </div>
          )}
        </div>

        <button
          onClick={toggleNav}
          className="bg-[#373535] p-2 hover:bg-white/15 rounded-full transition-colors self-start"
        >
          {isExpanded ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;