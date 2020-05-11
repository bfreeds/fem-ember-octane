import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {

  // property to keep track of the user selection in the UI
  @tracked // Octane 1-way data binding.  This opts in to listen to changes
  userId = null;

  loginAsUserId(val) {
    console.log('UserID: ', val)
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
    
    this.loginAsUserId(val);
  }
}
