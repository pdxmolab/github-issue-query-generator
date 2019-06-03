
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
    ret = ret + generateLabels(selectedTypes, "Type")
    ret = ret + generateLabels(selectedPriorities, "Priority")
    ret = ret + generateLabels(selectedPipelines, "Pipeline")

    if (document.getElementById("userID").value !== "")
    {
      ret = ret + " assignee:" + document.getElementById("userID").value
    }

    handleURLGeneration(ret)

    const out = document.getElementById("output")
    out.innerHTML = ret
    return ret
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

    console.log(list)

    return list
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
    assigneeInput.classList.add("mdc-typography--body1")
    wrapper.appendChild(assigneeInput)
    assignee.appendChild(wrapper)
    // checkbox.addEventListener("click", handleAll);


    // Click Handers
    const generateQueryButton = document.getElementById("generateButton")
    generateQueryButton.addEventListener("click", handleSyntaxGeneration);

    const openInGithub = document.getElementById("githubButton")
    openInGithub.addEventListener("click", openInGit);

    const clopy = document.getElementById("clipCopy")
    clopy.addEventListener("click", copyToClip);
  }

  initUI()

})()
