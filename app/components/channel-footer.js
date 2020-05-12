import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChannelFooterComponent extends Component {
  @tracked
  body = '';

  get isDisabled() {
    return !this.body;
  }

  @action
  updateMessageBody(evt) {
    this.body = evt.target.value;
  }

  /**
   *
   * @param {Event & {target: HTMLFormElement}} evt
   */
  @action
  async handleSubmit(evt) {
    evt.preventDefault();

    // expect parent component to pass this action
    await this.args.sendMessage(this.body);

    this.body = '';
  }
}
