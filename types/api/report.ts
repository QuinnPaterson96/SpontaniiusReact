export interface ReportRequest {
  reporter_id: string;
  reported_id: string;
  report_text: string;
}

export interface ReportResponse {
  report_id: number;
  reporter_id: string;
  reported_id: string;
  report_text: string;
}