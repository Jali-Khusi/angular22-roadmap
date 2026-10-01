import { Component, signal } from '@angular/core';
import { ANGULAR_FEATURE_TABS, AngularFeatureTab } from './angular17-22-topics';

@Component({
  imports: [],
  selector: 'app-angular17-22-land-component',
  styleUrl: './angular17-22-land-component.scss',
  templateUrl: './angular17-22-land-component.html',
})
export class Angular1722LandComponent {
  readonly tabs = ANGULAR_FEATURE_TABS;
  readonly activeTabId = signal(this.tabs[0].id);

  get activeTab(): AngularFeatureTab {
    return this.tabs.find((tab: { id: any; }) => tab.id === this.activeTabId()) ?? this.tabs[0];
  }

  get activeIndex(): number {
    return this.tabs.findIndex((tab: { id: any; }) => tab.id === this.activeTabId());
  }

  selectTab(tabId: string): void {
    this.activeTabId.set(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTabId() === tabId;
  }

  isVersionHighlighted(version: string): boolean {
    return this.activeTab.milestoneYears.includes(version);
  }

  selectRelativeTab(offset: number): void {
    const target = this.tabs[this.activeIndex + offset];
    if (target) {
      this.selectTab(target.id);
    }
  }
}
