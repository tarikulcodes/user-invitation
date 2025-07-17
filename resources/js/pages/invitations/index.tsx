import { DataTable } from '@/components/datatable';
import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Invitation } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const InvitationsIndex = ({ invitations }: { invitations: Invitation[] }) => {
    const columns: ColumnDef<Invitation>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        },
        {
            accessorKey: 'tracking_id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tracking ID" />,
            cell: ({ row }) => <span className="inline-block w-[10rem] truncate">{row.original.tracking_id}</span>,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) => (
                <div>
                    <p>{row.original.name}</p>
                    <span className="text-xs text-gray-500">{row.original.email}</span>
                </div>
            ),
        },
        {
            accessorKey: 'role',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        },
        {
            accessorKey: 'email_sent_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Email Sent At" />,
        },
        {
            accessorKey: 'expires_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Expires At" />,
        },
        {
            accessorKey: 'last_accessed_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Last Accessed At" />,
        },
        {
            accessorKey: 'accepted_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Accepted At" />,
        },
        {
            accessorKey: 'accepted_by',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Accepted By" />,
            cell: ({ row }) => {
                return <Badge variant="outline">{row.original.accepted_by?.name}</Badge>;
            },
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div>
                    <Button variant="destructive" size="sm" onClick={() => router.delete(route('invitations.destroy', row.original.id))}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Invitations" />
            {/* <pre>{JSON.stringify(invitations, null, 2)}</pre> */}
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Invitations</h1>
                    <Button asChild>
                        <Link href="/invitations/create">Create Invitation</Link>
                    </Button>
                </div>
                <Card>
                    <CardContent>
                        <DataTable columns={columns} data={invitations} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default InvitationsIndex;
