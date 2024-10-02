import type { SupabaseClient, User } from '@supabase/supabase-js'
import * as React from 'react'
import { SupabaseContextType } from '../types'

export const SupabaseContext = React.createContext<SupabaseContextType>({
  sb: null,
  user: null,
})

export type SupabaseContextProviderProps = {
  client: SupabaseClient
  children: React.ReactNode
}

/**
 * SupabaseContextProvider is a context provider giving access to the supabase client to child along the React tree
 *  You should pass to it an authenticated supabase client see https://supabase.io/docs/client/initializing for details
 * ```typescript
 * <SupabaseContextProvider client={supabase}>
 *    <App />
 * </SupabaseContextProvider>
 * ```
 */
export const SupabaseContextProvider: React.FC<
  SupabaseContextProviderProps
> = ({ children, client }) => {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    client.auth.getUser().then(({ data }) => setUser(data.user))

    client.auth.onAuthStateChange((event, session) => {
      const signInEvents = [
        'INITIAL_SESSION',
        'SIGNED_IN',
        'TOKEN_REFRESHED',
        'USER_UPDATED',
      ]

      if (signInEvents.includes(event)) {
        setUser(session?.user!)
      }
      if (!signInEvents.includes(event)) {
        setUser(null)
      }
    })
  }, [])

  return (
    <SupabaseContext.Provider value={{ user, sb: client }}>
      {children}
    </SupabaseContext.Provider>
  )
}
