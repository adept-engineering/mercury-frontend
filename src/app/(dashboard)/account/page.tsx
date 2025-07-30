import { AccountContainer } from "@/components/account/container";
import { getUsers } from "@/actions/user";

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
    const users = await getUsers();
    console.log(users);
    return (
        <AccountContainer data={users} />
    );
}