import { useSession } from "./auth-client";

export const useUserInfo = () => {
    const { data, isPending, refetch, error } = useSession();
    const session = data?.user || null;
    return { session, isPending, refetch, error };
};