import { DataTable } from '@/components/datatable';
import { DataTableColumnHeader } from '@/components/datatable-column-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Invitation } from '@/types';
import { Head, Link } from '@inertiajs/react';
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
        },
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        },
        {
            accessorKey: 'role',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        },
        {
            header: 'Created At',
            accessorKey: 'created_at',
        },
        {
            header: 'Updated At',
            accessorKey: 'updated_at',
        },
    ];

    return (
        <AppLayout>
            <Head title="Invitations" />
            <pre>{JSON.stringify(invitations, null, 2)}</pre>
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
