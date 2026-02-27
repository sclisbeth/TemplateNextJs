// Example type definitions for your application

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Account {
  id: string;
  accountNumber: string;
  balance: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  sourceAccountId: string;
  sourceAccountNumber: string;
  destinationAccountId: string;
  destinationAccountNumber: string;
  amount: number;
  timestamp: string;
  voucherCode: string;
  status: string;
}

export interface TransferRequest {
  sourceAccountNumber: string;
  destinationAccountNumber: string;
  amount: number;
}

export interface TransferResponse {
  success: boolean;
  transactionId: string;
  voucherCode: string;
  message: string;
  sourceBalance: number;
  destinationBalance: number;
}

export type Status = "idle" | "loading" | "success" | "error";