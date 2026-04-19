import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IncidentService, Incident } from '../../services/incident';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-incident.html',
  styleUrl: './new-incident.css'
})
export class NewIncidentComponent implements OnInit {
  incident: Incident = {
    title: '',
    description: '',
    severity: '',
    status: ''
  };

  isEditMode = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = history.state;

    if (nav?.incident) {
      this.incident = {
        id: nav.incident.id,
        title: nav.incident.title || '',
        description: nav.incident.description || '',
        severity: nav.incident.severity || '',
        status: nav.incident.status || ''
      };
      this.isEditMode = true;
    }
  }

  submitIncident(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.isEditMode && this.incident.id) {
      this.incidentService.updateIncident(this.incident.id, this.incident).subscribe({
        next: () => {
          this.successMessage = 'Incident updated successfully.';
          this.router.navigate(['/incidents']);
        },
        error: (error) => {
          console.error('Error updating incident:', error);
          this.errorMessage = 'Failed to update incident.';
        }
      });
      return;
    }

    this.incidentService.createIncident(this.incident).subscribe({
      next: () => {
        this.successMessage = 'Incident created successfully.';
        this.router.navigate(['/incidents']);
      },
      error: (error) => {
        console.error('Error creating incident:', error);
        this.errorMessage = 'Failed to create incident.';
      }
    });
  }
}