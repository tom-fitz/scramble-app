export class User {
  email = "";
  password = "";
  id? = "";
  userName? = "";
  userType? = "";
  accessToken? = "";
}

export class Login {
  email = "";
  password = "";
}

export const UserViewTypes = {
  GolferView: "golferView",
  ProShopView: "proShopView",
};
