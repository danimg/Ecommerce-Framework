import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccessService } from '../services/access.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[hasClaim]'
})
export class HasClaimDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private accessService: AccessService) { }
  @Input()
  set hasClaim(claimType: any) {
    if (this.accessService.hasClaim(claimType)) {
      // Add template to DOM
      this.viewContainer.
        createEmbeddedView(this.templateRef);
    } else {
      // Remove template from DOM
      this.viewContainer.clear();
    }
  }
}
