const $ = selector => document.querySelector(selector);

const $$ = selector =>
document.querySelectorAll(selector);

/* =========================
DATOS DEMO
========================= */

const STORAGE_KEY = "rodol_wallet_demo_v1";

let data = JSON.parse(
localStorage.getItem(STORAGE_KEY) || "null"
) || {

customers: [

{
  id: "CLI-001",
  name: "Cliente VIP",
  phone: "24803668",
  points: 1250,
  card: "•••• 2480"
},

{
  id: "CLI-002",
  name: "María López",
  phone: "00000000",
  points: 430,
  card: "•••• 1132"
}

],

cards: [

{
  id: "CARD-001",
  customer: "CLI-001",
  status: "Activa",
  points: 1250
},

{
  id: "CARD-002",
  customer: "CLI-002",
  status: "Activa",
  points: 430
}

],

offers: [

{
  code: "LAUREL10",
  title: "10% de descuento",
  desc: "Descuento para clientes frecuentes.",
  expires: "31/08/2026"
},

{
  code: "DOBLEPTS",
  title: "Puntos dobles",
  desc: "Acumula el doble durante la promoción.",
  expires: "15/08/2026"
}

],

pointsHistory: [

{
  customer: "Cliente VIP",
  amount: 100,
  reason: "Compra",
  date: "Hoy, 16:40"
},

{
  customer: "María López",
  amount: 50,
  reason: "Compra",
  date: "Hoy, 15:12"
}

],

notifications: [

{
  title: "🔥 Bienvenido",
  message:
    "Gracias por formar parte de nuestro programa.",
  date: "Hoy"
}

],

apiKey:
"rw_demo_" +
Math.random()
.toString(36)
.slice(2, 26)

};

/* =========================
GUARDAR DATOS
========================= */

function save(){

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(data)
);

renderAll();
}

/* =========================
MENSAJES
========================= */

function toast(message){

const element = $("#toast");

element.textContent = message;

element.classList.add("show");

setTimeout(() => {

element.classList.remove("show");

}, 2200);

}

/* =========================
NAVEGACIÓN
========================= */

function showSection(id){

$$(".section").forEach(section => {

section.classList.toggle(
  "active",
  section.id === id
);

});

$$(".nav-item").forEach(button => {

button.classList.toggle(
  "active",
  button.dataset.section === id
);

});

const names = {

dashboard: "Dashboard",

cards: "Tarjetas",

customers: "Clientes",

points: "Puntos",

offers: "Cupones",

notifications:
  "Cuñas y notificaciones",

api: "API"

};

$("#pageTitle").textContent =
names[id] || "Dashboard";

window.scrollTo(0, 0);

$("#sidebar").classList.remove("open");

}

$$("[data-section]").forEach(button => {

button.addEventListener(
"click",
() => showSection(
button.dataset.section
)
);

});

$("#menuBtn").onclick = () => {

$("#sidebar").classList.toggle(
"open"
);

};

/* =========================
DASHBOARD
========================= */

function renderDashboard(){

$("#statCustomers").textContent =
data.customers.length;

$("#statCards").textContent =
data.cards.length;

$("#statPoints").textContent =
data.customers
.reduce(
(total, customer) =>
total + customer.points,
0
)
.toLocaleString();

$("#statOffers").textContent =
data.offers.length;

$("#previewPoints").textContent =
(
data.customers[0]?.points || 0
).toLocaleString();

$("#notifBadge").textContent =
data.notifications.length;

}

/* =========================
ACTIVIDAD
========================= */

function renderActivity(){

const history =
[...data.pointsHistory]
.reverse()
.slice(0, 6);

$("#activity").innerHTML =
history.length

  ? history.map(item => `

    <div class="activity-item">

      <div class="activity-icon">
        ⭐
      </div>

      <div class="activity-text">

        <strong>
          ${item.customer}
        </strong>

        <small>
          ${item.reason} · ${item.date}
        </small>

      </div>

      <span class="activity-points">
        ${item.amount > 0 ? "+" : ""}
        ${item.amount}
      </span>

    </div>

  `).join("")

  : "<p>No hay actividad todavía.</p>";

}

/* =========================
TARJETAS
========================= */

function renderCards(){

$("#cardsList").innerHTML = `

<table class="table">

  <thead>

    <tr>

      <th>ID</th>
      <th>Cliente</th>
      <th>Puntos</th>
      <th>Estado</th>
      <th></th>

    </tr>

  </thead>

  <tbody>

    ${data.cards.map(card => {

      const customer =
        data.customers.find(
          item =>
            item.id === card.customer
        );

      return `

        <tr>

          <td>
            ${card.id}
          </td>

          <td>
            ${customer?.name || "—"}
          </td>

          <td>
            <b>
              ${card.points.toLocaleString()}
            </b>
          </td>

          <td>

            <span class="badge">
              ${card.status}
            </span>

          </td>

          <td>

            <button
              class="secondary"
              onclick="walletDemo()"
            >
              Wallet
            </button>

          </td>

        </tr>

      `;

    }).join("")}

  </tbody>

</table>

`;

}

/* =========================
CLIENTES
========================= */

function renderCustomers(){

$("#customersList").innerHTML = `

<table class="table">

  <thead>

    <tr>

      <th>ID</th>
      <th>Cliente</th>
      <th>Teléfono</th>
      <th>Puntos</th>

    </tr>

  </thead>

  <tbody>

    ${data.customers.map(customer => `

      <tr>

        <td>
          ${customer.id}
        </td>

        <td>
          <b>
            ${customer.name}
          </b>
        </td>

        <td>
          ${customer.phone || "—"}
        </td>

        <td>
          ${customer.points.toLocaleString()}
          ⭐
        </td>

      </tr>

    `).join("")}

  </tbody>

</table>

`;

}

/* =========================
HISTORIAL DE PUNTOS
========================= */

function renderPoints(){

$("#pointsHistory").innerHTML =

data.pointsHistory.length

  ? [...data.pointsHistory]
      .reverse()
      .map(item => `

        <div class="activity-item">

          <div class="activity-icon">
            ⭐
          </div>

          <div class="activity-text">

            <strong>
              ${item.customer}
            </strong>

            <small>
              ${item.reason}
              ·
              ${item.date}
            </small>

          </div>

          <span class="activity-points">
            ${item.amount > 0 ? "+" : ""}
            ${item.amount}
          </span>

        </div>

      `).join("")

  : "<p>No hay movimientos.</p>";

}

/* =========================
CUPONES
========================= */

function renderOffers(){

$("#offersGrid").innerHTML =

data.offers.map(offer => `

  <div class="offer">

    <div class="offer-code">
      ${offer.code}
    </div>

    <h3>
      ${offer.title}
    </h3>

    <p>
      ${offer.desc}
    </p>

    <small>
      Vence:
      ${offer.expires}
    </small>

  </div>

`).join("");

}

/* =========================
NOTIFICACIONES
========================= */

function renderNotifications(){

$("#notificationsList").innerHTML =

data.notifications.length

  ? [...data.notifications]
      .reverse()
      .map(notification => `

        <div class="activity-item">

          <div class="activity-icon">
            📢
          </div>

          <div class="activity-text">

            <strong>
              ${notification.title}
            </strong>

            <small>
              ${notification.message}
              ·
              ${notification.date}
            </small>

          </div>

        </div>

      `).join("")

  : "<p>No hay cuñas.</p>";

}

/* =========================
SELECT DE CLIENTES
========================= */

function fillCustomerSelect(){

$("#pointCustomer").innerHTML =
data.customers.map(customer => `

  <option value="${customer.id}">

    ${customer.name}
    —
    ${customer.points}
    pts

  </option>

`).join("");

}

/* =========================
MODAL
========================= */

function openModal(title, body){

$("#modalTitle").textContent =
title;

$("#modalBody").innerHTML =
body;

$("#modal").classList.add("open");

}

$("#closeModal").onclick = () => {

$("#modal").classList.remove(
"open"
);

};

$("#modal").onclick = event => {

if(event.target.id === "modal"){

$("#modal").classList.remove(
  "open"
);

}

};

/* =========================
NUEVO CLIENTE
========================= */

$("#newCustomerBtn").onclick = () => {

openModal(

"Nuevo cliente",

`

  <div class="form-panel">

    <label>

      Nombre

      <input
        id="mName"
        placeholder="Nombre del cliente"
      >

    </label>


    <label>

      Teléfono

      <input
        id="mPhone"
        placeholder="Teléfono"
      >

    </label>


    <button
      class="primary"
      onclick="createCustomer()"
    >
      Crear cliente
    </button>

  </div>

`

);

};

window.createCustomer = () => {

const name =
$("#mName").value.trim();

if(!name){

toast("Escribe un nombre");

return;

}

const id =
"CLI-" +
String(
data.customers.length + 1
).padStart(3, "0");

data.customers.push({

id,

name,

phone:
  $("#mPhone").value,

points:0,

card:
  "•••• " +
  Math.floor(
    1000 +
    Math.random() * 9000
  )

});

data.cards.push({

id:
  "CARD-" +
  String(
    data.cards.length + 1
  ).padStart(3, "0"),

customer:id,

status:"Activa",

points:0

});

$("#modal").classList.remove(
"open"
);

save();

toast("Cliente creado");

};

/* =========================
NUEVA TARJETA
========================= */

$("#newCardBtn").onclick = () => {

openModal(

"Nueva tarjeta",

`

  <div class="form-panel">

    <label>

      Cliente

      <select id="mCardCustomer">

        ${data.customers.map(
          customer => `

            <option
              value="${customer.id}"
            >

              ${customer.name}

            </option>

          `
        ).join("")}

      </select>

    </label>


    <button
      class="primary"
      onclick="createCard()"
    >

      Crear tarjeta

    </button>

  </div>

`

);

};

window.createCard = () => {

const id =
"CARD-" +
String(
data.cards.length + 1
).padStart(3, "0");

const customer =
$("#mCardCustomer").value;

const user =
data.customers.find(
item =>
item.id === customer
);

data.cards.push({

id,

customer,

status:"Activa",

points:
  user?.points || 0

});

$("#modal").classList.remove(
"open"
);

save();

toast("Tarjeta creada");

};

/* =========================
NUEVO CUPÓN
========================= */

$("#newOfferBtn").onclick = () => {

openModal(

"Crear cupón",

`

  <div class="form-panel">

    <label>

      Título

      <input
        id="mOfferTitle"
        placeholder="10% de descuento"
      >

    </label>


    <label>

      Código

      <input
        id="mOfferCode"
        placeholder="LAUREL10"
      >

    </label>


    <label>

      Descripción

      <input
        id="mOfferDesc"
        placeholder="Descripción"
      >

    </label>


    <label>

      Vencimiento

      <input
        id="mOfferDate"
        type="date"
      >

    </label>


    <button
      class="primary"
      onclick="createOffer()"
    >

      Crear cupón

    </button>

  </div>

`

);

};

window.createOffer = () => {

const title =
$("#mOfferTitle")
.value
.trim();

if(!title){

toast("Escribe un título");

return;

}

data.offers.push({

title,

code:
  $("#mOfferCode").value ||
  "PROMO" +
  Date.now()
    .toString()
    .slice(-4),

desc:
  $("#mOfferDesc").value ||
  "Promoción especial",

expires:
  $("#mOfferDate").value ||
  "Sin fecha"

});

$("#modal").classList.remove(
"open"
);

save();

toast("Cupón creado");

};

/* =========================
PUNTOS
========================= */

function changePoints(sign){

const id =
$("#pointCustomer").value;

const amount =
parseInt(
$("#pointAmount").value
);

const reason =
$("#pointReason").value ||
"Movimiento";

if(!amount || amount < 1){

toast(
  "Indica una cantidad"
);

return;

}

const customer =
data.customers.find(
item =>
item.id === id
);

if(
sign < 0 &&
customer.points < amount
){

toast(
  "No hay suficientes puntos"
);

return;

}

customer.points +=
sign * amount;

const card =
data.cards.find(
item =>
item.customer === id
);

if(card){

card.points =
  customer.points;

}

data.pointsHistory.push({

customer:
  customer.name,

amount:
  sign * amount,

reason,

date:
  new Date()
    .toLocaleTimeString(
      [],
      {
        hour:"2-digit",
        minute:"2-digit"
      }
    )

});

save();

toast(
sign > 0
? "Puntos añadidos"
: "Puntos descontados"
);

}

$("#addPoints").onclick =
() => changePoints(1);

$("#removePoints").onclick =
() => changePoints(-1);

/* =========================
NUEVA CUÑA
========================= */

$("#sendNotif").onclick = () => {

const title =
$("#notifTitle")
.value
.trim();

const message =
$("#notifMessage")
.value
.trim();

if(!title || !message){

toast(
  "Completa título y mensaje"
);

return;

}

data.notifications.push({

title,

message,

date:"Ahora"

});

$("#notifTitle").value = "";

$("#notifMessage").value = "";

save();

toast(
"Cuña guardada"
);

};

/* =========================
API KEY
========================= */

$("#generateKey").onclick = () => {

data.apiKey =
"rw_live_" +
crypto
.randomUUID()
.replaceAll("-", "");

save();

toast(
"Nueva API Key generada"
);

};

$("#copyKey").onclick = () => {

if(
navigator.clipboard
){

navigator.clipboard
  .writeText(
    data.apiKey
  )
  .then(() => {

    toast(
      "API Key copiada"
    );

  });

}

};

/* =========================
WALLET
========================= */

function walletDemo(){

toast(
"Wallet: integración preparada para backend"
);

}

window.walletDemo =
walletDemo;

$$(".wallet").forEach(button => {

button.onclick =
walletDemo;

});

/* =========================
RESTABLECER DEMO
========================= */

$("#resetData").onclick = () => {

if(
confirm(
"¿Restablecer la demo?"
)
){

localStorage.removeItem(
  STORAGE_KEY
);

location.reload();

}

};

/* =========================
RENDER INICIAL
========================= */

function renderAll(){

renderDashboard();

renderCustomers();

renderCards();

renderPoints();

renderOffers();

renderNotifications();

renderActivity();

fillCustomerSelect();

}

renderAll();
