import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Router from '@ember/routing/router';
import CookiesService from 'ember-cookies/services/cookies';

const AUTH_KEY = 'schlack-userid';

// used to share state across components, long-lived over the life of the app
export default class AuthService extends Service {
  /**
   * @type { Router }
   */
  @service router;

  /**
   * @type {CookiesService}
   */
  @service cookies;

  get currentUserId() {
    return this.cookies.read(AUTH_KEY);
  }

  loginWithUserId(userId) {
    this.cookies.write(AUTH_KEY, userId);
    this.router.transitionTo('teams');
  }

  @action
  logout() {
    this.cookies.write(AUTH_KEY, null);
    this.router.transitionTo('login');
  }
}
