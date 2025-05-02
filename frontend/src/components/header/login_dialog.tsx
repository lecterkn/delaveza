import {
  useAccessTokenStore,
  useEntitlementTokenStore,
} from "@/stores/auth_store";
import { useUserStore } from "@/stores/user_store";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const LoginDialog: React.FC<Props> = ({ isOpen, setOpen }) => {
  const setAccessTokenFromUrl = useAccessTokenStore(
    (state) => state.setAccessTokenFromUrl,
  );
  const fetchEntitlementToken = useEntitlementTokenStore(
    (state) => state.fetchEntitlementToken,
  );
  const fetchUserId = useUserStore((state) => state.fetchUserId);
  const [inputUrl, setInputUrl] = useState("");
  const authUrl =
    "https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid";
  if (!isOpen) {
    return <></>;
  }
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/70 z-50 transform transition-transform duration-300 ease-out ${isOpen ? "translate-y-0" : "translate-y-4"}`}
    >
      <div className="bg-[#1E293B] text-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Login Authentication</h3>
        <div className="mb-4">
          <label className="block text-sm mb-1">Auth URL (Read-Only)</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={authUrl}
              readOnly
              className="w-full px-3 py-2 rounded bg-[#334155] text-white"
            />
            <button
              onClick={() => navigator.clipboard.writeText(authUrl)}
              className="px-3 py-1 bg-[#3B82F6] hover:bg-[#2563EB] rounded"
            >
              Copy
            </button>
            <a
              href={authUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#16A34A] hover:bg-[#15803D] rounded"
            >
              Open
            </a>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Enter Auth URL</label>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#334155] text-white placeholder-gray-400"
            placeholder="https://playvalorant.com/ja-jp/opt_in/#access_token=..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-[#64748B] hover:bg-[#475569] rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setAccessTokenFromUrl(inputUrl);
              fetchUserId();
              fetchEntitlementToken();
              setOpen(false);
            }}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
