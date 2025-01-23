import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

const authOptions = {
  session: {
    maxAge: 60 * 20
  },
  jwt: {
    maxAge: 60 * 20
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        if (credentials.username !== 'admin' || credentials.password !== 'admin') throw new Error('credentials')

        return { username: credentials.username }
      }
    })
  ],
  callbacks: {
    async signIn ({ account, user }) {
      if (account.provider !== 'credentials') {
        return false
      }
      return user
    },
    async jwt ({ token, user }) {
      if (user) {
        token = {
          ...token,
          username: user.username
        }
      }

      return token
    },
    async session ({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          username: token.username
        }
      }
      return session
    }
  },
  pages: {
  },
  theme: {
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST, authOptions }
