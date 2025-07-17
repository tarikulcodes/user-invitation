<?php

namespace App\Models;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Invitation extends Model
{
    use Notifiable;

    protected $fillable = [
        'tracking_id',
        'name',
        'email',
        'role',
        'expires_at',
        'expired_in_days',
        'invited_by_id',
        'accepted_at',
        'accepted_by_id',
        'email_sent_at',
        'last_accessed_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'accepted_at' => 'datetime',
        'email_sent_at' => 'datetime',
        'last_accessed_at' => 'datetime',
    ];

    public function invitedBy()
    {
        return $this->belongsTo(User::class, 'invited_by_id');
    }

    public function acceptedBy()
    {
        return $this->belongsTo(User::class, 'accepted_by_id');
    }
}
