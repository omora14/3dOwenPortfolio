"use client";

import React from "react";
import styled from "styled-components";
import { Button, GroupBox } from "react95";
import OSWindow from "../Window";
import { links, profile } from "@/data/portfolio";
import { useTranslations } from "@/i18n/LocaleProvider";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  font-size: 12px;
  min-height: 0;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 12px;
  .label {
    font-weight: bold;
  }
  .url {
    font-family: "Courier New", Courier, monospace;
    color: #00006a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SignOff = styled.div`
  background: #fff;
  border: 1px dashed #777;
  padding: 8px 10px;
  font-family: "Times New Roman", Georgia, serif;
  font-size: 12px;
  line-height: 1.5;
  font-style: italic;
`;

export default function ContactWindow() {
  const t = useTranslations();
  const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <OSWindow id="contact">
      <Layout>
        <SignOff>
          {t("windows.contact.intro")}
          <br />— {profile.name}, {profile.origin}
        </SignOff>

        <GroupBox label={t("windows.contact.inbox")}>
          <Row>
            <span className="label">{t("windows.contact.github")}</span>
            <a className="url" onClick={() => open(links.github)}>
              {links.github}
            </a>
            <Button onClick={() => open(links.github)}>
              {t("windows.contact.open")}
            </Button>
          </Row>
          <Row>
            <span className="label">{t("windows.contact.linkedin")}</span>
            <a className="url" onClick={() => open(links.linkedin)}>
              {links.linkedin}
            </a>
            <Button onClick={() => open(links.linkedin)}>
              {t("windows.contact.open")}
            </Button>
          </Row>
          <Row>
            <span className="label">{t("windows.contact.website")}</span>
            <a className="url" onClick={() => open(links.website)}>
              {links.website}
            </a>
            <Button onClick={() => open(links.website)}>
              {t("windows.contact.open")}
            </Button>
          </Row>
          <Row>
            <span className="label">{t("windows.contact.resume")}</span>
            <a className="url" onClick={() => open(links.resume)}>
              {links.resume}
            </a>
            <Button onClick={() => open(links.resume)}>
              {t("windows.contact.open")}
            </Button>
          </Row>
        </GroupBox>
      </Layout>
    </OSWindow>
  );
}
