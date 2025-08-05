import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardMetric {
  id: number;
  todaysMoney: string;
  todaysUsers: number;
  newClients: number;
  sales: string;
  percentChange: {
    todaysMoney: number;
    todaysUsers: number;
    newClients: number;
    sales: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5155/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardMetric> {
    return this.http.get<DashboardMetric>(this.apiUrl);
  }

  getAllMetrics(): Observable<DashboardMetric[]> {
    return this.http.get<DashboardMetric[]>(`${this.apiUrl}/all`);
  }

  addMetric(metric: DashboardMetric): Observable<DashboardMetric> {
    return this.http.post<DashboardMetric>(this.apiUrl, metric);
  }

  updateMetric(metric: DashboardMetric): Observable<DashboardMetric> {
    return this.http.put<DashboardMetric>(`${this.apiUrl}/${metric.id}`, metric);
  }

  deleteMetric(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
