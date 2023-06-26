import { LoaderService } from './../services/loader.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent implements OnInit {

  title = 'metro-brands';
  loading: any;
  constructor(public loader: LoaderService) { }

  ngOnInit() {
  }

}
