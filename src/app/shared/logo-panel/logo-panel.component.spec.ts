import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPanelComponent } from './logo-panel.component';

describe('LogoPanelComponent', () => {
  let component: LogoPanelComponent;
  let fixture: ComponentFixture<LogoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
