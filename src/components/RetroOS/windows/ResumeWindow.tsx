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

const MobileFallback = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 14px;
  color: #f4f4f4;
  background: linear-gradient(180deg, #2f2f2f 0%, #202020 100%);
`;

const MobileFallbackTitle = styled.strong`
  font-size: 13px;
  letter-spacing: 0.02em;
`;

const MobileFallbackBody = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  max-width: 320px;
`;

export default function ResumeWindow() {
  const t = useTranslations();
  const [isMobileViewport, setIsMobileViewport] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const apply = () => setIsMobileViewport(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <OSWindow id="resume" bodyStyle={{ padding: 6 }}>
      <Layout>
        <Frame>
          {isMobileViewport ? (
            <MobileFallback>
              <MobileFallbackTitle>{t("windows.resume.mobileBlockedTitle")}</MobileFallbackTitle>
              <MobileFallbackBody>{t("windows.resume.mobileBlockedBody")}</MobileFallbackBody>
              <Button
                size="sm"
                onClick={() =>
                  window.open(profile.resume, "_blank", "noopener,noreferrer")
                }
                style={{ fontSize: 11 }}
              >
                {t("windows.resume.openTab")}
              </Button>
            </MobileFallback>
          ) : (
            <iframe
              src={`${profile.resume}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              title="Owen Morales Resume"
            />
          )}
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
