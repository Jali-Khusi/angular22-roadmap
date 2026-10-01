import { Component } from '@angular/core';
import { TopicLessonView } from '../../Basic/topic-lesson/topic-lesson-view';
import { ADVANCE_LESSONS } from '../advance-lessons';

@Component({
  selector: 'app-login-hardcode',
  standalone: true,
  imports: [TopicLessonView],
  template: '<app-topic-lesson-view [lesson]="lesson" />',
})
export class LoginHardcode {
  readonly lesson = ADVANCE_LESSONS.loginHardcode;
}
