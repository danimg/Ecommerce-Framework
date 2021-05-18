import { Component, Input, OnInit } from '@angular/core';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.control.html',
  styleUrls: ['./sidebar.control.css'],

})
export class SidebarControl implements OnInit {
  isCollapsed: any;
  isCollapsed2: any;
  isCollapsed3: any;
  isCollapsed4: any;
  isCollapsedItem: any;
  selected = false;
  isExpanded = false;
  @Input() menuLeft: NavBarItem[];


  constructor(private accessSrv: AccessService) {
  }

  ngOnInit(): void {
    this.disableMenu(this.menuLeft);
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    document.getElementById('sidenav-main').style.width = '0';
    document.getElementById('panel').style.marginLeft = '0';
    document.getElementById('abreSide').removeAttribute('hidden');
  }
  disableMenu(menu: NavBarItem[]) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].claimKey && menu[i].claimValue && !this.accessSrv.hasClaim(menu[i].claimKey + ':' + menu[i].claimValue)) {
        menu.splice(i, 1);
        i--;
        if (menu.length < 1) {
          return;
        }
      } else if (menu[i].claimKey && !this.accessSrv.hasClaim(menu[i].claimKey)) {
        menu.splice(i, 1);
        i--;
        if (menu.length < 1) {
          return;
        }
      } else if (menu[i].items) {
        this.disableMenu(menu[i].items);
        if (menu[i].items.length < 1) {
          menu.splice(i, 1);
          i--;
        }
      }
    }
  }

  onCollapsed(item) {
    if (this.isCollapsed === item) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = item;
    }
  }
  onCollapsedItem(item) {
    if (this.isCollapsedItem === item) {
      this.isCollapsedItem = false;
    } else {
      this.isCollapsedItem = item;
    }
  }
  onCollapsed2(item) {
    if (this.isCollapsed2 === item) {
      this.isCollapsed2 = false;
    } else {
      this.isCollapsed2 = item;
    }
  }
  onCollapsed3(item) {
    if (this.isCollapsed3 === item) {
      this.isCollapsed3 = false;
    } else {
      this.isCollapsed3 = item;
    }
  }
  onCollapsed4(item) {
    if (this.isCollapsed4 === item) {
      this.isCollapsed4 = false;
    } else {
      this.isCollapsed4 = item;
    }
  }
}
export interface NavBarItem {
  title: string;
  url?: string;
  icon?: string;
  subtitle?: string;
  claimKey?: string;
  claimValue?: string;
  items?: NavBarItem[];
}

