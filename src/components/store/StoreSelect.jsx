import React from "react";

import SelectMany from "../select/SelectMany";

function StoreSelect({ stores, ...props }) {
  return <SelectMany datas={stores} {...props} />;
}

export default StoreSelect;
