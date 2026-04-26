"use client";

import React from "react";
import styled from "styled-components";
import { Button } from "react95";
import OSWindow from "../Window";
import { profile } from "@/data/portfolio";
import { useTranslations } from "@/i18n/LocaleProvider";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 6px;
  min-height: 0;
`;

const Frame = styled.div`
  flex: 1 1 auto;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  background: #2b2b2b;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    background: #525659;
  }
`;

const Caption = styled.div`
  font-size: 11px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.material};
  border-top: 1px solid ${({ theme }) => theme.borderDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const InlineLink = styled.a`
  font-family: "Courier New", Courier, monospace;
  font-size: 11px;
  color: #00006a;
  text-decoration: underline;
  cursor: pointer;
`;

export default function ResumeWindow() {
  const t = useTranslations();

  return (
    <OSWindow id="resume" bodyStyle={{ padding: 6 }}>
      <Layout>
        <Frame>
          <iframe
            src={`${profile.resume}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="Owen Morales Resume"
          />
        </Frame>
        <Caption>
          <span>Owen-Morales-Resume.pdf · Acrobat Reader 3.0</span>
          <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <InlineLink
              onClick={() => {
                const a = document.createElement("a");
                a.href = profile.resume;
                a.download = "Owen-Morales-Resume.pdf";
                a.click();
              }}
            >
              {t("windows.resume.download")}
            </InlineLink>
            <Button
              size="sm"
              onClick={() =>
                window.open(profile.resume, "_blank", "noopener,noreferrer")
              }
              style={{ height: 22, fontSize: 11 }}
            >
              {t("windows.resume.openTab")}
            </Button>
          </span>
        </Caption>
      </Layout>
    </OSWindow>
  );
}
