
// Block new tabs and auto-close them
window.open = function() { alert("New tabs are blocked!"); return null; };
setInterval(() => { for (let win of window.openedWindows || []) { if (!win.closed) win.close(); } }, 500);

// Prevent popups
document.addEventListener("click", function(event) {
    if (event.target.tagName === "A" && event.target.target === "_blank") {
        event.preventDefault();
        alert("Popups are blocked!");
    }
});

// Load sites in fullscreen iframe and hide the main UI
function loadSite(url) {
    document.getElementById("header").style.display = "none";
    document.querySelector(".container").style.display = "none";
    document.getElementById("iframe-container").style.display = "block";
    document.getElementById("siteFrame").src = url;
}

// Perform Google search to check if the movie exists on any listed site
function searchSites() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let sites = [
        "movixo.info", "123moviestan.com", "andyday.tv/movie", "animeshqip.org",
        "movies4u.lc", "5movierulz.food"
    ];

    document.querySelectorAll(".site-box").forEach(box => box.classList.remove("highlight"));

    if (query.length > 2) {
        sites.forEach((site, index) => {
            let searchUrl = `https://www.google.com/search?q=site:${site}+${query}`;
            fetch(searchUrl).then(response => {
                if (response.ok) {
                    document.querySelectorAll(".site-box")[index].classList.add("highlight");
                }
            }).catch(error => console.log("Search failed:", error));
        });
    }
}
