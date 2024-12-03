// Commect styles
import '/src/scss/main.scss';

import * as bodyScrollLock from 'body-scroll-lock';

// Sidebar menu
const refsMenu = {
  openMenuBtn: document.querySelector('.js-menu-open'),
  closeMenuBtn: document.querySelector('.js-menu-close'),
  overlayMenu: document.querySelector('.js-menu'),
};

const toggleMenu = () => {
  const isMenuOpen =
    refsMenu.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  refsMenu.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  refsMenu.overlayMenu.classList.toggle('is-open');

  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
};

refsMenu.openMenuBtn.addEventListener('click', toggleMenu);
refsMenu.closeMenuBtn.addEventListener('click', toggleMenu);

// Close the mobile menu on wider screens if the device orientation changes
window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
  if (!event.matches) return;

  refsMenu.overlayMenu.classList.remove('is-open');
  refsMenu.openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
});

// Sidebar toggle
const elements = {
  menuLinks: document.querySelectorAll('.menu-link'),
  overviewSections: document.querySelectorAll('.overview'),
  companiesSection: document.querySelector('.companies'),
  overviewsSidebarItem: document.querySelector('.sidebar-overview'),
  companiesSidebarItem: document.querySelector('.sidebar-companies'),
  mainElement: document.querySelector('.main'),
};

function removeCurrentClass() {
  elements.menuLinks.forEach(link => {
    link.classList.remove('current');
  });
}

function setActiveLink(link) {
  removeCurrentClass();
  link.classList.add('current');
}

function showOverview() {
  if (elements.companiesSection) {
    elements.companiesSection.classList.add('visually-hidden');
  }

  elements.overviewSections.forEach(section => {
    section.classList.remove('visually-hidden');
  });

  if (elements.mainElement) {
    elements.mainElement.style.display = 'grid';
  }
}

function showCompanies() {
  elements.overviewSections.forEach(section => {
    section.classList.add('visually-hidden');
  });

  if (elements.companiesSection) {
    elements.companiesSection.classList.remove('visually-hidden');
  }

  if (elements.mainElement) {
    elements.mainElement.style.display = 'block';
  }
}

elements.overviewsSidebarItem.addEventListener('click', event => {
  event.preventDefault();
  showOverview();
  setActiveLink(event.currentTarget.querySelector('.menu-link'));
});

elements.companiesSidebarItem.addEventListener('click', event => {
  event.preventDefault();
  showCompanies();
  setActiveLink(event.currentTarget.querySelector('.menu-link'));
});

document.addEventListener('DOMContentLoaded', () => {
  showOverview();
  setActiveLink(elements.overviewsSidebarItem.querySelector('.menu-link'));
});
