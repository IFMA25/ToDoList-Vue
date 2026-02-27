import {
  useApiGet,
  UseApiOptions,
  useApiPatch,
} from "@ametie/vue-muza-use";
import { MaybeRefOrGetter, toValue } from "vue";

import { ListData, ListsResponse } from "../types";
import { UpdateListData } from "./../types/index";

export const useListsDataRequest = (options?: UseApiOptions<ListsResponse>) => {
  return useApiGet("/lists", {
    ...options,
  });
};


export const useUpdateLists = (
  listId: MaybeRefOrGetter<string>,
  options?: UseApiOptions<ListData, UpdateListData>,
) => {
  return useApiPatch<ListData, UpdateListData>(() => `/lists/${toValue(listId)}`, options);
};
