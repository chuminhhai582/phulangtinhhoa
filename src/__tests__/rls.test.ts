import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const shouldRunTests = SUPABASE_URL !== '' && SUPABASE_SERVICE_ROLE_KEY !== '';

describe.runIf(shouldRunTests)('Row Level Security (RLS) Integration Tests', () => {
  let supabaseAdmin: SupabaseClient;

  // We will create temporary users for testing
  let artisanUserId: string;
  let customerUserId: string;
  let artisanToken: string;
  let customerToken: string;

  beforeAll(async () => {
    supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 1. Create Artisan User
    const { data: artisanData, error: artisanErr } = await supabaseAdmin.auth.admin.createUser({
      email: 'test_artisan_' + Date.now() + '@example.com',
      password: 'password123',
      email_confirm: true,
    });
    if (artisanErr) throw artisanErr;
    artisanUserId = artisanData.user.id;

    // Sign in to get token
    const { data: artisanSession } = await supabaseAdmin.auth.signInWithPassword({
      email: artisanData.user.email!,
      password: 'password123',
    });
    artisanToken = artisanSession.session!.access_token;

    // Create profile for artisan
    await supabaseAdmin.from('profiles').insert({
      id: artisanUserId,
      full_name: 'Test Artisan',
      role: 'artisan',
    });

    // 2. Create Customer User
    const { data: customerData, error: customerErr } = await supabaseAdmin.auth.admin.createUser({
      email: 'test_customer_' + Date.now() + '@example.com',
      password: 'password123',
      email_confirm: true,
    });
    if (customerErr) throw customerErr;
    customerUserId = customerData.user.id;

    // Sign in to get token
    const { data: customerSession } = await supabaseAdmin.auth.signInWithPassword({
      email: customerData.user.email!,
      password: 'password123',
    });
    customerToken = customerSession.session!.access_token;

    // Create profile for customer
    await supabaseAdmin.from('profiles').insert({
      id: customerUserId,
      full_name: 'Test Customer',
      role: 'customer',
    });
  });

  afterAll(async () => {
    // Cleanup users
    if (artisanUserId) await supabaseAdmin.auth.admin.deleteUser(artisanUserId);
    if (customerUserId) await supabaseAdmin.auth.admin.deleteUser(customerUserId);
  });

  const getClientForToken = (token: string) => {
    return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { // Use anon key in real scenario, here we just override auth
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        persistSession: false,
      },
    });
  };

  it('[artisan] SELECT households WHERE id <> my_household() -> 0 dòng', async () => {
    const artisanClient = getClientForToken(artisanToken);
    
    // Attempt to read all households. RLS should limit it to only the artisan's household (which is none currently, so 0 rows).
    const { data, error } = await artisanClient.from('households').select('*');
    
    expect(error).toBeNull();
    expect(data?.length).toBe(0);
  });

  it('[artisan] SELECT order_lines.unit_price -> không đọc được', async () => {
    const artisanClient = getClientForToken(artisanToken);
    
    // We expect this to fail or return 0 rows if they try to access order_lines not belonging to them
    const { data, error } = await artisanClient.from('order_lines').select('unit_price');
    
    expect(error).toBeNull(); // It won't throw an error, it will just return 0 rows due to RLS
    expect(data?.length).toBe(0);
  });

  it('[customer] SELECT order_lines.unit_cost -> không đọc được', async () => {
    const customerClient = getClientForToken(customerToken);
    
    // Customer should query order_lines_customer view, but if they hit order_lines directly:
    const { data, error } = await customerClient.from('order_lines').select('unit_cost');
    
    // RLS blocks customer from reading order_lines directly
    expect(data?.length).toBe(0);
  });

  it('[customer] SELECT households.phone -> không đọc được', async () => {
    const customerClient = getClientForToken(customerToken);
    
    // Querying households should be blocked by RLS for customers, unless via view
    const { data } = await customerClient.from('households').select('phone');
    expect(data?.length).toBe(0);
  });

  it('[anon] SELECT product_passports WHERE published = false -> 0 dòng', async () => {
    // Anon client (no token)
    const anonClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { // anon key is usually different but using service role without auth header simulates anon
      global: { headers: { Authorization: '' } },
      auth: { persistSession: false },
    });
    
    const { data, error } = await anonClient.from('product_passports').select('*').eq('published', false);
    
    expect(error).toBeNull();
    expect(data?.length).toBe(0);
  });

  it('[bất kỳ] DELETE FROM audit_logs -> bị từ chối', async () => {
    const artisanClient = getClientForToken(artisanToken);
    
    // RLS policy prevents delete on audit_logs
    const { error } = await artisanClient.from('audit_logs').delete().eq('id', 1);
    
    // Usually Supabase doesn't return an error for RLS violation on delete, it just deletes 0 rows.
    // If we want to strictly check if it throws, we check count
    const { count } = await artisanClient.from('audit_logs').delete().eq('id', 1).select('*', { count: 'exact' });
    expect(count).toBe(0); // Actually select returns null/0 on delete with RLS blocked
  });
});

describe.runIf(!shouldRunTests)('Row Level Security (RLS) Integration Tests [SKIPPED]', () => {
  it('skips tests because SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing', () => {
    console.warn('Skipping RLS tests. Please provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment.');
    expect(true).toBe(true);
  });
});
