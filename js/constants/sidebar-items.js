import {
  DASHBOARD,
  USERS,
  ROLES,
  USER_LOCK,
  BILLERS,
  BILLERS_REQUESTS,
  MERCHANT_REQUESTS,
  USER_DETAIL_REQUESTS,
} from './permissions'

export const SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    icon: 'chart-line',
    to: '/',
    permissionURL: DASHBOARD,
  },
  {
    title: 'User Management',
    icon: 'users-cog',
    to: '/user-management',
    children: [
      {
        title: 'Roles and Permissions',
        icon: 'users-cog',
        to: '/user-management/roles',
        permissionURL: ROLES,
      },
      {
        title: 'Users',
        icon: 'users-cog',
        to: '/user-management/users',
        permissionURL: USERS,
      },
      {
        title: 'User Details Requests',
        icon: 'users-cog',
        to: '/user-management/users/requests',
        permissionURL: USER_DETAIL_REQUESTS,
      },
      {
        title: 'User Lock Request',
        icon: 'users-cog',
        to: '/user-management/user-lock-request',
        permissionURL: USER_LOCK,
      },
    ],
  },
  {
    title: 'Merchant Admin',
    icon: 'shop',
    to: '/merchant-admin',
    children: [
      {
        title: 'Merchant Requests',
        icon: 'user-cog',
        to: '/merchant-admin/requests',
        permissionURL: MERCHANT_REQUESTS,
      },
    ],
  },
  {
    title: 'Business Rules',
    icon: 'scale-balanced',
    to: '/business-rules',
    children: [
      {
        title: 'Business Rules',
        icon: 'users-cog',
        to: '/business-rules',
        permissionURL: BILLERS,
      },
      {
        title: 'Business Rules Requests',
        icon: 'users-cog',
        to: '/business-rules/requests',
        permissionURL: BILLERS_REQUESTS,
      },
    ],
  },
  {
    title: 'Formula Management',
    icon: 'scale-balanced',
    to: '/business-rules',
    children: [
      {
        title: 'Formulae',
        icon: 'users-cog',
        to: '/business-rules',
        permissionURL: BILLERS,
      },
      {
        title: 'Formula Requests',
        icon: 'users-cog',
        to: '/business-rules/requests',
        permissionURL: BILLERS_REQUESTS,
      },
    ],
  },
]
