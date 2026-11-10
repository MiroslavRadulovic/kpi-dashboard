export interface NavItem {
  label: string;
  route: string | null;
  iconPath: string;
  disabled?: boolean;
  exact?: boolean;
  title?: string;
}
