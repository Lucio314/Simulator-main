function validateForm() {
    // Récupérez tous les input à l'intérieur du formulaire
    const inputs = document.querySelectorAll('input');

    // Parcourez tous les messages pour vérifier s'ils sont en rouge
    for (const input of inputs) {
        if (input.style.borderColor === 'red') {
            // Si un input est en rouge, empêchez la soumission du formulaire
            alert("Veuillez corriger les erreurs avant de soumettre le formulaire.");
            return false;
        }
    }

    // Récupérez la valeur de la case "prime"
    const primeValue = document.getElementById("result").value;

    // Vérifiez si la valeur de la prime est vide
    if (primeValue.trim() === "") {
        alert("Veuillez entrer une valeur pour la prime avant de soumettre le formulaire.");
        return false; // Empêche la soumission du formulaire
    }
    // Si aucun input n'est en rouge et la prime est valide, le formulaire peut être soumis
    return true;
}

/* code concernant la gestion de la prime du risque assuré*/
const code_designation = {
    'Promenade & Affaires': '210',
    'Transport Propre Compte': '220',
    'Transport Public de Marchandises': '230',
    'Transport Public de Voyageurs': '240',
    'Véhicule 2/3 Roues Personnel': '250',
    "Véhicules 'WW' Garages": '260',
    'Véhicule Auto-École': '270',
    'Véhicule de Location': '280',
    'Engins de Chantiers': '290',
    'Véhicules Spéciaux': '291'
};
const lib_category = document.querySelector('#lib_category');
const tonnageHide = document.getElementById('tonnageHide');
const numSeatsHide = document.getElementById('numSeatsHide');
const special_category = document.getElementById('special_category');
const categories = document.getElementById('categories');
const special_categories = document.getElementById('special_categories');
const vehicleTypes = document.getElementById('vehicleTypes');
const checkboxTrailer = document.getElementById('withTrailer');
const powerTrailer = document.getElementById('powerTrailer');
const powerTrailerHide = document.getElementById('powerTrailerHide');
const genre = document.getElementById('vehicleType');
const nbSeats = document.getElementById('numSeats');
const checkboxs = document.getElementById('checkboxs');
const owner = document.getElementById('owner');
const rental = document.getElementById('rental');
const kartOwnerDiv = document.getElementById('kartOwners');
const paid = document.getElementById('paid');
const unpaid = document.getElementById('unpaid');
const twoWheelsVehicles = document.getElementById('twoWheelsVehicles');
const wheelerDiv = document.getElementById('wheelers');
const driveStatus = document.getElementById('driveStatus');
const lastYearAccepted = new Date(1900, 0, 1).toLocaleDateString();
// const form = document.getElementById('insuranceForm')
let driverBirthDay = document.getElementById('driverBirthDay');
let drivingStartDate = document.getElementById('licenseStartDate');
let today = new Date();
// Écoutez l'événement "blur" (lorsque le champ perd le focus)
driverBirthDay.addEventListener("blur", function () {
    document.getElementById('msg').textContent = '';
    driverBirthDay.style.borderColor = '#ccc';

    // Récupérez la valeur saisie par l'utilisateur
    const inputDate = new Date(driverBirthDay.value);
    inputDate.setHours(0, 0, 0, 0); // Réglez l'heure à minuit
    today.setHours(0, 0, 0, 0);

    // Créez une expression régulière pour valider le format de date (par exemple, JJ/MM/AAAA)
    let regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
    //Utilisez la méthode test de l'expression régulière pour vérifier la validité
    if (!regexDate.test(inputDate.toLocaleDateString())) {
        driverBirthDay.style.border = '2px solid red';
        document.getElementById('msg').style.fontSize = 'small';
        document.getElementById('msg').style.color = 'red';
        document.getElementById('msg').textContent = 'Date invalide';
        //driverBirthDay.focus(); // Revenez au champ de date
    } else if ((new Date(inputDate) < new Date(lastYearAccepted)) || (inputDate.getTime() >= today.getTime())) {
        // alert("La date est invalide! Veuillez reesayer svp!");
        driverBirthDay.style.border = '2px solid red';
        document.getElementById('msg').style.fontSize = 'small';
        document.getElementById('msg').style.color = 'red';
        document.getElementById('msg').textContent = 'Date invalide';

    }
});

drivingStartDate.addEventListener("blur", function () {
    document.getElementById('msg1').textContent = '';
    drivingStartDate.style.borderColor = '#ccc';

    // Récupérez la valeur saisie par l'utilisateur
    const inputDateDrive = new Date(drivingStartDate.value);
    inputDateDrive.setHours(0, 0, 0, 0); // Réglez l'heure à minuit
    today.setHours(0, 0, 0, 0);

    // Créez une expression régulière pour valider le format de date (par exemple, JJ/MM/AAAA)
    let regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
    //Utilisez la méthode test de l'expression régulière pour vérifier la validité
    if (!regexDate.test(inputDateDrive.toLocaleDateString())) {
        drivingStartDate.style.border = '2px solid red';
        document.getElementById('msg1').style.fontSize = 'small';
        document.getElementById('msg1').style.color = 'red';
        document.getElementById('msg1').textContent = 'Date invalide';
        //drivingStartDate.focus(); // Revenez au champ de date
    } else if ((new Date(inputDateDrive) < new Date(lastYearAccepted)) || (inputDateDrive.getTime() >= today.getTime())) {
        // alert("La date est invalide! Veuillez reesayer svp!");
        drivingStartDate.style.border = '2px solid red';
        document.getElementById('msg1').style.fontSize = 'small';
        document.getElementById('msg1').style.color = 'red';
        document.getElementById('msg1').textContent = 'Date invalide';
    }

});

document.addEventListener("DOMContentLoaded", function () {
    // Récupérez les éléments du formulaire
    var driverBirthDay = document.getElementById("driverBirthDay");
    var licenseStartDate = document.getElementById("licenseStartDate");
    var message = document.getElementById("msg");

    // Ajoutez un gestionnaire d'événements "change" sur le champ de date de naissance
    driverBirthDay.addEventListener("change", function () {
        // Récupérez les valeurs des champs de date de naissance et de délivrance du permis
        var birthDate = new Date(driverBirthDay.value);
        var licenseDate = new Date(licenseStartDate.value);

        // Comparez les dates
        if (birthDate > licenseDate) {
            message.textContent = "La date de naissance ne peut pas être ultérieure à la date de délivrance du permis.";
        } else {
            message.textContent = "";
        }
    });

    // Ajoutez un gestionnaire d'événements "change" sur le champ de date de délivrance du permis
    licenseStartDate.addEventListener("change", function () {
        // Récupérez les valeurs des champs de date de naissance et de délivrance du permis
        var birthDate = new Date(driverBirthDay.value);
        var licenseDate = new Date(licenseStartDate.value);

        // Comparez les dates
        if (birthDate > licenseDate) {
            message.textContent = "La date de naissance ne peut pas être ultérieure à la date de délivrance du permis.";
        } else {
            message.textContent = "";
        }
    });
});


// Fonction pour mettre à jour le champ de code en fonction de la catégorie sélectionnée
lib_category.addEventListener('change', function () {
    const code = document.getElementById('code_category');
    const selectedCategory = lib_category.value;

    // Vérifier si la catégorie est dans le dictionnaire
    if (selectedCategory in code_designation) {
        code.textContent = code_designation[selectedCategory];
    }

    // Gestion de l'affichage en fonction de la catégorie sélectionnée
    tonnageHide.style.display = (selectedCategory === 'Transport Public de Marchandises') ? 'block' : 'none';
    checkboxs.style.display = (selectedCategory === 'Transport Public de Marchandises') ? 'block' : 'none';
    numSeatsHide.style.display = (selectedCategory === 'Transport Public de Voyageurs') ? 'block' : 'none';

    if (selectedCategory === 'Véhicule Auto-École' || selectedCategory === 'Véhicule de Location') {
        categories.style.display = 'block';
        special_categories.style.display = 'none';
        vehicleTypes.style.display = 'none';
        wheelerDiv.style.display = 'none';
        kartOwnerDiv.style.display = 'none';
        driveStatus.style.display = 'none';
    } else if (selectedCategory === 'Véhicules Spéciaux') {
        special_categories.style.display = 'block';
        categories.style.display = 'none';
        vehicleTypes.style.display = 'none';
        wheelerDiv.style.display = 'none';
        special_category.addEventListener('change', function () {
            driveStatus.style.display = (special_category.value === 'Tracteurs agricoles') ? 'block' : 'none';
            kartOwnerDiv.style.display = (special_category.value === 'Karts') ? 'block' : 'none';
        });
    } else if (selectedCategory === 'Transport Public de Voyageurs') {
        special_categories.style.display = 'none';
        categories.style.display = 'none';
        vehicleTypes.style.display = 'block';
        wheelerDiv.style.display = 'none';
        kartOwnerDiv.style.display = 'none';
        driveStatus.style.display = 'none';
    } else if (selectedCategory === 'Véhicule 2/3 Roues Personnel') {
        special_categories.style.display = 'none';
        categories.style.display = 'none';
        vehicleTypes.style.display = 'none';
        wheelerDiv.style.display = 'block';
        kartOwnerDiv.style.display = 'none';
        driveStatus.style.display = 'none';
    } else {
        wheelerDiv.style.display = 'none';
        special_categories.style.display = 'none';
        categories.style.display = 'none';
        vehicleTypes.style.display = 'none';
        driveStatus.style.display = 'none';
        kartOwnerDiv.style.display = 'none';
        checkboxTrailer.checked = false;
    }
});

paid.addEventListener('change', function () {
    if (this.checked) {
        unpaid.checked = false; // Désélectionner ununpaid  si celle-ci est cochée
    }
});

unpaid.addEventListener('change', function () {
    if (this.checked) {
        paid.checked = false; // Désélectionner owner  si celle-ci est cochée
    }
});

// Gérer la sélection unique des cases à cocher
owner.addEventListener('change', function () {
    if (this.checked) {
        rental.checked = false; // Désélectionner rental  si celle-ci est cochée
    }
});

rental.addEventListener('change', function () {
    if (this.checked) {
        owner.checked = false; // Désélectionner owner  si celle-ci est cochée
    }
});

// Gestion de l'affichage du champ de puissance de la remorque
checkboxTrailer.addEventListener('change', function () {
    powerTrailerHide.style.display = checkboxTrailer.checked ? 'block' : 'none';
});

// Gestion de la sélection du genre de véhicule et du nombre de sièges
genre.addEventListener('change', function () {
    nbSeats.min = (this.value === 'Taxis') ? 2 : 10;
    nbSeats.max = (this.value === 'Taxis') ? 9 : 100;
    nbSeats.value = Math.min(nbSeats.max, Math.max(nbSeats.min, nbSeats.value));
});

// Attacher un gestionnaire d'événement au bouton Soumettre
let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function () {
    // Récupérer les valeurs des champs de formulaire
    let powerInput = document.getElementById("power").value;

    let zone = document.getElementById('zones').value;
    let status = document.getElementById('status').value;
    let classType;
    let energy = document.querySelector('input[name="Energy"]:checked').value;
    let startYear = new Date(drivingStartDate.value).getFullYear();
    today = new Date();
    let age_permis = today.getFullYear() - startYear;
    let age = today.getFullYear() - new Date(driverBirthDay.value).getFullYear();
    let surprime = 0;
    const can_drive = document.querySelector('input[name="can_drive"]:checked')
    // Logique pour déterminer la classe
    if (parseInt(age) > 65 && parseInt(age_permis) <= 2) {
        classType = 'classe1';
    } else {
        classType = 'classe2';
    }
    console.log(powerInput, age, zone, status, classType, energy, age_permis);

    // Calcul de la prime d'assurance en fonction des valeurs
    let prime_RC = 0; // Initialiser la prime à 0
    switch (lib_category.value) {
        case 'Promenade & Affaires':
            if (((powerInput >= 1 && powerInput <= 2) && (energy === 'Essence' || energy === 'Electric')) || (powerInput == 1 && energy == 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 40781;
                        } else {
                            prime_RC = 38840;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 38840;
                        } else {
                            prime_RC = 36990;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 42821;
                            } else {
                                prime_RC = 40781;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 40781;
                            } else {
                                prime_RC = 38840;
                            }
                        }
                    }
                }
            }
            else if (((powerInput >= 3 && powerInput <= 6) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 2 && powerInput <= 4) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 46140;
                        } else {
                            prime_RC = 43943;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 43943;
                        } else {
                            prime_RC = 41850;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 48447;
                            } else {
                                prime_RC = 46140;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 46140;
                            } else {
                                prime_RC = 43943;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 7 && powerInput <= 10) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 5 && powerInput <= 7) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 74429;
                        } else {
                            prime_RC = 48195;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 48195;
                        } else {
                            prime_RC = 45900;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 53135;
                            } else {
                                prime_RC = 74429;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 74429;
                            } else {
                                prime_RC = 48195;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 11 && powerInput <= 14) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 8 && powerInput <= 10) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 61321;
                        } else {
                            prime_RC = 58401;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 58401;
                        } else {
                            prime_RC = 55620;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 64387;
                            } else {
                                prime_RC = 61321;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 61321;
                            } else {
                                prime_RC = 61321;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 77396;
                        } else {
                            prime_RC = 73710;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 73710;
                        } else {
                            prime_RC = 70200;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 81265;
                            } else {
                                prime_RC = 77396;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 77396;
                            } else {
                                prime_RC = 73710;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 90791;
                        } else {
                            prime_RC = 86468;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 86468;
                        } else {
                            prime_RC = 82350;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 95330;
                            } else {
                                prime_RC = 90791;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 90791;
                            } else {
                                prime_RC = 86468;
                            }
                        }
                    }
                }
            }
            break;
        case 'Transport Propre Compte':
            if (((powerInput >= 1 && powerInput <= 2) && (energy === 'Essence' || energy === 'Electric')) || (powerInput == 1 && energy == 'Diesel')) {
                prime_RC = 1;
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 57011;
                        } else {
                            prime_RC = 54297;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 54297;
                        } else {
                            prime_RC = 51711;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 59862;
                            } else {
                                prime_RC = 57011;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 57011;
                            } else {
                                prime_RC = 54297;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 3 && powerInput <= 6) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 2 && powerInput <= 4) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 65555;
                        } else {
                            prime_RC = 62433;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 62433;
                        } else {
                            prime_RC = 59460;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 68832;
                            } else {
                                prime_RC = 65555;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 65555;
                            } else {
                                prime_RC = 62433;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 7 && powerInput <= 10) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 5 && powerInput <= 7) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 74429;
                        } else {
                            prime_RC = 70884;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 70884;
                        } else {
                            prime_RC = 67509;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 78150;
                            } else {
                                prime_RC = 74429;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 74429;
                            } else {
                                prime_RC = 70884;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 11 && powerInput <= 14) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 8 && powerInput <= 10) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 103020;
                        } else {
                            prime_RC = 98114;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 98114;
                        } else {
                            prime_RC = 93442;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 108171;
                            } else {
                                prime_RC = 103020;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 103020;
                            } else {
                                prime_RC = 98114;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 130296;
                        } else {
                            prime_RC = 124091;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 124091;
                        } else {
                            prime_RC = 118182;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 136810;
                            } else {
                                prime_RC = 130296;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 130296;
                            } else {
                                prime_RC = 124091;
                            }
                        }
                    }
                }
            } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                if (zone === 'zone verte') {
                    if (status === 'Statut1') {
                        if (classType === 'classe1') {
                            prime_RC = 152315;
                        } else {
                            prime_RC = 145062;
                        }
                    } else {
                        if (classType == 'classe1') {
                            prime_RC = 145062;
                        } else {
                            prime_RC = 138154;
                        }
                    }
                } else {
                    if (zone === 'zone rouge') {
                        if (status === 'Statut1') {
                            if (classType === 'classe1') {
                                prime_RC = 95330;
                            } else {
                                prime_RC = 152315;
                            }
                        } else {
                            if (classType == 'classe1') {
                                prime_RC = 152315;
                            } else {
                                prime_RC = 145062;
                            }
                        }
                    }
                }
            }
            break;
        case 'Transport Public de Marchandises':
            const tonnage = document.getElementById('tonnage').value;
            if (((powerInput >= 1 && powerInput <= 2) && (energy === 'Essence' || energy === 'Electric')) || (powerInput == 1 && energy == 'Diesel')) {
                if (zone === 'zone rouge') {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 94236 : 98948;
                    } else {
                        prime_RC = (tonnage <= 10) ? 89749 : 94236;
                    }
                } else {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 89749 : 94236;
                    } else {
                        prime_RC = (tonnage <= 10) ? 85475 : 89749;
                    }
                }
            } else if (((powerInput >= 3 && powerInput <= 6) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 2 && powerInput <= 4) && energy === 'Diesel')) {
                if (zone === 'zone rouge') {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 109333 : 114800;
                    } else {
                        prime_RC = (tonnage <= 10) ? 104127 : 109333;
                    }
                } else {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 104127 : 109333;
                    } else {
                        prime_RC = (tonnage <= 10) ? 99168 : 104127;
                    }
                }
            } else if (((powerInput >= 7 && powerInput <= 10) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 5 && powerInput <= 7) && energy === 'Diesel')) {
                if (zone === 'zone rouge') {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 125724 : 132010;
                    } else {
                        prime_RC = (tonnage <= 10) ? 119737 : 125724;
                    }
                } else {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 119737 : 125724;
                    } else {
                        prime_RC = (tonnage <= 10) ? 114035 : 119737;
                    }
                }
            } else if (((powerInput >= 11 && powerInput <= 14) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 8 && powerInput <= 10) && energy === 'Diesel')) {
                if (zone === 'zone rouge') {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 173699 : 182384;
                    } else {
                        prime_RC = (tonnage <= 10) ? 165428 : 173699;
                    }
                } else {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 165428 : 173699;
                    } else {
                        prime_RC = (tonnage <= 10) ? 157550 : 165428;
                    }
                }
            } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                if (zone === 'zone rouge') {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 225792 : 237082;
                    } else {
                        prime_RC = (tonnage <= 10) ? 215040 : 225792;
                    }
                } else {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 215040 : 225792;
                    } else {
                        prime_RC = (tonnage <= 10) ? 204800 : 215040;
                    }
                }
            } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                if (zone === 'zone rouge') {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 264612 : 277843;
                    } else {
                        prime_RC = (tonnage <= 10) ? 252012 : 264612;
                    }
                } else {
                    if (classType === 'classe1') {
                        prime_RC = (tonnage <= 10) ? 252012 : 264612;
                    } else {
                        prime_RC = (tonnage <= 10) ? 240011 : 252012;
                    }
                }
            }
            if (checkboxTrailer.checked) {
                surprime = (powerTrailer.value <= 23) ? 61819 : 72317;
            } else {
                surprime = 0;
                document.getElementById("surprime").textContent = "";
            }
            if (document.getElementById('flammable').checked) {
                prime_RC *= 2;
            }
            break;
        case 'Transport Public de Voyageurs':
            switch (genre.value) {
                case 'Taxis':
                    if (((powerInput >= 1 && powerInput <= 2) && (energy === 'Essence' || energy === 'Electric')) || (powerInput == 1 && energy == 'Diesel')) {
                        if (zone === 'zone rouge') {
                            if (classType === 'classe1') {
                                prime_RC = 44961;
                                surprime = parseInt(nbSeats.value) * 14837;
                            } else {
                                prime_RC = 42820;
                                surprime = parseInt(nbSeats.value) * 14131;
                            }
                        } else {
                            if (classType === 'classe1') {
                                prime_RC = 42820;
                                surprime = parseInt(nbSeats.value) * 14131;
                            } else {
                                prime_RC = 40781;
                                surprime = parseInt(nbSeats.value) * 13458;
                            }
                        }
                    }
                    else if (((powerInput >= 3 && powerInput <= 6) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 2 && powerInput <= 4) && energy === 'Diesel')) {
                        if (zone === 'zone rouge') {
                            if (classType === 'classe1') {
                                prime_RC = 50869;
                                surprime = parseInt(nbSeats.value) * 16787;
                            } else {
                                prime_RC = 48447;
                                surprime = parseInt(nbSeats.value) * 15988;
                            }
                        } else {
                            if (classType === 'classe1') {
                                prime_RC = 48447;
                                surprime = parseInt(nbSeats.value) * 15988;
                            } else {
                                prime_RC = 46140;
                                surprime = parseInt(nbSeats.value) * 15226;
                            }
                        }
                    } else if (((powerInput >= 7 && powerInput <= 10) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 5 && powerInput <= 7) && energy === 'Diesel')) {
                        if (zone === 'zone rouge') {
                            if (classType === 'classe1') {
                                prime_RC = 55792;
                                surprime = parseInt(nbSeats.value) * 18411;
                            } else {
                                prime_RC = 53135;
                                surprime = parseInt(nbSeats.value) * 17535;
                            }
                        } else {
                            if (classType === 'classe1') {
                                prime_RC = 53135;
                                surprime = parseInt(nbSeats.value) * 17535;
                            } else {
                                prime_RC = 50605;
                                surprime = parseInt(nbSeats.value) * 16700;
                            }
                        }
                    } else if (((powerInput >= 11 && powerInput <= 14) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 8 && powerInput <= 10) && energy === 'Diesel')) {
                        if (zone === 'zone rouge') {
                            if (classType === 'classe1') {
                                prime_RC = 67606;
                                surprime = parseInt(nbSeats.value) * 22310;
                            } else {
                                prime_RC = 64387;
                                surprime = parseInt(nbSeats.value) * 21248;
                            }
                        } else {
                            if (classType === 'classe1') {
                                prime_RC = 64387;
                                surprime = parseInt(nbSeats.value) * 21248;
                            } else {
                                prime_RC = 61321;
                                surprime = parseInt(nbSeats.value) * 20236;
                            }
                        }
                    } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                        if (zone === 'zone rouge') {
                            if (classType === 'classe1') {
                                prime_RC = 85329;
                                surprime = parseInt(nbSeats.value) * 28159;
                            } else {
                                prime_RC = 81266;
                                surprime = parseInt(nbSeats.value) * 26818;
                            }
                        } else {
                            if (classType === 'classe1') {
                                prime_RC = 81266;
                                surprime = parseInt(nbSeats.value) * 26818;
                            } else {
                                prime_RC = 77396;
                                surprime = parseInt(nbSeats.value) * 25541;
                            }
                        }
                    } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                        if (zone === 'zone rouge') {
                            if (classType === 'classe1') {
                                prime_RC = 100097;
                                surprime = parseInt(nbSeats.value) * 33032;
                            } else {
                                prime_RC = 95331;
                                surprime = parseInt(nbSeats.value) * 31459;
                            }
                        } else {
                            if (classType === 'classe1') {
                                prime_RC = 95331;
                                surprime = parseInt(nbSeats.value) * 31459;
                            } else {
                                prime_RC = 90791;
                                surprime = parseInt(nbSeats.value) * 29961;
                            }
                        }
                    }
                    break;
                case 'Minibus':
                case 'Autocars':
                case 'Camions':
                case 'Transports mixtes':
                    let surprime_R1 = 11000; // R1 = zone roue classe1
                    let surprime_R2_V1 = 10476; // R2_V1= zone rouge classe2 && zone verte classe 1
                    let surprime_V2 = 9977; // V2 = surprime zone verte classe2
                    if (nbSeats.value > 9 && nbSeats.value <= 20) {
                        nbSeats.value = 20;
                        if ((powerInput <= 14 && (energy === 'Essence' || energy === 'Electric')) || (powerInput <= 10 && energy === 'Diesel')) {
                            if (zone === 'zone rouge') {
                                if (classType === 'classe1') {
                                    prime_RC = 67606;
                                    surprime = parseInt(nbSeats.value) * surprime_R1;
                                } else {
                                    prime_RC = 64387;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                }
                            } else {
                                if (classType === 'classe1') {
                                    prime_RC = 64387;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                } else {
                                    prime_RC = 61321;
                                    surprime = parseInt(nbSeats.value) * surprime_V2;
                                }
                            }
                        } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                            if (zone === 'zone rouge') {
                                if (classType === 'classe1') {
                                    prime_RC = 85329;
                                    surprime = parseInt(nbSeats.value) * surprime_R1;
                                } else {
                                    prime_RC = 81266;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                }
                            } else {
                                if (classType === 'classe1') {
                                    prime_RC = 81266;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                } else {
                                    prime_RC = 77396;
                                    surprime = parseInt(nbSeats.value) * surprime_V2;
                                }
                            }
                        } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                            if (zone === 'zone rouge') {
                                if (classType === 'classe1') {
                                    prime_RC = 100097;
                                    surprime = parseInt(nbSeats.value) * surprime_R1;
                                } else {
                                    prime_RC = 95331;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                }
                            } else {
                                if (classType === 'classe1') {
                                    prime_RC = 95331;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                } else {
                                    prime_RC = 90791;
                                    surprime = parseInt(nbSeats.value) * surprime_V2;
                                }
                            }
                        }
                    } else if (nbSeats.value > 20 && nbSeats.value <= 30) {
                        nbSeats.value -= 1;
                        if ((powerInput <= 14 && (energy === 'Essence' || energy === 'Electric')) || (powerInput <= 10 && energy === 'Diesel')) {
                            if (zone === 'zone rouge') {
                                if (classType === 'classe1') {
                                    prime_RC = 67606;
                                    surprime = parseInt(nbSeats.value) * surprime_R1;
                                } else {
                                    prime_RC = 64387;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                }
                            } else {
                                if (classType === 'classe1') {
                                    prime_RC = 64387;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                } else {
                                    prime_RC = 61321;
                                    surprime = parseInt(nbSeats.value) * surprime_V2;
                                }
                            }
                        } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                            if (zone === 'zone rouge') {
                                if (classType === 'classe1') {
                                    prime_RC = 85329;
                                    surprime = parseInt(nbSeats.value) * surprime_R1;
                                } else {
                                    prime_RC = 81266;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                }
                            } else {
                                if (classType === 'classe1') {
                                    prime_RC = 81266;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                } else {
                                    prime_RC = 77396;
                                    surprime = parseInt(nbSeats.value) * surprime_V2;
                                }
                            }
                        } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                            if (zone === 'zone rouge') {
                                if (classType === 'classe1') {
                                    prime_RC = 100097;
                                    surprime = parseInt(nbSeats.value) * surprime_R1;
                                } else {
                                    prime_RC = 95331;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                }
                            } else {
                                if (classType === 'classe1') {
                                    prime_RC = 95331;
                                    surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                } else {
                                    prime_RC = 90791;
                                    surprime = parseInt(nbSeats.value) * surprime_V2;
                                }
                            }
                        }
                    } else {
                        surprime_R1 = 8500; // R1 = zone roue classe1
                        surprime_R2_V1 = 8095; // R2_V1= zone rouge classe2 && zone verte classe 1
                        surprime_V2 = 7710; // V
                        if (nbSeats.value > 30 && nbSeats.value <= 40) {
                            nbSeats.value = 40;
                            if ((powerInput <= 14 && (energy === 'Essence' || energy === 'Electric')) || (powerInput <= 10 && energy === 'Diesel')) {
                                if (zone === 'zone rouge') {
                                    if (classType === 'classe1') {
                                        prime_RC = 67606;
                                        surprime = parseInt(nbSeats.value) * surprime_R1;
                                    } else {
                                        prime_RC = 64387;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    }
                                } else {
                                    if (classType === 'classe1') {
                                        prime_RC = 64387;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    } else {
                                        prime_RC = 61321;
                                        surprime = parseInt(nbSeats.value) * surprime_V2;
                                    }
                                }
                            } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                                if (zone === 'zone rouge') {
                                    if (classType === 'classe1') {
                                        prime_RC = 85329;
                                        surprime = parseInt(nbSeats.value) * surprime_R1;
                                    } else {
                                        prime_RC = 81266;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    }
                                } else {
                                    if (classType === 'classe1') {
                                        prime_RC = 81266;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    } else {
                                        prime_RC = 77396;
                                        surprime = parseInt(nbSeats.value) * surprime_V2;
                                    }
                                }
                            } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                                if (zone === 'zone rouge') {
                                    if (classType === 'classe1') {
                                        prime_RC = 100097;
                                        surprime = parseInt(nbSeats.value) * surprime_R1;
                                    } else {
                                        prime_RC = 95331;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    }
                                } else {
                                    if (classType === 'classe1') {
                                        prime_RC = 95331;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    } else {
                                        prime_RC = 90791;
                                        surprime = parseInt(nbSeats.value) * surprime_V2;
                                    }
                                }
                            }
                        } else {
                            nbSeats.value -= 1;
                            if ((powerInput <= 14 && (energy === 'Essence' || energy === 'Electric')) || (powerInput <= 10 && energy === 'Diesel')) {
                                if (zone === 'zone rouge') {
                                    if (classType === 'classe1') {
                                        prime_RC = 67606;
                                        surprime = parseInt(nbSeats.value) * surprime_R1;
                                    } else {
                                        prime_RC = 64387;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    }
                                } else {
                                    if (classType === 'classe1') {
                                        prime_RC = 64387;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    } else {
                                        prime_RC = 61321;
                                        surprime = parseInt(nbSeats.value) * surprime_V2;
                                    }
                                }
                            } else if (((powerInput >= 15 && powerInput <= 23) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 11 && powerInput <= 16) && energy === 'Diesel')) {
                                if (zone === 'zone rouge') {
                                    if (classType === 'classe1') {
                                        prime_RC = 85329;
                                        surprime = parseInt(nbSeats.value) * surprime_R1;
                                    } else {
                                        prime_RC = 81266;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    }
                                } else {
                                    if (classType === 'classe1') {
                                        prime_RC = 81266;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    } else {
                                        prime_RC = 77396;
                                        surprime = parseInt(nbSeats.value) * surprime_V2;
                                    }
                                }
                            } else if (((powerInput >= 24) && (energy === 'Essence' || energy === 'Electric')) || ((powerInput >= 17) && energy === 'Diesel')) {
                                if (zone === 'zone rouge') {
                                    if (classType === 'classe1') {
                                        prime_RC = 100097;
                                        surprime = parseInt(nbSeats.value) * surprime_R1;
                                    } else {
                                        prime_RC = 95331;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    }
                                } else {
                                    if (classType === 'classe1') {
                                        prime_RC = 95331;
                                        surprime = parseInt(nbSeats.value) * surprime_R2_V1;
                                    } else {
                                        prime_RC = 90791;
                                        surprime = parseInt(nbSeats.value) * surprime_V2;
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
            break;
        case "Véhicules 'WW' Garages":
            if (zone === 'zone rouge') {
                prime_RC = 114137;
            } else if (zone === 'zone verte') {
                prime = 108702;
            }
            break;
        case 'Véhicule Auto-École':
            switch (category.value) {
                case 'Promenade & Affaires':
                    if (powerInput <= 2) {
                        prime_RC = (zone === 'zone rouge') ? 42725 : 40690;
                    } else if (powerInput <= 6) {
                        prime_RC = (zone === 'zone rouge') ? 48337 : 46035;
                    } else if (powerInput <= 10) {
                        prime_RC = (zone === 'zone rouge') ? 53015 : 50490;
                    } else if (powerInput <= 14) {
                        prime_RC = (zone === 'zone rouge') ? 64241 : 61182;
                    } else if (powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 81081 : 77220;
                    }
                    else {
                        prime_RC = (zone === 'zone rouge') ? 95114 : 90585;
                    }
                    break;
                case 'Transport Propre Compte':
                    if (3 <= powerInput && powerInput <= 6) {
                        prime_RC = (zone === 'zone rouge') ? 64241 : 61182;
                    } else if (powerInput <= 10) {
                        prime_RC = (zone === 'zone rouge') ? 72661 : 69201;
                    } else if (powerInput <= 14) {
                        prime_RC = (zone === 'zone rouge') ? 99792 : 95040;
                    } else if (powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 125676 : 119691;
                    }
                    else {
                        prime_RC = (zone === 'zone rouge') ? 146570 : 139590;
                    }
                    break;
                case 'Transport Public de Marchandises':
                    if (15 <= powerInput && powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 165281 : 157410;
                    }
                    else {
                        prime_RC = (zone === 'zone rouge') ? 193347 : 184140;
                    }
                    break;
                default:
                    prime_RC = 0;
                    break;
            }
            break;
        case 'Véhicule de Location':
            switch (category.value) {
                case 'Promenade & Affaires':
                    if (powerInput <= 2) {
                        prime_RC = (zone === 'zone rouge') ? 68358 : 65103;
                    } else if (powerInput <= 6) {
                        prime_RC = (zone === 'zone rouge') ? 77108 : 73436;
                    } else if (powerInput <= 10) {
                        prime_RC = (zone === 'zone rouge') ? 84823 : 80784;
                    } else if (powerInput <= 14) {
                        prime_RC = (zone === 'zone rouge') ? 102786 : 97891;
                    } else if (powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 129730 : 123552;
                    }
                    else {
                        prime_RC = (zone === 'zone rouge') ? 152183 : 144936;
                    }
                    break;
                case 'Transport Propre Compte':
                    if (3 <= powerInput && powerInput <= 6) {
                        prime_RC = (zone === 'zone rouge') ? 114462 : 109011;
                    } else if (powerInput <= 10) {
                        prime_RC = (zone === 'zone rouge') ? 129953 : 123765;
                    } else if (powerInput <= 14) {
                        prime_RC = (zone === 'zone rouge') ? 179876 : 171310;
                    } else if (powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 227500 : 216667;
                    }
                    else {
                        prime_RC = (zone === 'zone rouge') ? 265946 : 253282;
                    }
                    break;
                case 'Transport Public de Marchandises':
                    if (15 <= powerInput && powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 300374 : 286070;
                    }
                    else {
                        prime_RC = (zone === 'zone rouge') ? 352017 : 335254;
                    }
                    break;
                default:
                    prime_RC = 0;
                    break;
            }
            break;
        case 'Engins de Chantiers':
            console.log('djdj')
            if (powerInput <= 6) {
                prime_RC = zone === 'zone rouge' ? 26257 : 25007;
            } else if (powerInput <= 10) {
                prime_RC = zone === 'zone rouge' ? 29064 : 27680;
            } else if (powerInput <= 14) {
                prime_RC = zone === 'zone rouge' ? 39917 : 38016;
            } else if (powerInput <= 23) {
                prime_RC = zone === 'zone rouge' ? 50270 : 47876;
            } else {
                prime_RC = zone === 'zone rouge' ? 58628 : 55836;
            }

            break;
        case 'Véhicules Spéciaux':
            switch (special_category.value) {
                case 'Ambulances':
                case 'Corbillards':
                case 'Fourgons funéraires':
                    if (powerInput <= 14) {
                        prime_RC = (zone === 'zone rouge') ? 51392 : 48945;
                    } else if (powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 64865 : 61776;
                    } else {
                        prime_RC = (zone === 'zone rouge') ? 76091 : 72468;
                    }
                    break;
                case 'Arroseuses':
                case 'Balayeuses':
                case 'Véhicules municipaux':
                    if (powerInput <= 14) {
                        prime_RC = (zone === 'zone rouge') ? 79834 : 76032;
                    } else if (powerInput <= 23) {
                        prime_RC = (zone === 'zone rouge') ? 100540 : 95752;
                    } else {
                        prime_RC = (zone === 'zone rouge') ? 117256 : 111672;
                    }
                    break;
                case 'Tracteurs agricoles':
                    document.getElementById('power').max = 10;

                    if (can_drive.value === 'Yes') {
                        if (powerInput <= 2) {
                            prime_RC = (zone === 'zone rouge') ? 55883 : 53222;
                        } else if (powerInput <= 6) {
                            prime_RC = (zone === 'zone rouge') ? 70291 : 66944;
                        } else {
                            prime_RC = (zone === 'zone rouge') ? 82079 : 78170;
                        }
                    } else {
                        if (powerInput <= 2) {
                            prime_RC = 38016;
                        } else if (powerInput <= 6) {
                            prime_RC = 55836;
                        } else {
                            prime_RC = 55836;
                        }
                    }
                    document.getElementById('power').max = 1000;
                    break;
                case 'Karts':

                    if (owner.checked) {
                        prime_RC = 20700;
                    } else if (rental.checked) {
                        prime_RC = 29700;
                    }
                    else {
                        prime_RC = 0;
                    }
                    break;

                default:
                    break;
            }
            break;
        case 'Véhicule 2/3 Roues Personnel':
            switch (twoWheelsVehicles.value) {
                case 'Cyclomoteur':
                    if (powerInput <= 50) {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 10716 : 13608;
                                } else {
                                    prime_RC = (unpaid.checked) ? 10206 : 12960;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 10206 : 13608;
                                } else {
                                    prime_RC = (unpaid.checked) ? 9720 : 12960;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 11252 : 14288;
                                } else {
                                    prime_RC = (unpaid.checked) ? 10716 : 13608;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 10716 : 14288;
                                } else {
                                    prime_RC = (unpaid.checked) ? 10206 : 13608;
                                }
                            }
                        }
                    } else if (powerInput <= 75) {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 17861 : 23814;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17010 : 22680;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 17010 : 23814;
                                } else {
                                    prime_RC = (unpaid.checked) ? 16200 : 22680;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 18754 : 25005;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17861 : 23814;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 17861 : 25005;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17010 : 23814;
                                }
                            }
                        }
                    }

                    break;
                case 'Scooter':
                    if (powerInput <= 250) {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 22385 : 30278;
                                } else {
                                    prime_RC = (unpaid.checked) ? 21319 : 28836;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 21319 : 30278;
                                } else {
                                    prime_RC = (unpaid.checked) ? 20304 : 28836;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 23504 : 31792;
                                } else {
                                    prime_RC = (unpaid.checked) ? 22385 : 30278;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 22385 : 31792;
                                } else {
                                    prime_RC = (unpaid.checked) ? 21319 : 30278;
                                }
                            }
                        }
                    }
                    break;
                case 'Triporteur':
                    if (powerInput <= 125) {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 19766 : 34247;
                                } else {
                                    prime_RC = (unpaid.checked) ? 18824 : 32616;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 18824 : 34247;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17928 : 32616;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 20754 : 35959;
                                } else {
                                    prime_RC = (unpaid.checked) ? 19766 : 34247;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 19766 : 35959;
                                } else {
                                    prime_RC = (unpaid.checked) ? 18824 : 34247;
                                }
                            }
                        }
                    }
                    break;
                case 'Vélomoteur':
                    if (powerInput <= 125) {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 17861 : 23814;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17010 : 22680;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 17010 : 23814;
                                } else {
                                    prime_RC = (unpaid.checked) ? 16200 : 22680;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 18754 : 25005;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17861 : 23814;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 17861 : 25005;
                                } else {
                                    prime_RC = (unpaid.checked) ? 17010 : 23814;
                                }
                            }
                        }
                    }

                    break;
                case 'Motocyclette':
                    console.log('e');
                    if (powerInput === '2') {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 28101 : 50123;
                                } else {
                                    prime_RC = (unpaid.checked) ? 26762 : 47736;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 26762 : 50123;
                                } else {
                                    prime_RC = (unpaid.checked) ? 25488 : 47736;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 29506 : 52629;
                                } else {
                                    prime_RC = (unpaid.checked) ? 28101 : 50123;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 28101 : 52629;
                                } else {
                                    prime_RC = (unpaid.checked) ? 26762 : 50123;
                                }
                            }
                        }
                    }
                    if (powerInput === '3') {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 30958 : 55666;
                                } else {
                                    prime_RC = (unpaid.checked) ? 29484 : 52920;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 29484 : 55666;
                                } else {
                                    prime_RC = (unpaid.checked) ? 28080 : 52920;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 32506 : 58344;
                                } else {
                                    prime_RC = (unpaid.checked) ? 30958 : 55666;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 30958 : 58344;
                                } else {
                                    prime_RC = (unpaid.checked) ? 29484 : 55666;
                                }
                            }
                        }
                    }
                    if (powerInput === '4') {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 37864 : 68720;
                                } else {
                                    prime_RC = (unpaid.checked) ? 36061 : 65448;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 36061 : 68720;
                                } else {
                                    prime_RC = (unpaid.checked) ? 34344 : 65448;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 39757 : 72156;
                                } else {
                                    prime_RC = (unpaid.checked) ? 37864 : 68720;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 37864 : 72156;
                                } else {
                                    prime_RC = (unpaid.checked) ? 36061 : 68720;
                                }
                            }
                        }
                    }
                    if (powerInput === '5') {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 40246 : 73256;
                                } else {
                                    prime_RC = (unpaid.checked) ? 38329 : 69768;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 38329 : 73256;
                                } else {
                                    prime_RC = (unpaid.checked) ? 36504 : 69768;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 42258 : 76919;
                                } else {
                                    prime_RC = (unpaid.checked) ? 40246 : 73256;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 40246 : 76919;
                                } else {
                                    prime_RC = (unpaid.checked) ? 38329 : 73256;
                                }
                            }
                        }
                    }
                    if (powerInput === '6') {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 44056 : 80514;
                                } else {
                                    prime_RC = (unpaid.checked) ? 41958 : 76680;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 41958 : 80514;
                                } else {
                                    prime_RC = (unpaid.checked) ? 39960 : 76680;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 46259 : 84540;
                                } else {
                                    prime_RC = (unpaid.checked) ? 44056 : 80514;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 44056 : 84540;
                                } else {
                                    prime_RC = (unpaid.checked) ? 41958 : 80514;
                                }
                            }
                        }
                    }
                    if (parseInt(powerInput) >= 7) {
                        if (zone === 'zone verte') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 49057 : 90040;
                                } else {
                                    prime_RC = (unpaid.checked) ? 46721 : 85752;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 46721 : 90040;
                                } else {
                                    prime_RC = (unpaid.checked) ? 44496 : 85752;
                                }
                            }
                        } else if (zone === 'zone rouge') {
                            if (status === 'Statut1') {
                                if (classType === 'classe1') {
                                    prime_RC = (unpaid.checked) ? 51510 : 94542;
                                } else {
                                    prime_RC = (unpaid.checked) ? 49057 : 90040;
                                }
                            } else {
                                if (classType == 'classe1') {
                                    prime_RC = (unpaid.checked) ? 49057 : 94542;
                                } else {
                                    prime_RC = (unpaid.checked) ? 46721 : 90040;
                                }
                            }
                        }
                    }
                    break;
            }
            break;
        default:
            break;
    }

    if (surprime != 0) {
        let prime_nette = parseInt(prime_RC) + parseInt(surprime);
        // document.getElementById("result").innerHTML += " <br/>" + "Surprime : " + surprime;
        // document.getElementById("result").innerHTML += " <br/>" + " Prime nette :  " + prime_nette;
        prime_RC = prime_nette;
    }
    document.getElementById("result").value = prime_RC;
    console.log(prime_RC);
});

// Si la validation JavaScript réussit, soumettez le formulaire manuellement
