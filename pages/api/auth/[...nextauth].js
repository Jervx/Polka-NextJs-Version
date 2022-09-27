import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import mongoConnect from "../../../services/mongoDb";
import Users from "../../../models/User";

mongoConnect();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userExist = await Users.findOne({ email: user.email });
      if (!userExist) {
        const createUserData = await Users.create({
          email: profile.email, 
          name: user.name, 
          givenName: profile.given_name, 
          picture: user.image,
          locale: "en-US",
          provider: account.provider,
          signInCount: 1,
        });
      } else {
        const updateUserData = await Users.updateOne(
          { email: user.email },
          {
            $set: {
              lastSignedIn: new Date(),
              picture : user.image,
              name: user.name, 
              givenName: profile.given_name
            },
            $inc: {
              signInCount: 1,
            },
          }
        );
      }

      return true;
    },

    async session({ session, token, user }) {
        const uid = await Users.findOne({email : session.user.email}, {_id : 1});
        session.user.uid = uid._id
        session.accessToken = token.accessToken
        return session
      }
  },
  secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);
