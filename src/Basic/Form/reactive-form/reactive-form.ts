import { Component } from '@angular/core';
import { TopicLessonView } from '../../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-reactive-form',
  styleUrl: './reactive-form.scss',
  templateUrl: './reactive-form.html',
})
export class ReactiveForm {
  readonly lesson = TOPIC_LESSONS.reactiveForms;
}
