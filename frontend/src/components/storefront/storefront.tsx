import { useEntitlementTokenStore } from "@/stores/auth_store";
import { useSkinStore } from "@/stores/skin_store";
import { useStorefrontStore } from "@/stores/storefront_store";
import { useUserStore } from "@/stores/user_store";
import { useEffect } from "react";

export const StoreFront = () => {
  const fetchSkins = useSkinStore((state) => state.fetchSkins);
  const fetchStorefront = useStorefrontStore((state) => state.fetchStorefront);
  const entitlement = useEntitlementTokenStore(
    (state) => state.entitlementToken,
  );
  const puuid = useUserStore((state) => state.userId);
  const storefront = useStorefrontStore((state) => state.storefront);
  const weaponSkins = useSkinStore((state) => state.skins);
  useEffect(() => {
    fetchSkins();
  }, []);
  useEffect(() => {
    if (!entitlement || !puuid) {
      return;
    }
    fetchStorefront();
  }, [entitlement, puuid]);
  return (
    <div className="px-4 py-8 min-h-96">
      <h2 className="text-4xl font-bold mb-6 text-center">StoreFront</h2>
      {storefront ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storefront.SkinsPanelLayout.SingleItemStoreOffers.map((offer) => (
            <div
              key={offer.OfferID}
              className="bg-[#1E293B] shadow rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={
                  weaponSkins.find((value) => value.uuid == offer.OfferID)
                    ?.displayIcon
                }
                alt={
                  weaponSkins.find((value) => value.uuid == offer.OfferID)
                    ?.displayName
                }
                className="w-full h-40 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">
                  {
                    weaponSkins.find((value) => value.uuid == offer.OfferID)
                      ?.displayName
                  }
                </h3>
                <p className="text-[#3B82F6] font-bold">
                  {offer.Cost["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"]}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl">
            {entitlement ? "loading..." : "You are not logged in."}
          </h1>
        </div>
      )}
    </div>
  );
};
