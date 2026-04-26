"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, GroupBox, TextInput, Frame } from "react95";
import emailjs from "@emailjs/browser";
import OSWindow from "../Window";
import { useTranslations } from "@/i18n/LocaleProvider";

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  font-size: 12px;
  min-height: 0;
`;

const Field = styled.label`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  span.label {
    font-weight: bold;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  font-size: 12px;
  padding: 4px 6px;
  border: 2px inset;
  border-color: ${({ theme }) => theme.borderDarkest}
    ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderDarkest};
  background: ${({ theme }) => theme.canvas};
  color: ${({ theme }) => theme.materialText};
  outline: none;
`;

const Banner = styled(Frame).attrs({ variant: "well" })<{
  $tone: "success" | "error";
}>`
  padding: 8px 10px;
  font-size: 12px;
  font-weight: bold;
  background: ${({ $tone }) =>
    $tone === "success" ? "#d6efff" : "#ffdcdc"};
  color: ${({ $tone }) => ($tone === "success" ? "#003a66" : "#660000")};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: auto;
`;

type Status = "idle" | "sending" | "success" | "error";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const TEMPLATE_TWO_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TWO_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function ContactFormWindow() {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInput =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleTextarea =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = (): string | null => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return t("windows.contactForm.required");
    }
    if (!isEmail(form.email.trim())) {
      return t("windows.contactForm.invalidEmail");
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const err = validate();
    if (err) {
      setStatus("error");
      setErrorMsg(err);
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(t("windows.contactForm.error"));
      return;
    }

    setStatus("sending");
    const tasks: Array<Promise<unknown>> = [];
    if (formRef.current) {
      tasks.push(
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
          publicKey: PUBLIC_KEY,
        }),
      );
    }
    if (TEMPLATE_TWO_ID) {
      tasks.push(
        emailjs.send(
          SERVICE_ID,
          TEMPLATE_TWO_ID,
          {
            from_name: form.name,
            reply_to: form.email,
            subject: form.subject,
            message: form.message,
          },
          { publicKey: PUBLIC_KEY },
        ),
      );
    }

    const results = await Promise.allSettled(tasks);
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    if (successCount > 0) {
      const failures = results.filter((r) => r.status === "rejected");
      if (failures.length > 0) {
        // Keep this visible for diagnostics, but do not fail the UX when at
        // least one delivery path succeeds (common when template #2 is optional).
        console.warn("[ContactFormWindow] EmailJS partial failure", failures);
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      return;
    }

    console.error("[ContactFormWindow] EmailJS failed", results);
    setStatus("error");
    setErrorMsg(t("windows.contactForm.error"));
  };

  return (
    <OSWindow id="contactForm">
      <Layout ref={formRef} onSubmit={onSubmit} noValidate>
        <GroupBox label={t("windows.contactForm.heading")}>
          <p style={{ fontSize: 11, marginBottom: 8 }}>
            {t("windows.contactForm.subheading")}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Field>
              <span className="label">{t("windows.contactForm.name")} *</span>
              <TextInput
                name="from_name"
                value={form.name}
                onChange={handleInput("name")}
                placeholder={t("windows.contactForm.namePlaceholder")}
                required
              />
            </Field>
            <Field>
              <span className="label">{t("windows.contactForm.email")} *</span>
              <TextInput
                type="email"
                name="reply_to"
                value={form.email}
                onChange={handleInput("email")}
                placeholder={t("windows.contactForm.emailPlaceholder")}
                required
              />
            </Field>
            <Field>
              <span className="label">{t("windows.contactForm.subject")}</span>
              <TextInput
                name="subject"
                value={form.subject}
                onChange={handleInput("subject")}
                placeholder={t("windows.contactForm.subjectPlaceholder")}
              />
            </Field>
            <label
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                alignItems: "start",
                gap: 8,
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {t("windows.contactForm.message")} *
              </span>
              <TextArea
                name="message"
                value={form.message}
                onChange={handleTextarea("message")}
                placeholder={t("windows.contactForm.messagePlaceholder")}
                required
              />
            </label>
          </div>
        </GroupBox>

        {status === "success" && (
          <Banner $tone="success">{t("windows.contactForm.success")}</Banner>
        )}
        {status === "error" && (
          <Banner $tone="error">
            {errorMsg ?? t("windows.contactForm.error")}
          </Banner>
        )}

        <Actions>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending"
              ? t("windows.contactForm.sending")
              : t("windows.contactForm.send")}
          </Button>
        </Actions>
      </Layout>
    </OSWindow>
  );
}
