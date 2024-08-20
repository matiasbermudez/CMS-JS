
function fetchData() {
    return fetch('https://cdn.contentful.com/spaces/ubfx0j7r9chh/environments/master/entries?access_token="AgregarApiKeyACA"')
        .then(response => { return response.json() })
        .then(result => { return result })
}
function crearEl(data, urlImagen) {
    const contenedor = document.querySelector('.contenedor')

    const liEl = document.createElement('li')

    const imgEl = document.createElement('img')//CREO IMG
    imgEl.src = `https://${urlImagen}`
    imgEl.classList.add('imagen-cards')
    liEl.appendChild(imgEl)

    const divEl = document.createElement('div')
    const h3El = document.createElement('h3') //CREO H3
    h3El.textContent = data.title
    divEl.appendChild(h3El)

    const pEl = document.createElement('p')//CREO P
    pEl.textContent = data.descripcion
    divEl.appendChild(pEl)

    const aEl = document.createElement('a')//CREO A
    aEl.href = data.url.content[0].content[0].value
    aEl.target = "_blank"
    aEl.textContent = 'Ver mas'

    liEl.appendChild(divEl)

    liEl.appendChild(aEl)
    contenedor.appendChild(liEl)
}

function fetchImg(data) {
    
    const spaceId = data.sys.space.sys.id;
    const environmentId = "master";
    const assetId = data.fields.imagen.sys.id;
    const accessToken = "agregarApiKeyAca";

    return fetch(`https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/assets/${assetId}?access_token=${accessToken}`)
        .then(response => {return response.json()})
        .then(data => {
            console.log("data fetch img ",data)
            const imageUrl = data.fields.file.url;
            return imageUrl
        })
}

function main() {

    //LA IMAGEN AL SER DEL TIPO Asset DEBO HACER OTRA CONSULTA CON LOS DATOS QUE ME TRAE LA PRIMERA CONSULTA COMO EL SPACEID Y EL ASSETID
    fetchData().then((data) => {
        const iterable = data.items
        iterable.forEach(element => {
            fetchImg(element).then(urlImagen => {
                crearEl(element.fields, urlImagen)
            })
        });
    })
}
main();

// <li>
// <img src="" alt="">
// <div>
//     <h3></h3>
//     <p></p>
//     <a href=""></a>
// </div>
// </li>