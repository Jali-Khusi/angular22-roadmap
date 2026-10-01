import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-contrl-flow',
  styleUrl: './contrl-flow.scss',
  templateUrl: './contrl-flow.html',
})
export class ContrlFlow {
  readonly lesson = TOPIC_LESSONS.controlFlow;
}
