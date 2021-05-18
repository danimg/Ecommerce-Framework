import { Component, Input, OnInit } from '@angular/core';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-ctrl-navbar',
  templateUrl: './navbar.control.html',
  styleUrls: ['./navbar.control.css']
})
export class NavBarControl implements OnInit {

  isExpanded = false;

  @Input() menuLeft: NavBarItem[];
  @Input() menuRight: NavBarItem[];

  public localAtendimento = '';
  public cbo = '';
  constructor(private accessSrv: AccessService) { }

  ngOnInit(): void {
    this.localAtendimento = this.accessSrv.jwt.value.localAtendimento;
    this.cbo = this.accessSrv.jwt.value.cbo;
    this.disableMenu(this.menuRight);
    this.toggle();
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

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    document.getElementById('sidenav-main').style.width = '';
    document.getElementById('panel').style.marginLeft = '';
    document.getElementById('abreSide').setAttribute('hidden', 'hidden');
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
