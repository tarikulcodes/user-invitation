<?php

namespace App\Notifications;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class InvitationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $invitation;

    /**
     * Create a new notification instance.
     */
    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $invitation = $this->invitation;

        return (new MailMessage)
            ->subject('You\'re invited to join ' . config('app.name'))
            ->greeting('Hello ' . $invitation->name . '!')
            ->line('You have been invited to join our application.')
            ->line('This invitation will expire on ' . $invitation->expires_at->format('M j, Y \a\t g:i A'))
            ->action('Accept Invitation', URL::signedRoute(
                'invitation.register',
                ['tracking_id' => $invitation->tracking_id, 'email' => $invitation->email, 'name' => $invitation->name],
                $invitation->expires_at
            ))
            ->line('If you did not expect this invitation, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'invitation_id' => $this->invitation->id,
            'tracking_id' => $this->invitation->tracking_id,
            'expires_at' => $this->invitation->expires_at,
        ];
    }
}
