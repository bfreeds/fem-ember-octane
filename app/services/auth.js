import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router';

const AUTH_KEY='schlack-userid';

// used to share state across components, long-lived over the life of the app
export default class AuthService extends Service {
  /**
   * @type { Router }
   */
  @service router;

  get currentUserId() {
    return window.localStorage.getItem(AUTH_KEY);
  }

  loginWithUserId(userId) {
    window.localStorage.setItem(AUTH_KEY, userId);
    this.router.transitionTo('teams');
  }
}