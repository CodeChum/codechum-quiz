import { supabase } from '@/lib/supabase';
import { QueryData } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

const useItemSolution = ({
  itemId,
  isEnabled = false,
}: {
  itemId: string;
  isEnabled?: boolean;
}) =>
  useQuery({
    queryKey: ['solution', itemId],
    queryFn: async () => {
      const solutionsQuery = supabase
        .from('item_solutions')
        .select(
          `
          option_id
        `
        )
        .eq('item_id', itemId);
      type Solutions = QueryData<typeof solutionsQuery>;

      const { data, error } = await solutionsQuery;
      if (error) throw error;

      const solutions: Solutions = data;
      return solutions;
    },
    enabled: !!itemId && isEnabled,
  });

export default useItemSolution;
