<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use App\Notifications\InvitationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('invitations/index', [
            'invitations' => InvitationResource::collection(Invitation::all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('invitations/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inputs = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:invitations,email',
            'role' => 'nullable|string|in:admin,user',
            'expired_in_days' => 'required|integer|min:1',
        ]);

        $inputs['tracking_id'] = Str::uuid()->toString();
        $inputs['expires_at'] = now()->addDays($inputs['expired_in_days']);
        $inputs['invited_by_id'] = $request->user()->id;

        $invitation = Invitation::create($inputs);

        try {
            $invitation->notify(new InvitationNotification($invitation));
            $invitation->update(['email_sent_at' => now()]);

            return redirect()->route('invitations.index')->with('success', 'Invitation sent successfully');
        } catch (\Exception $e) {
            return redirect()->route('invitations.index')->with('error', 'Failed to send invitation email: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        $invitation->delete();

        return redirect()->route('invitations.index')->with('success', 'Invitation deleted successfully');
    }


    public function registerForm(string $tracking_id, Request $request)
    {
        $invitation = Invitation::where('tracking_id', $tracking_id)->firstOrFail();

        $invitation->fill([
            'last_accessed_at' => now(),
        ])->save();

        // Verify the email matches if provided in the signed URL
        if ($request->has('email') && $invitation->email !== $request->get('email')) {
            abort(403, 'Invalid invitation link.');
        }

        // Check if invitation has expired
        if ($invitation->expires_at->isPast()) {
            abort(410, 'This invitation has expired.');
        }

        // Check if invitation was already used
        if ($invitation->accepted_at) {
            abort(410, 'This invitation has already been used.');
        }

        return Inertia::render('auth/invitation-register', [
            'invitation' => $invitation,
            'prefill' => [
                'name' => $request->get('name', $invitation->name),
                'email' => $request->get('email', $invitation->email),
            ]
        ]);
    }

    public function register(Request $request, string $tracking_id)
    {
        $invitation = Invitation::where('tracking_id', $tracking_id)->firstOrFail();
        $invitation->fill([
            'last_accessed_at' => now(),
        ])->save();

        // Verify the email matches if provided in the signed URL
        if ($request->has('email') && $invitation->email !== $request->get('email')) {
            abort(403, 'Invalid invitation link.');
        }

        // Check if invitation has expired
        if ($invitation->expires_at->isPast()) {
            abort(410, 'This invitation has expired.');
        }

        // Check if invitation was already used
        if ($invitation->accepted_at) {
            abort(410, 'This invitation has already been used.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = \App\Models\User::create([
            'name' => $validated['name'],
            'email' => $invitation->email,
            'password' => bcrypt($validated['password']),
            'email_verified_at' => now(), // Auto-verify since they came through invitation
        ]);

        // Mark invitation as used
        $invitation->update([
            'accepted_at' => now(),
            'accepted_by_id' => $user->id,
        ]);

        // Log the user in
        Auth::login($user);

        return redirect()->route('dashboard')->with('success', 'Welcome! Your account has been created successfully.');
    }
}
