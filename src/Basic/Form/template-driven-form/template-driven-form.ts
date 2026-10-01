import { Component } from '@angular/core';
import { TopicLessonView } from '../../topic-lesson/topic-lesson-view';
import { TOPIC_LESSONS } from '../../topic-lesson/topic-lessons';

@Component({
  imports: [TopicLessonView],
  selector: 'app-template-driven-form',
  styleUrl: './template-driven-form.scss',
  templateUrl: './template-driven-form.html',
})
export class TemplateDrivenForm {
  readonly lesson = TOPIC_LESSONS.templateForms;
}
