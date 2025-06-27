import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        // router.push("/sign-in");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });

  return mutation;
};
