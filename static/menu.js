export default {
  items: [
    'Main',
    [
      {
        to: '/',
        icon: 'desktop-mac',
        label: 'Dashboard'
      }
    ],
    'Modules',
    [
      {
        to: '/tables',
        label: 'Tables',
        icon: 'table',
        updateMark: true
      },
      {
        to: '/forms',
        label: 'Forms',
        icon: 'square-edit-outline'
      },
      {
        to: '/profile',
        label: 'Profile',
        icon: 'account-circle'
      },
      {
        label: 'Submenus',
        subLabel: 'Submenus Example',
        icon: 'view-list',
        menu: [
          {
            href: '#void',
            label: 'Sub-item One'
          },
          {
            href: '#void',
            label: 'Sub-item Two'
          }
        ]
      }
    ],
    'System',
    [
      {
        label: 'Access',
        subLabel: 'Access Management',
        icon: 'view-list',
        menu: [
          {
            to: '/access/users',
            label: 'Users',
            icon: 'credit-card'
          },
          {
            to: '/access/roles',
            label: 'Roles',
            icon: 'credit-card'
          }
        ]
      },
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
    ]
  ]
}
