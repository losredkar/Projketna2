import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home }from '../../../../Features/Home/pages/home/home';
import { PoemCard } from './poem-card';

describe('PoemCard', () => {
  let component: PoemCard;
  let fixture: ComponentFixture<PoemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoemCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
