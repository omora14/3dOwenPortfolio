"use client";

import React from "react";
import styled from "styled-components";
import { GroupBox } from "react95";
import OSWindow from "../Window";
import { getLocalizedPortfolio } from "@/data/localizedPortfolio";
import { useLocale, useTranslations } from "@/i18n/LocaleProvider";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  align-items: start;
  font-size: 12px;
  line-height: 1.45;
  height: 100%;
  overflow: hidden;
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoFrame = styled.div`
  width: 110px;
  height: 130px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  background: #000;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: pixelated;
  }
  .caption {
    margin-top: 6px;
    font-size: 11px;
    text-align: center;
    color: ${({ theme }) => theme.materialText};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 6px;
  height: 100%;
`;

const Story = styled.div`
  background: #fff;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  padding: 8px 10px;
  font-family: "Times New Roman", Georgia, serif;
  font-size: 12px;
  line-height: 1.55;
  color: #111;
  p {
    margin: 0 0 8px;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

const EduRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
  padding: 2px 0;
  .left {
    flex: 1;
    min-width: 0;
  }
  .right {
    color: ${({ theme }) => theme.materialText};
    white-space: nowrap;
  }
  strong {
    font-size: 12px;
  }
`;

export default function AboutWindow() {
  const { locale } = useLocale();
  const t = useTranslations();
  const { aboutParagraphs, profile, education } = getLocalizedPortfolio(locale);

  return (
    <OSWindow id="about">
      <Layout>
        <div>
          <PhotoFrame>
            <img src={profile.photo} alt={profile.name} />
          </PhotoFrame>
          <div className="caption">{profile.name}</div>
          <div style={{ fontSize: 10, textAlign: "center", marginTop: 2 }}>
            {profile.origin}
          </div>
        </div>
        <Body>
          <Story>
            <div style={{ fontWeight: "bold", marginBottom: 6, fontFamily: "ms_sans_serif" }}>
              {profile.storyTitle}
            </div>
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Story>
          <GroupBox label={t("windows.about.education")}>
            {education.map((e, i) => (
              <EduRow key={i}>
                <div className="left">
                  <div>
                    <strong>{e.degree}</strong>
                  </div>
                  <div>{e.school}</div>
                </div>
                <div className="right">
                  <div>{e.period}</div>
                  <div>
                    {t("windows.about.gpa")} {e.gpa}
                  </div>
                </div>
              </EduRow>
            ))}
          </GroupBox>
        </Body>
      </Layout>
    </OSWindow>
  );
}
