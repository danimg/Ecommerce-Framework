import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbLoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: NgbLoadingComponent;
  let fixture: ComponentFixture<NgbLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgbLoadingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
