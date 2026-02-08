import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqzcdmncxuhifovrecpv.supabase.co'; // حط الرابط ديالك
const supabaseKey = 'sb_publishable_BRhhFsw_1FJZMGucZFKuWA_wrrAsiXn'; // حط الساروت ديالك

// Export const (ماشي default)
export const supabase = createClient(supabaseUrl, supabaseKey);
