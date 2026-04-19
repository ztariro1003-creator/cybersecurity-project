import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asset {
  asset_id?: number;
  asset_name: string;
  asset_type: string;
  location: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private apiUrl = 'http://localhost:8080/api/assets';

  constructor(private http: HttpClient) {}

  getAllAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }

  updateAsset(id: number, asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.apiUrl}/${id}`, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}