const appRoot = document.getElementById('app-root');
const columnNames = ['Country name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
const rowKeys = ['name', 'capital', 'region', 'languages', 'area', 'flagURL'];
const countryNameColIndex = 0, languageColIndex = 3, areaColIndex = 4, imageColIndex = 5;
const arrowUp = '&#8593;', arrowUpDown = '&#8597;', arrowDown = '&#8595;';
let countryList;
const header = document.createElement('h1');
header.setAttribute('id', 'header-title');
appRoot.append(header);
header.innerHTML = 'Countries Search';
const typeOfSearch = document.createElement('div');
typeOfSearch.setAttribute('id', 'type-of-search');
appRoot.appendChild(typeOfSearch);
const typeOfSearchLabel = document.createElement('div');
typeOfSearchLabel.setAttribute('id', 'type-of-search-label');
typeOfSearch.appendChild(typeOfSearchLabel);
const typeOfSearchText = document.createElement('p');
typeOfSearchText.setAttribute('id', 'type-of-search-text');
typeOfSearchLabel.appendChild(typeOfSearchText);
typeOfSearchText.innerHTML = 'Please choose type of search:';
const typeOfSearchRadio = document.createElement('div');
typeOfSearchRadio.setAttribute('id', 'type-of-search-radio');
typeOfSearch.appendChild(typeOfSearchRadio);
const typeOfSearchForm = document.createElement('form');
typeOfSearchForm.setAttribute('id', 'type-of-search-form');
typeOfSearchForm.setAttribute('name', 'type-of-search-form');
typeOfSearchRadio.appendChild(typeOfSearchForm);
const regionScope = document.createElement('div');
regionScope.setAttribute('id', 'region');
typeOfSearchForm.appendChild(regionScope);
const regionInput = document.createElement('input');
regionInput.setAttribute('type', 'radio');
regionInput.setAttribute('id', 'region-radio');
regionInput.setAttribute('name', 'type-of-search-input');
regionInput.setAttribute('value', 'byRegion');
regionScope.appendChild(regionInput);
const regionLabel = document.createElement('label');
regionLabel.setAttribute('for', 'region-radio');
regionScope.appendChild(regionLabel);
regionLabel.innerHTML = 'By Region';
const languageScope = document.createElement('div');
languageScope.setAttribute('id', 'language');
typeOfSearchForm.appendChild(languageScope);
const languageInput = document.createElement('input');
languageInput.setAttribute('type', 'radio');
languageInput.setAttribute('id', 'language-radio');
languageInput.setAttribute('name', 'type-of-search-input');
languageInput.setAttribute('value', 'byLanguage');
languageScope.appendChild(languageInput);
const languageLabel = document.createElement('label');
languageLabel.setAttribute('for', 'language-radio');
languageScope.appendChild(languageLabel);
languageLabel.innerHTML = 'By Language';
const searchQuery = document.createElement('div');
searchQuery.setAttribute('id', 'search-query');
appRoot.appendChild(searchQuery);
const searchQueryLabel = document.createElement('div');
searchQueryLabel.setAttribute('id', 'search-query-label');
searchQuery.appendChild(searchQueryLabel);
const searchQueryText = document.createElement('p');
searchQueryText.setAttribute('id', 'search-query-text');
searchQueryLabel.appendChild(searchQueryText);
searchQueryText.innerHTML = 'Please choose search query:';
const searchQuerySelectScope = document.createElement('div');
searchQuerySelectScope.setAttribute('id', 'search-query-select-scope');
searchQuery.appendChild(searchQuerySelectScope);
const searchQuerySelect = document.createElement('select');
searchQuerySelect.setAttribute('id', 'search-query-select');
searchQuerySelectScope.appendChild(searchQuerySelect);
searchQuerySelect.disabled = true;
const defaultSelectValue = document.createElement('option');
searchQuerySelect.appendChild(defaultSelectValue);
defaultSelectValue.innerHTML = 'Select value';
defaultSelectValue.hidden = true;
const noItemsMessage = document.createElement('p');
noItemsMessage.setAttribute('id', 'no-items-message');
const tableScope = document.createElement('div');
tableScope.setAttribute('id', 'country-table-scope');
const countryTable = document.createElement('table');
countryTable.setAttribute('id', 'country-table');
tableScope.appendChild(countryTable);
const tableHead = document.createElement('thead');
tableHead.setAttribute('id', 'country-table-head');
countryTable.appendChild(tableHead);
const tableBody = document.createElement('tbody');
tableBody.setAttribute('id', 'country-table-body');
countryTable.appendChild(tableBody);
const countryArrowScope = document.createElement('span');
countryArrowScope.setAttribute('id', 'country-arrow-scope');
const areaArrowScope = document.createElement('span');
areaArrowScope.setAttribute('id', 'area-arrow-scope');

regionInput.addEventListener('change', function () {
    typeOfSearchFormSettings();
    showSelectOptions(externalService.getRegionsList());
});

languageInput.addEventListener('change', function () {
    typeOfSearchFormSettings();
    showSelectOptions(externalService.getLanguagesList());
});

searchQuerySelect.addEventListener('change', function () {
    createTable();
});

countryArrowScope.addEventListener('click', function () {
    sortCountryList('country');
});

areaArrowScope.addEventListener('click', function () {
    sortCountryList('area');
});

function typeOfSearchFormSettings() {
    searchQuerySelect.disabled = false;
    if (!document.getElementById('no-items-message')) {
        appRoot.appendChild(noItemsMessage);
        noItemsMessage.innerHTML = 'No items, please choose search query';
    }
    if (searchQuerySelect.length > 1) {
        const searchQueryOptions = document.querySelectorAll('#search-query-select option');
        searchQueryOptions.forEach((option, index) => {
            if (index === 0) {
                return;
            }
            option.remove();
        });
    }
    cleanTable();
}

function showSelectOptions(optionsList) {
    for (let i = 0; i < optionsList.length; i++) {
        let option = document.createElement('option');
        option.text = optionsList[i];
        searchQuerySelect.appendChild(option);
    }
}

function cleanTable() {
    if (document.getElementById('country-table-scope')) {
        const tableBody = document.querySelectorAll('th, tr');
        tableBody.forEach((row) => {
            row.remove();
        });
        tableScope.remove();
    }
}

function createTable() {
    cleanTable();
    noItemsMessage.remove();
    appRoot.appendChild(tableScope);
    for (let col = 0; col < columnNames.length; col++) {
        let tableHeadTh = document.createElement('th');
        tableHead.appendChild(tableHeadTh);
        tableHeadTh.innerText = columnNames[col];
    }
    const typeOfSearchValues = document.getElementsByName('type-of-search-input');
    const selectedTypeOfSearch = Array.from(typeOfSearchValues).find(radio => radio.checked);
    const selectedSearchQuery = searchQuerySelect.options[searchQuerySelect.selectedIndex].text;
    countryList = selectedTypeOfSearch.value === 'byRegion' ?
        externalService.getCountryListByRegion(selectedSearchQuery) :
        externalService.getCountryListByLanguage(selectedSearchQuery);
    const tableHeadersContent = document.querySelectorAll('thead th');
    countryArrowScope.innerHTML = arrowUpDown;
    areaArrowScope.innerHTML = arrowUpDown;
    tableHeadersContent[countryNameColIndex].appendChild(countryArrowScope);
    tableHeadersContent[areaColIndex].appendChild(areaArrowScope);
    insertTableRows();
}

function insertTableRows() {
    for (let row = 0; row < countryList.length; row++) {
        let tableBodyTr = document.createElement('tr');
        tableBody.appendChild(tableBodyTr);
        for (let col = 0; col < columnNames.length; col++) {
            let tableTd = document.createElement('td');
            tableBodyTr.appendChild(tableTd);
            let tdContent = countryList[row][rowKeys[col]];
            if (col === languageColIndex) {
                let languageTd = [];
                for (let key in tdContent) {
                    if (tdContent.hasOwnProperty(key)) {
                        languageTd.push(tdContent[key]);
                    }
                }
                tableTd.innerText = languageTd.join(', ');
            } else if (col === imageColIndex) {
                let img = document.createElement('img');
                img.src = tdContent;
                tableTd.appendChild(img);
            } else {
                tableTd.innerText = tdContent;
            }
        }
    }
}

function sortCountryList(field) {
    const scopeValue = document.getElementById(field + '-arrow-scope').innerHTML.charCodeAt(0);
    field === 'country' ? document.getElementById('area-arrow-scope').innerHTML = arrowUpDown :
        document.getElementById('country-arrow-scope').innerHTML = arrowUpDown;
    if (scopeValue === +arrowUp.replace(/[^0-9]/g, '')) {
        field === 'country' ? countryList.sort((a, b) => b.name.localeCompare(a.name)) :
            countryList.sort((a, b) => a.area - b.area);
        document.getElementById(field + '-arrow-scope').innerHTML = arrowDown;
    } else {
        field === 'country' ? countryList.sort((a, b) => a.name.localeCompare(b.name)) :
            countryList.sort((a, b) => b.area - a.area);
        document.getElementById(field + '-arrow-scope').innerHTML = arrowUp;
    }
    document.querySelectorAll('#country-table-body tr').forEach((row) => {
        row.remove();
    });
    insertTableRows();
}