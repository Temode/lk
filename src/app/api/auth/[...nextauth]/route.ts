import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔐 [AUTH] Tentative d\'authentification pour:', credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          console.error('❌ [AUTH] Email ou mot de passe manquant')
          throw new Error("Email et mot de passe requis")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          console.error('❌ [AUTH] Utilisateur non trouvé ou sans mot de passe')
          throw new Error("Identifiants invalides")
        }

        console.log('👤 [AUTH] Utilisateur trouvé:', user.email)

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          console.error('❌ [AUTH] Mot de passe invalide')
          throw new Error("Identifiants invalides")
        }

        console.log('✅ [AUTH] Authentification réussie pour:', user.email)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id
        (session.user as any).role = token.role
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
