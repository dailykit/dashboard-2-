import React from "react";

// State
import { useTabs } from "../../store/tabs";

// Styled
import { StyledTabs, StyledTab } from "./styled";

// Icons
import { CloseIcon } from "../../assets/icons";
import { useRouter } from "next/router";

const Tabs = () => {
  const location = useRouter();
  const { tabs, switchTab, removeTab } = useTabs();
  return (
    <StyledTabs>
      {tabs.map((tab, index) => (
        <StyledTab
          key={tab.title}
          onClick={() => switchTab(tab.path)}
          active={tab.path === location.pathname}
        >
          <span title={tab.title}>{tab.title}</span>
          <button
            type="button"
            title="Close Tab"
            onClick={(e) => removeTab(e, { tab, index })}
          >
            <CloseIcon color="#fff" size="20" />
          </button>
        </StyledTab>
      ))}
    </StyledTabs>
  );
};

export default Tabs;
