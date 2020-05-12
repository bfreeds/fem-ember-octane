import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import MockAuthService from 'shlack/tests/stubs/auth-service';

module('Integration | Component | team-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:auth', MockAuthService);
  });

  test('it renders', async function(assert) {
    const auth = this.owner.lookup('service:auth');
    auth.currentUserId = '1';

    this.set('myTeam', {
      name: '',
      channels: [
        {
          name: 'general',
        },
      ],
    });

    await render(hbs`<TeamSidebar @team={{this.myTeam}}/>`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),
      ['Mike North', 'Channels', '#', 'general', 'Logout']
    );
  });
});
