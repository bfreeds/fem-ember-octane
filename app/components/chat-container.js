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

    const userId = this.auth.currentUserId;
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        channelId,
        userId,
        body,
      }),
    });

    if (!response.ok) throw Error('Could not save chat message');
    const messageData = await response.json();
    const user = await fetch(`/api/users/${userId}`);

    this.messages = [...this.messages, { ...messageData, user }];
  }

  @action
  async deleteMessage(messageId) {
    // make the server request to delete
    const response = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // update the UI to remove the deleted message
    // generate an array of message ids
    const messageIds = this.messages.map(message => message.id);

    // find the index of that array that we want to remove
    const indexToDelete = messageIds.indexOf(messageId);

    // splice the array at the index we want to remove
    this.messages.splice(indexToDelete, 1);

    // reset this.messages to make sure @tracked responds / sees the change
    this.messages = this.messages;
  }
}
