import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { MoreVertical, Plus } from "lucide-react";

const mockUsers: User[] = [
    { id: 1, name: "Guy Hawkins", email: "rian@yandex.ru", role: "system_admin", isActive: true },
    { id: 2, name: "Dianne Russell", email: "ulfaha@mail.ru", role: "sub_user", isActive: false },
    { id: 3, name: "Annette Black", email: "seannand@mail.ru", role: "system_admin", isActive: true },
    { id: 4, name: "Jacob Jones", email: "fellora@mail.ru", role: "sub_user", isActive: false },
    { id: 5, name: "Arlene McCoy", email: "irnabela@gmail.com", role: "system_admin", isActive: true },
    { id: 6, name: "Kristin Watson", email: "fz...@gmail.com", role: "sub_user", isActive: false },
    { id: 7, name: "Wade Warren", email: "xeno@yandex.ru", role: "system_admin", isActive: true },
    { id: 8, name: "Darlene Robertson", email: "xterris@gmail.com", role: "sub_user", isActive: false },
    { id: 9, name: "Devon Lane", email: "ahana@mail.ru", role: "system_admin", isActive: true },
    { id: 10, name: "Bessie Cooper", email: "quasiah@gmail.com", role: "sub_user", isActive: false },
];

function getStatusBadge(isActive: boolean) {
    return isActive ? (
        <Badge className="bg-green-100 text-green-700">Active</Badge>
    ) : (
        <Badge variant="destructive" className="bg-red-100 text-red-700">Suspended</Badge>
    );
}

export default async function AccountPage() {
    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Account Management</h1>
                    <p className="text-muted-foreground text-sm">Manage user accounts, profiles, roles, and access permissions.</p>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white"><Plus className="mr-2 h-4 w-4" />Create User</Button>
            </div>
            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role === "system_admin" ? "Admin" : "Sub User"}</TableCell>
                                <TableCell>{getStatusBadge(!!user.isActive)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>Rows per page: 10</span>
                <span>1-10 of 40</span>
                <div className="flex gap-1">
                    <Button variant="outline" size="icon">&#60;&#60;</Button>
                    <Button variant="outline" size="icon">&#60;</Button>
                    <Button variant="outline" size="icon">&#62;</Button>
                    <Button variant="outline" size="icon">&#62;&#62;</Button>
                </div>
            </div>
        </div>
    );
}