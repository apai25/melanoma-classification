import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorsSignupPage } from './doctors-signup.page';

describe('DoctorsSignupPage', () => {
  let component: DoctorsSignupPage;
  let fixture: ComponentFixture<DoctorsSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorsSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
