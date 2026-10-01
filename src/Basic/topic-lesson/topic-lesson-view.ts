import { Component, computed, input, signal } from '@angular/core';
import { TopicLesson } from './topic-lesson.model';

@Component({
  selector: 'app-topic-lesson-view',
  standalone: true,
  templateUrl: './topic-lesson-view.html',
  styleUrl: './topic-lesson-view.scss',
})
export class TopicLessonView {
  readonly lesson = input.required<TopicLesson>();
  private readonly activeId = signal('');
  readonly activeTab = computed(() =>
    this.lesson().tabs.find((tab) => tab.id === this.activeId()) ?? this.lesson().tabs[0],
  );

  isActive(tabId: string): boolean {
    return this.activeTab()?.id === tabId;
  }

  selectTab(tabId: string): void {
    this.activeId.set(tabId);
  }

  selectNextTab(): void {
    const tabs = this.lesson().tabs;
    const activeIndex = tabs.findIndex((tab) => tab.id === this.activeTab()?.id);
    const nextTab = tabs[activeIndex + 1];

    if (nextTab) {
      this.selectTab(nextTab.id);
    }
  }
}
