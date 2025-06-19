import { AccountContainer } from "@/components/account/container";
import { getUsers } from "@/actions/user";

export default async function AccountPage() {
    const users = await getUsers();
    return (
        <AccountContainer data={users} />
    );
}