<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ionic Responsive Layout</title>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" />
  <style>
    html, body, ion-app, ion-content {
      height: 100%;
    }

    .menu-content {
      display: flex;
      height: 100%;
    }

    .desktop-menu {
      width: 30%;
      height: 100%;
      overflow-y: auto;
    }

    .desktop-content {
      width: 70%;
      overflow-y: auto;
    }

    .accordion-section {
      border-bottom: 1px solid #ccc;
    }

    .accordion-header {
      width: 100%;
      background: #f0f0f0;
      padding: 10px;
      text-align: left;
      border: none;
      font-weight: bold;
    }

    .accordion-content {
      padding-left: 10px;
      display: none;
    }

    .accordion-content.active {
      display: block;
    }

    @media (max-width: 767px) {
      .desktop-menu {
        display: none;
      }

      .desktop-content {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <ion-app>
    <ion-menu content-id="main-content" side="start" menu-id="main" type="overlay">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content id="mobile-menu-content">
        <!-- Accordion will be injected here -->
      </ion-content>
    </ion-menu>

    <div class="ion-page" id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button autoHide="false"></ion-menu-button>
          </ion-buttons>
          <ion-title>Responsive App</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="menu-content">
          <div class="desktop-menu ion-hide-md-down" id="desktop-menu-content">
            <!-- Accordion will also be injected here -->
          </div>
          <div class="desktop-content">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <h2>Main Content Area</h2>
                  <div id="display"></div>

                  <!-- Hidden content source -->
                  <div id="content" style="display:none">
                    <p class="Heading">Section 1</p>
                    <p class="Sub-Heading">Topic 1.1</p>
                    <p>Details for topic 1.1...</p>
                    <p class="Sub-Heading">Topic 1.2</p>
                    <p>Details for topic 1.2...</p>
                    <p class="Heading">Section 2</p>
                    <p class="Sub-Heading">Topic 2.1</p>
                    <p>Details for topic 2.1...</p>
                    <p class="Sub-Heading">Topic 2.2</p>
                    <p>Details for topic 2.2...</p>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar color="dark">
          <ion-title size="small">Footer - Fixed</ion-title>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-app>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const contentDiv = document.getElementById("content");
      const displayDiv = document.getElementById("display");
      const mobileMenu = document.getElementById("mobile-menu-content");
      const desktopMenu = document.getElementById("desktop-menu-content");

      const paragraphs = Array.from(contentDiv.querySelectorAll("p"));
      let currentAccordionMobile = null;
      let currentAccordionDesktop = null;
      let subHeadingCount = 0;

      function toHindiNumber(num) {
        const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return String(num).split('').map(d => hindiDigits[parseInt(d)]).join('');
      }

      function createSection(title) {
        const section = document.createElement("div");
        section.className = "accordion-section";

        const header = document.createElement("button");
        header.className = "accordion-header";
        header.textContent = title;
        header.onclick = function () {
          this.nextElementSibling.classList.toggle("active");
        };

        const content = document.createElement("div");
        content.className = "accordion-content";

        section.appendChild(header);
        section.appendChild(content);
        return { section, content };
      }

      paragraphs.forEach((p, index) => {
        if (p.classList.contains("Heading")) {
          const mobileSec = createSection(p.textContent);
          mobileMenu.appendChild(mobileSec.section);
          currentAccordionMobile = mobileSec.content;

          const desktopSec = createSection(p.textContent);
          desktopMenu.appendChild(desktopSec.section);
          currentAccordionDesktop = desktopSec.content;

          subHeadingCount = 0;
        } else if (p.classList.contains("Sub-Heading")) {
          subHeadingCount++;
          const text = `${toHindiNumber(subHeadingCount)}. ${p.textContent}`;

          [currentAccordionMobile, currentAccordionDesktop].forEach(container => {
            const item = document.createElement("p");
            item.className = "Sub-Heading";
            item.textContent = text;
            item.addEventListener("click", function () {
              displayDiv.innerHTML = "";

              const startIndex = paragraphs.indexOf(p);
              let endIndex = paragraphs.length;

              for (let i = startIndex + 1; i < paragraphs.length; i++) {
                const next = paragraphs[i];
                if (next.classList.contains("Heading") || next.classList.contains("Sub-Heading")) {
                  endIndex = i;
                  break;
                }
              }

              for (let i = startIndex; i < endIndex; i++) {
                const clone = paragraphs[i].cloneNode(true);
                displayDiv.appendChild(clone);
              }
            });
            container && container.appendChild(item);
          });
        }
      });
    });
  </script>
</body>

</html>