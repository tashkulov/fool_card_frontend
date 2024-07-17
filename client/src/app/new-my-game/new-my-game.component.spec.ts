import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMyGameComponent } from './new-my-game.component';

describe('NewMyGameComponent', () => {
  let component: NewMyGameComponent;
  let fixture: ComponentFixture<NewMyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMyGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
