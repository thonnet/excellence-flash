
import { Excellence, Experience } from './index';

export interface ImportData {
  excellences?: Partial<Excellence>[];
  experiences?: Partial<Experience>[];
}

export type SupportedFormat = 'json' | 'csv' | 'xlsx' | 'md';

export interface ImportStatus {
  type: 'success' | 'error' | 'info' | null;
  message: string;
}
