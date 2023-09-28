import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger, Draggable)

document.addEventListener("DOMContentLoaded", function () {
	const typeSplit = new SplitType("[text-split]", {
		types: "words, chars",
		tagName: "span"
	})

	function createScrollTrigger(triggerElement, timeline) {
		ScrollTrigger.create({
			trigger: triggerElement,
			start: "top 90%",
			onEnter: () => timeline.play()
		})
	}

	function animateTextReveal(element) {
		const tl = gsap.timeline({ paused: true })
		const chars = element.querySelectorAll(".char")

		tl.from(chars, {
			yPercent: 100,
			duration: 0.3,
			ease: "power1.out",
			stagger: { amount: 0.6 }
		})

		createScrollTrigger(element, tl)
	}

	function animateSelectedWork(item) {
		const timeline = gsap.timeline({ paused: true })
		timeline.fromTo(
			item,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 0.4 }
		)

		ScrollTrigger.create({
			trigger: item,
			start: "top 90%",
			onEnter: () => timeline.play()
		})
	}

	function animateCardStagger(cards) {
		const timelines = []

		cards.forEach((card, index) => {
			const rowIndex = Math.floor(index / 2)

			if (!timelines[rowIndex]) {
				timelines[rowIndex] = gsap.timeline({ paused: true })
			}

			timelines[rowIndex].fromTo(
				card,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.4 },
				index % 2 === 0 ? 0 : 0.2 // Staggered delay within the row
			)
		})

		timelines.forEach((timeline, index) => {
			const rowStart = index === 0 ? "top 90%" : `top+=${index * 10}%`
			ScrollTrigger.create({
				trigger: cards[index * 2],
				start: rowStart,
				onEnter: () => timeline.play()
			})
		})
	}

	Draggable.create(".pic-frame-history", {
		type: "x,y",
		edgeResistance: 0.65,
		bounds: document.querySelector(".picture-container.picture-history"),
		zIndexBoost: false
	})

	Draggable.create(".pic-frame-speaking", {
		type: "x,y",
		edgeResistance: 0.65,
		bounds: document.querySelector(".picture-container.picture-speaking"),
		zIndexBoost: false
	})

	// Animation text reveal
	const textRevealElements = document.querySelectorAll("[letters-slide-up]")
	textRevealElements.forEach(animateTextReveal)

	// Animation on selected work
	const selectedWorkItems = document.querySelectorAll(".selected-work--item")
	selectedWorkItems.forEach(animateSelectedWork)

	// Animation on design tooling cards
	const designToolingCards = document.querySelectorAll(".design-tooling-card")
	animateCardStagger(designToolingCards)

	// Animation on other work cards
	const nextProjectCard = document.querySelectorAll(".other-work-card")
	animateCardStagger(nextProjectCard)

	// Avoid flash of unstyled content
	const textSplitElements = document.querySelectorAll("[text-split]")
	gsap.set(textSplitElements, { opacity: 1 })
})
