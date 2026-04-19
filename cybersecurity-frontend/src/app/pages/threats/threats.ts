import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThreatsService, Threat } from '../../services/threats';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-threats',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './threats.html',
  styleUrl: './threats.css'
})
export class ThreatsComponent implements OnInit {
  threats: Threat[] = [];
  errorMessage = '';

  constructor(
    private threatsService: ThreatsService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadThreats();
  }

  loadThreats(): void {
    this.threatsService.getAllThreats().subscribe({
      next: (data) => {
        this.threats = data;
      },
      error: (error) => {
        console.error('Error loading threats:', error);
        this.errorMessage = 'Failed to load threats.';
      }
    });
  }

  editThreat(threat: Threat): void {
    this.router.navigate(['/add-threat'], { state: { threat } });
  }

  deleteThreat(id?: number): void {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this threat?');
    if (!confirmed) return;

    this.threatsService.deleteThreat(id).subscribe({
      next: () => {
        this.loadThreats();
      },
      error: (error) => {
        console.error('Error deleting threat:', error);
        this.errorMessage = 'Failed to delete threat.';
      }
    });
  }
}