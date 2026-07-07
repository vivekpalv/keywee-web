// services/payment.service.ts
import { apiClient } from '@/utils/api';

export interface PaymentPlan {
  _id: string;
  title: string;
  amount: number;
  days: number;
  role: string;
}

export interface PaymentRecord {
  _id: string;
  plan: PaymentPlan;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: 'success' | 'pending' | 'failed';
  paymentMethod?: string;
  createdAt: string;
}

export const fetchUserPayments = async () => {
  // No need to get localStorage or set headers manually! The interceptor does it.
  const response = await apiClient.get('/user/payment');
  return response.data.payments;
};