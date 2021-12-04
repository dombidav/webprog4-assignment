import jwtDecode from 'jwt-decode'

/** Used as a type when making a request to the API */
export interface IToken {
    token: string;
    token_type: 'bearer'|'http';
    expires_in: number;
}

/**
 * A class that handles the JWT token
 */
export class JsonWebTokenEntity implements IToken{

  constructor(
    public readonly token: string,
    public readonly token_type: 'bearer'|'http',
    public readonly expires_in: number
  ) {}

  /** Decodes the token and returns the raw token object */
  getDecodedAccessToken(): any {
    try{
      return jwtDecode(this.token)
    }
    catch(Error){
      return null
    }
  }
}
