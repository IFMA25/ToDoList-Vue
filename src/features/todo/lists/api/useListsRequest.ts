import {
  useApiGet,
  UseApiOptions,
} from "@ametie/vue-muza-use";

import { ListsResponse } from "../types";

export const useListsDataRequest = (options?: UseApiOptions<ListsResponse>) => {
  return useApiGet("/lists", {
    ...options,
  });
};
