class Clipboard {
    constructor(email) {
        this.email = email
        this.button = document.querySelector(".copy-email")
        if (this.button) {
            this.button.addEventListener(
                "click",
                this.copyToClipboard.bind(this)
            )
        }
    }

    copyToClipboard() {
        if (!this.button) {
            return // Button element not found, exit the function
        }
        navigator.clipboard
            .writeText(this.email)
            .then(() => {
                this.updateButtonText("email address copied!")
                setTimeout(() => {
                    this.updateButtonText(
                        `reach out to me via email <svg class="icon icon--copy" role="img" aria-hidden="true">
                        <use xlink:href="#svg-copy"></use></svg>`
                    )
                }, 1500)
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error)
            })
    }

    updateButtonText(text) {
        if (this.button) {
            const span = document.createElement("span")
            span.innerHTML = text
            this.button.innerHTML = "" // Clear existing content
            this.button.appendChild(span)
        }
    }
}

const clipboard = new Clipboard("afnizarhilmi@gmail.com")
