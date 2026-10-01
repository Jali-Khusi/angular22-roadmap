import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-guard-service-interceptor',
  styleUrl: './guard-service-interceptor.scss',
  templateUrl: './guard-service-interceptor.html',
})
export class GuardServiceInterceptor {
  readonly lesson = TOPIC_LESSONS.guardsServices;
}
