"use client";

import React from "react";
import styled from "styled-components";
import OSWindow from "../Window";

const List = styled.div`
  background: #fff;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDarkest} ${({ theme }) => theme.borderLightest}
    ${({ theme }) => theme.borderLightest} ${({ theme }) => theme.borderDarkest};
  padding: 6px 8px;
  font-size: 12px;
  font-family: "Courier New", monospace;
  height: 100%;
  overflow-y: auto;
  div {
    padding: 1px 0;
  }
`;

const TRASH = [
  "imposter_syndrome.bak",
  "tabs_vs_spaces.txt",
  "old_resume_v2.docx",
  "side_project_2019.zip",
  "javascript_frameworks_to_learn.txt",
  "untitled-1.psd",
  "should-i-use-redux.md",
  "TODO_2024.txt",
];

export default function RecycleWindow() {
  return (
    <OSWindow id="recycle">
      <List>
        {TRASH.map((f, i) => (
          <div key={i}>🗑  {f}</div>
        ))}
        <div style={{ marginTop: 8, fontStyle: "italic", color: "#666" }}>
          {TRASH.length} item(s). Permanently deleted = vibes only.
        </div>
      </List>
    </OSWindow>
  );
}
