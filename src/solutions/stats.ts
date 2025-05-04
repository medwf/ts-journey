type Comparator<T> = (v1: T, v2: T) => number;

declare module 'stats' {
  export function getMaxIndex<T>(
    input: T[], comparator: Comparator<T>
  ): number;

  export function getMaxElement<T>(
    input: T[], comparator: Comparator<T>
  ): T | null;

  export function getMinIndex<T>(
    input: T[], comparator: Comparator<T>
  ): number;

  export function getMinElement<T>(
    input: T[], comparator: Comparator<T>
  ): T | null;

  export function getMedianIndex<T>(
    input: T[], comparator: Comparator<T>
  ): number;

  export function getMedianElement<T>(
    input: T[], comparator: Comparator<T>
  ): T | null;

  export function getAverageValue<T>(
    input: T[], getValue: (v1: T) => number
  ): number | null;
}

