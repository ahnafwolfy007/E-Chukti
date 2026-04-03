-- Create a bucket for storing generated contracts
insert into storage.buckets (id, name, public)
values ('contracts', 'contracts', false);

-- Enable Row Level Security (RLS) on the storage.objects table
alter table storage.objects enable row level security;

-- Policy: Allow authenticated users to upload files to their own folder
create policy "Users can upload their own contracts"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'contracts' AND
  (auth.uid()::text = (string_to_array(name, '/'))[1])
);

-- Policy: Allow authenticated users to select/read their own files
create policy "Users can view their own contracts"
on storage.objects for select
to authenticated
using (
  bucket_id = 'contracts' AND
  (auth.uid()::text = (string_to_array(name, '/'))[1])
);

-- Policy: Allow authenticated users to update their own files
create policy "Users can update their own contracts"
on storage.objects for update
to authenticated
using (
  bucket_id = 'contracts' AND
  (auth.uid()::text = (string_to_array(name, '/'))[1])
);

-- Policy: Allow authenticated users to delete their own files
create policy "Users can delete their own contracts"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'contracts' AND
  (auth.uid()::text = (string_to_array(name, '/'))[1])
);
