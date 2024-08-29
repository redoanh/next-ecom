"use client";

import React, { ReactElement, ReactNode, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
  handleReset?: () => void; // Add handleReset prop
  restore?: boolean
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
  handleReset, // Add handleReset
  restore
}: FormProps) => {
  const formConfig: FormConfig = {};
  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm<FormProps>(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => {
    
    if (defaultValues || restore) {
      reset(defaultValues);
    }
    // Check if handleReset exists before calling it
    if (handleReset) {
      handleReset();
    }
  }, [defaultValues,restore, reset, methods, handleReset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
