import { supabase } from '@/lib/supabase';
import { QueryData } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

const useItems = () =>
  useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const itemsQuery = supabase
        .from('items')
        .select(
          `
        id,
        question,
        type,
        options(
          id,
          text
        )
      `
        )
        .eq('is_shown', true);
      type ItemsWithOptions = QueryData<typeof itemsQuery>;

      const { data, error } = await itemsQuery;
      if (error) throw error;

      const itemsWithOptions: ItemsWithOptions = data;
      return itemsWithOptions;
    },
  });

export default useItems;
