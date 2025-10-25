import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Send user data to backend (Express)
        const response = await fetch("http://localhost:5000/api/user/save-user", {
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
