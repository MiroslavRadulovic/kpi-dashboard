import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs';

export function injectMediaQuery(query: string): Signal<boolean> {
  const observer = inject(BreakpointObserver);

  return toSignal(observer.observe(query).pipe(map((state: BreakpointState) => state.matches)), {
    initialValue: observer.isMatched(query),
  });
}
