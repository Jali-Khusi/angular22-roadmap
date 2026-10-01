import { Component } from '@angular/core';
import { TopicLessonView } from '../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-data-binding',
  styleUrl: './data-binding.scss',
  templateUrl: './data-binding.html',
})
export class DataBinding {
  readonly lesson = TOPIC_LESSONS.dataBinding;
}
