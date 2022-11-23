import React, { useMemo, useState } from "react";
import { observer } from "mobx-react";

import { t } from "res/i18n/i18n";
import { useNavigate } from "react-router-dom";
import { useStores } from "hooks/useStores";
import { CheckoutStore } from "stores/CheckoutStore";

import { Paper, Box, Stepper, Step, StepContent, StepLabel, Button, Typography } from "@mui/material";

import { CustomerForm } from "components/forms/Checkout/CustomerForm";

import "index.css";
import { DeliveryForm } from "../components/forms/Checkout/DeliveryForm";
import { PaymentForm } from "../components/forms/Checkout/PaymentForm";
import { OrderForm } from "../components/forms/Checkout/OrderForm";

interface CheckoutStep {
  label: string;
  description: string;
  component: (handleBack: any, handleSubmit: any) => null | React.ReactNode;
  isValid: () => boolean;
}

const steps = (checkout: CheckoutStore): CheckoutStep[] => {
  return [ {
    label: t("checkout.steps.1.label"),
    description: t("checkout.steps.1.description"),
    component: (handleBack: any, handleSubmit: any) => <CustomerForm
      checkout={checkout}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />,
    isValid: () => checkout.customerForm.isValid
  }, {
    label: t("checkout.steps.2.label"),
    description: t("checkout.steps.2.description"),
    component: (handleBack: any, handleSubmit: any) => <DeliveryForm
      checkout={checkout}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />,
    isValid: () => checkout.deliveryForm.isValid
  }, {
    label: t("checkout.steps.3.label"),
    description: t("checkout.steps.3.description"),
    component: (handleBack: any, handleSubmit: any) => <PaymentForm
      checkout={checkout}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />,
    isValid: () => checkout.paymentForm.isValid
  }, {
    label: t("checkout.steps.4.label"),
    description: t("checkout.steps.4.description"),
    component: (handleBack: any, handleSubmit: any) => <OrderForm
      checkout={checkout}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />,
    isValid: () => checkout.orderForm.isValid
  } ];
};

export const CheckoutPage = observer(() => {
  const navigate = useNavigate();
  const { profileManagerStore } = useStores();
  const [ checkout ] = useState(new CheckoutStore(profileManagerStore.currentProfile));

  const stepsCheckout = useMemo(() => steps(checkout), [ checkout ]);

  const handleNext = () => {
    if (stepsCheckout[checkout.step].isValid()) {
      checkout.next(stepsCheckout.length);
    }
  };

  const handleBack = () => {
    checkout.back();
  };

  const handleReset = () => {
    navigate("/");
  };


  return (
    <Box className="checkout">
      <Stepper activeStep={checkout.step} orientation="vertical">
        {stepsCheckout.map((step, index) => {
          return <Step key={step.label}>
            <StepLabel
              optional={
                index === (stepsCheckout.length - 1) ? (
                  <Typography variant="caption">{t("checkout.lastStep")}</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.component(handleBack, handleNext)}
            </StepContent>
          </Step>;
        })}
      </Stepper>
      {checkout.step === stepsCheckout.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>{t("checkout.completed")}</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            {t("checkout.shopping")}
          </Button>
        </Paper>
      )}
    </Box>
  );
});
