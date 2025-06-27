import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/");
        toast.success("Sign in successful");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
