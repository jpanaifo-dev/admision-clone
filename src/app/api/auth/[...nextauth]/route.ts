import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID!,
      clientSecret: CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.accessToken = account?.access_token
        token.idToken = account?.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/admision'
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Opcional: define tu propia página de login si es necesario
    newUser: '/admision', // Opcional: define tu propia página de registro si es necesario
  },
})

export { handler as GET, handler as POST }
