import { useState } from "react";
import { LoginDialog } from "./login_dialog";
import {
  useAccessTokenStore,
  useEntitlementTokenStore,
} from "@/stores/auth_store";
import { useStorefrontStore } from "@/stores/storefront_store";
import { LogOut } from "lucide-react";

export const AppHeader = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setEntitlementToken = useEntitlementTokenStore(
    (state) => state.setEntitlementToken,
  );
  const setStorefront = useStorefrontStore((state) => state.setStorefront);
  const [isOpenLoginDialog, setOpenLoginDialog] = useState(false);
  const onLogout = () => {
    setAccessToken(null);
    setEntitlementToken(null);
    setStorefront(null);
    console.log("logged out");
  };
  return (
    <>
      <div className="p-4 flex justify-between items-center border-b border-[#1E293B]">
        <h1 className="text-4xl font-bold">Delaveza Forest</h1>
        <div className="flex gap-4">
          <button
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-4 py-2 rounded"
            onClick={() => setOpenLoginDialog(true)}
          >
            Login
          </button>
          {accessToken && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-2 rounded"
              onClick={onLogout}
            >
              <LogOut />
            </button>
          )}
        </div>
      </div>
      <LoginDialog isOpen={isOpenLoginDialog} setOpen={setOpenLoginDialog} />
    </>
  );
};
