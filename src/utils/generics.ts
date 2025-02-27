import type { Validation, ValidationArgs } from "@vuelidate/core/index.js";

export function getError<T>(
  v$: Validation<ValidationArgs<unknown>, T>,
  value: string,
  key?: string,
  index?: number
): string | string[] {
  if (key !== undefined && index !== undefined) {
    if (!v$[value]?.$each?.$response?.$errors) return "";
    return v$[value].$each.$response.$errors[index][key]?.map(
      (e: any) => e.$message
    );
  } else {
    if (!v$[value]?.$errors) return "";
    return v$[value]?.$errors?.map(
      (e: { $message: string[] }) => e?.$message
    )[0];
  }
}
