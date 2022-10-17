import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  constructor(public http: HttpService, public store: StoreService) {}


  setCollumsColor(values: number[], currentValue: number) {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const currentRatio = (currentValue - minValue) / (maxValue - minValue);

    return `rgb(${128 + Math.round(128 * currentRatio)}, ${Math.round(255 * (1 - currentRatio))}, 0)`
  }
}
