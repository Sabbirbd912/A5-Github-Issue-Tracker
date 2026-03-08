
const allFilterBtn = document.getElementById("all-filter-btn")
const openedFilterBtn = document.getElementById("opened-filter-btn")
const closedFilterBtn = document.getElementById("closed-filter-btn")


// function toggleStyle(id){
//     allFilterBtn.classList.add('btn-primary', 'text-white');
//     openedFilterBtn.classList.add('btn-primary', 'text-white');
//     closedFilterBtn.classList.add('btn-primary', 'text-white');

//     allFilterBtn.classList.remove('btn-secondary', 'text-black');
//     openedFilterBtn.classList.remove('btn-secondary', 'text-black');
//     closedFilterBtn.classList.remove('btn-secondary', 'text-black');

//     const selectedBtn=document.getElementById(id);

//     selectedBtn.classList.remove('btn-primary', 'text-white');
//     selectedBtn.classList.add('btn-secondary', 'text-black');
// }

function toggleStyle(id) {
    // ১. সব বাটন থেকে স্পেশাল স্টাইল রিমুভ করে ডিফল্ট স্টাইল দিন
    const buttons = [allFilterBtn, openedFilterBtn, closedFilterBtn];

    buttons.forEach(btn => {
        btn.classList.remove('btn-secondary', 'text-black');
        btn.classList.add('btn-primary', 'text-white');
    });

    // ২. সিলেক্টেড বাটনটিতে আলাদা স্টাইল দিন
    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.add('btn-secondary', 'text-black');
    selectedBtn.classList.remove('btn-primary', 'text-white');
}


async function getData() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
}
getData()