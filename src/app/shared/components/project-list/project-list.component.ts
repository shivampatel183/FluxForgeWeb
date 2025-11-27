import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/interfaces';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
  @Input() isLoading: boolean = false;

  getStatusClasses(status?: string): string {
    const baseClasses =
      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';

    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-900 text-green-200`;
      case 'failed':
        return `${baseClasses} bg-red-900 text-red-200`;
      case 'building':
        return `${baseClasses} bg-yellow-900 text-yellow-200`;
      default:
        return `${baseClasses} bg-green-900 text-green-200`;
    }
  }
}
