let contextSW = '/ERGJ_PWA_U2_T2/sw.js'
let url = window.location.href

let player = $('#player')
let btncamera = $('#btncamera')
let btncameraback = $('#btncameraback')
let btntakephoto = $('#btntakephoto')

let photouser = $('#photouser')

const camera = new Camera(player[0])

btncamera.on('click', () => {
    console.log('Camera front')
    photouser = "Camara Frontal"
    camera.btncamera_on()
    .then( res => {
        if (!res) {
            alert('Error al iniciar la camara')
        }
    })
})

btncameraback.on('click', () => {
    console.log('Camera back')
    photouser = "Camara Posterior"
    camera.btncameraback_on()
    .then( res => {
        if (!res) {
            alert('Error al iniciar la camara')
        }
    })
})

btntakephoto.on('click', () => {
    console.log('Camera off')
    camera.camera_off()
    let photo = camera.take_photo()
    let img = create_img_node(photo, photouser)
    $('#photo_list').append(img)
})

function create_img_node(image, photouser) {

    let card = $(`
    <div class="mx-auto py-5">
        <img class="mx-auto rounded" style="width: 300px; height: 300px;" src="${image}">
        <h1 class="text-2xl font-thin pt-3 text-center">${photouser}</h1>
    </div>
    `)
    return card
}

if (navigator.serviceWorker) {
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        contextSW = '/sw.js'
    }
    navigator.serviceWorker.register(contextSW);
}