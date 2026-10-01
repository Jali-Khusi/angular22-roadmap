import { Component } from '@angular/core';
import { TopicLessonView } from '../../Basic/topic-lesson/topic-lesson-view';
import { ADVANCE_LESSONS } from '../advance-lessons';

@Component({
  selector: 'app-subject-behavior',
  standalone: true,
  imports: [TopicLessonView],
  template: '<app-topic-lesson-view [lesson]="lesson" />',
})
export class SubjectBehavior {
  readonly lesson = ADVANCE_LESSONS.subjectBehavior;
}
