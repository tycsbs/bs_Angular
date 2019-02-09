import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidatorFn, AbstractControl,
  ValidationErrors, Validator } from '@angular/forms';

// 向angular注册组件
export const NG_COUNTER_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CounterComponent),
  multi: true
};

// 组件自定义验证规则
export function counterRange(min: number|string, max: number|string ) {
  return (control: AbstractControl): ValidationErrors => {
    const val = control.value;
    return (val > +max || val < +min) ?
      { 'counterRange': { current: val, max: max, min: min } } : null;
  };
}

export const NG_COUNTER_VALIDATOR = {
  provide: NG_VALIDATORS,
  // useValue: counterRange,
  useExisting: forwardRef(() => CounterComponent),
  multi: true,
};

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [NG_COUNTER_ACCESSOR, NG_COUNTER_VALIDATOR]
})
export class CounterComponent implements OnInit, ControlValueAccessor, OnChanges, Validator {
  // 组建可用状态
  counterDisabled: boolean;

  _validators;

  @Input() min: number;
  @Input() max: number;

  @Input() _count: number;
  set count(value: number) {
    this._count = value;
    this.counterChange(value);
  }

  get count() {
    return this._count;
  }

  // 组建值更改事件
  counterChange = (_: any) => {};

  // 组件被访问
  counterTouched = (_: any) => {};


  constructor() {
    this._count = 0;
    this.min = 0;
    this.max = 10;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( 'min' in changes || 'max' in changes) {
      console.log(111);
      this._createValidators();
    }
  }

  private _createValidators() {
    this._validators = counterRange(this.min, this.max);
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.min != null || this.max != null ? this._validators(control) : null;
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   this._validators = fn;
  // }

  // 外部更新dom
  writeValue(value: number): void {
    this.count = value;
  }

  registerOnChange(fn: any): void {
    this.counterChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.counterTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.counterDisabled = isDisabled;
  }


  increment() {
    this.count++;
  }


  decrement() {
    this.count--;
  }

}
