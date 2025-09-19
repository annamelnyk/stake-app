import { CurrencyPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  NgZone,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Gesture, GestureController } from '@ionic/angular';
import {
  IonInput,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { GestureDetail } from '@ionic/core';
import { StockHolding } from '../../model/stock.model';
import { UserInvestments } from '../../services/user-investments.service';

@Component({
  selector: 'app-buy-stock',
  imports: [CurrencyPipe, IonInput, ReactiveFormsModule],
  providers: [GestureController, ToastController],
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.scss'],
})
export class BuyStockComponent {
  gestureCtrl = inject(GestureController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  formBuilder = inject(FormBuilder);
  ngZone = inject(NgZone);
  destroyRef = inject(DestroyRef);
  userInvestmentsService = inject(UserInvestments);

  @Input() stock!: StockHolding;
  buyButton = viewChild<ElementRef<HTMLDivElement>>('swipeTrack');

  buyStockForm = this.formBuilder.group({
    price: new FormControl('At market'),
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    shares: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  iconTransform = 'translateX(0px)';
  swipeInProgress = false;
  swipeEnabled = false;
  colWidth!: number;
  translateX!: number;
  swipeGesture!: Gesture;

  get buyButtonRef(): ElementRef {
    return this.buyButton() as ElementRef;
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.initButtonSwipe();
  }

  initForm() {
    this.buyStockForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((values) => {
        if ((values?.amount ?? 0) > 0 || (values?.shares ?? 0) > 0) {
          this.swipeEnabled = true;
        } else {
          this.swipeEnabled = false;
        }
      });
  }

  initButtonSwipe() {
    if (!this.buyButton()) return;

    this.swipeGesture = this.gestureCtrl.create({
      el: this.buyButtonRef.nativeElement,
      threshold: 0.6,
      gestureName: 'swipe-to-click',
      onStart: () => {
        if (this.swipeEnabled) {
          this.swipeInProgress = true;
        }
      },
      onMove: (e) => this.onMove(e),
      onEnd: (e) => this.onEnd(e),
    });

    this.swipeGesture.enable(true);
    this.preventClick();
  }

  onMove(detail: GestureDetail) {
    if (!this.buyButton()) return;

    this.ngZone.runOutsideAngular(() => {
      const buyButtonRef = this.buyButton() as ElementRef;
      if (this.swipeInProgress && detail.deltaX > 0) {
        const deltaX = detail.deltaX;
        const colWidth = buyButtonRef.nativeElement.parentElement.clientWidth;

        this.colWidth = colWidth - (15 / 100) * colWidth;
        this.translateX = Math.min(deltaX, this.colWidth);

        buyButtonRef.nativeElement.style.transform = `translateX(${this.translateX}px)`;
        buyButtonRef.nativeElement.style.opacity = '1';
      }
    });
  }

  onEnd(detail: GestureDetail) {
    if (!this.buyButton()) return;

    this.swipeInProgress = false;
    if (this.translateX >= this.colWidth) {
      this.buyButtonRef.nativeElement.style.transform = 'translateX(100)';
      this.buyButtonRef.nativeElement.style.opacity = '0';
      this.modalCtrl.dismiss();
      this.showToast();
      this.userInvestmentsService.purchaseInvestment(this.stock);
    } else {
      this.buyButtonRef.nativeElement.style.transform = 'translateX(0)';
      this.buyButtonRef.nativeElement.style.opacity = '1';
    }
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: `${this.stock.symbol} successfully purchased`,
      duration: 3000,
      cssClass: 'success',
      position: 'top',
    });
    toast.present();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  preventClick() {
    this.buyButtonRef.nativeElement.addEventListener(
      'click',
      (e: Event) => {
        e.stopPropagation();
        e.preventDefault();
        this.buyButtonRef.nativeElement.style.opacity = '1';
      },
      true
    );
  }
}
