-- Trigger helpers do not need public API execution.
ALTER FUNCTION public.update_updated_at_column() SET search_path = pg_catalog;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
