export default {
  items: [
    // 'Main',
    [
      {
        to: '/admin',
        icon: 'desktop-mac',
        label: 'Dashboard',
      },
    ],
    'System',
    [
      {
        label: 'Access',
        subLabel: 'Access Management',
        icon: 'shield-key',
        menu: [
          {
            to: '/admin/access/users',
            label: 'Users',
            icon: 'account-multiple',
          },
          {
            to: '/admin/access/roles',
            label: 'Roles',
            icon: 'shield-account',
          },
        ],
      },
      /*
      {
        href: 'https://admin-one-vue-cli.justboil.me',
        label: 'Premium Demo',
        icon: 'credit-card'
      },
      {
        href: 'https://justboil.me/bulma-admin-template/one',
        label: 'About',
        icon: 'help-circle'
      }
      */
    ],
    'Settings',
    [],
  ],
}
