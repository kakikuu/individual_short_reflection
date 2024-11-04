import * as jwt from "jsonwebtoken";

export class jwtHelper {
  static jweSecret = "secret123";

  static createToken(userId: string) {
    const payload = { userId: userId };
    const token = jwt.sign(payload, this.jweSecret, {
      expiresIn: "30d",
    });
    return token;
  }
  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jweSecret);
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
