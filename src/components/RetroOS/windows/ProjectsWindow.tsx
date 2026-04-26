"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Button, GroupBox } from "react95";
import OSWindow from "../Window";
import { getLocalizedPortfolio } from "@/data/localizedPortfolio";
import { useLocale, useTranslations } from "@/i18n/LocaleProvider";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 8px;
  height: 100%;
  font-size: 12px;
  min-height: 0;
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    grid-template-rows: 140px 1fr;
  }
`;

const ListBox = styled.div`
  background: #fff;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  overflow-y: auto;
  height: 100%;
  font-size: 12px;
`;

const ListItem = styled.button<{ $active: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: ${({ $active }) => ($active ? "#000080" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1.3;
  font-family: inherit;
  &:hover {
    background: ${({ $active }) => ($active ? "#000080" : "#e0e0e0")};
  }
  .icon {
    margin-right: 6px;
  }
  .star {
    margin-left: 4px;
    color: ${({ $active }) => ($active ? "#ffd24a" : "#bb8800")};
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  padding-right: 4px;
  min-height: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  .title {
    font-weight: bold;
    font-size: 14px;
  }
  .date {
    font-size: 11px;
    color: ${({ theme }) => theme.materialText};
  }
`;

const Subtitle = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.materialText};
  margin-bottom: 2px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Chip = styled.span`
  font-size: 10px;
  padding: 2px 6px;
  background: ${({ theme }) => theme.material};
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest}
    ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest};
`;

const Metrics = styled.ul`
  margin: 4px 0 0 18px;
  padding: 0;
  font-size: 12px;
  line-height: 1.45;
`;

const PrivateBanner = styled.div`
  background: #fffacd;
  border: 1px solid #cca700;
  padding: 6px 8px;
  font-size: 11px;
  color: #553300;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

export default function ProjectsWindow() {
  const { locale } = useLocale();
  const t = useTranslations();
  const { projects } = getLocalizedPortfolio(locale);
  const [activeId, setActiveId] = useState(projects[0].id);
  const project = projects.find((p) => p.id === activeId)!;

  return (
    <OSWindow id="projects">
      <Layout>
        <ListBox>
          {projects.map((p) => (
            <ListItem
              key={p.id}
              $active={p.id === activeId}
              onClick={() => setActiveId(p.id)}
            >
              <span className="icon">📁</span>
              {p.title}
              {p.highlight && <span className="star">★</span>}
            </ListItem>
          ))}
        </ListBox>

        <Detail>
          <TitleRow>
            <span className="title">{project.title}</span>
            <span className="date">{project.date}</span>
          </TitleRow>
          <Subtitle>{project.subtitle}</Subtitle>

          <div style={{ background: "#fff", padding: 8, border: "1px solid #888", fontFamily: "Times New Roman, Georgia, serif", lineHeight: 1.5 }}>
            <div style={{ fontStyle: "italic", marginBottom: 6 }}>{project.description}</div>
            <div>{project.longDescription}</div>
          </div>

          <GroupBox label={t("windows.projects.techStack")}>
            <Chips>
              {project.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </Chips>
          </GroupBox>

          <GroupBox label={t("windows.projects.highlights")}>
            <Metrics>
              {project.metrics.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </Metrics>
          </GroupBox>

          {project.github ? (
            <Actions>
              <Button
                onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
              >
                ▶ {t("windows.projects.openGithub")}
              </Button>
            </Actions>
          ) : (
            <PrivateBanner>
              ⚠ {t("windows.projects.privateRepo")}
            </PrivateBanner>
          )}
        </Detail>
      </Layout>
    </OSWindow>
  );
}
