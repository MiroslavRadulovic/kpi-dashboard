import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-info',
  imports: [],
  templateUrl: './alert-info.component.html',
  styleUrl: './alert-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertInfoComponent {
  readonly title = input('Something went wrong');
  readonly hint = input('');
  readonly message = input<string | null>(null);
  readonly isError = input<boolean>(false);
  readonly retry = output();
}
