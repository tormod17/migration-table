// readJson("./store.json", depTable);

getJSONInput(depTable);

async function readJson(url, callback) {
  const response = await fetch(url);
  const store = await response.json();
  callback(store);
}

function getJSONInput(callback) {
  var button = document.querySelector(".migration button");
  button.onclick = function() {
    var data = document.querySelector(".migration textarea").value;
    console.log(data, '>>>>');
    try {
      var json = JSON.parse(data);
      callback(json);
    }
    catch(e){
      alert('invaid json')
      console.error('not valid json', e)
    }
  };
}


function getTableRows(json) {
  const { config, pageScraping, domainEntityProperties } = json;
  const { campaigns } = config;
  const externalPageElements = Object.values(pageScraping.pageElements).filter(
    ele => ele.type === "ExternalValue"
  );
  
  return externalPageElements.map(ele => {
    const { id, name, type, pageTypeName } = ele;
    const depNames = getDEPNames(domainEntityProperties, id);
    const campRulesIdName = returnCampRulesIdName(campaigns);
    const campaignIds = checkCampaignForDEP(depNames, campRulesIdName); 
    return {
      pageTypeName,
      name,
      type,
      id,
      depNames,
      campaignIds
    };
  });
}

function getDEPNames(deps, id) {
  const names = Object.values(deps)
      .filter(dep => dep.sources.filter(s => s.pageElementId === id).length)
      .map(d => d.name);
  return names != "" ? names.join(",") : "no DEP";
}

function returnCampRulesIdName(camp){
  return camp.map(c => {
    const rules =  c.collections.map(c => c.targetRulesExpression);
    return {
      name: c.name,
      rules: rules,
      id: c.id
    };
  });
}

function checkCampaignForDEP(deps, campaigns) {
  let campIds = [];
  campaigns.forEach(camp => {
    deps.split(",").forEach(d => {
      if (nameExistsInCamp(camp, d)) {
        campIds.push(camp.id);
      } 
    });
  });
  return campIds.length > 0 ? campIds.join(",") : 'not used';
}

function nameExistsInCamp(camp, name) {
  return JSON.stringify(camp).indexOf(name) > -1;
}

function depTable(json) {
  const tableRowObject = getTableRows(json);
  console.log(tableRowObject)
  var hotElement = document.querySelector('#hot');
  hotElement.innerHTML = '';
  // var hotElementContainer = hotElement.parentNode;

  var hotSettings = {
    data: tableRowObject,
    columns: [
      {
        data: "campaignIds",
        type: "text"
      },
      {
        data: "depNames",
        type: "text",
        width: 400
      },
      {
        data: "id",
        type: "numeric"
      },
      {
        data: "name",
        type: "text",
        width: 400
      },
      {
        data: "pageTypeName",
        type: "text"
      },
      {
        data: "type",
        type: "text"
      }
    ],
    autoWrapRow: true,
    rowHeaders: true,
    colHeaders: [
      "campaignIds",
      "depNames",
      "id",
      "name",
      "pageTypeName",
      "type"
    ],
    columnSorting: {
      indicator: true
    },
    width: 880,
    filters: true,
    licenseKey: "non-commercial-and-evaluation"
  };
var hot = new Handsontable(hotElement, hotSettings);
}