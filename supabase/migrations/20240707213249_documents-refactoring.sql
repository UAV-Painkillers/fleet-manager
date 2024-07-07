create type "public"."document_category" as enum ('legal', 'miscellaneous', 'insurance');

drop policy "grant all for users on owned documents" on "public"."documents";

alter table "public"."documents" drop column "title";

alter table "public"."documents" add column "name" character varying not null;

alter table "public"."documents" alter column "category" drop default;

alter table "public"."documents" alter column "category" set data type document_category using "category"::document_category;

alter table "public"."documents" alter column "original_file_name" drop default;

alter table "public"."documents" alter column "path" drop default;


