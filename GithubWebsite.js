document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    const footerYear = document.createElement("span");
    footerYear.textContent = ` ${new Date().getFullYear()}`;
    const copyright =
        document.querySelector("footer p:last-of-type");
    if (copyright)
        copyright.appendChild(footerYear);

    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = form.querySelector("input[name='email']").value.trim();
            const phone = form.querySelector("input[name='phone']").value.trim();
            const message = form.querySelector("textarea[name='message']").value.trim();

            let errors = [];

            if (!validateEmail(email)) {
                errors.push("Invalid email format.");
            }

            if (!validatePhone(phone)) {
                errors.push("Invalid phone number format. Use: 0911-222-3333");
            }

            if (message.length < 5) {
                errors.push("Message must be at least 5 characters long.");
            }

            if (errors.length > 0) {
                alert("Error(s):\n" + errors.join("\n"));
                return;
            }

            alert("Form successfully submitted!\nThank you for reaching out.");
            form.reset();
        });
    }

    const hero = document.querySelector(".hero");
    if (hero) {
        hero.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
        });
    }

    const colorPicker = form.querySelector("input[name='favcolor']");
    if (colorPicker) {
        colorPicker.addEventListener("input", () => {
            document.body.style.setProperty("--hair-color", colorPicker.value);
        });
    }

    const sections = document.querySelectorAll("main section, aside");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^09\d{2}-\d{3}-\d{4}$/;
        return re.test(phone);
    }

});
