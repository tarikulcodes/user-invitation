import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type InvitationRegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    invitation_id: string;
};

type InvitationRegisterProps = {
    invitation: {
        id: string;
        tracking_id: string;
        name: string;
        email: string;
        expires_at: string;
    };
    prefill: {
        name: string;
        email: string;
    };
};

export default function InvitationRegister({ invitation, prefill }: InvitationRegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<InvitationRegisterForm>>({
        name: prefill.name || '',
        email: prefill.email || '',
        password: '',
        password_confirmation: '',
        invitation_id: invitation.tracking_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        try {
            // Preserve all query parameters from the current URL (including signature)
            const currentUrl = new URL(window.location.href);
            const queryParams = Object.fromEntries(currentUrl.searchParams.entries());

            // Ensure tracking_id is included and remove any undefined values
            const routeParams: Record<string, string> = {
                tracking_id: invitation.tracking_id,
                ...queryParams,
            };

            // Filter out any undefined or null values
            Object.keys(routeParams).forEach((key) => {
                if (routeParams[key] === undefined || routeParams[key] === null || routeParams[key] === '') {
                    delete routeParams[key];
                }
            });

            post(route('invitation.register', routeParams), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        } catch (error) {
            console.error('Error submitting invitation registration:', error);
            // Fallback to basic submission if URL parsing fails
            post(route('invitation.register', { tracking_id: invitation.tracking_id }), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        }
    };

    return (
        <AuthLayout title="Invitation Register" description="Enter your details below to create your account">
            <Head title="Invitation Register" />

            <div className="mb-6 rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">You've been invited!</h3>
                <p className="text-sm text-muted-foreground">
                    Complete your registration to join as <strong>{invitation.email}</strong>
                </p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={true}
                            placeholder="email@example.com"
                            className="bg-muted"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Register with invitation
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
