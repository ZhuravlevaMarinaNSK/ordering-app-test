import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export function handleError(err: HttpErrorResponse) {
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred:  ${err.error.message}`;
  } else {
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.log(errorMessage);
  return throwError(() => errorMessage);
}
