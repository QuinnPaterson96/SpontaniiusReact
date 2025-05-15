// Auto-translated skeleton for ReportUserRepository
// Original Kotlin class: ReportUserRepository.kt

// TODO: Translate logic from original Kotlin class into TS here

import ApiService from '@/services/apiService';
import { ReportRequest, ReportResponse } from '@/types/api';

/**
 * Report a user via their card ID and a report message.
 */
export async function reportUser(
  userId: string,
  cardId: number | null,
  reportText: string
): Promise<ReportResponse> {
  try {
    const request: ReportRequest = {
      userId,
      cardId,
      reportText,
    };

    const response = await ApiService.reportUser(request);
    console.log('Report submitted successfully:', response.data.reportId);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting report:', error?.message || error);
    throw error;
  }
}
