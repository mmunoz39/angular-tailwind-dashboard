import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardMetric } from '../../services/dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  metric!: DashboardMetric;
  metrics: DashboardMetric[] = []; 
  isLoading = true;
  errorMessage = '';

  newMetric: DashboardMetric = {
    id: 0,
    todaysMoney: '',
    todaysUsers: 0,
    newClients: 0,
    sales: '',
    percentChange: {
      todaysMoney: 0,
      todaysUsers: 0,
      newClients: 0,
      sales: 0
    }
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.metric = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error getting data from the server';
        this.isLoading = false;
        console.error(error);
      }
    });

    this.dashboardService.getAllMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
      },
      error: (error) => {
        console.error('Error getting all metrics:', error);
      }
    });
  }

  addMetric(): void {
    this.dashboardService.addMetric(this.newMetric).subscribe({
      next: (created) => {
        this.metric = created;
        this.metrics.push(created); 
        this.isLoading = false;

        this.newMetric = {
          id: 0,
          todaysMoney: '',
          todaysUsers: 0,
          newClients: 0,
          sales: '',
          percentChange: {
            todaysMoney: 0,
            todaysUsers: 0,
            newClients: 0,
            sales: 0
          }
        };
      },
      error: (error) => {
        this.errorMessage = 'Error adding metric';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

    updateMetric(updated: DashboardMetric): void {
    this.dashboardService.updateMetric(updated).subscribe({
      next: (response) => {
        const index = this.metrics.findIndex(m => m.id === updated.id);
        if (index !== -1) {
          this.metrics[index] = response;
        }
      },
      error: (error) => {
        console.error('Error updating metric:', error);
      }
    });
  }
  
  deleteMetric(id: number): void {
    this.dashboardService.deleteMetric(id).subscribe({
      next: () => {
        this.metrics = this.metrics.filter(m => m.id !== id);
      },
      error: (error) => {
        console.error('Error deleting metric:', error);
      }
    });
  }

}
