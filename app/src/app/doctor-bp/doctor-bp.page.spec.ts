import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorBpPage } from './doctor-bp.page';

describe('DoctorBpPage', () => {
  let component: DoctorBpPage;
  let fixture: ComponentFixture<DoctorBpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorBpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorBpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
