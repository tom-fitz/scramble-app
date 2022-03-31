export class User {
  public email = "";
  public password = "";
  public id? = "";
  public userName? = "";
  public userType? = "";
  public accessToken? = "";
  public address?: Address;
  constructor(
    email = "",
    password = "",
    id?: string,
    userName?: string,
    userType?: string,
    accessToken?: string,
    address?: Address
  ) {}
}

interface Location {
  lat: number;
  lng: number;
}

export class Login {
  email = "";
  password = "";
}

export const UserViewTypes = {
  GolferView: "golferView",
  ProShopView: "proShopView",
};

export interface AddressComponents {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AddressEvt {
  address: AddressComponents[];
  location: LatLng;
}

export type Address = AddressEvt;
