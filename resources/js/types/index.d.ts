import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    requiresAdmin?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Invitation {
    id: number;
    tracking_id: string;
    name: string;
    email: string;
    role: string;
    expires_at: string;
    expired_in_days: number;
    invited_by: User;
    accepted_at: string;
    accepted_by: User;
    email_sent_at: string;
    last_accessed_at: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
