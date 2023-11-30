import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // @Input('appDropdown') class: string;

  //shorthand this.elRef = elRef
  constructor(private elRef: ElementRef) {}

  @HostBinding('class.open') open = false;


  // @HostListener('click') click() {
  //   this.open = !this.open;
  // }

  //close dropdown from everywhere
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;
  }
}
