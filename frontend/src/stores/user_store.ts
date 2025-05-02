import { create } from "zustand";
import { useAccessTokenStore } from "./auth_store";
import axios from "axios";
import { PlayerInfoResponse } from "@/models/auth";

interface UserStoreType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
  fetchUserId: () => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
  userId: null,
  setUserId: (userId: string | null) => set({ userId: userId }),
  fetchUserId: () => {
    const accessToken = useAccessTokenStore.getState().accessToken;
    if (!accessToken) {
      return;
    }
    axios
      .get<PlayerInfoResponse>("/api/userinfo", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        set({ userId: response.data.sub });
        console.log("userId:", response.data.sub);
      });
  },
}));
