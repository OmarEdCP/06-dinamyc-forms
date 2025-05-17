import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItems{
  title: string;
  route: string;
}

const reactiveItem = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItems[] = reactiveItem
  .filter(item => item.path !== '**')
  .map(item => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`,
  }));

authMenu: MenuItems[] = [{
  title: 'Registro',
  route: './auth',
}];

countryMenu: MenuItems[] = [{
  title: 'Países',
  route: './country',
}];
}
