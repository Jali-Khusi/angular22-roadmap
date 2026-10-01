import { Component } from '@angular/core';
import { TopicLessonView } from '../../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-signal-form',
  styleUrl: './signal-form.scss',
  templateUrl: './signal-form.html',
})
export class SignalForm {
  readonly lesson = TOPIC_LESSONS.signalForms;
}
