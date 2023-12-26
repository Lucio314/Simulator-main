/* Script pour cocher toutes les cases en une seule case cochée */
const all_check = document.getElementById('all_checked');
const checks = document.querySelectorAll('input[type=checkbox]:not(#all_checked)');
all_check.addEventListener('change', function () {

    for (let checkbox of checks) {
        checkbox.checked = all_check.checked;
    }
});

/*Gérer  l'apparition du passer en flotte lorsque plus de deux cases sont cochées*/
// Sélectionnez le formulaire, les cases à cocher et le bouton de soumission
const fleetform = document.getElementById('fleetform');
const checkboxes = fleetform.querySelectorAll('input[type="checkbox"]:not(#all_checked)');
const boutonSoumission = document.getElementById('flotte');
let casesCochees;
// Ajoutez un gestionnaire d'événement pour les cases à cocher
fleetform.addEventListener('change', function () {
    // Comptez le nombre de cases cochées
    casesCochees = 0;
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            casesCochees++;
            if (casesCochees >= 2) {
                break;
            }
        }
    }
    // Affichez le bouton de soumission si plus de deux cases sont cochées, sinon cachez-le
    if (casesCochees >= 2) {
        boutonSoumission.style.display = 'block';
    } else {
        boutonSoumission.style.display = 'none';
    }
});

boutonSoumission.addEventListener('click', function () {

});