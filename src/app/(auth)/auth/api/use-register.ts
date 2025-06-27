import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/sign-in");
        toast.success("Sign up successful");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
