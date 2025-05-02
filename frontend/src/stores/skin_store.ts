import { WeaponSkin, WeaponSkinResponse } from "@/models/skin";
import axios from "axios";
import { create } from "zustand";

interface SkinStoreType {
  skins: WeaponSkin[];
  setSkins: (skins: WeaponSkin[]) => void;
  fetchSkins: () => void;
}

export const useSkinStore = create<SkinStoreType>((set) => ({
  skins: [],
  setSkins: (skins: WeaponSkin[]) => set({ skins: skins }),
  fetchSkins: () => {
    axios
      .get<WeaponSkinResponse>(
        "https://valorant-api.com/v1/weapons/skinlevels",
        {},
      )
      .then((response) => {
        set({ skins: response.data.data });
        console.log("loaded", response.data.data.length, "skins");
      });
  },
}));
