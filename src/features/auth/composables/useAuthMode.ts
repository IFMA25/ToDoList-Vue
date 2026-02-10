import { computed  } from "vue";
import { useRouter, useRoute } from "vue-router";

import { AuthMode } from "../types";

export const useAuthMode = () => {
  const route = useRoute();
  const router = useRouter();

  const switchMode = (mode: AuthMode) => {
    router.replace({
      name: "auth",
      query: {
        mode,
      },
    });
  };

  const pageMode = computed<AuthMode>(()  => {
    const mode = route.query.mode;
    if (mode === "signin" || mode === "signup") {
      return mode;
    }
    return "signin";
  });

  return {
    pageMode,
    switchMode,
  };
};

