import { Component, signal } from '@angular/core';

type SetupTab = 'node' | 'cli' | 'project';

@Component({
  imports: [],
  selector: 'app-instll-setup',
  styleUrl: './instll-setup.scss',
  templateUrl: './instll-setup.html',
})
export class InstllSetup {
  readonly activeTab = signal<SetupTab>('node');

  selectTab(tab: SetupTab): void {
    this.activeTab.set(tab);
  }
}
