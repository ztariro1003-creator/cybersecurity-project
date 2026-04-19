import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../services/incident';

@Component({
  selector: 'app-assign-incident',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-incident.html',
  styleUrl: './assign-incident.css'
})
export class AssignIncidentComponent implements OnInit {
  incidentId!: number;
  assignedTo = '';

  teams: string[] = [
    'SOC Team',
    'Incident Response Team',
    'Network Security Team',
    'Forensics Team',
    'Threat Intelligence Team',
    'IT Support Team'
  ];
  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.incidentId = Number(this.route.snapshot.paramMap.get('id'));
  }

  assign(): void {
    const payload = { assignedTo: this.assignedTo };

    this.incidentService.assignIncident(this.incidentId, payload).subscribe({
      next: () => {
        alert('Incident assigned successfully');
        this.router.navigate(['/incidents']);
      },
      error: (err: any) => {
        console.error('Assign error:', err);
      }
    });
  }
}