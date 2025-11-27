import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  stats = [
    {
      title: 'Successful Runs',
      value: 124,
      icon: 'check-circle',
      color: 'text-green-400',
    },
    {
      title: 'Active Runners',
      value: 3,
      icon: 'lightning-bolt',
      color: 'text-indigo-400',
    },
    {
      title: 'Failed Builds',
      value: 2,
      icon: 'exclamation-circle',
      color: 'text-red-400',
    },
  ];
}
