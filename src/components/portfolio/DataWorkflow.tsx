import { useState } from "react";
import { Link } from "@tanstack/react-router";
const workflows = [
  { label: "Analyse", heading: "Make the numbers explain themselves.", description: "Start with the business question. Define the metrics, explore the data, and turn the findings into a clear recommendation.", steps: ["Frame the question", "Validate the measures", "Explain the finding"] },
  { label: "Build", heading: "Give good analysis a reliable foundation.", description: "Connect sources, shape consistent models, and build reporting that makes the underlying logic easy to follow.", steps: ["Connect the sources", "Model the data", "Build the reporting layer"] },
  { label: "Automate", heading: "Make repeatable work easier to repeat.", description: "Identify the manual steps, add quality checks, and design a workflow that can be monitored and maintained.", steps: ["Map the manual steps", "Add checks and controls", "Monitor the workflow"] },
];
export function DataWorkflow() {
  const [active, setActive] = useState(0);
  const workflow = workflows[active];
  return <section className="workflow-section container" aria-label="Approach to data work">
    <div className="workflow-tabs" role="tablist" aria-label="Explore the workflow">
      {workflows.map((item, index) => <button key={item.label} id={"workflow-tab-"+index} role="tab" aria-selected={active===index} aria-controls="workflow-panel" tabIndex={active===index?0:-1} onClick={()=>setActive(index)} onKeyDown={(event)=>{if(["ArrowLeft","ArrowRight","Home","End"].includes(event.key)){event.preventDefault(); const next=event.key==="Home"?0:event.key==="End"?2:(active+(event.key==="ArrowRight"?1:2))%3;setActive(next);document.getElementById("workflow-tab-"+next)?.focus();}}}>{item.label}</button>)}
    </div>
    <div className="workflow-panel" id="workflow-panel" role="tabpanel" aria-labelledby={"workflow-tab-"+active}>
      <div><p className="small-label">From question to useful output</p><h2>{workflow.heading}</h2><p>{workflow.description}</p><Link className="text-link" to="/projects">See the project work →</Link></div>
      <div className="workflow-art" aria-label={workflow.label+" workflow"}>{workflow.steps.map((step,index)=><div key={step}><span>{index+1}</span>{step}</div>)}</div>
    </div>
  </section>;
}
