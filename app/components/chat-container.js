import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import AuthService from 'shlack/services/auth';
import { inject as service } from '@ember/service';

export default class ChatContainerComponent extends Component {
  @tracked
  messages = [];

  /**
   * @type {AuthService}
   */
  @service auth;

  @action
  async loadMessages() {
    const {
      channel: { id, teamId },
    } = this.args;

    const response = await fetch(
      `/api/teams/${teamId}/channels/${id}/messages`
    );

    // don't push to array, replace with new array to ensure tracked responds
    // include the existing messages, add new messages
    // note we aren't deduping these messages
    this.messages = [...(await response.json())];
  }

  @action
  async createMessage(body) {
    const {
      channel: { id: channelId, teamId },
    } = this.args;

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        channelId,
        userId: this.auth.currentUserId,
        body,
      }),
    });
  }
}
