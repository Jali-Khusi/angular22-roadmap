export interface AngularFeatureExample {
  title: string;
  explanation: string;
  code: string;
  note?: string;
}

export interface AngularFeatureTab {
  id: string;
  label: string;
  kicker: string;
  title: string;
  intro: string;
  examples: AngularFeatureExample[];
  takeaway: string;
  exercise: string;
}

export const ANGULAR_FEATURE_TABS: AngularFeatureTab[] = [
  {
    id: 'templates',
    label: 'Template control',
    kicker: '01 / DECLARATIVE TEMPLATES',
    title: 'Control what the template renders',
    intro: 'Modern Angular templates include built-in control flow, template-local variables, and deferred views. These features make conditional, repeated, and optional UI more readable.',
    examples: [
      {
        title: 'Built-in control flow: @if, @for, @switch',
        explanation: 'Use @if for conditions, @for for collections, and @switch for mutually exclusive cases. Track each repeated item with a stable key.',
        code: `@if (loading()) {
  <app-spinner />
} @else if (error()) {
  <p role="alert">Could not load results.</p>
} @else {
  @for (item of items(); track item.id; let index = $index) {
    <p>{{ index + 1 }}. {{ item.name }}</p>
  } @empty {
    <p>No results yet.</p>
  }
}`,
        note: 'These are built-in template blocks; they do not need NgIf or NgFor imports. Stable tracking keys preserve DOM identity efficiently.',
      },
      {
        title: 'Template variables with @let',
        explanation: '@let names an expression inside the current template view. It is reevaluated as its signal dependencies change; it is not a mutable TypeScript variable.',
        code: `@let fullName = user().firstName + ' ' + user().lastName;
<h2>{{ fullName }}</h2>

@let hasResults = items().length > 0;
@if (hasResults) {
  <p>{{ items().length }} results</p>
}`,
        note: 'Declare @let before using the variable in that view. It cannot be assigned to later.',
      },
      {
        title: 'Defer non-critical UI with @defer',
        explanation: '@defer delays eligible dependencies until a trigger fires. Provide placeholder, loading, and error UI so the delayed region remains understandable.',
        code: `@defer (on viewport) {
  <app-analytics-chart />
} @placeholder {
  <div class="chart-placeholder">Chart appears here</div>
} @loading (minimum 300ms) {
  <app-spinner />
} @error {
  <p role="alert">Chart could not be loaded.</p>
}`,
        note: 'Triggers include viewport, interaction, hover, idle, and timer. Confirm that dependencies are eligible for deferred loading.',
      },
    ],
    takeaway: 'Use control-flow blocks to express view states, @let to name repeated expressions, and @defer when non-critical UI can load later.',
    exercise: 'Build a results view with loading, error, empty, and populated states, then defer its detail chart until it enters the viewport.',
  },
  {
    id: 'signals',
    label: 'Signals',
    kicker: '02 / REACTIVE STATE',
    title: 'Model state with Signals',
    intro: 'Signals represent current values and let Angular track which views and computations depend on them. Pick the signal type based on who owns and updates the state.',
    examples: [
      {
        title: 'signal(), set(), update(), asReadonly()',
        explanation: 'signal() creates writable state. set() replaces the value; update() derives a new value from the current one. asReadonly() exposes a read-only signal interface.',
        code: `count = signal(0);
readonlyCount = this.count.asReadonly();

this.count.set(10);
this.count.update(current => current + 1);
console.log(this.readonlyCount());`,
        note: 'asReadonly() does not deep-freeze objects held by the signal. Avoid mutating nested values in place.',
      },
      {
        title: 'computed(): pure derived state',
        explanation: 'computed() is lazy, memoized, and read-only. It tracks signals read during its derivation and recalculates when those dependencies change.',
        code: `price = signal(12);
quantity = signal(2);
total = computed(() => this.price() * this.quantity());

// In a template:
<p>Total: {{ total() }}</p>`,
        note: 'Do not copy a derived value into a second writable signal. Keep the derivation in computed().',
      },
      {
        title: 'linkedSignal(): writable state linked to a source',
        explanation: 'linkedSignal() is writable like signal(), but reruns its source calculation when source dependencies change. It is useful for a user-adjustable selection that resets when the available choices change.',
        code: `options = signal(['small', 'medium']);
selected = linkedSignal(() => this.options()[0]);

this.selected.set('medium');
this.options.set(['large', 'x-large']);
// selected resets to 'large'`,
        note: 'Use computed() for read-only derivations. Use linkedSignal() only when the derived value also needs to be writable.',
      },
      {
        title: 'effect() and untracked()',
        explanation: 'effect() tracks signal reads in its callback. untracked() reads a signal without making that read a dependency of the active effect.',
        code: `effect(() => {
  const user = this.currentUser();
  const debugCount = untracked(() => this.count());
  console.log(user.name, debugCount);
});`,
        note: 'Use effects to synchronize with external systems, not to copy one signal into another. Prefer computed() for derived state.',
      },
    ],
    takeaway: 'Use signal for owned state, computed for pure derivation, linkedSignal for writable state tied to source changes, and effect only for external side effects.',
    exercise: 'Build a cart total with writable item and quantity signals, a computed total, and a selected shipping method that resets when methods change.',
  },
  {
    id: 'component-api',
    label: 'Component APIs',
    kicker: '03 / COMPONENT CONTRACTS',
    title: 'Make component inputs and queries reactive',
    intro: 'Signal-based inputs, models, outputs, and queries make component contracts reactive and explicit.',
    examples: [
      {
        title: 'Signal Inputs: input() and input.required()',
        explanation: 'input() declares an optional input signal; input.required<T>() declares one the parent must supply. Read an input by calling it. The child does not write to parent-owned input state.',
        code: `name = input.required<string>();
subtitle = input('Welcome');

// Parent template
<app-profile [name]="userName" />

// Child template
<h2>{{ name() }}</h2>
<p>{{ subtitle() }}</p>`,
        note: 'Signal inputs replace @Input for new code, though decorator inputs remain supported. Input transforms can normalize values at the boundary.',
      },
      {
        title: 'Model Inputs with model()',
        explanation: 'model() creates a writable input and a matching change output for two-way component binding. Use it only when the child is intended to update the parent-owned value.',
        code: `value = model(0);

increment(): void {
  this.value.update(current => current + 1);
}

// Parent template
<app-counter [(value)]="count" />`,
        note: 'For one-way events, use output() instead of a model input.',
      },
      {
        title: 'Signal Queries',
        explanation: 'View queries inspect the component’s own template. Content queries inspect content projected by its parent. Query results are signals and update when matches change.',
        code: `searchBox = viewChild<ElementRef<HTMLInputElement>>('searchBox');
menuItems = viewChildren(MenuItemComponent);
projectedTitle = contentChild<ElementRef<HTMLElement>>('title');
projectedItems = contentChildren(ProjectedItemComponent);

focusSearch(): void {
  this.searchBox()?.nativeElement.focus();
}`, 
        note: 'Query results may be undefined until a match exists. Use required queries only when a missing match is a programming error.',
      },
    ],
    takeaway: 'Use inputs for parent-owned values, model() for deliberate two-way state, outputs for events, and queries for template relationships.',
    exercise: 'Create a rating component with a required title input, a model-bound rating, and a viewChild query that focuses its control.',
  },
  {
    id: 'routing',
    label: 'Functional routing',
    kicker: '04 / NAVIGATION',
    title: 'Use function-based Router APIs',
    intro: 'Standalone router providers, functional guards and resolvers, lazy loading, and route-to-input binding make navigation easier to compose.',
    examples: [
      {
        title: 'Configure routes with provideRouter()',
        explanation: 'Register the route table at application bootstrap. loadComponent lazy-loads standalone pages when the route is visited.',
        code: `export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products/:id',
    loadComponent: () => import('./product-page')
      .then(module => module.ProductPage),
  },
];

// app.config.ts
providers: [provideRouter(routes)]`,
        note: 'Put the wildcard route last and lazy-load screens that are not needed on the initial route.',
      },
      {
        title: 'Functional guards and resolvers',
        explanation: 'CanActivateFn and ResolveFn use inject() for dependencies. A guard returns true, false, or a UrlTree; a resolver supplies data before route activation.',
        code: `export const signedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  return isSignedIn() || router.createUrlTree(['/login']);
};

export const productResolver: ResolveFn<Product> = route => {
  const api = inject(ProductApi);
  return api.getProduct(route.paramMap.get('id')!);
};`,
        note: 'A guard controls client navigation; it is not a security boundary. The server must enforce authorization too.',
      },
      {
        title: 'Bind route data to component inputs',
        explanation: 'withComponentInputBinding() maps route parameters, query parameters, static data, and resolved data to matching component inputs.',
        code: `provideRouter(routes, withComponentInputBinding());

// Routed component
id = input.required<string>();
product = input.required<Product>();`,
        note: 'Align input names with route parameter and resolver keys. Validate URL values before using them.',
      },
    ],
    takeaway: 'Functional route APIs make dependencies explicit and work well with lazy-loaded standalone components.',
    exercise: 'Create a lazy product route with an ID parameter, authentication guard, resolver, and route-to-input binding.',
  },
  {
    id: 'zoneless-forms',
    label: 'Zoneless & forms',
    kicker: '05 / CHANGE DETECTION',
    title: 'Understand zoneless Angular and form state',
    intro: 'Zoneless change detection relies on explicit Angular notifications instead of Zone.js task patching. Signals, template events, input updates, and observable bindings can notify Angular that a view needs work.',
    examples: [
      {
        title: 'Enable zoneless change detection',
        explanation: 'Zoneless setup and default status vary by Angular release. Check the target version’s documentation and the generated application configuration.',
        code: `// app.config.ts when required by your version
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection()],
};`,
        note: 'Confirm the provider API and Zone.js setup for the exact installed version before removing dependencies.',
      },
      {
        title: 'Notify Angular from external callbacks',
        explanation: 'When a callback from a third-party library changes state, writing to a signal gives Angular an explicit notification.',
        code: `status = signal('idle');

externalWidget.onDone(() => {
  this.status.set('complete');
});

// Template
<p>{{ status() }}</p>`,
        note: 'Avoid relying on an arbitrary mutable field changing outside Angular-aware events. OnPush remains useful in zoneless applications.',
      },
      {
        title: 'Observe Reactive FormControl state changes',
        explanation: 'FormControl exposes valueChanges and statusChanges Observables, plus a unified events stream in modern Angular. Control state itself is not a signal; bridge it when signal-style template reads are useful.',
        code: `status = toSignal(this.emailControl.statusChanges, {
  initialValue: this.emailControl.status,
});

isValid = computed(() => this.status() === 'VALID');

this.emailControl.markAsTouched();
this.emailControl.setValue('dev@example.com');`,
        note: 'Create toSignal once in an injection context. FormControl state changes trigger these streams; they are not automatically Signals.',
      },
    ],
    takeaway: 'Zoneless means updates need clear notifications, not manual change detection everywhere. Form controls remain observable state unless converted.',
    exercise: 'Expose a FormControl status with toSignal and build valid/invalid feedback that updates in a zoneless application.',
  },
  {
    id: 'resources',
    label: 'Resource APIs',
    kicker: '06 / ASYNC DATA',
    title: 'Load async data with resource() and rxResource()',
    intro: 'Resource APIs connect parameterized asynchronous reads to signal state and expose value, loading, and error information.',
    examples: [
      {
        title: 'resource(): Promise-based loader',
        explanation: 'resource() watches params and invokes its loader when they change. The supplied AbortSignal can cancel obsolete work.',
        code: `userId = signal('42');
userResource = resource({
  params: () => ({ id: this.userId() }),
  loader: async ({ params, abortSignal }) => {
    const response = await fetch(
      '/api/users/' + params.id,
      { signal: abortSignal },
    );
    if (!response.ok) throw new Error('Request failed');
    return response.json() as Promise<User>;
  },
});`,
        note: 'Resources are intended for reads, not mutations. Use the provided abort signal to stop stale requests when parameters change.',
      },
      {
        title: 'Render pending, error, and value states',
        explanation: 'Check resource state before reading its value. This keeps async UI states explicit and prevents unsafe access before data is ready.',
        code: `@if (userResource.isLoading()) {
  <app-spinner />
} @else if (userResource.error()) {
  <p role="alert">User could not be loaded.</p>
} @else if (userResource.hasValue()) {
  <h2>{{ userResource.value().name }}</h2>
}`, 
        note: 'Use defaultValue when the UI needs a value before the first successful load; otherwise guard access with hasValue().',
      },
      {
        title: 'rxResource(): Observable-based loader',
        explanation: 'rxResource accepts an Observable stream factory, making it natural for HttpClient and RxJS-based request logic.',
        code: `userResource = rxResource({
  params: () => ({ id: this.userId() }),
  stream: ({ params }) =>
    this.http.get<User>('/api/users/' + params.id),
});

userResource.isLoading();
userResource.value();
userResource.error();`,
        note: 'API availability and stability vary by Angular release. Check the official documentation for your exact version before production use.',
      },
    ],
    takeaway: 'Use resource APIs for signal-oriented async reads. Use RxJS directly when the workflow needs broader stream composition.',
    exercise: 'Build a user lookup driven by a signal ID and show pending, error, and success states using resource(), then rxResource().',
  },
  {
    id: 'rxjs-interop',
    label: 'RxJS interop',
    kicker: '07 / SIGNALS + STREAMS',
    title: 'Move deliberately between Signals and RxJS',
    intro: 'Signals represent a current value; Observables represent values over time. Interop helpers bridge them while keeping subscription lifetime and stream timing explicit.',
    examples: [
      {
        title: 'Observable to Signal with toSignal()',
        explanation: 'toSignal() subscribes to an Observable and exposes its latest emission as a signal. Provide an initial value if the Observable may not emit synchronously.',
        code: `users = toSignal(
  this.http.get<User[]>('/api/users'),
  { initialValue: [] },
);

// In a template
@for (user of users(); track user.id) {
  <p>{{ user.name }}</p>
}`, 
        note: 'toSignal subscribes immediately and cleans up with its injection context by default. Create it once, not inside a method or computed callback.',
      },
      {
        title: 'Signal to Observable with toObservable()',
        explanation: 'toObservable() exposes signal changes as an Observable. Use RxJS operators for debouncing, cancellation, and stream composition.',
        code: `search = signal('');
results = toSignal(
  toObservable(this.search).pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(term => this.api.search(term)),
  ),
  { initialValue: [] as SearchResult[] },
);`,
        note: 'Signal writes may be coalesced before the Observable sees the stabilized value; do not assume each synchronous write emits separately.',
      },
      {
        title: 'Choose the right abstraction',
        explanation: 'Keep view-facing current state as Signals and multi-event async composition in RxJS. Convert at boundaries rather than repeatedly converting back and forth.',
        code: `query = signal('');
results = toSignal(
  toObservable(this.query).pipe(
    debounceTime(300),
    switchMap(query => this.searchApi.find(query)),
  ),
  { initialValue: [] },
);`,
        note: 'Handle stream errors before converting or represent errors as explicit state; an Observable error is rethrown when its toSignal value is read.',
      },
    ],
    takeaway: 'Use toSignal for a latest-value view of a stream, and toObservable when a signal needs RxJS operators.',
    exercise: 'Create a debounced signal-backed search that cancels stale requests with switchMap and shows loading, error, and results.',
  },
  {
    id: 'signal-forms',
    label: 'Signal Forms',
    kicker: '08 / FORM STATE',
    title: 'Understand Signal Forms and their status',
    intro: 'Signal Forms make form values and field state signal-oriented. Their exact API and stability depend on the Angular release.',
    examples: [
      {
        title: 'Define a signal-backed model',
        explanation: 'Start with a writable signal for the data shape, then pass it to the Signal Forms API supported by the installed Angular version.',
        code: `import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';

profileModel = signal({ name: '', email: '' });
profileForm = form(this.profileModel);`,
        note: 'Verify the package path and stability status in the official docs for your installed Angular version.',
      },
      {
        title: 'Bind a field and show validation',
        explanation: 'Signal Forms expose field state reactively so a template can bind a field and display feedback based on touched and invalid state.',
        code: `<form>
  <label for="profile-name">Name</label>
  <input id="profile-name" [formField]="profileForm.name">
  @if (profileForm.name().touched() && profileForm.name().invalid()) {
    <small role="alert">Enter a name.</small>
  }
</form>`,
        note: 'Signal Forms APIs may be experimental or preview. Check exact syntax and supported validators for the target release.',
      },
      {
        title: 'Choose Signal Forms or Reactive Forms',
        explanation: 'ReactiveFormsModule remains a mature, established choice. Signal Forms can fit a signal-first app when their maturity and ecosystem support fit the project.',
        code: `// Reactive Forms
const control = new FormControl('', Validators.required);

// Signal Forms (version-sensitive API)
const model = signal({ name: '' });
const fields = form(model);`,
        note: 'Do not mix APIs for one control tree. Compare validation, accessibility, testing, and library compatibility before migrating.',
      },
    ],
    takeaway: 'Understand the signal-backed model, but treat Signal Forms as version-sensitive until the target release documents the API as stable.',
    exercise: 'Build the same profile form with both APIs and compare field state, validation, testing, and release stability.',
  },
  {
    id: 'di-lifecycle',
    label: 'DI & lifecycle',
    kicker: '09 / APPLICATION ARCHITECTURE',
    title: 'Use standalone APIs, inject(), and lifecycle cleanup',
    intro: 'Standalone components declare template dependencies locally. inject() resolves services in an injection context, while lifecycle helpers make subscriptions and DOM work easier to own.',
    examples: [
      {
        title: 'Standalone components and inject()',
        explanation: 'A standalone component imports its template dependencies directly. inject() can resolve dependencies in field initializers and other injection contexts.',
        code: `@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './orders.html',
})
export class OrdersPage {
  private readonly ordersApi = inject(OrdersApi);
}`, 
        note: 'inject() cannot be called arbitrarily after construction. Use it only in a documented injection context.',
      },
      {
        title: 'Clean up subscriptions with takeUntilDestroyed()',
        explanation: 'takeUntilDestroyed() completes an Observable subscription when its Angular context is destroyed.',
        code: `private readonly destroyRef = inject(DestroyRef);

this.route.paramMap.pipe(
  switchMap(params => this.api.load(params.get('id')!)),
  takeUntilDestroyed(this.destroyRef),
).subscribe(value => this.value.set(value));`,
        note: 'Prefer AsyncPipe or toSignal when they directly express a template dependency. Use explicit subscriptions for imperative effects.',
      },
      {
        title: 'Schedule DOM work after rendering',
        explanation: 'afterNextRender() is useful when integrating a browser library that needs rendered DOM. Clean up the external resource when its owner is destroyed.',
        code: `afterNextRender(() => {
  const chart = createChart(this.host.nativeElement);
  this.destroyRef.onDestroy(() => chart.destroy());
});`,
        note: 'DOM APIs are unavailable during server rendering. Keep browser-only initialization out of server execution.',
      },
    ],
    takeaway: 'Declare dependencies locally, and give subscriptions and external resources a clear lifecycle owner.',
    exercise: 'Build a standalone page that injects a data service, reacts to route changes, cleans up its subscription, and initializes a browser widget after render.',
  },
  {
    id: 'ssr-hydration',
    label: 'SSR & hydration',
    kicker: '10 / RENDERING',
    title: 'Render on the server and hydrate in the browser',
    intro: 'Server-side rendering sends useful HTML before browser JavaScript runs. Hydration attaches Angular behavior to that markup instead of throwing it away and rebuilding it.',
    examples: [
      {
        title: 'Add SSR with Angular CLI',
        explanation: 'The CLI configures server entry points and hydration providers for the project.',
        code: `ng add @angular/ssr

npm run build
npm run serve:ssr`,
        note: 'Generated scripts and deployment requirements vary by CLI release and hosting platform.',
      },
      {
        title: 'Keep server and browser markup consistent',
        explanation: 'Hydration expects the client’s initial template to match server-rendered markup. Browser-only values and direct DOM mutation can cause mismatches.',
        code: `// Run browser-only work after rendering.
afterNextRender(() => {
  const width = window.innerWidth;
  this.viewportWidth.set(width);
});`,
        note: 'Common mismatch sources include random values, current-time output, locale differences, and direct DOM mutation.',
      },
      {
        title: 'Defer below-the-fold hydration',
        explanation: 'Supported Angular releases can defer hydration of non-critical sections until a user-oriented trigger occurs.',
        code: `@defer (hydrate on viewport) {
  <app-recommendations />
} @placeholder {
  <section aria-label="Recommendations loading">
    Recommendations appear here
  </section>
}`, 
        note: 'Incremental hydration syntax and supported triggers are release-dependent. Verify them for your Angular version.',
      },
    ],
    takeaway: 'SSR produces the initial HTML; hydration attaches Angular behavior. Consistent markup and browser-safe boundaries prevent hydration mismatches.',
    exercise: 'Enable SSR on a small route, identify browser-only code, and verify hydration without console mismatch warnings.',
  },
  {
    id: 'timeline',
    label: 'Version map',
    kicker: '11 / ANGULAR 17–22',
    title: 'Place features in their release context',
    intro: 'Feature availability, stability, and CLI defaults are different things. Verify release notes and migration guidance for the version installed in your project.',
    examples: [
      {
        title: 'Major milestones',
        explanation: 'This is a study guide, not an exhaustive changelog. Check the official update guide for exact minor-release status.',
        code: `Angular 17  Built-in control flow, @defer, signal inputs preview
Angular 18  Signals and zoneless capabilities expanded
Angular 19  Signal APIs mature; standalone default for new components
Angular 20  Zoneless change detection reaches stable status
Angular 21  Zoneless default for new projects
Angular 22  Verify release notes for current defaults and migrations`,
        note: 'Signal Forms, Resource APIs, and newer template features may be preview or experimental depending on the exact release.',
      },
      {
        title: 'Upgrade checklist',
        explanation: 'Upgrade incrementally and keep a known-good baseline so new failures are attributable.',
        code: `1. Read the target version update guide.
2. Run the Angular CLI update migration.
3. Build and run tests.
4. Review deprecated and preview APIs.
5. Check providers, Zone.js, and dependencies.
6. Test routes, forms, async states, and SSR.`,
        note: 'Do not adopt an API only because the package exports it. Check stability and production support.',
      },
    ],
    takeaway: 'Distinguish available, developer preview, stable, and default in new projects; each describes a different level of support.',
    exercise: 'Pick an API in this guide, verify its status for your Angular release, and note any required migration before adopting it.',
  },
];
