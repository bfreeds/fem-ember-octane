import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamsTeamRoute extends Route {
  async model({ teamId }) {
    const response = await fetch(`/api/teams/${teamId}`);

    return response.json(); // returns promise
  }
}
