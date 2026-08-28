"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Tab, TabBody, GroupBox } from "react95";
import OSWindow from "../Window";
import { getLocalizedPortfolio } from "@/data/localizedPortfolio";
import { useLocale, useTranslations } from "@/i18n/LocaleProvider";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 12px;
  min-height: 0;
`;

const TabsRow = styled(Tabs)`
  flex: 0 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: thin;
  padding-bottom: 2px;
  button {
    font-size: 11px !important;
    padding: 3px 8px !important;
    min-width: max-content;
  }
`;

const Body = styled(TabBody)`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  .title {
    font-weight: bold;
    font-size: 13px;
  }
  .meta {
    font-size: 11px;
    color: ${({ theme }) => theme.materialText};
  }
`;

const Bullets = styled.ul`
  margin: 4px 0 0 18px;
  padding: 0;
  font-size: 12px;
  line-height: 1.5;
  li {
    margin: 0 0 4px;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

const Chip = styled.span`
  font-size: 10px;
  padding: 2px 6px;
  background: ${({ theme }) => theme.material};
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest}
    ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest};
`;

type ExperienceEntry = ReturnType<typeof getLocalizedPortfolio>["experience"][number];

function shortCompany(name: string) {
  return name
    .replace("Brigham Young University - Idaho", "BYU-I")
    .replace("Brigham Young University", "BYU")
    .replace("CCS Global Tech", "CCS");
}

function shortRoleTitle(title: string) {
  return title
    .replace("Software Developer", "Software Dev")
    .replace("CS Teaching Assistant", "CS TA")
    .replace("Software Engineer", "SW Engineer")
    .replace("Desarrollador de Software", "Software Dev")
    .replace("Asistente de Ensenanza de CS", "CS TA")
    .replace("Ingeniero de Software", "SW Engineer")
    .replace("Tecnico L3", "L3 Tech");
}

function getTabLabel(job: ExperienceEntry, jobs: ExperienceEntry[]) {
  const company = shortCompany(job.company);
  const sameCompanyCount = jobs.filter(
    (entry) => shortCompany(entry.company) === company
  ).length;

  if (sameCompanyCount > 1) {
    const yearMatch = job.period.match(/\b(20\d{2})\b/);
    const year = yearMatch ? `'${yearMatch[1].slice(-2)}` : "";
    const role = shortRoleTitle(job.title);
    return year ? `${role} ${year}` : role;
  }

  return company;
}

export default function ExperienceWindow() {
  const { locale } = useLocale();
  const t = useTranslations();
  const { experience } = getLocalizedPortfolio(locale);
  const [active, setActive] = useState(0);
  const job = experience[active];

  return (
    <OSWindow id="experience">
      <Layout>
        <TabsRow value={active} onChange={(v) => setActive(Number(v))}>
          {experience.map((e, i) => (
            <Tab key={i} value={i} title={`${e.title} @ ${e.company} · ${e.period}`}>
              {getTabLabel(e, experience)}
            </Tab>
          ))}
        </TabsRow>
        <Body>
          <Header>
            <div className="title">
              {job.title} <span style={{ fontWeight: "normal" }}>@ {job.company}</span>
            </div>
            <div className="meta">{job.period}</div>
          </Header>
          <Chips>
            {job.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </Chips>
          <GroupBox label={t("windows.projects.highlights")}>
            <Bullets>
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </Bullets>
          </GroupBox>
        </Body>
      </Layout>
    </OSWindow>
  );
}
