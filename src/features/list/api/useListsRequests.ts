import {
  UseApiOptions,
  useApiPost,
} from '@ametie/vue-muza-use';

import { Lists } from '../types';

export const useListsDataRequest = (options?: UseApiOptions<Lists>) => {
  return useApiPost("/lists", {
    ...options,
  });
};


