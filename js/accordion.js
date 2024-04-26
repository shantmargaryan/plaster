// const Accordion = function (accordionElem, speed = 300, turn = false) {
//   const accordion = document.querySelector(accordionElem);
//   const allAccordionCollapse = accordion.querySelectorAll('.accordion__collapse');
//   const allAccordionButton = accordion.querySelectorAll('.accordion__button');
//   document.addEventListener('DOMContentLoaded', function () {

//     allAccordionCollapse.forEach(collapseElement => {
//       collapseElement.setAttribute('aria-hidden', 'true');
//       collapseElement.setAttribute('id', 'accordion__collapse');
//       if (!collapseElement.classList.contains('accordion__collapse_open')) {
//         collapseElement.style.cssText =
//           `transition:grid-template-rows ${speed}ms ease 0s;
//           display: grid;
//           grid-template-rows: 0fr;`;
//         collapseElement.querySelector('.accordion__content').style.cssText = 
//           `min-height: 0;
//           overflow: hidden;`;
//       } else {
//         collapseElement.style.cssText =
//           `transition:grid-template-rows ${speed}ms ease 0s;
//           display: grid;
//           grid-template-rows: 1fr;`;
//         collapseElement.querySelector('.accordion__content').style.cssText = `
//           min-height: 0;
//           overflow: hidden;
//         `;
//       }
//     });

//     allAccordionButton.forEach(buttonElement => {
//       buttonElement.setAttribute('aria-expanded', 'false');
//       buttonElement.setAttribute('aria-controls', 'accordion__collapse')
//     });
//   })

//   accordion.addEventListener('click', function (event) {
//     allAccordionCollapse.forEach(collapseElement => {
//       collapseElement.setAttribute('aria-hidden', 'true');
//       collapseElement.setAttribute('id', 'accordion__collapse');
//     });
//     const accordionButton = event.target.closest('.accordion__button');
//     const accordionCollapse = accordionButton?.nextElementSibling;
//     const accordionCollapseOpen = accordionCollapse?.classList.contains('accordion__collapse_open');

//     // Check if accordionButton is defined and the accordionCollapse is not open, and 'turn' is true
//     if (accordionCollapse && accordionButton && !accordionCollapseOpen && turn) {
//       // Remove active class from all buttons
//       allAccordionButton.forEach(buttonElement => {
//         buttonElement.classList.remove("accordion__button_active");
//         buttonElement.setAttribute('aria-expanded', 'false')
//       });
//       // Add active class to the clicked button
//       accordionButton.classList.add('accordion__button_active');
//       accordionButton.setAttribute('aria-expanded', 'true');
//       // Close all accordion collapses
//       allAccordionCollapse.forEach(collapseElement => {
//         collapseElement.classList.remove("accordion__collapse_open");
//         collapseElement.style.gridTemplateRows = ' 0fr';
//         collapseElement.setAttribute('aria-hidden', 'true');
//       });
//       // Open the clicked accordion collapse if it's defined
//       accordionCollapse.classList.add("accordion__collapse_open");
//       accordionCollapse.style.gridTemplateRows = ' 1fr';
//       accordionCollapse.removeAttribute('aria-hidden', 'true');
//     } else {
//       // Close the accordion collapse if it's defined
//       if (accordionCollapse) {
//         accordionCollapse.classList.remove("accordion__collapse_open");
//         accordionCollapse.setAttribute('aria-hidden', 'true');
//         accordionCollapse.style.gridTemplateRows = ' 0fr';
//       }
//       // Remove active class from the clicked button
//       accordionButton?.classList.remove('accordion__button_active');
//       accordionButton?.setAttribute('aria-expanded', 'false');
//     }
//     // Check if accordionButton is defined and the accordionCollapse is not open
//     if (accordionCollapse && accordionButton && !accordionCollapseOpen) {
//       // Add active class to the clicked button
//       accordionButton.classList.add('accordion__button_active');
//       accordionButton.setAttribute('aria-expanded', 'true');
//       accordionCollapse.classList.add("accordion__collapse_open");
//       accordionCollapse.style.gridTemplateRows = ' 1fr';
//       accordionCollapse.removeAttribute('aria-hidden', 'true');
//     }
//   });
//   return accordion;
// }

// const accordion1 = new Accordion('.accordion1', 2000, true)










class Accordion {
  constructor(accordionElem, options) {
    
    let defaultOptions = {
      speed: 300,
      turn : false
    }
    this.accordion = document.querySelector(`[data-accordion="${accordionElem}"]`);
    this.options = Object.assign(defaultOptions, options);
    this.allAccordionCollapse = this.accordion.querySelectorAll('.accordion__collapse');
    this.allAccordionButton = this.accordion.querySelectorAll('.accordion__button');

    this.initialize();
    this.setupEventListeners();
  }

  initialize() {
    this.allAccordionCollapse.forEach(collapseElement => {
      collapseElement.setAttribute('aria-hidden', 'true');
      collapseElement.setAttribute('id', 'accordion__collapse');
      this.updateCollapseStyles(collapseElement);
    });

    this.allAccordionButton.forEach(buttonElement => {
      buttonElement.setAttribute('aria-expanded', 'false');
      buttonElement.setAttribute('aria-controls', 'accordion__collapse');
    });
  }

  updateCollapseStyles(collapseElement) {
    const isOpen = collapseElement.classList.contains('accordion__collapse_open');
    collapseElement.style.cssText = `
      transition-duration: ${this.options.speed + 'ms'};
      transition-property: grid-template-rows;
      display: grid;
      grid-template-rows: ${isOpen ? '1fr' : '0fr'};
    `;

    collapseElement.querySelector('.accordion__content').style.cssText = `
      min-height:0;
      overflow: hidden;
    `;
  }

  setupEventListeners() {
    this.accordion.addEventListener('click', (event) => {
      this.allAccordionCollapse.forEach(collapseElement => {
        collapseElement.setAttribute('aria-hidden', 'true');
        collapseElement.setAttribute('id', 'accordion__collapse');
      });

      const accordionButton = event.target.closest('.accordion__button');
      const accordionCollapse = accordionButton?.nextElementSibling;
      const accordionCollapseOpen = accordionCollapse?.classList.contains('accordion__collapse_open');

      if (accordionCollapse && accordionButton && !accordionCollapseOpen && this.options.turn) {
        this.allAccordionButton.forEach(buttonElement => {
          buttonElement.classList.remove('accordion__button_active');
          buttonElement.setAttribute('aria-expanded', 'false');
        });

        accordionButton.classList.add('accordion__button_active');
        accordionButton.setAttribute('aria-expanded', 'true');

        this.allAccordionCollapse.forEach(collapseElement => {
          collapseElement.classList.remove('accordion__collapse_open');
          this.updateCollapseStyles(collapseElement);
          collapseElement.setAttribute('aria-hidden', 'true');
        });

        accordionCollapse.classList.add('accordion__collapse_open');
        this.updateCollapseStyles(accordionCollapse);
        accordionCollapse.removeAttribute('aria-hidden', 'true');
      } else if (accordionCollapse) {
        accordionCollapse.classList.remove('accordion__collapse_open');
        accordionCollapse.setAttribute('aria-hidden', 'true');
        this.updateCollapseStyles(accordionCollapse);

        accordionButton?.classList.remove('accordion__button_active');
        accordionButton?.setAttribute('aria-expanded', 'false');
      }

      if (accordionCollapse && accordionButton && !accordionCollapseOpen) {
        accordionButton.classList.add('accordion__button_active');
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionCollapse.classList.add('accordion__collapse_open');
        this.updateCollapseStyles(accordionCollapse);
        accordionCollapse.removeAttribute('aria-hidden', 'true');
      }
    });
  }
}









// class Accordion {
//   constructor(accordionElem, speed = 300, turn = false) {
//     this.accordion = document.querySelector(accordionElem);
//     this.speed = speed;
//     this.turn = turn;
//     this.allAccordionCollapse = this.accordion.querySelectorAll('.accordion__collapse');
//     this.allAccordionButton = this.accordion.querySelectorAll('.accordion__button');

//     this.initialize();
//     this.setupEventListeners();
//   }

//   initialize() {
//     this.allAccordionCollapse.forEach(collapseElement => {
//       collapseElement.setAttribute('aria-hidden', 'true');
//       collapseElement.setAttribute('id', 'accordion__collapse');
//       this.updateCollapseStyles(collapseElement);
//     });

//     this.allAccordionButton.forEach(buttonElement => {
//       buttonElement.setAttribute('aria-expanded', 'false');
//       buttonElement.setAttribute('aria-controls', 'accordion__collapse');
//     });
//   }

//   updateCollapseStyles(collapseElement) {
//     const isOpen = collapseElement.classList.contains('accordion__collapse_open');
//     collapseElement.style.cssText = `
//       transition: grid-template-rows ${this.speed}ms ease 0s;
//       display: grid;
//       grid-template-rows: ${isOpen ? '1fr' : '0fr'};
//     `;
//     collapseElement.querySelector('.accordion__content').style.cssText = `
//       min-height: 0;
//       overflow: hidden;
//     `;
//   }

//   setupEventListeners() {
//     this.accordion.addEventListener('click', (event) => {
//       this.allAccordionCollapse.forEach(collapseElement => {
//         collapseElement.setAttribute('aria-hidden', 'true');
//         collapseElement.setAttribute('id', 'accordion__collapse');
//       });

//       const accordionButton = event.target.closest('.accordion__button');
//       const accordionCollapse = accordionButton?.nextElementSibling;
//       const accordionCollapseOpen = accordionCollapse?.classList.contains('accordion__collapse_open');

//       if (accordionCollapse && accordionButton && !accordionCollapseOpen && this.turn) {
//         this.allAccordionButton.forEach(buttonElement => {
//           buttonElement.classList.remove('accordion__button_active');
//           buttonElement.setAttribute('aria-expanded', 'false');
//         });

//         accordionButton.classList.add('accordion__button_active');
//         accordionButton.setAttribute('aria-expanded', 'true');

//         this.allAccordionCollapse.forEach(collapseElement => {
//           collapseElement.classList.remove('accordion__collapse_open');
//           this.updateCollapseStyles(collapseElement);
//           collapseElement.setAttribute('aria-hidden', 'true');
//         });

//         accordionCollapse.classList.add('accordion__collapse_open');
//         this.updateCollapseStyles(accordionCollapse);
//         accordionCollapse.removeAttribute('aria-hidden', 'true');
//       } else if (accordionCollapse) {
//         accordionCollapse.classList.remove('accordion__collapse_open');
//         accordionCollapse.setAttribute('aria-hidden', 'true');
//         this.updateCollapseStyles(accordionCollapse);

//         accordionButton?.classList.remove('accordion__button_active');
//         accordionButton?.setAttribute('aria-expanded', 'false');
//       }

//       if (accordionCollapse && accordionButton && !accordionCollapseOpen) {
//         accordionButton.classList.add('accordion__button_active');
//         accordionButton.setAttribute('aria-expanded', 'true');
//         accordionCollapse.classList.add('accordion__collapse_open');
//         this.updateCollapseStyles(accordionCollapse);
//         accordionCollapse.removeAttribute('aria-hidden', 'true');
//       }
//     });
//   }
// }








// class GraphAccordion {
// 	constructor(selector, options) {
// 		let defaultOptions = {
// 			isOpen: () => {},
// 			isClose: () => {},
// 			speed: 300
// 		};

// 		this.options = Object.assign(defaultOptions, options);
// 		this.accordion = document.querySelector(selector);
// 		this.control = this.accordion.querySelector('.accordion__control');
// 		this.content = this.accordion.querySelector('.accordion__content');
// 		this.event();
// 	}

// 	event() {
// 		console.log('event!');
		
// 		if (this.accordion) {
// 			this.accordion.addEventListener('click', (e) => {
// 				this.accordion.classList.toggle('open');

// 				if (this.accordion.classList.contains('open')) {
// 					this.open();
// 				} else {
// 					this.close();
// 				}
// 			});
// 		}
// 	}

// 	open() {
// 		this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`);
// 		this.accordion.classList.add('is-open');
// 		this.control.setAttribute('aria-expanded', true);
// 		this.content.setAttribute('aria-hidden', false);
// 		this.content.style.maxHeight = this.content.scrollHeight + 'px';
// 		this.options.isOpen(this);
// 	}

// 	close() {
// 		this.accordion.classList.remove('is-open');
// 		this.control.setAttribute('aria-expanded', false);
// 		this.content.setAttribute('aria-hidden', true);
// 		this.content.style.maxHeight = null;
// 		this.options.isClose(this);
// 	}
// }