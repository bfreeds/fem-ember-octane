import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class ChatContainerComponent extends Component {
  @tracked
  messages = [];

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
    this.messages = [...this.messages, ...(await response.json())];
  }
}
