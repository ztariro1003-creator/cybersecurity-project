import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IncidentService, Incident } from '../../services/incident';
import { AuthService } from '../../services/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidents.html'
})
export class IncidentsComponent implements OnInit {

  incidents: Incident[] = [];

  constructor(
  private incidentService: IncidentService,
  public authService: AuthService,
  private router: Router
) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidentService.getAllIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

editIncident(incident: Incident): void {
  this.router.navigate(['/incidents/new'], { state: { incident } });
  }

  deleteIncident(id: number) {
  if (confirm('Are you sure you want to delete this incident?')) {
    this.incidentService.deleteIncident(id).subscribe(() => {
      this.loadIncidents();
    });
  }
}
viewIncident(incident: Incident): void {
  this.router.navigate(['/incidents/new'], {
    state: { incident, viewMode: true }
  });
}
assignIncident(id: number): void {
  this.router.navigate(['/assign-incident', id]);
}
}