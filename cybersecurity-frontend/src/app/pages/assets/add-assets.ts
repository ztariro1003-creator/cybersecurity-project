import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AssetsService, Asset } from '../../services/assets';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-assets.html',
  styleUrl: './add-assets.css'
})
export class AddAssetComponent implements OnInit {
  asset: Asset = {
    asset_name: '',
    asset_type: '',
    location: ''
  };

  isEditMode = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private assetsService: AssetsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = history.state;
    if (nav?.asset) {
      this.asset = nav.asset;
      this.isEditMode = true;
    }
  }

  submitAsset(): void {
    this.errorMessage = '';

    if (this.isEditMode && this.asset.asset_id) {
      this.assetsService.updateAsset(this.asset.asset_id, this.asset).subscribe({
        next: () => this.router.navigate(['/assets']),
        error: (error) => {
          console.error('Error updating asset:', error);
          this.errorMessage = 'Failed to update asset.';
        }
      });
      return;
    }

    this.assetsService.createAsset(this.asset).subscribe({
      next: () => this.router.navigate(['/assets']),
      error: (error) => {
        console.error('Error creating asset:', error);
        this.errorMessage = 'Failed to create asset.';
      }
    });
  }
}