// empty div that will display GitHub profile info
const overview = document.querySelector(".overview");
// GitHub username
const username = "ksenia-kos";

// fetch GitHub user data
const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json(); // object
    console.log(data);
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
};