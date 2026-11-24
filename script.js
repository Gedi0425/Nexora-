const contactLink = document.querySelector("[data-save-contact]");
const announcement = document.querySelector(".announcement");
let announcementTimeout;

function showAnnouncement(message) {
  announcement.textContent = message;
  announcement.classList.add("is-visible");
  window.clearTimeout(announcementTimeout);
  announcementTimeout = window.setTimeout(() => {
    announcement.classList.remove("is-visible");
  }, 2400);
}

contactLink.addEventListener("click", (event) => {
  event.preventDefault();
  const contact = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Nexora Digital Solution",
    "ORG:Nexora Digital Solution",
    "TEL;TYPE=WORK,VOICE:+251962535267",
    "EMAIL:fitsumbekele162@gmail.com",
    "ADR;TYPE=WORK:;;Adama;Oromia;;;Ethiopia",
    "END:VCARD",
  ].join("\r\n");
  const file = new Blob([contact], { type: "text/vcard;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = "nexora-contact.vcf";
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  showAnnouncement("Contact card downloaded.");
});

async function copyText(value) {
  let clipboardError;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch (error) {
      clipboardError = error;
    }
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();

  if (!copied) {
    if (clipboardError) {
      throw clipboardError;
    }

    throw new Error("Clipboard copy was not available.");
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copy);
      showAnnouncement("Account number copied.");
    } catch (error) {
      console.error("Could not copy the account number.", error);
      showAnnouncement("Could not copy. Please select the number and try again.");
    }
  });
});
