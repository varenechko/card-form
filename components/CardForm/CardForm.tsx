"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { CardFormSchema } from "@/shared/schemas/cardFormSchema";
import { CardLogo } from "./CardLogo";

export function CardForm() {
  const form = useForm<zod.infer<typeof CardFormSchema>>({
    resolver: zodResolver(CardFormSchema),
    defaultValues: {
      number: "",
      name: "",
      expirationDate: "",
      securityCode: "",
    },
  });

  const watchForm = form.watch();

  function onSubmit(data: zod.infer<typeof CardFormSchema>) {
    console.log(JSON.stringify(watchForm, null, 2));
  }

  useEffect(() => {
    if (form.getValues("number")?.length === 19)
      form.setFocus("expirationDate");
  }, [watchForm.number]);
  useEffect(() => {
    if (form.getValues("expirationDate")?.length === 5)
      form.setFocus("securityCode");
  }, [watchForm.expirationDate]);
  useEffect(() => {
    if (form.getValues("securityCode")?.length === 3) form.setFocus("name");
  }, [watchForm.securityCode]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Card number</FormLabel>
              <FormControl>
                <InputMask
                  mask="____ ____ ____ _______"
                  replacement={{ _: /\d/ }}
                  component={Input}
                  {...field}
                  autoFocus
                  className="pr-10"
                />
              </FormControl>
              {form.getValues("number") && (
                <div className="absolute right-4 top-8 w-6 h-6 flex justify-center">
                  <CardLogo cardNumber={watchForm.number} />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiration date</FormLabel>
                <FormControl>
                  <InputMask
                    mask="__/__"
                    replacement={{ _: /\d/ }}
                    component={Input}
                    {...field}
                    placeholder="MM/YY"
                    className="w-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="securityCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security code</FormLabel>
                <FormControl>
                  <InputMask
                    mask="____"
                    replacement={{ _: /\d/ }}
                    component={Input}
                    {...field}
                    className="w-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Pay</Button>
      </form>
    </Form>
  );
}
