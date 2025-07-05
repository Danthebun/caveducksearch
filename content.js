console.log("Tag Search: Tag Searcher extension loaded!");

// Inject the search bar into the DOM.
function injectSearchBar() {
  const parent = document.querySelector(".caveduck-tag-list");
  const nav = parent?.querySelector("nav");
  if (!parent || !nav) {
    console.warn("Tag Search: Could not find nav or parent!");
    return;
  }

  // Create the search bar element.
  const searchContainer = document.createElement("div");

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = "Search tags...";
  newInput.style.padding = "5px";
  newInput.style.width = "100%";

  let tagItems = Array.from(
    document.querySelectorAll(".caveduck-tag-list nav li")
  );

  newInput.addEventListener("input", (e) => {
    console.log("Tag Search: filtering for:" + newInput.value);
    const search = e.target.value.trim().toLowerCase();

    tagItems.forEach((li) => {
      const tagText = li.querySelector("a").textContent.toLowerCase();

      if (tagText.includes(search)) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  });

  searchContainer.appendChild(newInput);
  parent.insertBefore(searchContainer, nav);
  console.log("Tag Search: search bar injected");

  const navObserver = new MutationObserver(() => {
    console.log("Tag list changed — refreshing tag items!");
    tagItems = Array.from(
      document.querySelectorAll(".caveduck-tag-list nav li")
    );
  });

  // Start observing
  navObserver.observe(nav, {
    childList: true,
    subtree: true,
  });
}

// Wait for the tags section to load before adding the search bar.
const observer = new MutationObserver((mutations) => {
  const nav = document.querySelector(".caveduck-tag-list nav");
  if (nav) {
    console.log("Tag Search: Tag list nav found");
    observer.disconnect();
    injectSearchBar();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
