
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
  