import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './layout.services';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      label: 'Projects',
      icon: 'projects',
      path: '/projects',
    },
    {
      label: 'Users',
      icon: 'users',
      path: '/users',
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        { label: 'Profile', path: '/settings/profile', icon: 'profile' },
        { label: 'Security', path: '/settings/security', icon: 'security' },
        {
          label: 'Preferences',
          path: '/settings/preferences',
          icon: 'preferences',
        },
      ],
      isOpen: false,
    },
  ];

  constructor(public layout: LayoutService) {}

  toggleMenu(item: MenuItem) {
    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      dashboard: 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0M9 9h6v6H9V9Z',
      projects:
        'M3 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4Z',
      users:
        'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M3 21h18a2.25 2.25 0 0 0 2.25-2.25V19.5a6.75 6.75 0 0 0-13.5 0v-.75A2.25 2.25 0 0 0 3 21Z',
      settings:
        'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94a6.724 6.724 0 0 0 1.712 2.082c.32.304.879.06 1.02-.296a6.21 6.21 0 0 1 2.051-2.087c.493-.268 1.08.023 1.322.56l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.8 1.395c-.393.3-.635.893-.493 1.42a6.728 6.728 0 0 1 0 2.183c-.142.527.1 1.12.493 1.42l1.8 1.395c.36.28.556.84.26 1.431l-1.296 2.247c-.242.537-.829.828-1.322.56a6.21 6.21 0 0 1-2.051-2.087c-.141-.297-.7-.542-1.02-.296a6.724 6.724 0 0 0-1.712 2.082c-.09.542-.56.94-1.11.94h-2.592a1.125 1.125 0 0 1-1.11-.94 6.724 6.724 0 0 0-1.712-2.082c-.32-.304-.879-.06-1.02.296a6.21 6.21 0 0 1-2.051 2.087c-.493.268-1.08-.023-1.322-.56l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.8-1.395c.393-.3.635-.893.493-1.42a6.728 6.728 0 0 1 0-2.183c.142-.527-.1-1.12-.493-1.42l-1.8-1.395c-.36-.28-.556-.84-.26-1.431l1.296-2.247c.242-.537.829-.828 1.322-.56a6.21 6.21 0 0 1 2.051 2.087c.141.297.7.542 1.02.296a6.724 6.724 0 0 0 1.712-2.082ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
      profile:
        'M11.48 3.499a.5.5 0 0 0-.96 0l-.347 1.97a.5.5 0 0 1-.453.406l-1.97.347a.5.5 0 0 0 0 .96l1.97.347a.5.5 0 0 1 .406.453l.347 1.97a.5.5 0 0 0 .96 0l.347-1.97a.5.5 0 0 1 .453-.406l1.97-.347a.5.5 0 0 0 0-.96l-1.97-.347a.5.5 0 0 1-.406-.453l-.347-1.97Z',
      security:
        'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z',
      preferences:
        'M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z',
    };
    return icons[iconName] || '';
  }
}
