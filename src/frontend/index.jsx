import React, { useEffect, useState} from "react";
import ForgeReconciler, { Text, Image  } from "@forge/react";
import { invoke } from "@forge/bridge";
import api, { route } from "@forge/api";
import { events } from "@forge/bridge";
import fireworks from "../../fireworks.gif";

const App = () => {
  const [changelog, setChangelog] = useState(false);

  useEffect(() => {
    events.on("JIRA_ISSUE_CHANGED", (data) => {
      console.log("JIRA_ISSUE_CHANGED (Forge)", data);
      console.log(`Started`);

      invoke("getChangelog", { example: "my-invoke-variable" }).then(
        (changelog) => {
          console.log(changelog);
          const lastChangeStatus =
            changelog.values[changelog.values.length - 1].items.some(item => 
              item.field === "resolution" && item.toString === "Done"
            );

          console.log(lastChangeStatus);
          setChangelog(lastChangeStatus); // Update state instead of a global variable
        }
      );
    });
  }, []); // Run this effect only once

  return (
    console.log(changelog),
    (
      <>
        <Text>Hello world!</Text>
        { changelog && <Image src={fireworks} alt=""/> }
      </>
    )
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);