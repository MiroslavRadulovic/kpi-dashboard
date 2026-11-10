import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-info',
  imports: [],
  templateUrl: './alert-info.html',
  styleUrl: './alert-info.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertInfo {
  readonly title = input('Something went wrong');
  readonly message = input<string | null>(null);
  readonly isError = input<boolean>(false);
  readonly retry = output();
}
