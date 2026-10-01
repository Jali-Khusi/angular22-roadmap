import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-routing',
  styleUrl: './routing.scss',
  templateUrl: './routing.html',
})
export class RoutingComponent {
  readonly lesson = TOPIC_LESSONS.routing;
}
