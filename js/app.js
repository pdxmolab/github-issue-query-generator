
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
  }

  var selectedPriorities = []
  var selectedTypes = []
  var selectedRepos = []

  function handleSyntaxGeneration()
  {
    let org = "org:pdxmolab"
    let ret = ""

    ret = ret + generateLabels(selectedPriorities, "Priority")
    ret = ret + generateLabels(selectedTypes, "Type")
    ret = ret + generateLabels(selectedRepos, "Repository")

    console.log(ret)

    const ta = document.getElementById("output")
    ta.innerHTML = ret
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

    // Handle UI
    let rowChildren = document.getElementById(e.target.name).children
    for (var i=0; i<rowChildren.length; i++)
    {
      let rowItem = rowChildren[i].children

      for (var j=0; j<rowItem.length; j++)
      {
        let item = rowItem[j]
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

  function initUI()
  {
    const keys = Object.keys(data)
    for (var i=0; i<keys.length; i++)
    {
      const key = keys[i]
      const row = document.getElementById(`${key}`)
      const rowTitle = document.createElement("div")
      rowTitle.classList.add("rowTitle")
      rowTitle.innerHTML = `${key}`
      row.appendChild(rowTitle)

      const options = data[key]
      for (var j=0; j<options.length; j++)
      {
        const option = options[j]
        const wrapper = document.createElement('div')
        wrapper.classList.add("rowItem")

        const checkbox = document.createElement('input')
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

        var label = document.createElement('label')
        label.htmlFor = option
        label.appendChild(document.createTextNode(`${option}`))

        wrapper.appendChild(checkbox)
        wrapper.appendChild(label);
        row.appendChild(wrapper);
      }
    }

    // Click Handers
    const generateQueryButton = document.getElementById("generateButton")
    generateQueryButton.addEventListener("click", handleSyntaxGeneration);
  }

  initUI()

})()
