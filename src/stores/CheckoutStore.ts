import { makeAutoObservable } from "mobx";
import { sendOrderHtml } from "services/api";
import { ProfileStore } from "./ProfileStore";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface DeliveryInfo {
  address: string;
}

export type PaymentType = "20/80";

export interface PaymentInfo {
  typePayment: PaymentType;
}

export interface OrderInfo {
  approve: boolean;
}

export interface FormInfo<T> {
  values: T;
  errors: { [key in keyof T]: boolean };
  isValid: boolean;
}

export interface CheckoutInfoProps {
  checkout: CheckoutStore;
}

export interface CheckoutFormProps extends CheckoutInfoProps {
  onSubmit: () => void;
  onBack: () => void;
}

export class CheckoutStore {

  customerForm: FormInfo<CustomerInfo>;

  deliveryForm: FormInfo<DeliveryInfo>;

  paymentForm: FormInfo<PaymentInfo>;

  orderForm: FormInfo<OrderInfo>;

  htmlOrder: string;

  isSendOrder: boolean;

  step: number;


  constructor(private profile: ProfileStore) {
    makeAutoObservable(this);
    this.customerForm = {
      values: {
        name: this.profile.fullName,
        email: this.profile.email,
        phone: this.profile.phone
      },
      errors: {
        name: false,
        email: false,
        phone: false
      },
      isValid: false
    };

    this.deliveryForm = {
      values: {
        address: this.profile.address
      },
      errors: {
        address: false
      },
      isValid: false
    };

    this.paymentForm = {
      values: {
        typePayment: "20/80"
      },
      errors: {
        typePayment: false
      },
      isValid: false
    };

    this.orderForm = {
      values: {
        approve: false
      },
      errors: {
        approve: false
      },
      isValid: false
    };

    this.htmlOrder = "";
    this.isSendOrder = false;
    this.step = 0;
  }

  setCustomerInfo = (info: CustomerInfo) => {
    this.customerForm.values = info;
    this.validateCustomer();
  };

  validateCustomer = () => {
    const { values, errors } = this.customerForm;
    let isValid = true;

    errors.name = false;
    errors.phone = false;
    errors.email = false;

    if (!values.name || values.name.length < 3) {
      errors.name = true;
      isValid = false;
    }
    if (!values.phone || !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(values.phone)) {
      errors.phone = true;
      isValid = false;
    }
    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = true;
      isValid = false;
    }
    this.customerForm.isValid = isValid;
  };

  setDeliveryInfo = (info: DeliveryInfo) => {
    this.deliveryForm.values = info;
    this.validateDelivery();
  };

  validateDelivery = () => {
    const { values, errors } = this.deliveryForm;
    let isValid = true;

    errors.address = false;

    if (!values.address || values.address.length < 3) {
      errors.address = true;
      isValid = false;
    }
    this.deliveryForm.isValid = isValid;
  };

  setPaymentInfo = (info: PaymentInfo) => {
    this.paymentForm.values = info;
    this.validatePayment();
  };

  validatePayment = () => {
    const { values, errors } = this.paymentForm;
    let isValid = true;

    errors.typePayment = false;

    if (values.typePayment !== "20/80") {
      errors.typePayment = true;
      isValid = false;
    }
    this.paymentForm.isValid = isValid;
  };

  setOrderInfo = (info: OrderInfo) => {
    this.orderForm.values = info;
    this.validateOrder();
  };

  validateOrder = () => {
    const { values, errors } = this.orderForm;
    let isValid = true;

    errors.approve = false;

    if (!values.approve) {
      errors.approve = true;
      isValid = false;
    }
    this.orderForm.isValid = isValid;
  };

  next = (lengthSteps: number) => {
    this.step++;
    if (this.isProcessed(lengthSteps)) {
      console.log("checkout is processed");
    }
  };

  back = () => {
    this.step--;
  };

  isProcessed(lengthSteps: number): boolean {
    return (this.step === lengthSteps);
  }

  async setOrderHtml(html: string): Promise<boolean> {
    this.isSendOrder = true;
    let result = false;

    this.htmlOrder = `<html lang="ru"><head><meta charset="utf-8" /></head>><body>${html}</body></html>`;
    try {
      result = await sendOrderHtml({ email: this.customerForm.values.email, orderHtml: this.htmlOrder });
    } finally {
      this.isSendOrder = false;
    }
    return result;
  }

}
