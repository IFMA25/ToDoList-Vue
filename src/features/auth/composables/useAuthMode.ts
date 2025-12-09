import { computed  } from "vue";
import { useRouter, useRoute } from "vue-router";


type Mode = "signin" | "signup";

export const useAuthMode = () => {
  const route = useRoute();
  const router = useRouter();

  const switchMode = (mode: Mode) => {
    router.replace({
      name: "auth",
      query: {
        mode,
      },
    });
  };

  const pageMode = computed<Mode>(()  => {
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

