// Show message
export default function showMsg(text = "Success", type = 0) {
  let div = document.getElementById("message");
  let p = div.querySelector("p");
  p.textContent = text;

  if (type === 0) {
    div.style.borderBottom = "5px solid #40b834";
  } else if (type === 1) {
    div.style.borderBottom = "5px solid #cd822f";
  } else if (type === 2) {
    div.style.borderBottom = "5px solid #cd2f2f";
  }

  div.classList.add("active");

  setTimeout(() => {
    div.classList.remove("active");
  }, 1000);
}
