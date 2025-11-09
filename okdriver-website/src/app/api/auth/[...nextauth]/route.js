import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

 const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '57469493249-ketlh6odhp1u6rbt34rgpgnvip3jk77o.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        backendId: { label: "Backend ID", type: "text" },
      },
      async authorize(credentials) {
        try {
          console.log('Authorize called with credentials:', {
            email: credentials?.email,
            backendId: credentials?.backendId,
            name: credentials?.name,
            hasEmail: !!credentials?.email,
            hasBackendId: !!credentials?.backendId,
          });
          
          // This is called when user logs in with credentials
          // The credentials are already validated by the login/register page
          if (credentials?.email && credentials?.backendId) {
            const user = {
              id: String(credentials.backendId),
              email: credentials.email,
              name: credentials.name || credentials.email,
              backendId: String(credentials.backendId),
            };
            console.log('Authorize returning user:', { id: user.id, email: user.email, name: user.name });
            return user;
          }
          console.error('Missing required credentials:', { 
            email: credentials?.email, 
            backendId: credentials?.backendId,
            allKeys: credentials ? Object.keys(credentials) : 'no credentials'
          });
          return null;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Only process Google OAuth sign-ins here
      // Credentials provider users are already validated in authorize function
      if (account?.provider === 'google') {
        try {
          // Send user data to backend (Express)
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.okdriver.in';
          const response = await fetch(`${apiBaseUrl}/api/user/save-user`, {
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
      }
      
      // For credentials provider, just return true (already validated)
      if (account?.provider === 'credentials') {
        return true;
      }
      
      return true;
    },
    async session({ session, token }) {
      // Add backend user ID to session
      if (token.backendId) {
        session.user.backendId = token.backendId;
      }
      // For credentials provider, add email and name from token
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.name) {
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Store backend user ID in token
      if (user?.backendId) {
        token.backendId = user.backendId;
      }
      // For credentials provider, user data is already in the token
      if (account?.provider === 'credentials' && user) {
        token.backendId = user.backendId;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
  pages: {
    signIn: '/user/login',
    error: '/user/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
