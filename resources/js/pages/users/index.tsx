import { DataTable } from '@/components/datatable';
import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const UsersIndex = ({ users }: { users: User[] }) => {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            cell: ({ row }) => {
                return (
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={row.original.avatar} />
                        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                );
            },
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        },
        {
            header: 'Email',
            accessorKey: 'email',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={`mailto:${row.original.email}`} className="text-blue-500 italic">
                            {row.original.email}
                        </Link>
                        {row.original.email_verified_at ? <Badge variant="outline">Verified</Badge> : <Badge variant="secondary">Not Verified</Badge>}
                    </div>
                );
            },
        },
        {
            header: 'Role',
            accessorKey: 'role',
            cell: ({ row }) => {
                return <Badge variant="outline">{row.original.role}</Badge>;
            },
        },
        {
            header: 'Created At',
            accessorKey: 'created_at',
        },
        {
            header: 'Updated At',
            accessorKey: 'updated_at',
        },
        {
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => router.delete(route('users.destroy', row.original.id))}
                        disabled={row.original.id === 1 || row.original.id === 2}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    return (
        <AppLayout>
            <Head title="Users" />
            {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Users</h1>
                <Card>
                    <CardContent>
                        <DataTable columns={columns} data={users} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default UsersIndex;
