import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() user: User | null = null;
  @Output() onLogout = new EventEmitter<void>();

  getInitials(name?: string): string {
    return name ? name.substring(0, 2).toUpperCase() : 'SP';
  }

  logout(): void {
    this.onLogout.emit();
  }
}
