import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {

  loginAsUserId(val) {
    console.log('UserID: ', val)
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
