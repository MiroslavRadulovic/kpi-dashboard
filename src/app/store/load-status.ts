import { HttpErrorResponse } from '@angular/common/http';

export function toErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    return `Request failed (${error.status} ${error.statusText}).`;
  }

  return error instanceof Error ? error.message : 'Something went wrong.';
}
