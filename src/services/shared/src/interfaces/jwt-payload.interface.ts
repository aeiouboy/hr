export interface JwtPayload {
  sub: string;
  email: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  realm_access: {
    roles: string[];
  };
  resource_access?: Record<
    string,
    {
      roles: string[];
    }
  >;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string | string[];
}

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
