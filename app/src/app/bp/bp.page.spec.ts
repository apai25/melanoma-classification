import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BpPage } from './bp.page';

describe('BpPage', () => {
  let component: BpPage;
  let fixture: ComponentFixture<BpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
