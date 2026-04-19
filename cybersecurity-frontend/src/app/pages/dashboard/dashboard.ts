import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';

import { IncidentService, Incident } from '../../services/incident';
import { AssetsService, Asset } from '../../services/assets';
import { ThreatsService, Threat } from '../../services/threats';
import { AuthService } from '../../services/auth';
import { AiService, AiPrediction } from '../../services/ai';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  incidents: Incident[] = [];
  assets: Asset[] = [];
  threats: Threat[] = [];

  incidentCount = 0;
  assetCount = 0;
  threatCount = 0;

  highCount = 0;
  mediumCount = 0;
  lowCount = 0;
  criticalCount = 0;

  riskScore = 0;
  detectionAccuracy = 0;

  aiHeadline = 'System monitoring active';
  predictedTarget = 'Unknown';
  recommendedAction = 'Review incident activity and validate controls.';

  predictedRisk = 'Unknown';
  aiSeverity = '';
  aiStatus = '';

  criticalBarWidth = 0;
  highBarWidth = 0;
  mediumBarWidth = 0;
  lowBarWidth = 0;

  pieChartLabels: string[] = ['Low', 'Medium', 'High', 'Critical'];
  pieChartDatasets = [
    {
      data: [0, 0, 0, 0]
    }
  ];
  pieChartType: ChartType = 'pie';

  barChartLabels: string[] = ['Open', 'Investigating', 'Resolved'];
  barChartDatasets = [
    {
      data: [0, 0, 0],
      label: 'Incidents by Status'
    }
  ];
  barChartType: ChartType = 'bar';

  constructor(
    private incidentService: IncidentService,
    private assetService: AssetsService,
    private threatService: ThreatsService,
    public authService: AuthService,
    private router: Router,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    console.log('Dashboard loaded');
    this.loadIncidents();
    this.loadAssets();
    this.loadThreats();
  }

  loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe({
      next: (data) => {
        console.log('INCIDENTS:', data);
        this.incidents = Array.isArray(data) ? data : [];
        this.incidentCount = this.incidents.length;

        this.calculateSeverity();
        this.calculateRiskScore();
        this.generateAiInsight();
        this.calculateBarWidths();
        this.calculateStatusChart();
this.calculateDetectionAccuracy();
       if (this.incidents.length > 0) {
  const severity = this.getAiSeverity();
  const status = this.getAiStatus();
  this.loadAiPrediction(severity, status);
}
      },
      error: (error) => {
        console.error('Error loading incidents:', error);
      }
    });
  }

  loadAssets(): void {
    this.assetService.getAllAssets().subscribe({
      next: (data) => {
        console.log('ASSETS:', data);
        this.assets = Array.isArray(data) ? data : [];
        this.assetCount = this.assets.length;
        this.predictedTarget = this.getMostExposedAsset();
      },
      error: (error) => {
        console.error('Error loading assets:', error);
      }
    });
  }

  loadThreats(): void {
    this.threatService.getAllThreats().subscribe({
      next: (data) => {
        console.log('THREATS:', data);
        this.threats = Array.isArray(data) ? data : [];
        this.threatCount = this.threats.length;
      },
      error: (error) => {
        console.error('Error loading threats:', error);
      }
    });
  }

 loadAiPrediction(severity: string, status: string): void {
  console.log('Dashboard sending to AI:', severity, status);

  this.aiService.getPrediction(severity, status).subscribe({
    next: (data: AiPrediction) => {
      console.log('Dashboard AI RESPONSE:', data);
      this.predictedRisk = data.predictedRisk;
      this.aiSeverity = data.severity;
      this.aiStatus = data.status;
    },
    error: (error) => {
      console.error('Error loading AI prediction:', error);

      this.predictedRisk = 'AI Unavailable';
      this.aiSeverity = severity;
      this.aiStatus = status;
    }
  });
}

  calculateSeverity(): void {
    let critical = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    this.incidents.forEach((incident) => {
      const severity = (incident.severity || '').toLowerCase();

      if (severity === 'critical') critical++;
      else if (severity === 'high') high++;
      else if (severity === 'medium') medium++;
      else if (severity === 'low') low++;
    });

    this.criticalCount = critical;
    this.highCount = high;
    this.mediumCount = medium;
    this.lowCount = low;

    this.pieChartDatasets = [
      {
        data: [this.lowCount, this.mediumCount, this.highCount, this.criticalCount]
      }
    ];
  }
getAiSeverity(): string {
  if (this.criticalCount > 0) return 'High';
  if (this.highCount > 0) return 'High';
  if (this.mediumCount > 0) return 'Medium';
  return 'Low';
}

getAiStatus(): string {
  const hasOpen = this.incidents.some(i => (i.status || '').toLowerCase() === 'open');
  const hasInProgress = this.incidents.some(i => {
    const s = (i.status || '').toLowerCase();
    return s === 'in progress' || s === 'investigating';
  });

  if (hasOpen) return 'Open';
  if (hasInProgress) return 'In Progress';
  return 'Resolved';
}
  calculateStatusChart(): void {
    let open = 0;
    let investigating = 0;
    let resolved = 0;

    this.incidents.forEach((incident) => {
      const status = (incident.status || '').toLowerCase();

      if (status === 'open') open++;
      else if (status === 'investigating' || status === 'in progress') investigating++;
      else if (status === 'resolved') resolved++;
    });

    this.barChartDatasets = [
      {
        data: [open, investigating, resolved],
        label: 'Incidents by Status'
      }
    ];
  }
calculateDetectionAccuracy(): void {
  if (this.incidentCount === 0) {
    this.detectionAccuracy = 0;
    return;
  }

  const resolvedCount = this.incidents.filter(i =>
    (i.status || '').toLowerCase() === 'resolved'
  ).length;

  const investigatingCount = this.incidents.filter(i => {
    const status = (i.status || '').toLowerCase();
    return status === 'investigating' || status === 'in progress';
  }).length;

  const weightedResolved = resolvedCount * 1.0;
  const weightedInvestigating = investigatingCount * 0.6;

  const score = ((weightedResolved + weightedInvestigating) / this.incidentCount) * 100;

  this.detectionAccuracy = Math.min(95, Math.round(score));
}
  calculateRiskScore(): void {
    if (this.incidentCount === 0) {
      this.riskScore = 0;
      return;
    }

    const weightedScore =
      this.criticalCount * 4 +
      this.highCount * 3 +
      this.mediumCount * 2 +
      this.lowCount;

    const maxScore = this.incidentCount * 4;
    this.riskScore = Math.round((weightedScore / maxScore) * 100);
  }

  calculateBarWidths(): void {
    if (this.incidentCount === 0) {
      this.criticalBarWidth = 0;
      this.highBarWidth = 0;
      this.mediumBarWidth = 0;
      this.lowBarWidth = 0;
      return;
    }

    this.criticalBarWidth = (this.criticalCount / this.incidentCount) * 100;
    this.highBarWidth = (this.highCount / this.incidentCount) * 100;
    this.mediumBarWidth = (this.mediumCount / this.incidentCount) * 100;
    this.lowBarWidth = (this.lowCount / this.incidentCount) * 100;
  }

  generateAiInsight(): void {
    if (this.criticalCount > 0) {
      this.aiHeadline = 'Critical incident detected in the environment';
      this.recommendedAction = 'Isolate affected systems and escalate response immediately.';
    } else if (this.highCount >= 2) {
      this.aiHeadline = 'High-severity activity is dominating current incidents';
      this.recommendedAction = 'Prioritize high-risk investigations and review access controls.';
    } else if (this.incidentCount > 0) {
      this.aiHeadline = 'Incident activity is being actively monitored';
      this.recommendedAction = 'Continue monitoring and review recent security events.';
    } else {
      this.aiHeadline = 'No incident activity detected';
      this.recommendedAction = 'Continue monitoring the environment.';
    }
  }

  getMostExposedAsset(): string {
    if (this.assets.length === 0) {
      return 'Unknown';
    }

    const counts: { [key: string]: number } = {};

    this.assets.forEach((asset) => {
      const name = asset.asset_name || 'Unknown Asset';
      counts[name] = (counts[name] || 0) + 1;
    });

    let topAsset = 'Unknown';
    let max = 0;

    for (const name in counts) {
      if (counts[name] > max) {
        max = counts[name];
        topAsset = name;
      }
    }

    return topAsset;
  }

  getThreatName(threat: Threat): string {
    return threat.name || 'Unnamed Threat';
  }

  getThreatLevel(threat: Threat): string {
    return threat.severity_level || 'Unknown';
  }

  getSeverityClass(severity: string): string {
    const value = (severity || '').toLowerCase();

    if (value === 'critical') return 'critical';
    if (value === 'high') return 'high';
    if (value === 'medium') return 'medium';
    if (value === 'low') return 'low';

    return '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}