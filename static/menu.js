export default {
  items: [
    // 'Main',
    [
      {
        to: '/',
        icon: 'desktop-mac',
        label: 'Dashboard'
      }
    ],
    'System',
    [
      {
        label: 'Access',
        subLabel: 'Access Management',
        icon: 'shield-key',
        menu: [
          {
            to: '/access/users',
            label: 'Users',
            icon: 'account-multiple'
          },
          {
            to: '/access/roles',
            label: 'Roles',
            icon: 'shield-account'
          }
        ]
      }
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
        to: '/setting/units',
        label: 'Units',
        icon: 'table',
        updateMark: true
      },
      {
        to: '/setting/departments',
        label: 'Departments',
        icon: 'square-edit-outline'
      },
      {
        to: '/setting/courses',
        label: 'Courses',
        icon: 'account-circle'
      }
    ]
  ]
}
