"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Script from "next/script";
import PrimaryButton from "../PrimaryButton";
import { IconArrow } from "../IconsSvg";
import { Animated } from "../Animated";

interface MauticManualFormProps {
  formId: string | number;
  formName: string;
  buttonText?: string;
  children?: React.ReactNode;
  isNewsletter?: boolean;
  className?: string;
  inputRowClassname?: string;
  submitRowClassname?: string;
  buttonStyle?: string;
}

type FeedbackType = "error" | "success" | null;
type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[1-9]{2}[2-9][0-9]{7,8}$/;

export const INPUT_STYLE =
  "w-full border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 p-3 bg-white text-gray-800 transition-all duration-300";

export const LABEL_STYLE = "block text-medium font-bold text-primary";

const FIELD_SELECTORS = {
  nome: 'input[name="mauticform[nome]"]',
  email: 'input[name="mauticform[email]"]',
  whatsapp: 'input[name="mauticform[whatsapp]"]',
  autorizacao: 'input[name="mauticform[autorizo_o_contato_da_uni][]"]',
};

export default function MauticManualForm({
  formId,
  formName,
  buttonText = "Quero me inscrever",
  children,
  isNewsletter = false,
  className = "",
  inputRowClassname = "",
  submitRowClassname = "",
}: MauticManualFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emailFieldName = isNewsletter ? "seu_email" : "email";
  const submitFieldName = isNewsletter ? "submit" : "quero_me_inscrever";

  const showFeedback = useCallback((type: FeedbackType, message: string, element?: HTMLElement | null) => {
    setFeedback({ type, message });
    setIsSubmitting(false);

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback({ type: null, message: "" });

      if (element) {
        element.innerHTML = "";
      }
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).MauticDomain = "https://crm.unintese.com.br";
    (window as any).MauticLang = { submittingMessage: "Por favor, aguarde..." };

    const successElement = document.getElementById(`mauticform_${formName}_message`);
    const errorElement = document.getElementById(`mauticform_${formName}_error`);

    const observerConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(() => {
      const successMessage = successElement?.textContent?.trim();
      const errorMessage = errorElement?.textContent?.trim();

      if (successMessage) {
        showFeedback("success", successMessage, successElement);
      }

      if (errorMessage) {
        showFeedback("error", errorMessage, errorElement);
      }
    });

    if (successElement) {
      observer.observe(successElement, observerConfig);
    }

    if (errorElement) {
      observer.observe(errorElement, observerConfig);
    }

    return () => observer.disconnect();
  }, [formName, showFeedback]);

  useEffect(() => {
    const form = document.getElementById(`mauticform_${formName}`) as HTMLFormElement | null;

    if (!form) return;

    const getField = <T extends HTMLElement>(selector: string) => form.querySelector(selector) as T | null;

    const handleNativeValidation = (e: Event) => {
      const nomeInput = getField<HTMLInputElement>('input[name="mauticform[nome]"]');
      const emailInput = getField<HTMLInputElement>(`input[name="mauticform[${emailFieldName}]"]`);
      const whatsappInput = getField<HTMLInputElement>('input[name="mauticform[whatsapp]"]');
      const checkboxInput = getField<HTMLInputElement>('input[name="mauticform[autorizo_o_contato_da_uni][]"]');
      const fields = [nomeInput, emailInput, whatsappInput, checkboxInput];

      fields.forEach((field) => field?.setCustomValidity(""));

      let firstInvalidField: FormField | null = null;

      const setError = (field: FormField | null, message: string): void => {
        if (!field) return;

        field.setCustomValidity(message);

        if (firstInvalidField === null) {
          firstInvalidField = field;
        }
      };

      if (nomeInput && !nomeInput.value.trim()) {
        setError(nomeInput, "Preencha seu nome completo.");
      }

      if (emailInput) {
        const email = emailInput.value.trim();
        if (!email) {
          setError(emailInput, "Preencha seu e-mail.");
        } else if (!EMAIL_REGEX.test(email)) {
          setError(emailInput, "Digite um e-mail válido.");
        }
      }

      if (whatsappInput) {
        const phone = whatsappInput.value.replace(/\D/g, "");
        if (!phone) {
          setError(whatsappInput, "Preencha seu WhatsApp.");
        } else if (!PHONE_REGEX.test(phone)) {
          setError(whatsappInput, "Digite um WhatsApp válido com DDD.");
        }
      }

      const requiredFields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        "input[required], select[required], textarea[required]",
      );

      requiredFields.forEach((field) => {
        if (field.type === "checkbox") {
          if (!(field as HTMLInputElement).checked) {
            setError(field, "Campo obrigatório.");
          }
        } else if (!field.value.trim()) {
          setError(field, "Campo obrigatório.");
        }
      });

      if (firstInvalidField !== null) {
        e.preventDefault();
        e.stopImmediatePropagation();

        setIsSubmitting(false);

        (firstInvalidField as FormField).reportValidity();

        return;
      }

      setIsSubmitting(true);
    };

    const clearFieldError = (e: Event) => {
      const target = e.target;

      if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
        target.setCustomValidity("");
      }
    };

    form.addEventListener("submit", handleNativeValidation, {
      capture: true,
    });

    form.addEventListener("input", clearFieldError);
    form.addEventListener("change", clearFieldError);

    return () => {
      form.removeEventListener("submit", handleNativeValidation, {
        capture: true,
      });

      form.removeEventListener("input", clearFieldError);
      form.removeEventListener("change", clearFieldError);
    };
  }, [formName]);

  const handlePhoneMask = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/\D/g, "");

    if (value.startsWith("0")) {
      value = value.slice(1);
    }

    value = value.slice(0, 11);

    if (value.length > 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.currentTarget.value = value;
  }, []);

  const consentCheckboxId = `mauticform_checkboxgrp_checkbox_${formName}_AutorizoocontatodaUninteseparareceberinformacoessobrecursospromocoesenovidades0`;

  return (
    <>
      <style>{`
        .mauticform-errormsg,
        .mauticform-error,
        #mauticform_${formName}_message,
        #mauticform_${formName}_error {
          display: none !important;
        }
      `}</style>

      <Script
        src="https://crm.unintese.com.br/media/js/mautic-form.js"
        strategy="afterInteractive"
        onLoad={() => {
          (window as any).MauticSDK?.onLoad?.();
        }}
      />

      <Animated as="div" preset="fadeUp" delay={0.1} className={`w-full ${className}`} id={`mauticform_wrapper_${formName}`}>
        <form
          autoComplete="off"
          role="form"
          method="post"
          action={`https://crm.unintese.com.br/form/submit?formId=${formId}`}
          id={`mauticform_${formName}`}
          data-mautic-form={formName}
          encType="multipart/form-data"
          noValidate
          className="w-full"
        >
          <div className="relative">
            {feedback.type && (
              <Animated
                as="div"
                preset="fadeUp"
                className={`absolute left-0 font-medium transition-all duration-300 ${
                  feedback.type === "success" ? "-top-10 text-xl text-purple-700" : "-top-8 text-sm text-rose-700"
                }`}
              >
                {feedback.message}
              </Animated>
            )}
          </div>

          <div id={`mauticform_${formName}_error`} className="hidden" />

          <div id={`mauticform_${formName}_message`} className="hidden" />

          <div className="mauticform-innerform">
            <div className="mauticform-page-wrapper mauticform-page-1" data-mautic-form-page="1">
              <Animated
                className={inputRowClassname || "flex flex-col md:flex-row gap-6 md:gap-8 my-5"}
                as="div"
                preset="fadeUp"
                delay={0.3}
              >
                {!isNewsletter && (
                  <div id={`mauticform_${formName}_nome`} className="flex flex-col items-start gap-2 w-full mauticform-required">
                    <label htmlFor={`mauticform_input_${formName}_nome`} className={LABEL_STYLE}>
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id={`mauticform_input_${formName}_nome`}
                      name="mauticform[nome]"
                      required
                      placeholder="Digite seu nome completo"
                      className={INPUT_STYLE}
                    />
                  </div>
                )}

                <div id={`mauticform_${formName}_${emailFieldName}`} className="flex flex-col items-start gap-2 w-full mauticform-required">
                  {!isNewsletter && (
                    <label htmlFor={`mauticform_input_${formName}_${emailFieldName}`} className={LABEL_STYLE}>
                      E-mail
                    </label>
                  )}
                  <input
                    type="email"
                    id={`mauticform_input_${formName}_${emailFieldName}`}
                    name={`mauticform[${emailFieldName}]`}
                    required
                    placeholder="Digite seu E-mail"
                    className={INPUT_STYLE}
                  />
                </div>
              </Animated>

              <Animated
                className={inputRowClassname || "flex flex-col md:flex-row gap-6 md:gap-8 my-5"}
                as="div"
                preset="fadeUp"
                delay={0.4}
              >
                {!isNewsletter && (
                  <div id={`mauticform_${formName}_whatsapp`} className="flex flex-col items-start gap-2 w-full mauticform-required">
                    <label htmlFor={`mauticform_input_${formName}_whatsapp`} className={LABEL_STYLE}>
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      id={`mauticform_input_${formName}_whatsapp`}
                      name="mauticform[whatsapp]"
                      required
                      onInput={handlePhoneMask}
                      placeholder="(00) 99999-0000"
                      className={INPUT_STYLE}
                    />
                  </div>
                )}
              </Animated>

              {children}

              <div className={submitRowClassname || "flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mt-5 pt-4"}>
                {!isNewsletter && (
                  <Animated
                    id={`mauticform_${formName}_autorizo_o_contato_da_uni`}
                    className="flex flex-col items-start gap-1 w-full md:w-3/5 mauticform-required"
                    as="div"
                    preset="fadeUp"
                    delay={0.5}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        className="w-5 h-5 rounded cursor-pointer accent-purple-600"
                        name="mauticform[autorizo_o_contato_da_uni][]"
                        id={consentCheckboxId}
                        type="checkbox"
                        required
                        value="Autorizo o contato da Uníntese para receber informações sobre cursos, promoções e novidades."
                      />
                      <label
                        htmlFor={consentCheckboxId}
                        className="block text-xs font-light p-2 text-gray-500 leading-tight cursor-pointer transition-all duration-500 hover:text-purple-600"
                      >
                        Autorizo o contato da Uníntese para receber informações sobre cursos, promoções e novidades.
                      </label>
                    </div>
                  </Animated>
                )}

                <Animated as="div" delay={0.6} preset="fadeScale" className="w-full md:w-fit">
                  <PrimaryButton
                    type="submit"
                    name={`mauticform[${submitFieldName}]`}
                    id={`mauticform_input_${formName}_${submitFieldName}`}
                    disabled={isSubmitting}
                    className={`
                    flex items-center gap-2
                    relative
                    z-50
                    w-full md:w-fit
                    px-8 py-2.5
                    justify-center
                    text-base whitespace-nowrap
                    transition-all duration-500
                    ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}
                  `}
                  >
                    {isSubmitting ? (
                      <>
                        <span>Por favor, aguarde...</span>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        {buttonText}
                        <IconArrow className="rotate-270 w-5 h-5" />
                      </>
                    )}
                  </PrimaryButton>
                </Animated>
              </div>
            </div>
          </div>

          <input type="hidden" name="mauticform[formId]" id={`mauticform_${formName}_id`} value={formId} />
          <input type="hidden" name="mauticform[return]" id={`mauticform_${formName}_return`} value="" />
          <input type="hidden" name="mauticform[formName]" id={`mauticform_${formName}_name`} value={formName} />
        </form>
      </Animated>
    </>
  );
}
