import NextAuth from 'next-auth/next';
import Providers from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    Providers({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
});