import { useSession } from "./auth-client";

export const useUserInfo = () => {
    const { data, isPending } = useSession();
    const session = data?.user || null;
    return { session, isPending };
};