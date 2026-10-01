import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-directives',
  styleUrl: './directives.scss',
  templateUrl: './directives.html',
})
export class Directives {
  readonly lesson = TOPIC_LESSONS.directives;
}
