import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IncidentService, Incident } from '../../services/incident';
import { AssetsService, Asset } from '../../services/assets';
import { ThreatsService, Threat } from '../../services/threats';
import { AiService, AiPrediction } from '../../services/ai';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements OnInit {
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

  aiSummary: {
    risk: string;
    confidence: number;
    action: string;
  } | null = null;

  constructor(
    private incidentService: IncidentService,
    private assetService: AssetsService,
    private threatService: ThreatsService,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

loadAllData(): void {
  this.incidentService.getAllIncidents().subscribe(data => {
    this.incidents = data;
    this.incidentCount = data.length;
    this.calculateSeverity();
    this.getAiSummary();
  });

  this.assetService.getAllAssets().subscribe(data => {
    this.assets = data;
    this.assetCount = data.length;
  });

  this.threatService.getAllThreats().subscribe(data => {
    this.threats = data;
    this.threatCount = data.length;
  });
  }

  calculateSeverity(): void {
    this.criticalCount = this.incidents.filter(i => i.severity?.toLowerCase() === 'critical').length;
    this.highCount = this.incidents.filter(i => i.severity?.toLowerCase() === 'high').length;
    this.mediumCount = this.incidents.filter(i => i.severity?.toLowerCase() === 'medium').length;
    this.lowCount = this.incidents.filter(i => i.severity?.toLowerCase() === 'low').length;
  }

getAiSummary(): void {
  const highestSeverity = this.getHighestSeverity();
  const status = 'Open';

  console.log('Sending to AI:', highestSeverity, status);

  this.aiService.getPrediction(highestSeverity, status).subscribe({
    next: (res: AiPrediction) => {
      console.log('AI response:', res);

      this.aiSummary = {
        risk: res.predictedRisk,
        confidence: this.calculateConfidence(),
        action: this.getRecommendation(res.predictedRisk)
      };
    },
    error: (err) => {
      console.error('AI error:', err);

      this.aiSummary = {
        risk: 'AI Unavailable',
        confidence: 0,
        action: 'Backend AI request failed. Check CORS/security config.'
      };
    }
  });
}

  getHighestSeverity(): string {
    if (this.criticalCount > 0) return 'Critical';
    if (this.highCount > 0) return 'High';
    if (this.mediumCount > 0) return 'Medium';
    return 'Low';
  }

  calculateConfidence(): number {
    const total = this.incidentCount;

    if (total === 0) return 0;

    const riskWeight =
      this.criticalCount * 3 +
      this.highCount * 2 +
      this.mediumCount * 1;

    const maxWeight = total * 3;

    return Math.min(95, Math.round((riskWeight / maxWeight) * 100));
  }

  getRecommendation(risk: string): string {
    if (risk === 'High Risk') {
      return 'Immediate investigation and isolate affected systems.';
    }
    if (risk === 'Medium Risk') {
      return 'Monitor closely and assign response team.';
    }
    return 'Low priority. Continue monitoring.';
  }

  printReport(): void {
    window.print();
  }
}