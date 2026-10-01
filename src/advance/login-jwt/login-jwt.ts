import { Component } from '@angular/core';
import { TopicLessonView } from '../../Basic/topic-lesson/topic-lesson-view';
import { ADVANCE_LESSONS } from '../advance-lessons';

@Component({
  selector: 'app-login-jwt',
  standalone: true,
  imports: [TopicLessonView],
  template: '<app-topic-lesson-view [lesson]="lesson" />',
})
export class LoginJwt {
  readonly lesson = ADVANCE_LESSONS.loginJwt;
}
