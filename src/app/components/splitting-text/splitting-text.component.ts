import {Component,Input,ElementRef,ViewChild,ViewChildren,QueryList,AfterViewInit,ChangeDetectorRef,} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-splitting-text',
  imports: [CommonModule],
  templateUrl: './splitting-text.component.html',
  styleUrl: './splitting-text.component.scss',
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(150px)' }),
        animate('2s  ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class SplittingTextComponent implements AfterViewInit {
  @Input() text: string | string[] = '';
  @Input() type: 'chars' | 'words' | 'lines' = 'chars';
  @Input() delay: number = 5000;
  @Input() stagger: number = 50;
  @Input() inView: boolean = true;

  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChildren('char') chars!: QueryList<ElementRef>;

  items: string[] = [];
  visible = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.splitText();

    if (this.inView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.visible = true;
            this.cdRef.detectChanges();
            observer.disconnect();
          }
        },
        { rootMargin: '0px' }
      );
      observer.observe(this.container.nativeElement);
    } else {
      this.visible = true;
    }
  }

  splitText(): void {
    if (Array.isArray(this.text) && this.type === 'lines') {
      this.items = this.text;
    } else if (typeof this.text === 'string') {
      if (this.type === 'words') {
        this.items = this.text.match(/\S+\s*/g) || [];
      } else {
        this.items = this.text.split('');
      }
    }
  }

  getDelay(index: number): string {
    return `${this.delay + index * this.stagger}s`;
  }
}