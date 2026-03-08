let openedCard = [];
let closedCard = [];
let currentStatus = "all-filter-btn"

let countStatusDisplay = document.getElementById("count-status")


const allFilterBtn = document.getElementById("all-filter-btn")
const openedFilterBtn = document.getElementById("opened-filter-btn")
const closedFilterBtn = document.getElementById("closed-filter-btn")



function toggleStyle(id) {
  const buttons = [allFilterBtn, openedFilterBtn, closedFilterBtn];

  buttons.forEach(btn => {
    btn.classList.remove('btn-primary', 'text-white');
    btn.classList.add('btn-gray,', 'text-neutral');
  });

  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.add('btn-primary', 'text-white');
  selectedBtn.classList.remove('btn-gray,', 'text-neutral');
}


async function loadIssuesData() {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  const response = await fetch(url);
  const results = await response.json();
  displayIssuesData(results.data);
}

loadIssuesData()

const displayIssuesData = (issues) => {
  const cardContainer = document.getElementById("cards-container");
  // console.log(cardContainer.innerText);
  cardContainer.innerHTML = "";

  issues.forEach(issue => {
    const issueCard = document.createElement("div");
    issueCard.className = "bg-base-100 shadow-sm rounded-md border-t-2 border-bl ";

    issueCard.innerHTML = `
            <div class="h-[320px] space-y-4 p-4">
              <div class="flex items-center justify-between py-1">
                <img src="${issue.status === 'open' ? 'assets/img/Open-Status.png' : 'assets/img/Closed-Status.png'}" alt="" />
                <div class="badge badge-dash ${issue.priority === 'high' ? 'badge-secondary' : 'badge-error'} capitalize">${issue.priority}</div>
              </div>
              <h2 class="text-xl font-bold">
                ${issue.title}
              </h2>
              <p class="text-[#64748B] line-clamp-2">
                ${issue.description}
              </p>
              <div class="flex items-center justify-start">         
                ${issue.labels.map(label => `<div class="badge badge-soft badge-warning capitalize">${label}</div>`).join('')}
              </div>
              <div class="flex-grow border-t border-gray-300"></div>
              <div class="flex items-center justify-start">
                    <p class="text-[#64748B] "># ${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B] m-auto">${new Date(issue.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
        `
    cardContainer.appendChild(issueCard);
  })
}