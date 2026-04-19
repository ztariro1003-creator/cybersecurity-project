import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ThreatsService, Threat } from '../../services/threats';

@Component({
  selector: 'app-add-threat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-threat.html',
  styleUrl: './add-threat.css'
})
export class AddThreatComponent implements OnInit {
  threat: Threat = {
    name: '',
    description: '',
    severity_level: ''
  };

  isEditMode = false;
  errorMessage = '';

  constructor(
    private threatsService: ThreatsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = history.state;
    if (nav?.threat) {
      this.threat = nav.threat;
      this.isEditMode = true;
    }
  }

  submitThreat(): void {
    this.errorMessage = '';

    if (this.isEditMode && this.threat.threat_id) {
      this.threatsService.updateThreat(this.threat.threat_id, this.threat).subscribe({
        next: () => this.router.navigate(['/threats']),
        error: (error) => {
          console.error('Error updating threat:', error);
          this.errorMessage = 'Failed to update threat.';
        }
      });
      return;
    }

    this.threatsService.createThreat(this.threat).subscribe({
      next: () => this.router.navigate(['/threats']),
      error: (error) => {
        console.error('Error creating threat:', error);
        this.errorMessage = 'Failed to create threat.';
      }
    });
  }
}