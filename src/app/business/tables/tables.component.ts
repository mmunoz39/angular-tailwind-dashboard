import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html'
})
export default class Tables {
  orders = [
    { id: 1001, customer: 'Alice Johnson', date: '2025-07-22', total: '$1,200', status: 'Paid' },
    { id: 1002, customer: 'Bob Smith', date: '2025-07-21', total: '$850', status: 'Pending' },
    { id: 1003, customer: 'Carlos Rivera', date: '2025-07-20', total: '$2,500', status: 'Cancelled' }
  ];
}
