import { Component } from '@angular/core';
import { TopicLessonView } from '../../Basic/topic-lesson/topic-lesson-view';
import { ADVANCE_LESSONS } from '../advance-lessons';

@Component({
  selector: 'app-login-api',
  standalone: true,
  imports: [TopicLessonView],
  template: '<app-topic-lesson-view [lesson]="lesson" />',
})
export class LoginApi {
  readonly lesson = ADVANCE_LESSONS.loginApi;
}
