import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplittingTextComponent } from './splitting-text.component';

describe('SplittingTextComponent', () => {
  let component: SplittingTextComponent;
  let fixture: ComponentFixture<SplittingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplittingTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplittingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
