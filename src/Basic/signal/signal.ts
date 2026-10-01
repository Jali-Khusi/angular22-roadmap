import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-signal',
  styleUrl: './signal.scss',
  templateUrl: './signal.html',
})
export class SignalComponent {
  readonly lesson = TOPIC_LESSONS.signals;
}
