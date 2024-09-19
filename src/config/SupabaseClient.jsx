
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ixixpvtfdlsrtnyfefdy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aXhwdnRmZGxzcnRueWZlZmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjAwOTYsImV4cCI6MjAzMzc5NjA5Nn0.B1NhD5ASjvNy8--ilVp_7alkeM4gVBMzp487p0AMWks'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase