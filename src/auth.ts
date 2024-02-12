import NextAuth from "next-auth";
import AzureAd from "next-auth/providers/azure-ad";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    authorized: ({ auth, request }) => {
      if (request.nextUrl.basePath === "/unauthorized") return true;

      return !!auth;
    },
  },
  providers: [
    AzureAd({
      authorization: {
        params: {
          scope: `openid profile email ${process.env.AUTH_AZURE_AD_API_SCOPE}`,
        },
      },
      clientId: process.env.AUTH_AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AUTH_AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AUTH_AZURE_AD_TENANT_ID,
    }),
  ],
});
