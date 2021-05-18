import { Component, Input } from "@angular/core";

export interface NgbBreadCrumbLink {
  title?: string;
  url?: string;
  icon?: string;
  active?: boolean
}

@Component({
  selector: 'ngb-breadcrumb',
  templateUrl: 'breadcrumb.html'
})
export class NgbBreadcrumb {
  @Input() links: NgbBreadCrumbLink[];
}
