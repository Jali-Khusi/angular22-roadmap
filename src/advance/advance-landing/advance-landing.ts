import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

// =========================================================
// Advanced topic components
// =========================================================

import { LoginHardcode } from '../login-hardcode/login-hardcode';
import { LoginApi } from '../login-api/login-api';
import { LoginJwt } from '../login-jwt/login-jwt';
import { ViewChildComponent } from '../view-child/view-child';
import { ReusableComponent } from '../reusable-component/reusable-component';
import { CustomDirective } from '../custom-directive/custom-directive';
import { TemplateContent } from '../template-content/template-content';
import { SubjectBehavior } from '../subject-behavior/subject-behavior';


// =========================================================
// Topic interface
// =========================================================

interface AdvanceAngularTopic {
  id: number;
  name: string;
  description: string;
  link: string;
  color: string;
  icon: string;
}


@Component({
  selector: 'app-advance-landing',

  standalone: true,

  imports: [
    RouterLink,

    LoginHardcode,
    LoginApi,
    LoginJwt,
    ViewChildComponent,
    ReusableComponent,
    CustomDirective,
    TemplateContent,
    SubjectBehavior,
  ],

  styleUrl: './advance-landing.scss',

  templateUrl: './advance-landing.html',
})
export class AdvanceLanding {

  // =========================================================
  // Inject services
  // =========================================================

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);


  // =========================================================
  // Read :topic from URL
  //
  // Example:
  //
  // /advance/login-hardcode
  //
  // topic = "login-hardcode"
  // =========================================================

  private readonly routeTopic = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('topic'))
    ),
    {
      initialValue: this.route.snapshot.paramMap.get('topic')
    }
  );


  // =========================================================
  // Find selected topic
  // =========================================================

  readonly selectedTopic = computed(() => {

    const topic = this.routeTopic();

    return this.advanceAngular.find(
      item => item.link === topic
    ) ?? null;

  });


  // =========================================================
  // All Advanced Angular Topics
  // =========================================================

  readonly advanceAngular: AdvanceAngularTopic[] = [

    {
      id: 1,
      name: 'Login with Hardcoded Data & Guard',

      description:
        'Implement a basic login flow using hardcoded credentials and protect routes using an Angular route guard.',

      link: 'login-hardcode',

      color: '#dd0031',

      icon: '🔐',
    },

    {
      id: 2,
      name: 'Login with API',

      description:
        'Build an Angular login flow that communicates with a backend API and handles authentication responses.',

      link: 'login-api',

      color: '#3178c6',

      icon: '⇄',
    },

    {
      id: 3,
      name: 'Login with API, JWT & Interceptor',

      description:
        'Implement JWT-based authentication and use an HTTP interceptor to attach tokens and handle authentication centrally.',

      link: 'login-jwt',

      color: '#b7178c',

      icon: '🛡',
    },

    {
      id: 4,
      name: 'ViewChild',

      description:
        'Understand @ViewChild and learn how to access child components, DOM elements and template references.',

      link: 'view-child',

      color: '#d6a900',

      icon: '⌕',
    },

    {
      id: 5,
      name: 'Reusable Component — Input & Output',

      description:
        'Create reusable Angular components and communicate between parent and child components using Input and Output.',

      link: 'reusable-component',

      color: '#3c966a',

      icon: '♻',
    },

    {
      id: 6,
      name: 'Custom Directive — HostListener & ElementRef',

      description:
        'Create custom directives using HostListener and ElementRef to interact with DOM elements and user events.',

      link: 'custom-directive',

      color: '#dd0031',

      icon: '◆',
    },

    {
      id: 7,
      name: 'ng-container, ng-template & ng-content',

      description:
        'Understand Angular template composition using ng-container, ng-template and content projection with ng-content.',

      link: 'template-content',

      color: '#3178c6',

      icon: '{}',
    },

    {
      id: 8,
      name: 'Subject & BehaviorSubject',

      description:
        'Understand RxJS Subject and BehaviorSubject and use them for communication and shared reactive state.',

      link: 'subject-behavior',

      color: '#b7178c',

      icon: '◉',
    },

  ];


  // =========================================================
  // Back to /advance
  // =========================================================

  showAllTopics(): void {

    void this.router.navigate(['/advance']);

  }

}