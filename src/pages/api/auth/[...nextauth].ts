import NextAuth from 'next-auth/next';
import Providers from 'next-auth/providers/github';
import { getUsers } from '../../../services/firebaseConnection';


export default NextAuth({
  providers: [
    Providers({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      try {
        const lastDonate = await getUsers(token.sub).then((snapshot) => {
          if (snapshot.lastDonate) {
            return snapshot.lastDonate.toDate();
          } else {
            return null;
          }
        });

        return {
          ...session,
          id: token.sub,
          vip: lastDonate ? true : false,
          lastDonate,
        };
      } catch (err) {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null,
        };
      }
    },
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        return true;
      } catch (err) {
        console.log('Deu erro', err);

        return false;
      }
    },
  },
});
