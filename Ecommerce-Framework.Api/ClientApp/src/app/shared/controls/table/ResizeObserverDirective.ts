// import { Output, EventEmitter, OnDestroy, ElementRef, Directive } from '@angular/core';
// // import ResizeObserver from 'resize-observer-polyfill';

// export const entriesMap = new WeakMap();

// export const ro = new ResizeObserver(entries => {
//   for (const entry of entries) {
//     if (entriesMap.has(entry.target)) {
//       const comp = entriesMap.get(entry.target);
//       comp._resizeCallback(entry);
//     }
//   }
// });

// // tslint:disable-next-line: directive-selector
// @Directive({ selector: '[resizeObserver]' })
// export class ResizeObserverDirective implements OnDestroy {
//   @Output()
//   resize = new EventEmitter();

//   constructor(private el: ElementRef) {
//     const target = this.el.nativeElement;
//     entriesMap.set(target, this);
//     ro.observe(target);
//   }

//   _resizeCallback(entry) {
//     this.resize.emit(entry);
//   }

//   ngOnDestroy() {
//     const target = this.el.nativeElement;
//     ro.unobserve(target);
//     entriesMap.delete(target);
//   }
// }
