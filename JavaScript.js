const sectionElement = document.querySelector("section.content")
const worldContentElement = document.querySelector("section.worldContent")
const ulElement = document.querySelector("section > ul")
const btnSearch = document.querySelector(".btnSearch")
const inputSearch = document.querySelector("section.btn > input")

const urlPeople = "https://swapi.dev/api/people/"
const urlSearch = "http://swapi.dev/api/people/?search="


function getData(url, callback) {

    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getData(urlPeople, renderList)

function renderList(users) {

    removeAllChildNodes(ulElement)
    for (let i = 0; i < users.results.length; i++) {

        const _user = users.results[i];

        const liElement = document.createElement('li');

        liElement.setAttribute('name', _user.name);
        liElement.textContent = _user.name;
        ulElement.appendChild(liElement);
    }

    function ulOnClick(evt) {

        const name = evt.target.getAttribute("name");

        for (let i = 0; i < users.results.length; i++) {

            const user = users.results[i];

            if (user.name == name) {

                renderPerson(user);
                break;
            }
        }
    }

    ulElement.addEventListener('click', ulOnClick)

    const prevBtn = document.createElement("button")
    prevBtn.textContent = "< Prev Page";
    ulElement.appendChild(prevBtn)

    const nextBtn = document.createElement("button")
    nextBtn.textContent = "Next Page >";
    ulElement.appendChild(nextBtn)

    prevBtn.addEventListener('click', function() {
        getData(users.previous, renderList);
    }, false);

    nextBtn.addEventListener('click', function() {
        getData(users.next, renderList);
    }, false);
}

function search(evt) {

    const url = `${urlSearch}${inputSearch.value}`;
    getData(url, renderList);

    inputSearch.value = "";
}

btnSearch.addEventListener('click', search)

inputSearch.addEventListener("keyup", evt => {
    if (evt.key === "Enter") {
        search()
    }
})

function renderPerson(user) {

    getData(urlPeople)
    removeAllChildNodes(sectionElement)
    let name = user.name;
    let gender = user.gender;
    let hair_color = user.hair_color;
    let height = user.height;
    let eye_color = user.eye_color;
    let homeworld = user.homeworld;

    if (gender == "n/a") {
        gender = "Robot"
        hair_color = "Metal"
    }

    const articleElement = document.createElement("article")
    const h2Name = document.createElement("h2")
    const pGender = document.createElement("p")
    const pHairColor = document.createElement("p")
    const pEyeColor = document.createElement("p")
    const pHeight = document.createElement("p")

    h2Name.textContent = name;
    pGender.textContent = `Gender: ${gender}`;
    pHairColor.textContent = `Hair Color: ${hair_color}`;
    pEyeColor.textContent = `Eye Color: ${eye_color}`;
    pHeight.textContent = `Height: ${height}`

    articleElement.appendChild(h2Name)
    articleElement.appendChild(pGender)
    articleElement.appendChild(pHairColor)
    articleElement.appendChild(pEyeColor)
    articleElement.appendChild(pHeight)

    sectionElement.appendChild(articleElement)
    getData(homeworld, renderWorld)
}

function renderWorld(planet) {

    removeAllChildNodes(worldContentElement)

    let name = planet.name;
    let diameter = planet.diameter;
    let terrain = planet.terrain;
    let population = planet.population;

    const planetArticleElement = document.createElement("article")
    const h1Describe = document.createElement("h1")
    const planeth2Name = document.createElement("h2")
    const pDiameter = document.createElement("p")
    const pTerrain = document.createElement("p")
    const pPopulation = document.createElement("p")

    h1Describe.textContent = "Homeworld:";
    planeth2Name.textContent = name;
    pDiameter.textContent = `Diameter: ${diameter}`;
    pTerrain.textContent = `Terrain: ${terrain}`;
    pPopulation.textContent = `Population: ${population}`;

    planetArticleElement.appendChild(h1Describe)
    planetArticleElement.appendChild(planeth2Name)
    planetArticleElement.appendChild(pDiameter)
    planetArticleElement.appendChild(pTerrain)
    planetArticleElement.appendChild(pPopulation)

    worldContentElement.appendChild(planetArticleElement)
}