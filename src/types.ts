import type { SupabaseClient, User } from '@supabase/supabase-js'

export type SupabaseContextType = {
  sb: SupabaseClient | null
  user: User | null
}

export type SelectArg<Query extends string = '*'> =
  | Query
  | {
      query: Query
      head?: boolean
      count?: 'exact' | 'planned' | 'estimated'
    }
