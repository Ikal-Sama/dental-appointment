export const authConfig = {
    session: {
      strategy: 'jwt',
    },
    providers: [], // Your providers will go here
    callbacks: {
      async jwt({ token, user }: any) {
        // Attach user ID to the token
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }: any) {
        // Attach user ID to the session
        if (token?.id) {
          session.user.id = token.id;
          session.user.role = token.role;  
        }
        return session;
      },
    },
  };