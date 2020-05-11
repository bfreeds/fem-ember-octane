import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth'

export default class LoginFormComponent extends Component {

  // property to keep track of the user selection in the UI
  @tracked // Octane 1-way data binding.  This opts in to listen to changes
  userId = null;

  /**
   * @type {AuthService}
   */
  @service
  auth

  // javascript getter for derived state
  get isDisabled() {
    return !this.userId;
  }

  /**
   * @param {Event & { target: HTMLSelectElement }} event
   */
  @action 
  onSelectChanged(event) {
    this.userId = event.target.value;
  }

  /**
   * 
   * @param {Event & {target: HTMLFormElement}} event 
   */
  @action
  onLoginFormSubmit(event) {
    const { target } = event;
    const val = target.querySelector('select').value;
    event.preventDefault();
    debugger;
    this.auth.loginWithUserId(val);
  }
}
