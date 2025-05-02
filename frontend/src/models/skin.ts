export type WeaponSkinResponse = {
  status: number;
  data: WeaponSkin[];
};

export type WeaponSkin = {
  uuid: string;
  displayName: string;
  displayIcon: string;
};
