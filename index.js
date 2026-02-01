const visualizer = document.getElementById("visualizer");
const resetBtn = document.getElementById("resetBtn");
const runBtn = document.getElementById("runBtn");
const speedInput = document.getElementById("speed");
const algoSelect = document.getElementById("algoSelect");

// Algorithm Data for Descriptions
const algoData = {
    bubble: {
        title: "Bubble Sort",
        time: "O(n²)", space: "O(1)",
        desc: "Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order. Small elements 'bubble' to the top."
    },
    selection: {
        title: "Selection Sort",
        time: "O(n²)", space: "O(1)",
        desc: "Selection Sort finds the minimum element from the unsorted part and puts it at the beginning. It makes fewer swaps than bubble sort."
    },
    insertion: {
        title: "Insertion Sort",
        time: "O(n²)", space: "O(1)",
        desc: "Insertion Sort builds a sorted array one element at a time. It is very efficient for small datasets and nearly sorted lists."
    }
};

// 1. Generate Bars
function generateArray() {
    visualizer.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        let val = Math.floor(Math.random() * 300) + 20;
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${val}px`;
        visualizer.appendChild(bar);
    }
}

// 2. Utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 3. Algorithms
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.background = "var(--secondary)";
            let h1 = parseInt(bars[j].style.height);
            let h2 = parseInt(bars[j+1].style.height);
            if (h1 > h2) {
                await sleep(201 - speedInput.value);
                bars[j].style.height = `${h2}px`;
                bars[j+1].style.height = `${h1}px`;
            }
            bars[j].style.background = "var(--primary)";
        }
        bars[bars.length - i - 1].style.background = "var(--success)";
    }
}

async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length; i++) {
        let min = i;
        bars[i].style.background = "yellow";
        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.background = "var(--secondary)";
            await sleep(201 - speedInput.value);
            if (parseInt(bars[j].style.height) < parseInt(bars[min].style.height)) {
                if (min !== i) bars[min].style.background = "var(--primary)";
                min = j;
                bars[min].style.background = "yellow";
            } else {
                bars[j].style.background = "var(--primary)";
            }
        }
        let temp = bars[i].style.height;
        bars[i].style.height = bars[min].style.height;
        bars[min].style.height = temp;
        bars[min].style.background = "var(--primary)";
        bars[i].style.background = "var(--success)";
    }
}

async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    for (let i = 1; i < bars.length; i++) {
        let key = bars[i].style.height;
        let j = i - 1;
        bars[i].style.background = "var(--secondary)";
        await sleep(201 - speedInput.value);
        while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)) {
            bars[j+1].style.height = bars[j].style.height;
            j--;
            await sleep(201 - speedInput.value);
            for(let k=0; k<=i; k++) bars[k].style.background = "var(--success)";
        }
        bars[j+1].style.height = key;
    }
}

// 4. Listeners
algoSelect.addEventListener("change", () => {
    const data = algoData[algoSelect.value];
    document.getElementById("algo-title").innerText = data.title;
    document.getElementById("time-complexity").innerText = `Time: ${data.time}`;
    document.getElementById("space-complexity").innerText = `Space: ${data.space}`;
    document.getElementById("algo-description").innerText = data.desc;
});

runBtn.addEventListener("click", async () => {
    runBtn.disabled = resetBtn.disabled = algoSelect.disabled = true;
    if (algoSelect.value === "bubble") await bubbleSort();
    if (algoSelect.value === "selection") await selectionSort();
    if (algoSelect.value === "insertion") await insertionSort();
    runBtn.disabled = resetBtn.disabled = algoSelect.disabled = false;
});

resetBtn.addEventListener("click", generateArray);
generateArray(); // Initial setup
