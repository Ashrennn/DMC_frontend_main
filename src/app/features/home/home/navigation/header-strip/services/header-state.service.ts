import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type HeaderMenuType = 'language' | 'whatsapp' | 'dropdown1' | 'dropdown2' | 'dropdown3' | null;

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {
  private activeMenuSubject = new BehaviorSubject<HeaderMenuType>(null);
  activeMenu$ = this.activeMenuSubject.asObservable();

  openMenu(menuType: HeaderMenuType) {
    this.activeMenuSubject.next(menuType);
  }

  closeMenu() {
    this.activeMenuSubject.next(null);
  }

  isMenuOpen(menuType: HeaderMenuType): boolean {
    return this.activeMenuSubject.value === menuType;
  }
}
