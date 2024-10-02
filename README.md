# Use Supabase

A simple package to boost your supabase consumer app.

```tsx
// get automatic SWR revalidation on a whole table or a specific column in it
const { data: siteData } = useTable('site', '*')
const { data: siteIdData } = useTable('site', 'site_id')

// grab the client to doing anything you want.
const client = useSupabase()

// create a query and use all the postgres query options
const query = useSupabase().from('site').select('*')
// pass that query to useQuery and get automatic SWR revalidation on it.
const { data: queryData } = useQuery(query)
```

## Initialize Supabase

To get access to the hooks first pass use the SupabaseContextProvider at the root of your app.

### React App

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { SupabaseContextProvider } from '@emirchus/use-supabase'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient('supabase-url', 'supabase-anon-key')

ReactDOM.render(
  <React.StrictMode>
    <SupabaseContextProvider client={supabase}>
      <App />
    </SupabaseContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

### Next.js

#### NextJS App Router

Create a SupabaseProvider

`components/supabase-provider.tsx`

```tsx
'use client'
import { useMemo } from 'react'
import { SupabaseContextProvider } from '@emirchus/use-supabase'

import { createClient } from '@/lib/supabase/client'

interface SupabaseClientProviderProps {
  children: React.ReactNode
}

export const SupabaseClientProvider = ({
  children,
  ...props
}: SupabaseClientProviderProps) => {
  const supabase = useMemo(() => createClient(), [])

  return (
    <SupabaseContextProvider client={supabase}>
      {children}
    </SupabaseContextProvider>
  )
}
```

```tsx
import { SupabaseClientProvider } from '@/components/supabase-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <SupabaseClientProvider>{children}</SupabaseClientProvider>
      </body>
    </html>
  )
}
```

#### NextJS Pages Router

If you are using Next.js Pages Router, create a custom \_app.tsx like [explained here](https://nextjs.org/docs/advanced-features/custom-app).

## Hooks

There are a series of hooks that are made available and usable at your convenience.

### `useSupabase`

---

`useSupabase` is the most simple hook in this library. It returns the supabase js client from the context.

```tsx
const { auth, from } = useSupabase()
```

### `useTable`

---

`useTable` implements a stale while revalidate strategy. It is a convenient hook to quickly get all information from a table and revalidating the data with the best web performance principles. It will default to getting all the columns on a table but you can pass a select object to specify more details in the query.

```tsx
const { data } = useTable('users', '*')
```

### `useQuery`

---

`useQuery` gives you the same SWR capacities as `useTable` but gives you complete granular control on the query you pass.

```tsx
const query = useSupabase().from('users').select('*').eq(...)
const { data } = useQuery(query)
```

### `useUser`
---
`useUser` gives you access to the supabase client user. While it works in all React applications.

The context will make avaialble to the hooks the client and the user so that you can use it anywhere along the react component tree.

```tsx
const { email } = useUser()
```

## Credits
This project was originally created by [GuiBibeau](https://github.com/GuiBibeau). I appreciate the initial work and foundation laid by GuiBibeau, which has allowed this project to continue evolving and serving the needs of developers working with Supabase and React.
