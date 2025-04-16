import { useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { Menu, X } from "lucide-react";
import { CustomerMembership, SoleTraderMembership, AdminMembership } from "../ui/Membership";
import { GridIcon } from "lucide-react";

export default function DashboardDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfile();
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const name = profile?.firstName + " " + profile?.lastName;
  const email = profile?.email;



  return (
    <div className="relative block">
      <button className="p-1 rounded" onClick={toggleDropdown}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 flex w-[250px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <ul className="flex flex-col gap-1 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="ml-2 block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                  {profile ? name : "Loading..."}
                </span>
                <span className="ml-2 mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                  {profile ? email : "Loading..."}
                </span>
              </div>
                {profile?.role === "soleTrader" ? <SoleTraderMembership /> : 
                 profile?.role === "admin" ? <AdminMembership /> : 
                 <CustomerMembership />}
            </div>

            <li className="my-2 border-t border-gray-200 dark:border-gray-700" />
            <li>
              <a
              href="/authentication"
              onClick={closeDropdown}
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
              <span className="text-gray-500">
                <GridIcon size={18} />
              </span>
              Log Out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
