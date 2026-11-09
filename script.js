// ==========================================
// CONFIGURAÇÃO DA VYRON
// ==========================================

// Coloque o número da empresa com código do país.
// Exemplo: 5511999999999
const WHATSAPP_NUMBER = "5511999999999";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const bookingForm = document.getElementById("bookingForm");
const whatsappFloat = document.getElementById("whatsappFloat");
const dateInput = document.getElementById("date");

// Data mínima: hoje
const today = new Date();
const localDate = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localDate;

// Menu mobile
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("active");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Preencher serviço automaticamente ao clicar nos cards
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const service = link.dataset.service;
    document.getElementById("service").value = service;
  });
});

// Máscara simples de telefone
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (value.length > 0) {
    value = value.replace(/^(\d*)/, "($1");
  }

  event.target.value = value;
});

// Envio do agendamento para WhatsApp
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    alert("Configure o número de WhatsApp da VYRON no arquivo script.js.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const vehicle = document.getElementById("vehicle").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value.trim();

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  const whatsappMessage = `
Olá! Gostaria de solicitar um agendamento na VYRON.

*DADOS DO CLIENTE*
Nome: ${name}
WhatsApp: ${phone}

*DADOS DO VEÍCULO*
Veículo: ${vehicle}

*AGENDAMENTO*
Serviço: ${service}
Data desejada: ${formattedDate}
Horário desejado: ${time}

*OBSERVAÇÕES*
${message || "Nenhuma observação."}

Aguardo a confirmação. Obrigado!
  `.trim();

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Botão flutuante do WhatsApp
whatsappFloat.addEventListener("click", (event) => {
  event.preventDefault();

  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    alert("Configure o número de WhatsApp da VYRON no arquivo script.js.");
    return;
  }

  const message = encodeURIComponent(
    "Olá! Conheci a VYRON pelo site e gostaria de saber mais sobre os serviços."
  );

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    "_blank",
    "noopener,noreferrer"
  );
});