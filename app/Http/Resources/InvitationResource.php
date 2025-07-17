<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'tracking_id'      => $this->tracking_id,
            'name'             => $this->name,
            'email'            => $this->email,
            'role'             => $this->role,
            'expires_at'       => $this->expires_at?->format('M d, Y h:i A'),
            'expired_in_days'  => $this->expired_in_days,
            'invited_by'       => $this->invitedBy,
            'accepted_at'      => $this->accepted_at?->format('M d, Y h:i A'),
            'accepted_by'      => $this->acceptedBy,
            'email_sent_at'    => $this->email_sent_at?->format('M d, Y h:i A'),
            'last_accessed_at' => $this->last_accessed_at?->format('M d, Y h:i A'),
            'created_at'       => $this->created_at?->format('M d, Y h:i A'),
            'updated_at'       => $this->updated_at?->format('M d, Y h:i A'),
        ];
    }
}
