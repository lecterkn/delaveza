import { create } from "zustand";
import { StorefrontResponse } from "../models/store";
import { useAccessTokenStore, useEntitlementTokenStore } from "./auth_store";
import axios from "axios";
import { useUserStore } from "./user_store";

interface StorefrontStoreType {
  storefront: StorefrontResponse | null;
  setStorefront: (storefront: StorefrontResponse | null) => void;
  fetchStorefront: () => void;
}

export const useStorefrontStore = create<StorefrontStoreType>((set) => ({
  storefront: null,
  setStorefront: (storefront: StorefrontResponse | null) =>
    set({
      storefront: storefront,
    }),
  fetchStorefront: () => {
    const accessToken = useAccessTokenStore.getState().accessToken;
    const entitlementToken =
      useEntitlementTokenStore.getState().entitlementToken;
    const puuid = useUserStore.getState().userId;
    if (!accessToken || !entitlementToken || !puuid) {
      return;
    }
    axios
      .get<StorefrontResponse>("/api/storefront?puuid=" + puuid, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "X-Riot-Entitlements-JWT": entitlementToken,
        },
      })
      .then((response) => {
        set({ storefront: response.data });
        console.log(
          "loaded storefront single item offers:",
          response.data.SkinsPanelLayout.SingleItemOffers.length,
        );
      });
  },
}));
