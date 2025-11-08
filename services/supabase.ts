import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://blespwzhhmhgyggfdymz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZXNwd3poaG1oZ3lnZ2ZkeW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MjA5MzUsImV4cCI6MjA3ODA5NjkzNX0.9DgPk1vh8KAem1Nin7ZM1isN1lOwSU0EuJ9lMWKYHWY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
