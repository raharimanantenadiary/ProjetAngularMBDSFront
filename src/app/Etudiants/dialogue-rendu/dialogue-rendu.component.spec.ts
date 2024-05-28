import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueRenduComponent } from './dialogue-rendu.component';

describe('DialogueRenduComponent', () => {
  let component: DialogueRenduComponent;
  let fixture: ComponentFixture<DialogueRenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueRenduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogueRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
