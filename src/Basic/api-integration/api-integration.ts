import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-api-integration',
  styleUrl: './api-integration.scss',
  templateUrl: './api-integration.html',
})
export class ApiIntegration {
  readonly lesson = TOPIC_LESSONS.apiIntegration;
}
