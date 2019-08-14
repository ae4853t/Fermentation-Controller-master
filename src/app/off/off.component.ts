import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-off',
  templateUrl: './off.component.html',
  styleUrls: ['./off.component.scss']
})
export class OffComponent implements OnInit {
  @Input() item: any = 'NULL';

  constructor() { }

  ngOnInit() {
  }

}
