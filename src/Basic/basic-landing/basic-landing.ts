import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ApiIntegration } from '../api-integration/api-integration';
import { ComponentG } from '../component-g/component-g';
import { ContrlFlow } from '../contrl-flow/contrl-flow';
import { DataBinding } from '../data-binding/data-binding';
import { Directives } from '../directives/directives';
import { GuardServiceInterceptor } from '../guard-service-interceptor/guard-service-interceptor';

import { ReactiveForm } from '../Form/reactive-form/reactive-form';
import { SignalForm } from '../Form/signal-form/signal-form';
import { TemplateDrivenForm } from '../Form/template-driven-form/template-driven-form';

import { InstllSetup } from '../instll-setup/instll-setup';
import { SignalComponent } from '../signal/signal';
import { RoutingComponent } from '../routing/routing';


interface BasicAngularTopic {
  id: number;
  name: string;
  description: string;
  link: string;
  color: string;
  icon: string;
}


@Component({
  selector: 'app-basic-landing',
  standalone: true,

  imports: [
    RouterLink,

    ApiIntegration,
    ComponentG,
    ContrlFlow,
    DataBinding,
    Directives,
    GuardServiceInterceptor,
    ReactiveForm,
    SignalForm,
    TemplateDrivenForm,
    InstllSetup,
    SignalComponent,
    RoutingComponent,
  ],

  templateUrl: './basic-landing.html',
  styleUrl: './basic-landing.scss',
})
export class BasicLanding {

  // ---------------------------------------------------------
  // Inject services
  // ---------------------------------------------------------

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  // ---------------------------------------------------------
  // Read :topic from URL
  //
  // Example:
  // /basic/installation
  //
  // topic = "installation"
  // ---------------------------------------------------------

  private readonly routeTopic = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('topic'))
    ),
    {
      initialValue: this.route.snapshot.paramMap.get('topic')
    }
  );


  // ---------------------------------------------------------
  // Find selected topic from URL
  // ---------------------------------------------------------

  readonly selectedTopic = computed(() => {

    const topic = this.routeTopic();

    return this.basicAngular.find(
      item => item.link === topic
    ) ?? null;

  });


  // ---------------------------------------------------------
  // All Angular topics
  // ---------------------------------------------------------

  readonly basicAngular: BasicAngularTopic[] = [

    {
      id: 1,
      name: 'Installation & Setup',
      description:
        'Install Angular tooling and create your first Angular 22 project.',
      link: 'installation',
      color: '#dd0031',
      icon: '⚙',
    },

    {
      id: 2,
      name: 'Components',
      description:
        'Create Angular components and understand templates, styles and metadata.',
      link: 'component',
      color: '#dd0031',
      icon: '▣',
    },

    {
      id: 3,
      name: 'Data Binding',
      description:
        'Learn interpolation, property binding, event binding and two-way binding.',
      link: 'data-binding',
      color: '#d6a900',
      icon: '↔',
    },

    {
      id: 4,
      name: 'Routing',
      description:
        'Configure routes, navigate between pages and work with route parameters.',
      link: 'routing',
      color: '#3178c6',
      icon: '⌘',
    },

    {
      id: 5,
      name: 'Directives',
      description:
        'Understand Angular directives and use them to control and style templates.',
      link: 'directives',
      color: '#b7178c',
      icon: '◆',
    },

    {
      id: 6,
      name: 'Control Flow',
      description:
        'Learn modern Angular control flow using @if, @for, @switch and @empty.',
      link: 'control-flow',
      color: '#dd0031',
      icon: '{}',
    },

    {
      id: 7,
      name: 'Signals',
      description:
        'Understand Signals, reactive state, signal updates and computed values.',
      link: 'signals',
      color: '#3178c6',
      icon: '⚡',
    },

    {
      id: 8,
      name: 'Template-driven Forms',
      description:
        'Create template-driven forms and implement form controls and validation.',
      link: 'template-form',
      color: '#d6a900',
      icon: '☷',
    },

    {
      id: 9,
      name: 'Reactive Forms',
      description:
        'Build forms using FormControl, FormGroup, FormArray and validators.',
      link: 'reactive-form',
      color: '#b7178c',
      icon: '✓',
    },

    {
      id: 10,
      name: 'Signal Forms',
      description:
        'Explore modern signal-based form state and form validation.',
      link: 'signal-form',
      color: '#3178c6',
      icon: '◉',
    },

    {
      id: 11,
      name: 'API Integration',
      description:
        'Work with GET, POST, PUT, PATCH and DELETE APIs with error handling.',
      link: 'api-integration',
      color: '#dd0031',
      icon: '⇄',
    },

    {
      id: 12,
      name: 'Services, Guards & Interceptors',
      description: 'Share app logic, process HTTP requests centrally and guard routes.',
      link: 'services-guards-interceptors',
      color: '#3c966a',
      icon: '◇',
    },

  ];


  // ---------------------------------------------------------
  // Back to /basic
  // ---------------------------------------------------------

  showAllTopics(): void {
    void this.router.navigate(['/basic']);
  }

}