import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodsugarPage } from './bloodsugar.page';

describe('BloodsugarPage', () => {
  let component: BloodsugarPage;
  let fixture: ComponentFixture<BloodsugarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodsugarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodsugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
