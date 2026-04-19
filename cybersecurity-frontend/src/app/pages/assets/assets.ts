import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AssetsService, Asset } from '../../services/assets';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './assets.html',
  styleUrl: './assets.css'
})
export class AssetsComponent implements OnInit {
  assets: Asset[] = [];
  errorMessage = '';

  constructor(
    private assetsService: AssetsService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetsService.getAllAssets().subscribe({
      next: (data) => {
        this.assets = data;
      },
      error: (error) => {
        console.error('Error loading assets:', error);
        this.errorMessage = 'Failed to load assets.';
      }
    });
  }

  editAsset(asset: Asset): void {
    this.router.navigate(['/add-assets'], { state: { asset } });
  }

  deleteAsset(id?: number): void {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (!confirmed) return;

    this.assetsService.deleteAsset(id).subscribe({
      next: () => {
        this.loadAssets();
      },
      error: (error) => {
        console.error('Error deleting asset:', error);
        this.errorMessage = 'Failed to delete asset.';
      }
    });
  }
}