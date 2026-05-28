import { createClient } from '@supabase/supabase-js'

// Ye wo keys hain jo aapne abhi .env file mein daali thi
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Ye aapka database client hai jo aage poori app mein use hoga
export const supabase = createClient(supabaseUrl, supabaseAnonKey)