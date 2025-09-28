import { URL_LOAD_FAILURE_ERRORS } from '../constants/common';
import { URL_LOAD_FAILURE_ERROR_TYPE } from '../constants/types';

export default function getErrorByErrorCode(
  errorCode: number,
): URL_LOAD_FAILURE_ERROR_TYPE {
  const ec = Math.abs(errorCode);

  if (ec >= 100 && ec < 200) {
    return {
      type: URL_LOAD_FAILURE_ERRORS.INTERNET_FAILURE,
      code: ec,
    };
  }

  return {
    type: URL_LOAD_FAILURE_ERRORS.UNKNOWN,
    code: ec,
  };
}
