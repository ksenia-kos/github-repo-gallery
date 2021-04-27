// empty div that will display GitHub profile info
const overview = document.querySelector(".overview");
// GitHub username
const username = "ksenia-kos";
// empty unordered list that will display GitHub repos; child of repos section
const repoList = document.querySelector(".repo-list");
// section where all repos information appears; parent of repo-list
const reposSec = document.querySelector(".repos");
// empty section where individual repo information will appear
const repoDataSec = document.querySelector(".repo-data");
// "Back to Repo Gallery" button
const btnViewRepos = document.querySelector(".view-repos");
// input element "Search by name"
const inputElem = document.querySelector(".filter-repos");

// fetch GitHub user data
const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json(); // object
    //console.log(data);
    displayUserInfo(data);
};

getData();

const displayUserInfo = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(userInfoDiv);
    getRepos();
};

const getRepos = async function () {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await response.json(); // array
    //console.log(reposData);
    displayRepos(reposData);
};

const displayRepos = function (repos) {
    inputElem.classList.remove("hide");
    for (const item of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    // check if the event target (element that was clicked on) matches the h3 element
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getRepo(repoName);
    }
});

// get specific repo information, get repo languages
const getRepo = async function (repoName) {
    const resp = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await resp.json(); // object
    //console.log(repoInfo);
    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json(); // object
    //console.log(languageData);
    
    // Make a list of languages
    const languages = [];
    for (const item in languageData) {
        languages.push(item);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

// display individual repo
const displayRepoInfo = function (repoInfo, languages) {
    repoDataSec.innerHTML = "";
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDataSec.append(repoInfoDiv);
    repoDataSec.classList.remove("hide");
    reposSec.classList.add("hide");
    btnViewRepos.classList.remove("hide");
};

// "Back to Repo Gallery" button
btnViewRepos.addEventListener("click", function () {
    reposSec.classList.remove("hide");
    repoDataSec.classList.add("hide");
    btnViewRepos.classList.add("hide");
});

// Dynamic search
inputElem.addEventListener("input", function (e) {
    const searchInput = e.target.value;
    const inputLower = searchInput.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    
    for (const repo of repos) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(inputLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});