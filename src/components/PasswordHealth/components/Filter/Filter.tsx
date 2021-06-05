import { FC } from "react";
import { Routes } from "~/constants";
import { IItem } from "~/services/getUserItems";
import FilterTab from "./components/FilterTab";

import "./filter-style.scss";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasOldPassword from "~/utils/itemHasOldPassword";

interface IFilter {
  itemWithWeakPasswordCount: number;
  itemWithReusedPasswordCount: number;
  itemWithOldPasswordCount: number;
}

const Filter: FC<IFilter> = ({
  itemWithWeakPasswordCount,
  itemWithReusedPasswordCount,
  itemWithOldPasswordCount,
}) => {
  return (
    <div className="filter">
      <FilterTab
        title="Weak"
        count={itemWithWeakPasswordCount}
        path={Routes.Weak}
      />
      <FilterTab
        title="Reused"
        count={itemWithReusedPasswordCount}
        path={Routes.Reused}
      />
      <FilterTab
        title="Old"
        count={itemWithOldPasswordCount}
        path={Routes.Old}
      />
    </div>
  );
};

export default Filter;
