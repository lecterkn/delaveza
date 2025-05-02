import { EntitlementResponse } from "@/models/auth";
import axios from "axios";
import { create } from "zustand";

// const CORS_BYPASS_HOST = "https://cors-anywhere.herokuapp.com/";
//
// const ENTITLEMENT_TOKEN_URL =
//   "https://entitlements.auth.riotgames.com/api/token/v1";

interface AccessTokenStoreType {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setAccessTokenFromUrl: (url: string) => void;
}

interface EntitlementTokenStoreType {
  entitlementToken: string | null;
  setEntitlementToken: (entitlementToken: string | null) => void;
  fetchEntitlementToken: () => void;
}

export const useAccessTokenStore = create<AccessTokenStoreType>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken: string | null) =>
    set({
      accessToken: accessToken,
    }),
  setAccessTokenFromUrl: (url: string) => {
    const parsedUrl = new URL(url);
    const accessToken = new URLSearchParams(parsedUrl.hash.substring(1)).get(
      "access_token",
    );
    console.log("accessToken:", accessToken);
    if (accessToken != null) {
      set({ accessToken: accessToken });
    }
  },
}));

export const useEntitlementTokenStore = create<EntitlementTokenStoreType>(
  (set) => ({
    entitlementToken: null,
    setEntitlementToken: (entitlementToken: string | null) =>
      set({
        entitlementToken: entitlementToken,
      }),
    fetchEntitlementToken: () => {
      const accessToken = useAccessTokenStore.getState().accessToken;
      if (!accessToken) {
        return;
      }
      axios
        .post<EntitlementResponse>("/api/entitlements", undefined, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          set({ entitlementToken: response.data.entitlements_token });
          console.log("entitlements:", response.data.entitlements_token);
        });
    },
  }),
);

// function decodeBase64URLSafe(base64: string): string {
//   // Base64URL -> Base64 に変換
//   base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
//   // パディング追加
//   const pad = base64.length % 4;
//   if (pad) {
//     base64 += "=".repeat(4 - pad);
//   }
//   return Buffer.from(base64, "base64").toString("utf-8");
// }
