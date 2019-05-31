// Page load
(function()
{
  const data = {
    "repository": [
      "pdxmolab:bigreview",
      "pdxmolab:NgsReviewer",
      "pdxmolab:NgsReporter",
      "pdxmolab:Software-Engineering-Coordination",
      "pdxmolab:Unosquare-pdf",
      "pdxmolab:Unosquare-portal",
      "pdxmolab:Unosquare-ui",
      "pdxmolab:Ngspipelines",
      "pdxmolab:Gc_pipes",
      "pdxmolab:irb_psjh_reflex",
      "pdxmolab:Bigvar",
      "pdxmolab:Portal_plumbing",
      "pdxmolab:RURO_Limfinity",
      ],
    "type": [
      "Type:Feature",
      "Type:Enhancement",
      "Type:Bug",
      "Type:Task",
      "Type:Infrastructure",
      "Type:Test",
    ],
    "priority": [
      "Priority:Critical",
      "Priority:High",
      "Priority:Medium",
      "Priority:Low",
    ],
  }

  const keys = Object.Keys(data)
  for (var i=0; i<keys.length; i++)
  {
    const key = keys[i]
    const row = document.getElementById(`${key}`)
    const btn = document.createElement("BUTTON");
    btn.innerHTML = `${key}`;
    row.appendChild(btn);
  }

})()
