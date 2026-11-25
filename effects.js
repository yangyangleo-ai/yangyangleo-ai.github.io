'use strict';
// Explicit control complements the operating system's reduced-motion setting.
const effectsButton = document.querySelector('#effects-toggle');
const effectsPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let effectsOverridden = false;
function setEffects(enabled) {
  document.documentElement.dataset.effects = enabled ? 'on' : 'off';
  effectsButton.setAttribute('aria-pressed', String(enabled));
  effectsButton.textContent = enabled ? '暂停流光' : '开启流光';
}
setEffects(!effectsPreference.matches);
effectsButton.addEventListener('click', () => {
  effectsOverridden = true;
  setEffects(effectsButton.getAttribute('aria-pressed') !== 'true');
});
effectsPreference.addEventListener('change', event => {
  if (!effectsOverridden) setEffects(!event.matches);
});
