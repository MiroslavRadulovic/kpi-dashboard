import { NavItem } from '@core/models/sidebar.models';

export const navItems: NavItem[] = [
  {
    id: 'kpis',
    label: 'Select KPIs',
    route: '/',
    iconPath: 'M4 5h16v14H4zM8 15l3-4 3 3 3-5',
    exact: true,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: '/dashboard',
    iconPath: 'M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z',
  },
];

export const DASHBOARD_DISABLED_HINT = (min: number) =>
  `Name your dashboard and select at least ${min} KPIs first` as const;
