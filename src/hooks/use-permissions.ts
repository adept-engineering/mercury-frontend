import { useCurrentSession } from "./use-current-session";

export const usePermissions = (ownerId?: number) => {
    
    const { session } = useCurrentSession();
    const currentUser = session?.user;

    const isSystemAdmin = currentUser?.role === "system_admin";
    const canDelete = isSystemAdmin;
    const canEdit = isSystemAdmin;
    const isOwner = currentUser?.id === ownerId;
    const canResetPassword = isSystemAdmin || isOwner;

    return { isSystemAdmin, canDelete, canEdit, isOwner, canResetPassword };
}