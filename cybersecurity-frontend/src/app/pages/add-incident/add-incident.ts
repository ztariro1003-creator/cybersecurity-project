import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../services/incident';
import { AiService, AiPrediction } from '../../services/ai';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-incident.html',
  styleUrl: './add-incident.css'
})
export class AddIncidentComponent {
  predictedRisk: string = '';

  incident = {
    title: '',
    description: '',
    severity: '',
    status: ''
  };

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private aiService: AiService
  ) {}

  onSubmit(): void {
    this.incidentService.createIncident(this.incident).subscribe({
      next: () => {
        alert('Incident added successfully');
        this.router.navigate(['/incidents']);
      },
      error: (err: unknown) => {
        console.error('Error adding incident:', err);
        alert('Failed to add incident');
      }
    });
  }

  predictRisk(): void {
    if (!this.incident.severity || !this.incident.status) {
      alert('Please select severity and status first');
      return;
    }

   this.aiService.getPrediction(this.incident.severity, this.incident.status).subscribe({
  next: (response: AiPrediction) => {
    console.log('AI Prediction:', response);
  },
  error: (error) => {
    console.error('Error getting AI prediction:', error);
  }
});
  }
}