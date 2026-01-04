import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isCollapsed = false;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
