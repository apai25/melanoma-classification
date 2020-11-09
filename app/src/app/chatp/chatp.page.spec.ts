import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatpPage } from './chatp.page';

describe('ChatpPage', () => {
  let component: ChatpPage;
  let fixture: ComponentFixture<ChatpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
