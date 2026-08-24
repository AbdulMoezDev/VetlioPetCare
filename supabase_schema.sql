-- ==============================================================================
-- VETLIO PET CARE: SUPABASE DATABASE SCHEMA
-- Paste this script into your Supabase SQL Editor and click "Run"
-- ==============================================================================

-- 1. Create Profiles Table (Linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to auto-create profile row on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Create Appointments Table
create table if not exists public.appointments (
  id text primary key, -- e.g. 'VET-92814'
  user_id uuid references auth.users(id) on delete cascade,
  service_id text not null,
  service_title text not null,
  doctor_name text,
  pet_name text not null,
  pet_type text not null,
  pet_breed text,
  pet_age text,
  owner_name text not null,
  owner_email text not null,
  owner_phone text,
  appointment_date date not null,
  time_slot text not null,
  status text default 'Confirmed' check (status in ('Confirmed', 'Completed', 'Cancelled')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Appointments
alter table public.appointments enable row level security;

-- Policies for appointments: Users can see, insert, and update their own appointments
create policy "Users can view their own appointments"
  on public.appointments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own appointments"
  on public.appointments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own appointments"
  on public.appointments for update
  using (auth.uid() = user_id);
