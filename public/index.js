const convertHtmlToPdf = async (index) => {
  // Fetch the template HTML content
  const response = await fetch("uverenie/index.html");
  const templateHtml = await response.text();

  const modifiedHtml = templateHtml.replace("{{index}}", index);

  const container = document.createElement("div");
  container.innerHTML = modifiedHtml;

  // Modifying the file
  if (index) {
    const response = await fetch(`http://localhost:3000/students/${index}`);
    const student = await response.json();

    const response2 = await fetch(
      `http://localhost:3000/students/${index}/subjects`
    );
    const subjects = await response2.json();

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();

    const together = [currentDay, currentMonth, currentYear].join("/");

    container.querySelector("#name").innerText = student.name;
    container.querySelector("#index").innerText = index;
    container.querySelector("#random-number").innerText =
      Math.floor(Math.random() * 1000) + 100;
    container.querySelector("#email").innerText = student.email;
    container.querySelector("#number").innerText = subjects.length;
    container.querySelector("#date").innerText = together;
    container.querySelector("#dean").innerText = "проф. д-р Сашо Коцески";

    let ekt = 0;
    let a = 0;

    subjects.forEach((subject) => {
      a++;
      const row = document.createElement("tr");

      const column = document.createElement("td");
      const column2 = document.createElement("td");
      const column3 = document.createElement("td");
      const column4 = document.createElement("td");
      const column5 = document.createElement("td");

      column.innerHTML = a;
      column2.innerHTML = subject.ime;
      column3.innerHTML = subject.ocenka;
      column5.innerHTML = subject.krediti;

      row.appendChild(column);
      row.appendChild(column2);
      row.appendChild(column3);
      row.appendChild(column4);
      row.appendChild(column5);

      let ocenka = "";

      if (subject.ocenka == 6) {
        ocenka = "Шест";
      } else if (subject.ocenka == 7) {
        ocenka = "Седум";
      } else if (subject.ocenka == 8) {
        ocenka = "Осум";
      } else if (subject.ocenka == 9) {
        ocenka = "Девет";
      } else {
        ocenka = "Десет";
      }

      column4.innerHTML = ocenka;

      container.querySelector("#subjects").appendChild(row);

      ekt = ekt + subject.krediti * 1;
    });

    container.querySelector("#ekt").innerHTML = ekt;
  }

  // Convert the modified HTML to PDF using html2pdf library
  const opt = {
    margin: 1,
    filename: `Uverenie_${index}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const pdfBlob = await html2pdf().set(opt).from(container).output("blob");
  const url = URL.createObjectURL(pdfBlob);
  return url;
};

// Selecting the Uverenie from dropdown menu
let addedRow = null;
let link = null;

document.getElementById("requestType").addEventListener("change", (event) => {
  event.preventDefault();

  if (addedRow) {
    addedRow.remove();
    addedRow = null;
  }

  if (link) {
    link.remove();
    link = null;
  }

  if (event.target.value === "uverenie") {
    const form = document.querySelector(".form-container form");

    addedRow = document.createElement("div");
    addedRow.className = "form-row";

    const newInput1 = document.createElement("input");
    newInput1.type = "text";
    newInput1.id = "searchInput";
    newInput1.placeholder = "Број на индекс";

    const newInput2 = document.createElement("input");
    newInput2.type = "submit";
    newInput2.value = "Submit";

    addedRow.appendChild(newInput1);
    addedRow.appendChild(newInput2);

    form.appendChild(addedRow);

    newInput2.addEventListener("click", async (event) => {
      event.preventDefault();
      const index = newInput1.value;
      if (link) {
        link.remove();
        link = null;
      }
      if (index) {
        try {
          const response = await fetch(
            `http://localhost:3000/students/${index}`
          );
          const student = await response.json();
          if (student && student.index && index.length > 3) {
            try {
              const pdfUrl = await convertHtmlToPdf(index);
              if (link) {
                link.remove();
                link = null;
              }
              link = document.createElement("a");
              link.innerHTML = "Преземи документ";
              link.href = pdfUrl;
              link.setAttribute("download", `Uverenie_${index}.pdf`);

              form.append(link);
            } catch (error) {
              console.error("Error generating PDF:", error);
              alert("Проблем при креирање на PDF документот!");
            }
          } else {
            alert("Не постои студент со тој број на индекс!");
          }
        } catch (error) {
          // Handle any error that occurred during the fetch
          console.log(error);
          alert("Грешка при преземање на студентот!");
        }
      }
    });
  }
});
