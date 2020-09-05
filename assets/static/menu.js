export default {
  items: [
    // 'Main',
    [
      /*
      {
        to: '/admin',
        icon: 'desktop-mac',
        label: 'Dashboard',
      },
      */
      {
        to: '/admin/applications',
        icon: 'account-question',
        label: 'Applications',
      },
      {
        to: '/admin/demands',
        icon: 'package-variant',
        label: 'Demands',
      },
    ],
    'Modules',
    [
      {
        to: '/admin/inventories',
        icon: 'package-variant',
        label: 'Inventories',
      },
      {
        to: '/admin/items',
        icon: 'food-variant',
        label: 'Items',
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
    [
      {
        to: '/admin/settings/aid-zones',
        label: 'Aid Zones',
        icon: 'map-marker-path',
      },
      {
        to: '/admin/settings/aid-types',
        label: 'Aid Types',
        icon: 'lifebuoy',
      },
    ],
  ],
}
