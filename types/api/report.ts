// Consolidated interfaces for Report

export interface ReportRequest {
  userId: string;
  cardId: number | null;
  reportText: string;
}

export interface ReportResponse {
  reportId: number;
  success: boolean;
}