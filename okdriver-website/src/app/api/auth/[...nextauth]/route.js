import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

 const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '57469493249-ketlh6odhp1u6rbt34rgpgnvip3jk77o.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Send user data to backend (Express)
        const response = await fetch("https://backend.okdriver.in/api/user/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            googleId: user.id,
            name: user.name, 
            email: user.email,
            picture: user.image,
            emailVerified: user.emailVerified
          }),
        });
        
        if (!response.ok) {
          console.error('Failed to save user to backend');
          return false;
        }
        
        const result = await response.json();
        if (result.success) {
          // Store user ID in the user object for session
          user.backendId = result.user.id;
        }
        
        return true;
      } catch (error) {
        console.error('Error saving user:', error);
        return false;
      }
    },
    async session({ session, token }) {
      // Add backend user ID to session
      if (token.backendId) {
        session.user.backendId = token.backendId;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Store backend user ID in token
      if (user?.backendId) {
        token.backendId = user.backendId;
      }
      return token;
    },
  },
  pages: {
    signIn: '/user/login',
    error: '/user/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
