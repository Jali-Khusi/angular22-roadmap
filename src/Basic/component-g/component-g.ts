import { Component, signal } from '@angular/core';

type ComponentLessonTab = 'create' | 'render' | 'typescript';

@Component({
  imports: [],
  selector: 'app-component-g',
  styleUrl: './component-g.scss',
  templateUrl: './component-g.html',
})
export class ComponentG {
  readonly activeTab = signal<ComponentLessonTab>('create');

  selectTab(tab: ComponentLessonTab): void {
    this.activeTab.set(tab);
  }
}
