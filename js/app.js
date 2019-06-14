
(function() {
  const map = {
    "bigreview": "pdxmolab/bigreview",
    "NgsReviewer": "pdxmolab/NgsReviewer",
    "NgsReporter": "pdxmolab/NgsReporter",
    "Software-Engineering-Coordination": "pdxmolab/Software-Engineering-Coordination",
    "Unosquare-pdf": "pdxmolab/Unosquare-pdf",
    "Unosquare-portal": "pdxmolab/Unosquare-portal",
    "Unosquare-ui": "pdxmolab/Unosquare-ui",
    "Ngspipelines": "pdxmolab/Ngspipelines",
    "Gc_pipes": "pdxmolab/Gc_pipes",
    "irb_psjh_reflex": "pdxmolab/irb_psjh_reflex",
    "Bigvar": "pdxmolab/Bigvar",
    "Portal_plumbing": "pdxmolab/Portal_plumbing",
    "RURO_Limfinity": "pdxmolab/RURO_Limfinity",
    "Feature": "Type:Feature",
    "Enhancement": "Type:Enhancement",
    "Bug": "Type:Bug",
    "Task": "Type:Task",
    "Infrastructure": "Type:Infrastructure",
    "Test": "Type:Test",
    "Critical": "Priority:Critical",
    "High": "Priority:High",
    "Medium": "Priority:Medium",
    "Low": "Priority:Low",
    "Tso500": "Pipeline:Tso500",
    "Archer": "Pipeline:Archer",
    "Tst170": "Pipeline:Tst170",
    "Miseq": "Pipeline:Miseq",
    "Triseq": "Pipeline:Triseq",
  }

  const data = {
    "Repository": [
      "All",
      "bigreview",
      "NgsReviewer",
      "NgsReporter",
      "Software-Engineering-Coordination",
      "Unosquare-pdf",
      "Unosquare-portal",
      "Unosquare-ui",
      "Ngspipelines",
      "Gc_pipes",
      "irb_psjh_reflex",
      "Bigvar",
      "Portal_plumbing",
      "RURO_Limfinity",
      ],
    "Type": [
      "All",
      "Feature",
      "Enhancement",
      "Bug",
      "Task",
      "Infrastructure",
      "Test",
    ],
    "Priority": [
      "All",
      "Critical",
      "High",
      "Medium",
      "Low",
    ],
    "Pipeline": [
      "Tso500",
      "Archer",
      "Tst170",
      "Miseq",
      "Triseq",
    ],
  }

  var selectedPriorities = []
  var selectedTypes = []
  var selectedRepos = []
  var selectedPipelines = []
  var noAssignee = ""
  var issueStatus = "statusAll"

  function openInGit()
  {
    const querySyntax = handleSyntaxGeneration()
    const githubLink = handleURLGeneration(querySyntax)
    window.open(githubLink, '_blank');
  }

  function handleURLGeneration(query)
  {
    let ret = ""
    let base  = "https://github.com/issues?utf8=%E2%9C%93&&q="
    let colon = "%3A"
    let space = "+"

    let mod = ""
    for (var i=0; i<query.length; i++)
    {
      if (query[i] === ":")
      {
        mod = mod+colon
      }
      else if (query[i] === " ")
      {
        mod = mod+space
      }
      else
      {
        mod = mod + query[i]
      }
    }

    return base+mod
  }

  function handleSyntaxGeneration()
  {
    let org = "org:pdxmolab"
    let ret = ""

    if (selectedRepos.length === 0 || selectedRepos.length > 1)
    {
      ret = ret + org
    }

    ret = ret + generateLabels(selectedRepos, "Repository")
    ret = ret + checkIssueStatus()
    ret = ret + generateLabels(selectedTypes, "Type")
    ret = ret + generateLabels(selectedPriorities, "Priority")
    ret = ret + generateLabels(selectedPipelines, "Pipeline")

    if (document.getElementById("userID").value !== "")
    {
      ret = ret + " assignee:" + document.getElementById("userID").value
    }
    else if (noAssignee !== "")
    {
      ret = ret + noAssignee
    }

    if (document.getElementById("titleID").value !== "")
    {
      ret = ret + " " + document.getElementById("titleID").value + " " + "in:title"
    }

    if (document.getElementById("bodyID").value !== "")
    {
      ret = ret + " " + document.getElementById("bodyID").value +"in:body"
    }

    if (document.getElementById("projectID").value !== "")
    {
      ret = ret + " project:pdxmolab/" + document.getElementById("projectID").value
    }

    handleURLGeneration(ret)

    const out = document.getElementById("output")
    out.innerHTML = ret
    return ret
  }

  function checkIssueStatus()
  {
    if (issueStatus === "statusAll")
    {
      return ""
    }
    else if (issueStatus === "statusOpen")
    {
      return " is:open"
    }
    else if (issueStatus === "statusClosed")
    {
      return " is:closed"
    }
  }

  function generateLabels(selected, name)
  {
    let header = ""
    if (name === "Repository")
    {
      header = "repo"
    }
    else
    {
      header = "label"
    }
    let ret = ""
    let space = " "
    // Priority
    if (selected.length !== 0 )
    {
      if (selected.length === 1 )
      {
        ret = ret+space+`${header}:${map[selected[0]]}`
      }
      else
      {
        let toAppend = ""
        const inserts = data[`${name}`]
        inserts.forEach(insert => {
          if (selected.indexOf(insert) < 0 && insert !== "All")
          {
            toAppend = toAppend+space+`-${header}:${map[insert]}`
          }
        })

        ret = ret+toAppend
      }
    }

    return ret
  }

  function handleAllCheck(e, list)
  {
    if (e.target.checked === true)
    {
      list = data[e.target.name]
    }
    else
    {
      list = []
    }

    return list
  }

  function handleNoAsignee(e)
  {
    if (e.target.checked === true)
    {
      noAssignee = " no:assignee"
    }
    else
    {
      noAssignee = ""
    }
  }

  function handleAll(e)
  {
    // Handle state
    if (e.target.name === "Repository")
    {
      selectedRepos = handleAllCheck(e, selectedRepos)
    }
    else if (e.target.name === "Type")
    {
      selectedTypes = handleAllCheck(e, selectedTypes)
    }
    else if (e.target.name === "Priority")
    {
      selectedPriorities = handleAllCheck(e, selectedPriorities)
    }
    else if (e.target.name === "Pipeline")
    {
      selectedPipelines = handleAllCheck(e, selectedPipelines)
    }

    // Handle UI
    let rowChildren = document.getElementById(e.target.name).children
    for (var i=0; i<rowChildren.length; i++)
    {
      let rowItem = rowChildren[i].children

      for (var j=0; j<rowItem.length; j++)
      {
        let divWrapper = rowItem[j].children

        for (var k=0; k<divWrapper.length; k++)
        {
          let item = divWrapper[k]
          if (String(item.tagName).toUpperCase() === "INPUT")
          {
            if (e.target.checked === true)
            {
              item.checked = true;
            }
            else
            {
              item.checked = false;
            }
          }
        }
      }
    }
  }

  function handleOpenClose(e)
  {
    issueStatus = e.target.id
  }


  function handleClick(e)
  {
    if (e.target.name === "Repository")
    {
      selectedRepos = attemptPush(selectedRepos, e.target.id)
    }
    else if (e.target.name === "Type")
    {
      selectedTypes = attemptPush(selectedTypes, e.target.id)
    }
    else if (e.target.name === "Priority")
    {
      selectedPriorities = attemptPush(selectedPriorities, e.target.id)
    }
    else if (e.target.name === "Pipeline")
    {
      selectedPipelines = attemptPush(selectedPipelines, e.target.id)
    }
  }

  function attemptPush(arr, item)
  {
    if (arr.indexOf(item) < 0)
    {
      arr.push(item)
    }
    else
    {
      const ind = arr.indexOf(item)
      arr = arr.slice(0,ind).concat(arr.slice(ind+1))
    }

    return arr
  }

  function copyToClip()
  {
    let text = document.getElementById("output")
    let ta = document.createElement('textarea')
    ta.style.position = 'fixed';
    ta.style.left = '0';
    ta.style.top = '0';
    ta.style.opacity = '0';
    ta.value = text.innerHTML
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  function initUI()
  {
    const keys = Object.keys(data)
    for (var i=0; i<keys.length; i++)
    {
      const key = keys[i]
      const selected = document.getElementById(`${key}`)
      const rowTitleContainer = document.createElement("div")
      const rowTitle = document.createElement("div")
      rowTitle.classList.add("rowTitle")
      rowTitle.classList.add("titleBadge")
      rowTitle.classList.add("mdc-typography--button")
      rowTitle.innerHTML = `${key}`
      rowTitleContainer.appendChild(rowTitle)
      selected.appendChild(rowTitleContainer)

      const rowContentContainer = document.createElement("div")
      rowContentContainer.classList.add("rowContentContainer")
      const options = data[key]
      for (var j=0; j<options.length; j++)
      {
        const option = options[j]
        const wrapper = document.createElement('div')
        wrapper.classList.add("rowItem")
        wrapper.classList.add("mdc-form-field")

        const checkbox = document.createElement('input')
        checkbox.classList.add("mdc-checkbox")
        if (option === "All")
        {
          checkbox.addEventListener("click", handleAll);
        }
        else
        {
          checkbox.addEventListener("click", handleClick);
        }
        checkbox.type = "checkbox"
        checkbox.name = `${key}`
        checkbox.value = 0
        checkbox.id = option

        var label = document.createElement('div')
        label.appendChild(document.createTextNode(`${option}`))

        wrapper.appendChild(checkbox)
        wrapper.appendChild(label);
        rowContentContainer.appendChild(wrapper);
        selected.appendChild(rowContentContainer);
      }
    }

    // TITLE
    const title = document.getElementById('Title')
    const titleWrapper = document.createElement('div')
    titleWrapper.classList.add("rowItem")
    titleWrapper.classList.add("mdc-form-field")

    const titleInput = document.createElement("input")
    titleInput.id = "titleID"
    titleInput.classList.add("titleInput")
    titleWrapper.appendChild(titleInput)
    title.appendChild(titleWrapper)

    // BODY
    const body = document.getElementById('Body')
    const bodyWrapper = document.createElement('div')
    bodyWrapper.classList.add("rowItem")
    bodyWrapper.classList.add("mdc-form-field")

    const bodyInput = document.createElement("input")
    bodyInput.id = "bodyID"
    bodyInput.classList.add("bodyInput")
    bodyWrapper.appendChild(bodyInput)
    body.appendChild(bodyWrapper)

    // Project
    const project = document.getElementById('Project')

    const projectWrapper = document.createElement('div')
    projectWrapper.classList.add("rowItem")
    projectWrapper.classList.add("mdc-form-field")

    const projectInput = document.createElement("input")
    projectInput.id = "projectID"
    projectInput.classList.add("projectInput")
    projectWrapper.appendChild(projectInput)
    project.appendChild(projectWrapper)

    // Assignee
    const assignee = document.getElementById('Assignee')
    const rowTitleContainer = document.createElement("div")
    const rowTitle = document.createElement("div")
    rowTitle.classList.add("rowTitle")
    rowTitle.classList.add("titleBadge")
    rowTitle.classList.add("mdc-typography--button")
    rowTitle.innerHTML = "Assignee (GitHub Username)"
    rowTitleContainer.appendChild(rowTitle)
    assignee.appendChild(rowTitleContainer)

    const wrapper = document.createElement('div')
    wrapper.classList.add("rowItem")
    wrapper.classList.add("mdc-form-field")

    const assigneeInput = document.createElement("input")
    assigneeInput.id = "userID"
    assigneeInput.classList.add("assigneeInput")
    wrapper.appendChild(assigneeInput)

    const orSpacer = document.createElement("div")
    orSpacer.classList.add("orSpacer")
    orSpacer.innerHTML = ("Or")
    wrapper.appendChild(orSpacer)
    assignee.appendChild(wrapper)

    const assignWrapper = document.createElement('div')
    assignWrapper.classList.add("rowItem")
    assignWrapper.classList.add("mdc-form-field")
    const noAssignCheckbox = document.createElement('input')
    noAssignCheckbox.classList.add("mdc-checkbox")
    noAssignCheckbox.addEventListener("click", handleNoAsignee);
    noAssignCheckbox.type = "checkbox"
    noAssignCheckbox.name = "noAssignee"
    noAssignCheckbox.value = 0
    noAssignCheckbox.id = "noAssignee"

    var noAssignLabel = document.createElement('div')
    noAssignLabel.appendChild(document.createTextNode("Not Assigned"))

    assignWrapper.appendChild(noAssignCheckbox)
    assignWrapper.appendChild(noAssignLabel)
    assignee.appendChild(assignWrapper)

    // Click Handers
    const statusAll = document.getElementById("statusAll")
    statusAll.addEventListener("click", handleOpenClose);

    const statusOpen = document.getElementById("statusOpen")
    statusOpen.addEventListener("click", handleOpenClose);

    const statusClosed = document.getElementById("statusClosed")
    statusClosed.addEventListener("click", handleOpenClose);

    const generateQueryButton = document.getElementById("generateButton")
    generateQueryButton.addEventListener("click", handleSyntaxGeneration);

    const openInGithub = document.getElementById("githubButton")
    openInGithub.addEventListener("click", openInGit);

    const clopy = document.getElementById("clipCopy")
    clopy.addEventListener("click", copyToClip);
  }

  initUI()

})()
