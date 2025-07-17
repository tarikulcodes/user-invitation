import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

const InvitationCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: '',
        expired_in_days: 7,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('invitations.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Invitation" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Create Invitation</h1>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="space-y-2" id="name">
                                    <Label htmlFor="name" className="mb-2 inline-block">
                                        Name
                                    </Label>
                                    <Input type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-2" id="email">
                                    <Label htmlFor="email" className="mb-2 inline-block">
                                        Email
                                    </Label>
                                    <Input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2" id="role">
                                    <Label htmlFor="role" className="mb-2 inline-block">
                                        Role
                                    </Label>
                                    <Select name="role" value={data.role} onValueChange={(value) => setData('role', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>
                                <div className="space-y-2" id="expired_in_days">
                                    <Label htmlFor="expired_in_days" className="mb-2 inline-block">
                                        Expired In Days
                                    </Label>
                                    <Select
                                        name="expired_in_days"
                                        value={data.expired_in_days.toString()}
                                        onValueChange={(value) => setData('expired_in_days', Number(value))}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a expired in days" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Day</SelectItem>
                                            <SelectItem value="3">3 Days</SelectItem>
                                            <SelectItem value="7">7 Days</SelectItem>
                                            <SelectItem value="14">14 Days</SelectItem>
                                            <SelectItem value="30">30 Days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.expired_in_days} />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button type="submit" disabled={processing} className="mt-4">
                                    {processing ? 'Processing...' : 'Send Invitation'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default InvitationCreate;
