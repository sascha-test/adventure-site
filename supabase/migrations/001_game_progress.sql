create table public.game_progress (
  user_id uuid not null primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.game_progress enable row level security;

create policy "Users can read their own progress"
  on public.game_progress
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.game_progress
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.game_progress
  for update
  using (auth.uid() = user_id);
