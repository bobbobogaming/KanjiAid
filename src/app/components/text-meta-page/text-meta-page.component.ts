import { Component, inject } from '@angular/core';
import { HoverAblesContainerComponent } from '../hover-ables-container/hover-ables-container.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-meta-page',
  standalone: true,
  imports: [HoverAblesContainerComponent,FormsModule],
  template: `
    <h1>Paragraph helper</h1>
    <label>
      <p>
        Input text to create a hoverable version:
      </p> 
      <!-- <input type="text" [(ngModel)]="text"> -->
      <textarea name="paragraphInput" [(ngModel)]="text"></textarea>
    </label>
    <button (click)="CreateNewSets()">Create New Sets</button>
    <p><app-hover-ables-container [text]="text"></app-hover-ables-container></p>
  `,
  styles: [
    ':host { display:flex; flex-direction:column; align-items:center; }',
    'textarea { width:100%; }'
  ]
})
export class TextMetaPageComponent {
  text:string = '';
  private router = inject(Router);

  CreateNewSets() {
    const newSet = new Set(this.text.split("").filter(c=>c.match('[\u4e00-\u9faf]')?.length ?? false));
    this.router.navigate(["trainingset"],{ queryParams:{ new: encodeURIComponent([...newSet].join("")) }})
  }
}
