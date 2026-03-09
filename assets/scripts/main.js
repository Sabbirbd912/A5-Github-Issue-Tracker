
let allIssues = [];
const cardContainer = document.getElementById("cards-container");
const countStatusDisplay = document.getElementById("count-status");

const allFilterBtn = document.getElementById("all-filter-btn");
const openedFilterBtn = document.getElementById("opened-filter-btn");
const closedFilterBtn = document.getElementById("closed-filter-btn");

const loadSpinner = (isLoading) => {
  if (isLoading) {
    cardContainer.innerHTML = `
      <div class="col-span-full flex justify-center py-20">
        <span class="loading loading-spinner text-info"></span>
      </div>
    `
  }
}

async function loadIssuesData() {
  loadSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  const response = await fetch(url);
  const results = await response.json();
  allIssues = results.data;
  displayIssuesData(allIssues);
  toggleStyle('all-filter-btn');
}

loadIssuesData()

const displayIssuesData = (issues) => {

  cardContainer.innerHTML = "";
  countStatusDisplay.innerText = issues.length;

  issues.forEach(issue => {
    const issueCard = document.createElement("div");
    const borderColor = issue.status === 'open' ? 'border-green-500' : 'border-purple-600';

    issueCard.className = `bg-base-100 shadow-sm rounded-md border-t-4 ${borderColor} transition-all hover:shadow-md`;

    issueCard.innerHTML = `
            <div class="h-[320px] space-y-4 p-4" onclick="openModal(${issue.id})">
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
  });
}

function toggleStyle(id) {
  const buttons = [allFilterBtn, openedFilterBtn, closedFilterBtn];

  buttons.forEach(btn => {
    btn.classList.remove('btn-primary', 'text-white');
    btn.classList.add('btn-gray', 'text-neutral');
  });

  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.add('btn-primary', 'text-white');
  selectedBtn.classList.remove('btn-gray', 'text-neutral');

  if (id === 'all-filter-btn') {
    displayIssuesData(allIssues);
  } else if (id === 'opened-filter-btn') {
    const opened = allIssues.filter(item => item.status === 'open');
    displayIssuesData(opened);
  } else if (id === 'closed-filter-btn') {
    const closed = allIssues.filter(item => item.status === 'closed');
    displayIssuesData(closed);
  }
}


const issueModal=document.getElementById("issueModal");

async function openModal(issueId) {
  const modalContent = document.getElementById("modal-content");
  
  modalContent.innerHTML = "div";
  issueModal.showModal();

  const singleApiUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
  
    const res = await fetch(singleApiUrl);
    const results = await res.json();
    const issue = results.data;

    modalContent.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b pb-4">
          <div class="flex items-center gap-2">
             <img class="w-6" src="${issue.status === 'open' ? 'assets/img/Open-Status.png' : 'assets/img/Closed-Status.png'}" alt="" />
             <h2 class="text-2xl font-bold">${issue.title}</h2>
          </div>
          <div class="badge ${issue.priority === 'high' ? 'badge-error' : 'badge-warning'} capitalize">
            ${issue.priority}
          </div>
        </div>

        <p class="text-gray-600 text-lg">${issue.description}</p>
        
        <div class="flex flex-wrap gap-2">
          ${issue.labels.map(label => `<span class="badge badge-warning">${label}</span>`).join(" ")}
        </div>

        <div class="bg-gray-50 p-4 rounded-lg flex justify-between items-center text-sm">
          <div>
            <p class="font-semibold text-gray-500">Author</p>
            <p class="text-primary font-bold">${issue.author}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-500">Created At</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `;
}