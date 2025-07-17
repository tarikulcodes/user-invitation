<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use Illuminate\Http\Request;
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

        return redirect()->route('invitations.index');
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
    public function destroy(string $id)
    {
        //
    }
}
