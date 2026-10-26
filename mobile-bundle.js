window.__ssMobileBundleReached=true;
/* Embedded by build-mobile.cjs. This file alone is not the bookmarklet. */
(async () => {
  if (location.protocol !== 'https:' || location.hostname !== 'www.ea.com' || !location.pathname.includes('/ultimate-team/web-app')) {
    alert('Ouvre la Web App EA dans Chrome et connecte-toi avant de lancer SnippingSoul.'); return;
  }
  if (window.__ssMobileActive) { alert('SnippingSoul est déjà chargé. Actualise la page pour le relancer.'); return; }
  if (window.__ssMobileLoading) return;
  if (typeof services === 'undefined' || typeof UTPaginatedItemListView === 'undefined') {
    alert('La Web App EA n’est pas prête. Connecte-toi et ouvre le marché des transferts, puis relance le signet.'); return;
  }
  window.__ssMobileLoading = true;
  try {
    const key = prompt('SnippingSoul mobile — Ta clé LicenseGate :');
    if (!key?.trim()) return;
    if (key.trim().length > 256) { alert('Clé trop longue.'); return; }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let result;
    try {
      const response = await window.fetch('https://api.licensegate.io/license/a299c/' + encodeURIComponent(key.trim()) + '/verify', { credentials: 'omit', cache: 'no-store', redirect: 'error', signal: controller.signal });
      if (!response.ok) throw new Error('LicenseGate indisponible (HTTP ' + response.status + ').');
      result = await response.json();
    } finally { clearTimeout(timeout); }
    if (result.valid !== true || result.result !== 'VALID') { alert('Licence refusée. Vérifie ta clé et sa validité.'); return; }

    // Neither the key nor an activity history is persisted by this adapter.
    const assets = {"SnippingSoulOptions.html":"<!DOCTYPE html>\r\n<html lang=\"fr\">\r\n<head>\r\n    <style>\r\nbody {\r\n\t margin: 0;\r\n   font-family: UltimateTeamCondensed,sans-serif;\r\n\t -webkit-font-smoothing: antialiased;\r\n\t -moz-osx-font-smoothing: grayscale;\r\n\t background-color: #161418;\r\n\t color: #eee;\r\n\t user-select: none;\r\n}\r\n\r\n .nft {\r\n\t user-select: none;\r\n   margin-top: 1%;\r\n   margin-right: 1%;\r\n\t border: 1px solid #fff 22;\r\n\t background-color: #282c34;\r\n\t background: linear-gradient(0deg, rgba(40, 44, 52, 1) 0%, rgba(17, 0, 32, .5) 100%);\r\n\t box-shadow: 0 7px 20px 5px #000 88;\r\n\t border-radius: 0.7rem;\r\n\t backdrop-filter: blur(7px);\r\n\t -webkit-backdrop-filter: blur(7px);\r\n\t overflow: hidden;\r\n\t transition: 0.5s all;\r\n}\r\n .nft hr {\r\n\t width: 100%;\r\n\t border: none;\r\n\t border-bottom: 1px solid #888 55;\r\n\t margin-top: 0;\r\n}\r\n .nft ins {\r\n\t text-decoration: none;\r\n}\r\n .nft .main {\r\n\t display: grid;\r\n\t flex-direction: column;\r\n   \r\n\t /*width: 90%;*/\r\n\t padding: 0.5rem;\r\n   /*margin-left: 2%;*/\r\n}\r\n .nft .main .tokenImage {\r\n\t border-radius: 0.5rem;\r\n\t max-width: 100%;\r\n\t height: 250px;\r\n\t object-fit: cover;\r\n}\r\n .nft .main .SnippingSoulDescription {\r\n\t margin: 0.5rem 0;\r\n\t color: white;\r\n}\r\n .nft .main .tokenInfo {\r\n\t display: flex;\r\n\t justify-content: space-between;\r\n\t align-items: center;\r\n}\r\n .nft .main .tokenInfo .price {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t color: #fff700;\r\n\t font-weight: 700;\r\n}\r\n .nft .main .tokenInfo .price ins {\r\n\t margin-left: -0.3rem;\r\n\t margin-right: 0.5rem;\r\n}\r\n .nft .main .tokenInfo .duration {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t color: #a89ec9;\r\n\t margin-right: 0.2rem;\r\n}\r\n .nft .main .tokenInfo .duration ins {\r\n\t margin: 0.5rem;\r\n\t margin-bottom: 0.4rem;\r\n}\r\n .nft .main .creator {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t margin-top: 0.2rem;\r\n\t margin-bottom: -0.3rem;\r\n}\r\n .nft .main .creator ins {\r\n\t color: #a89ec9;\r\n\t text-decoration: none;\r\n}\r\n .nft .main .creator .wrapper {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t border: 1px solid #fff 22;\r\n\t padding: 0.3rem;\r\n\t margin: 0;\r\n\t margin-right: 0.5rem;\r\n\t border-radius: 100%;\r\n\t box-shadow: inset 0 0 0 4px #000 aa;\r\n}\r\n .nft .main .creator .wrapper img {\r\n\t border-radius: 100%;\r\n\t border: 1px solid #fff 22;\r\n\t width: 2rem;\r\n\t height: 2rem;\r\n\t object-fit: cover;\r\n\t margin: 0;\r\n}\r\n .nft ::before {\r\n\t position: fixed;\r\n\t content: \"\";\r\n\t box-shadow: 0 0 100px 40px #fff 8;\r\n\t top: -10%;\r\n\t left: -100%;\r\n\t transform: rotate(-45deg);\r\n\t height: 60rem;\r\n\t transition: 0.7s all;\r\n}\r\n .nft:hover {\r\n\t border: 1px solid #fff 44;\r\n\t box-shadow: 0 7px 50px 10px #000 aa;\r\n\t transform: scale(1.01);\r\n\t filter: brightness(1.2);\r\n}\r\n .nft:hover ::before {\r\n\t filter: brightness(0.5);\r\n\t top: -100%;\r\n\t left: 200%;\r\n}\r\n .bg {\r\n\t position: fixed;\r\n\t top: 50%;\r\n\t left: 50%;\r\n\t transform: translate(-50%, -50%);\r\n}\r\n .bg h1 {\r\n\t font-size: 20rem;\r\n\t filter: opacity(0.5);\r\n}\r\n \r\n.nft::placeholder{\r\n  text-align: center;\r\n  color: #787878;\r\n}\r\n.roundedBtn {\r\n\t font-family: \"Quicksand\", sans-serif;\r\n\t display: block;\r\n\t padding: 15px 35px;\r\n\t border: 2px solid #fff700;\r\n\t background: #fff0;\r\n\t border-radius: 30px;\r\n\t font-size: 1em;\r\n\t font-weight: 500;\r\n\t color: #fff700;\r\n\t transition: 0.3s ease-in-out;\r\n}\r\n .roundedBtn:hover {\r\n\t background: #fff700;\r\n\t color: #000;\r\n\t cursor: pointer;\r\n}\r\n\r\n    </style>\r\n    \r\n</head>\r\n<body>\r\n  <div style=\"display: grid;grid-template-columns: 0.5fr 1fr;\">\r\n      <div class=\"nft\">\r\n          <div class=\"main\">\r\n            <h2 style=\"text-align: center;\">Raccourcis</h2>\r\n              <p class=\"SnippingSoulDescription\" style=\"text-align: center;\"> Personnalisez vos raccourcis pour agir en une seule touche. </p>\r\n              <div style=\"height: 100%;width: 100%;display: grid;\">\r\n                \r\n                <div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Rechercher </span> <input type=\"text\" class=\"SearchInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div>\r\n                 <div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Enchère min. (+) </span> <input type=\"text\" class=\"MinBidPlusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Enchère min. (-) </span> <input type=\"text\" class=\"MinBidMinusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Enchère max. (+) </span> <input type=\"text\" class=\"MaxBidPlusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Enchère max. (-) </span> <input type=\"text\" class=\"MaxBidMinusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Achat immédiat min. (+) </span> <input type=\"text\" class=\"BuyNowMinPlusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Achat immédiat min. (-) </span> <input type=\"text\" class=\"BuyNowMinMinusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Achat immédiat max. (+) </span> <input type=\"text\" class=\"BuyNowMaxPlusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Achat immédiat min. (-) </span> <input type=\"text\" class=\"BuyNowMaxMinusInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Achat immédiat </span> <input type=\"text\" class=\"BuyNowInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div><div style=\"display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;\"> \r\n                    <span style=\"align-self: center;padding-left: 5%;\"> Enchérir </span> <input type=\"text\" class=\"MakeBidInput\" name=\"inputTextOptions\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div>\r\n            </div>\r\n            </div>\r\n          </div>\r\n          <div style=\"display: grid;grid-template-columns: 1fr 1fr;\">\r\n          <div class=\"nft\">\r\n            <div class=\"main\" style=\"display: grid;\">\r\n              <h2 style=\"text-align: center;\">\r\n                <span> Raccourcis </span>\r\n                <span style=\"color: #fff700;\">Fonctions avancées</span>\r\n              </h2>\r\n              <p class=\"SnippingSoulDescription\" style=\"text-align: center;\">This section shows the hotkeys of Premium features. You can use these features in the free trial or by purchasing SnippingSoul Premium. With the latest versions, Show Auto Sniper Bot and Emergency Exit have become buttons available directly on the transfer market page, you can still use these hotkeys for convenience.</p>\r\n              <div class=\"tokenInfo\">\r\n                <div class=\"price\">\r\n                  <p>Afficher l’assistant d’achat</p>\r\n                </div>\r\n                <div class=\"duration\">\r\n                  <input class=\"AutoSniperBotKey\" name=\"inputTextOptions\" type=\"text\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div>\r\n              </div>\r\n              <div class=\"tokenInfo\">\r\n                <div class=\"price\">\r\n                  <p>Arrêt d’urgence</p>\r\n                </div>\r\n                <div class=\"duration\">\r\n                  <input class=\"EmergencyExit\" name=\"inputTextOptions\" type=\"text\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div>\r\n              </div>\r\n              <div class=\"tokenInfo\">\r\n                <div class=\"price\">\r\n                  <p> Achat manuel </p> \r\n                </div>\r\n                <div class=\"duration\">\r\n                  <input class=\"ManualSnipeKey\" name=\"inputTextOptions\" type=\"text\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                </div>\r\n              </div>\r\n              <div class=\"tokenInfo\" style=\"margin-top: 5%;overflow: auto;\">\r\n                <div class=\"price\">\r\n                  <p> Vendre </p> \r\n                </div>\r\n                <div class=\"duration\">\r\n                  <input class=\"SellInputKey\" name=\"inputTextOptions\" type=\"text\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"non attribué\" readonly=\"\">\r\n                  <input class=\"SellStartPrice\" name=\"sellInputStartPrice\" type=\"text\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"Prix de départ\">\r\n                  <input class=\"SellBuyNowPrice\" name=\"sellBuyNowPrice\" type=\"text\" style=\"height: 2em;width: 9em;text-align: center;\" placeholder=\"Prix d’achat immédiat\">\r\n                </div>\r\n              </div>\r\n              <div style=\"bottom: 0;position: fixed;justify-self: center;\">\r\n                <p class=\"SnippingSoulDescription\" style=\"text-align: center;\">Gardez cette fenêtre ouverte au premier plan pendant les achats.</p>\r\n              </div>\r\n              \r\n            </div>\r\n          </div>\r\n          <div class=\"nft\">\r\n            <div class=\"main\" style=\"display: grid;\">\r\n              <h2 style=\"text-align: center;\">\r\n                <span> Parrainage SnippingSoul | </span>\r\n                <span style=\"color: #fff700;\"> Vos récompenses</span>\r\n              </h2>\r\n              <h2 style=\"text-align: center;margin-top: auto;\">①</h2>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: #fff700;\">\r\n                <a href=\"about:blank#removed-promotion\" class=\"description joinLink\" style=\"text-align: center;color: #fff700;\" target=\"_blank\">Envoyer un lien de parrainage</a> \r\n                <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: white;\"> to your friends</span>\r\n              </span>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: white;\">Your friend receives \r\n                <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: #fff700;\">des réductions</span> \r\n              </span>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: #fff700;\">You get 15 days of Premium free\r\n                <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: white;\">pour chaque mois</span> \r\n              </span>\r\n              \r\n              <h2 style=\"text-align: center;margin-top: auto;\">②</h2>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: #fff700;\">Donner une note <a href=\"about:blank#removed-promotion\" target=\"_blank\" style=\"color: #fff700;\">sur Chrome</a> ⭐⭐⭐⭐⭐\r\n                <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: white;\">| You get 7 days of Premium free</span>\r\n              </span>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: white;\">Envoyer une capture sur <a href=\"about:blank#removed-promotion\" target=\"_blank\" style=\"color: #fff700;\">Instagram</a> get your rewards</span>\r\n\r\n              <h2 style=\"text-align: center;margin-top: auto;\">③</h2>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: #fff700;\">Send us your best snipes and profits on <a href=\"about:blank#removed-promotion\" target=\"_blank\" style=\"color: #fff700;\">Instagram</a></span>\r\n              <span class=\"SnippingSoulDescription\" style=\"text-align: center;color: white;\">Récompenses du concours mensuel</span>\r\n              <hr>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"nft\">\r\n            <div class=\"main\">\r\n              <h2 style=\"text-align: center;\">\r\n                <span> How to use |</span>\r\n                <span style=\"color: #fff700;\">Tutoriel et questions fréquentes </span>\r\n              </h2>\r\n              <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Q0xG0dFbZtk?si=lwYpsYEtSf5FERB0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" style=\"justify-self: center;\"></iframe>              \r\n\r\n              <p class=\"SnippingSoulDescription\" style=\"text-align: center;\">Watch our tutorial available in <a href=\"https://www.youtube.com/watch?v=Q0xG0dFbZtk\" target=\"_blank\" style=\"color: #fff700;\">English</a> and <a href=\"https://www.youtube.com/watch?v=I-TFZ5quAmA\" target=\"_blank\" style=\"color: #fff700;\">Italian</a> on how to install and use SnippingSoul.\r\n                You can also find the step-by-step written guide <a href=\"about:blank#removed-promotion\" target=\"_blank\" style=\"color: #fff700;\">on our website</a> .\r\n                If you have any questions about how to operate the bot, write to us on <a href=\"about:blank#removed-promotion\" target=\"_blank\" style=\"color: #fff700;\">Instagram</a> and we will help you.</p>\r\n              <hr>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"nft\">\r\n            <div class=\"main\" style=\"display: grid;grid-template-rows: 0fr 0.5fr 1.5fr 0.5fr;\">\r\n              <h2 style=\"text-align: center;\">SnippingSoul — fonctions avancées </h2>\r\n              <p class=\"SnippingSoulDescription\" style=\"text-align: center;\">Votre assistant pour le marché des transferts.</p>\r\n              <div classs=\"divRoundedBtnGetPremium\" style=\"text-align: -webkit-center;padding: 30px;\">\r\n                <a class=\"roundedBtn\" href='about:blank#removed-promotion' target=\"_blank\">Fonctions avancées</a>\r\n              </div>\r\n              <div class=\"divPremiumStatus\" style=\"padding: inherit;\">\r\n                <p style=\"display: inline;\">État :</p>\r\n                <p style=\"display: inline; color: green\" class=\"premiumStatusValue\"> Active</p>\r\n                <p style=\"display: inline;color: #ff9900;float: right;\" class=\"timeRemainingValue\"> 20 days</p>\r\n                <p style=\"display: inline;float: right;\">Temps restant :</p>\r\n            </div>\r\n              <div class=\"tokenInfo\" style=\"width: 101.32%;\">\r\n                <div class=\"price\" style=\"width: 100%;\">\r\n                  <input class=\"inputKey\" name=\"inputKey\" type=\"text\" style=\"height: 2em;width: 35.7em;text-align: center;border-style: solid;width: 99.36%;\" placeholder=\"Saisir une clé ici\">\r\n                </div>\r\n                <div class=\"duration\">\r\n                </div>\r\n              </div>\r\n              <button class=\"btn-standard submitKey\" style=\"background-color: #fff700;\">Activer les fonctions avancées</button>\r\n              <hr>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n</body>\r\n</html>\n<style>/* Preserve DOM nodes used by the original event handlers. */\n.nft:has(.inputKey),.nft:has(a[href*=\"referral\"]),.inputKey,.submitKey,.divPremiumStatus{display:none!important}\n</style>\n","sniperBotBidOptionPage.html":"<!DOCTYPE html>\r\n<html lang=\"fr\">\r\n<head>\r\n    <style>\r\nbody {\r\n\t margin: 0;\r\n   font-family: UltimateTeamCondensed,sans-serif;\r\n\t -webkit-font-smoothing: antialiased;\r\n\t -moz-osx-font-smoothing: grayscale;\r\n\t background-color: #161418;\r\n\t color: #eee;\r\n\t user-select: none;\r\n}\r\n\r\n .nft {\r\n\t user-select: none;\r\n   margin-top: 0.5%;\r\n   margin-right: 0.5%;\r\n\t border: 1px solid #fff 22;\r\n\t background-color: #282c34;\r\n\t background: linear-gradient(0deg, rgba(40, 44, 52, 1) 0%, rgba(17, 0, 32, .5) 100%);\r\n\t box-shadow: 0 7px 20px 5px #000 88;\r\n\t border-radius: 0.7rem;\r\n\t backdrop-filter: blur(7px);\r\n\t -webkit-backdrop-filter: blur(7px);\r\n\t overflow: hidden;\r\n\t transition: 0.5s all;\r\n}\r\n .nft hr {\r\n\t width: 100%;\r\n\t border: none;\r\n\t border-bottom: 1px solid #888 55;\r\n\t margin-top: 0;\r\n}\r\n .nft ins {\r\n\t text-decoration: none;\r\n}\r\n .nft .main {\r\n\t display: flex;\r\n\t flex-direction: column;\r\n}\r\n .nft .main .tokenImage {\r\n\t border-radius: 0.5rem;\r\n\t max-width: 100%;\r\n\t height: 250px;\r\n\t object-fit: cover;\r\n}\r\n .nft .main .description {\r\n\t margin: 0.5rem 0;\r\n\t color: #a89ec9;\r\n}\r\n .nft .main .tokenInfo {\r\n\t display: flex;\r\n\t justify-content: space-between;\r\n\t align-items: center;\r\n}\r\n .nft .main .tokenInfo .price {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t color: #ee83e5;\r\n\t font-weight: 700;\r\n}\r\n .nft .main .tokenInfo .price ins {\r\n\t margin-left: -0.3rem;\r\n\t margin-right: 0.5rem;\r\n}\r\n .nft .main .tokenInfo .duration {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t color: #a89ec9;\r\n\t margin-right: 0.2rem;\r\n}\r\n .nft .main .tokenInfo .duration ins {\r\n\t margin: 0.5rem;\r\n\t margin-bottom: 0.4rem;\r\n}\r\n .nft .main .creator {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t margin-top: 0.2rem;\r\n\t margin-bottom: -0.3rem;\r\n}\r\n .nft .main .creator ins {\r\n\t color: #a89ec9;\r\n\t text-decoration: none;\r\n}\r\n .nft .main .creator .wrapper {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t border: 1px solid #fff 22;\r\n\t padding: 0.3rem;\r\n\t margin: 0;\r\n\t margin-right: 0.5rem;\r\n\t border-radius: 100%;\r\n\t box-shadow: inset 0 0 0 4px #000 aa;\r\n}\r\n .nft .main .creator .wrapper img {\r\n\t border-radius: 100%;\r\n\t border: 1px solid #fff 22;\r\n\t width: 2rem;\r\n\t height: 2rem;\r\n\t object-fit: cover;\r\n\t margin: 0;\r\n}\r\n .nft ::before {\r\n\t position: fixed;\r\n\t content: \"\";\r\n\t box-shadow: 0 0 100px 40px #fff 8;\r\n\t top: -10%;\r\n\t left: -100%;\r\n\t transform: rotate(-45deg);\r\n\t height: 60rem;\r\n\t transition: 0.7s all;\r\n}\r\n .nft:hover {\r\n\t border: 1px solid #fff 44;\r\n\t box-shadow: 0 7px 50px 10px #000 aa;\r\n\t transform: scale(1.015);\r\n\t filter: brightness(1.2);\r\n}\r\n .nft:hover ::before {\r\n\t filter: brightness(0.5);\r\n\t top: -100%;\r\n\t left: 200%;\r\n}\r\n .bg {\r\n\t position: fixed;\r\n\t top: 50%;\r\n\t left: 50%;\r\n\t transform: translate(-50%, -50%);\r\n}\r\n .bg h1 {\r\n\t font-size: 20rem;\r\n\t filter: opacity(0.5);\r\n}\r\n \r\n.nft::placeholder{\r\n  text-align: center;\r\n  color: #787878;\r\n}\r\n\r\n.wrapper .tabs_wrap ul{\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-pack: center;\r\n            -ms-flex-pack: center;\r\n                justify-content: center;\r\n    }\r\n    \r\n    .wrapper .tabs_wrap ul li{\r\n        width: 138px;\r\n        text-align: center;\r\n        background: #f4f5ff26;\r\n        border-right: 1px solid #c1c4c9;\r\n        padding: 13px 15px;\r\n        cursor: pointer;\r\n        -webkit-transition: all 0.2s ease;\r\n        -o-transition: all 0.2s ease;\r\n        transition: all 0.2s ease;\r\n        list-style-type: none;\r\n    }\r\n\r\n    \r\n    .wrapper .tabs_wrap ul li:last-child{\r\n        border-right: 0px;\r\n    }\r\n    \r\n    .wrapper .tabs_wrap ul li:hover,\r\n    .wrapper .tabs_wrap ul li.active{\r\n        background: rgb(122, 207, 255);\r\n        color: #000;\r\n    }\r\n    \r\n    .wrapper .container .item_wrap{\r\n        padding: 10px 20px;\r\n        border-bottom: 1px solid #ebedec;\r\n        cursor: pointer;\r\n    }\r\n    \r\n    .wrapper .container .item_wrap:hover{\r\n        background: #e9ecf1;\r\n    }\r\n    \r\n    .wrapper .container .itemDiv2{\r\n        position: relative;\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-align: center;\r\n            -ms-flex-align: center;\r\n                align-items: center;\r\n        -webkit-box-pack: justify;\r\n            -ms-flex-pack: justify;\r\n                justify-content: space-between;\r\n    }\r\n    \r\n    .item_wrap .itemDiv2 .item_left{\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-align: center;\r\n            -ms-flex-align: center;\r\n                align-items: center;\r\n    }\r\n    \r\n    .item_wrap .item_left img{\r\n        width: 70px;\r\n        height: 70px;\r\n        display: block;\r\n    }\r\n    \r\n    .item_wrap .item_left .data{\r\n        margin-left: 20px;\r\n    }\r\n    \r\n    .item_wrap .item_left .data .name{\r\n        font-weight: 600;\r\n    }\r\n    \r\n    .item_wrap .item_left .data .distance{\r\n        color: #7f8b9b;\r\n        font-size: 14px;\r\n        margin-top: 3px;\r\n    }\r\n    \r\n    .item_wrap .item_right .status{\r\n        position: relative;\r\n        color: #77818d;\r\n    }\r\n    \r\n    .item_wrap .item_right .status:before{\r\n        content: \"\";\r\n        position: absolute;\r\n        top: 5px;\r\n        left: -12px;\r\n        width: 8px;\r\n        height: 8px;\r\n        border-radius: 50%;\r\n        background: #b3bbc8;\r\n    }\r\n    \r\n    .item_wrap.offline .item_right .status{\r\n        color: #b3bbc8;\t\r\n    }\r\n    \r\n    .item_wrap.online .item_right .status:before{\r\n        background: #7fc469;\r\n    }\r\n    .glass-btn{\r\n        display: inline-block;\r\n        text-decoration: none;\r\n        border-radius: 15px;\r\n        background-color: rgba(255,255,255,0.1);\r\n        border: 1px solid rgba(255,255,255,0.1);\r\n        backdrop-filter: blur(30px);\r\n        color: rgba(255,255,255,0.8);\r\n        font-size: 14px;\r\n        letter-spacing: 2px;\r\n        cursor: pointer;\r\n        text-transform: uppercase;\r\n        width: 30%;\r\n        height: 2.5em;\r\n        margin-right: 2%;\r\n    }\r\n    .glass-btn:hover{\r\n        background-color: rgba(232, 236, 0, 0.877);\r\n        color: #000;\r\n    }\r\n\r\n    .range__slider {\r\n\t position: relative;\r\n\t width: 100%;\r\n\t height: calc(65px - 10px);\r\n\t display: flex;\r\n\t justify-content: center;\r\n\t align-items: center;\r\n\t background: rgba(255, 255, 255, 0.08);\r\n\t border-radius: 8px;\r\n\t margin-top: 3%;\r\n     margin-bottom: 6%;\r\n}\r\n .range__slider::before, .range__slider::after {\r\n\t position: absolute;\r\n\t color: #fff;\r\n\t font-size: 0.9rem;\r\n\t font-weight: bold;\r\n}\r\n .range__slider::before {\r\n\t content: attr(data-min);\r\n\t left: 10px;\r\n}\r\n .range__slider::after {\r\n\t content: attr(data-max);\r\n\t right: 10px;\r\n}\r\n .range__slider .length__titleLoop::after {\r\n\t content: attr(data-length) \" tours\";\r\n\t position: absolute;\r\n\t right: -85px;\r\n\t font-variant-numeric: tabular-nums;\r\n\t color: rgb(122, 207, 255);\r\n}\r\n.range__slider .length__titleSeconds::after {\r\n\t content: attr(data-length) \" secondes\";\r\n\t position: absolute;\r\n\t right: -85px;\r\n\t font-variant-numeric: tabular-nums;\r\n\t color: rgb(122, 207, 255);\r\n}\r\n\r\n.range__slider .length__titleTimeRemaining::after {\r\n\t content: attr(data-length) \"\";\r\n\t position: absolute;\r\n\t right: -85px;\r\n\t font-variant-numeric: tabular-nums;\r\n\t color: rgb(122, 207, 255);\r\n}\r\n #slider {\r\n\t width: calc(100% - (70px));\r\n\t height: 2px;\r\n\t border-radius: 5px;\r\n\t background: rgba(255, 255, 255, 0.314);\r\n\t outline: none;\r\n\t padding: 0;\r\n\t margin: 0;\r\n\t cursor: pointer;\r\n}\r\n #slider::-webkit-slider-thumb {\r\n\t width: 20px;\r\n\t height: 20px;\r\n\t border-radius: 50%;\r\n\t background: #fff;\r\n\t cursor: pointer;\r\n\t transition: all 0.15s ease-in-out;\r\n}\r\n #slider::-webkit-slider-thumb:hover {\r\n\t background: #d4d4d4;\r\n\t transform: scale(1.2);\r\n}\r\n #slider::-moz-range-thumb {\r\n\t width: 20px;\r\n\t height: 20px;\r\n\t border: 0;\r\n\t border-radius: 50%;\r\n\t background: #fff;\r\n\t cursor: pointer;\r\n\t transition: background 0.15s ease-in-out;\r\n}\r\n #slider::-moz-range-thumb:hover {\r\n\t background: #d4d4d4;\r\n}\r\n.field-title {\r\n\tposition: absolute;\r\n\ttop: -10px;\r\n\tleft: 8px;\r\n\ttransform: translateY(-50%);\r\n\tfont-weight: 800;\r\n\tcolor: rgba(255, 255, 255, 1);\r\n\ttext-transform: uppercase;\r\n\tfont-size: 0.65rem;\r\n\tpointer-events: none;\r\n\tuser-select: none;\r\n}\r\n.settings {\r\n\t position: relative;\r\n\t height: auto;\r\n\t display: flex;\r\n\t flex-direction: column;\r\n}\r\n .settings .setting {\r\n\t position: relative;\r\n\t width: 87%;\r\n\t height: calc(40px - 10px);\r\n\t background: rgba(255, 255, 255, 0.08);\r\n\t border-radius: 8px;\r\n\t display: flex;\r\n\t align-items: center;\r\n\t padding: 10px 25px;\r\n\t color: #fff;\r\n\t margin-bottom: 20px;\r\n}\r\n .settings .setting input {\r\n\t opacity: 0;\r\n\t position: absolute;\r\n}\r\n .settings .setting input + label {\r\n\t user-select: none;\r\n}\r\n .settings .setting input + label::before, .settings .setting input + label::after {\r\n\t content: \"\";\r\n\t position: absolute;\r\n\t transition: 150ms cubic-bezier(0.24, 0, 0.5, 1);\r\n\t transform: translateY(-50%);\r\n\t top: 50%;\r\n\t right: 10px;\r\n\t cursor: pointer;\r\n}\r\n .settings .setting input + label::before {\r\n\t height: 30px;\r\n\t width: 50px;\r\n\t border-radius: 30px;\r\n\t background: rgba(214, 214, 214, 0.434);\r\n}\r\n .settings .setting input + label::after {\r\n\t height: 24px;\r\n\t width: 24px;\r\n\t border-radius: 60px;\r\n\t right: 32px;\r\n\t background: #fff;\r\n}\r\n .settings .setting input:checked + label:before {\r\n\t background: rgb(122, 207, 255);\r\n\t transition: all 150ms cubic-bezier(0, 0, 0, 0.1);\r\n}\r\n .settings .setting input:checked + label:after {\r\n\t right: 14px;\r\n}\r\n .settings .setting input:focus + label:before {\r\n\t box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);\r\n}\r\n .settings .setting input:disabled + label:before, .settings .setting input:disabled + label:after {\r\n\t cursor: not-allowed;\r\n}\r\n .settings .setting input:disabled + label:before {\r\n\t background: #4f4f6a;\r\n}\r\n .settings .setting input:disabled + label:after {\r\n\t background: #909090;\r\n}\r\n \r\n    </style>\r\n    \r\n</head>\r\n<body>\r\n    <div class=\"main\" style=\"display: flex;justify-content: center;padding-top: 20%;margin-left: 10%;margin-right: 10%;\">\r\n        <div class=\"settings\" style=\"width: 100%;text-align: -webkit-center;\">            \r\n            <div class=\"length range__slider\" data-min=\"1\" data-max=\"50\">\r\n                <div class=\"length__titleLoop field-title\" data-length='1'>Nombre de passages sur la liste de joueurs</div>\r\n                <input id=\"slider\" type=\"range\" min=\"1\" max=\"50\" value=\"10\" class=\"sliderLoop\" />\r\n            </div>\r\n            <div class=\"length range__slider\" data-min=\"10\" data-max=\"120\">\r\n                <div class=\"length__titleSeconds field-title\" data-length='60'>Pause après chaque passage sur la liste</div>\r\n                <input id=\"slider\" type=\"range\" min=\"10\" max=\"120\" value=\"60\" class=\"sliderSeconds\"/>\r\n            </div>\r\n\t\t\t<div class=\"length range__slider\" data-min=\"0\" data-max=\"6\">\r\n                <div class=\"length__titleTimeRemaining field-title\" data-length='1'>Temps restant inférieur à</div>\r\n                <input id=\"slider\" type=\"range\" min=\"0\" max=\"6\" value=\"2\" class=\"sliderTimeRemaining\" />\r\n            </div>\r\n\t\t\t<div class=\"setting\">\r\n\t\t\t\t<input type=\"checkbox\" id=\"UseDefinedBidPrices\" name=\"UseDefinedBidPrices\"/>\r\n\t\t\t\t<label for=\"UseDefinedBidPrices\">Utiliser les enchères définies dans la liste de joueurs</label>\r\n\t\t\t</div>\r\n\t\t\t\t\r\n        </div>\r\n    </div>\r\n\r\n    \r\n    </body>\r\n    \r\n    </html>\r\n\r\n","sniperBotSnipeOptionPage.html":"<!DOCTYPE html>\r\n<html lang=\"fr\">\r\n<head>\r\n    <style>\r\nbody {\r\n\t margin: 0;\r\n   font-family: UltimateTeamCondensed,sans-serif;\r\n\t -webkit-font-smoothing: antialiased;\r\n\t -moz-osx-font-smoothing: grayscale;\r\n\t background-color: #161418;\r\n\t color: #eee;\r\n\t user-select: none;\r\n}\r\n\r\n .nft {\r\n\t user-select: none;\r\n   margin-top: 1%;\r\n   margin-right: 1%;\r\n\t border: 1px solid #fff 22;\r\n\t background-color: #282c34;\r\n\t background: linear-gradient(0deg, rgba(40, 44, 52, 1) 0%, rgba(17, 0, 32, .5) 100%);\r\n\t box-shadow: 0 7px 20px 5px #000 88;\r\n\t border-radius: 0.7rem;\r\n\t backdrop-filter: blur(7px);\r\n\t -webkit-backdrop-filter: blur(7px);\r\n\t overflow: hidden;\r\n\t transition: 0.5s all;\r\n}\r\n .nft hr {\r\n\t width: 100%;\r\n\t border: none;\r\n\t border-bottom: 1px solid #888 55;\r\n\t margin-top: 0;\r\n}\r\n .nft ins {\r\n\t text-decoration: none;\r\n}\r\n .nft .main {\r\n\t display: flex;\r\n\t flex-direction: column;\r\n}\r\n .nft .main .tokenImage {\r\n\t border-radius: 0.5rem;\r\n\t max-width: 100%;\r\n\t height: 250px;\r\n\t object-fit: cover;\r\n}\r\n .nft .main .description {\r\n\t margin: 0.5rem 0;\r\n\t color: #a89ec9;\r\n}\r\n .nft .main .tokenInfo {\r\n\t display: flex;\r\n\t justify-content: space-between;\r\n\t align-items: center;\r\n}\r\n .nft .main .tokenInfo .price {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t color: #ee83e5;\r\n\t font-weight: 700;\r\n}\r\n .nft .main .tokenInfo .price ins {\r\n\t margin-left: -0.3rem;\r\n\t margin-right: 0.5rem;\r\n}\r\n .nft .main .tokenInfo .duration {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t color: #a89ec9;\r\n\t margin-right: 0.2rem;\r\n}\r\n .nft .main .tokenInfo .duration ins {\r\n\t margin: 0.5rem;\r\n\t margin-bottom: 0.4rem;\r\n}\r\n .nft .main .creator {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t margin-top: 0.2rem;\r\n\t margin-bottom: -0.3rem;\r\n}\r\n .nft .main .creator ins {\r\n\t color: #a89ec9;\r\n\t text-decoration: none;\r\n}\r\n .nft .main .creator .wrapper {\r\n\t display: flex;\r\n\t align-items: center;\r\n\t border: 1px solid #fff 22;\r\n\t padding: 0.3rem;\r\n\t margin: 0;\r\n\t margin-right: 0.5rem;\r\n\t border-radius: 100%;\r\n\t box-shadow: inset 0 0 0 4px #000 aa;\r\n}\r\n .nft .main .creator .wrapper img {\r\n\t border-radius: 100%;\r\n\t border: 1px solid #fff 22;\r\n\t width: 2rem;\r\n\t height: 2rem;\r\n\t object-fit: cover;\r\n\t margin: 0;\r\n}\r\n .nft ::before {\r\n\t position: fixed;\r\n\t content: \"\";\r\n\t box-shadow: 0 0 100px 40px #fff 8;\r\n\t top: -10%;\r\n\t left: -100%;\r\n\t transform: rotate(-45deg);\r\n\t height: 60rem;\r\n\t transition: 0.7s all;\r\n}\r\n .nft:hover {\r\n\t border: 1px solid #fff 44;\r\n\t box-shadow: 0 7px 50px 10px #000 aa;\r\n\t transform: scale(1.015);\r\n\t filter: brightness(1.2);\r\n}\r\n .nft:hover ::before {\r\n\t filter: brightness(0.5);\r\n\t top: -100%;\r\n\t left: 200%;\r\n}\r\n .bg {\r\n\t position: fixed;\r\n\t top: 50%;\r\n\t left: 50%;\r\n\t transform: translate(-50%, -50%);\r\n}\r\n .bg h1 {\r\n\t font-size: 20rem;\r\n\t filter: opacity(0.5);\r\n}\r\n \r\n.nft::placeholder{\r\n  text-align: center;\r\n  color: #787878;\r\n}\r\n\r\n.wrapper .tabs_wrap ul{\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-pack: center;\r\n            -ms-flex-pack: center;\r\n                justify-content: center;\r\n    }\r\n    \r\n    .wrapper .tabs_wrap ul li{\r\n        width: 138px;\r\n        text-align: center;\r\n        background: #f4f5ff26;\r\n        border-right: 1px solid #c1c4c9;\r\n        padding: 13px 15px;\r\n        cursor: pointer;\r\n        -webkit-transition: all 0.2s ease;\r\n        -o-transition: all 0.2s ease;\r\n        transition: all 0.2s ease;\r\n        list-style-type: none;\r\n    }\r\n\r\n    \r\n    .wrapper .tabs_wrap ul li:last-child{\r\n        border-right: 0px;\r\n    }\r\n    \r\n    .wrapper .tabs_wrap ul li:hover,\r\n    .wrapper .tabs_wrap ul li.active{\r\n        background: #fff700;\r\n        color: #000;\r\n    }\r\n    \r\n    .wrapper .container .item_wrap{\r\n        padding: 10px 20px;\r\n        border-bottom: 1px solid #ebedec;\r\n        cursor: pointer;\r\n    }\r\n    \r\n    .wrapper .container .item_wrap:hover{\r\n        background: #e9ecf1;\r\n    }\r\n    \r\n    .wrapper .container .itemDiv2{\r\n        position: relative;\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-align: center;\r\n            -ms-flex-align: center;\r\n                align-items: center;\r\n        -webkit-box-pack: justify;\r\n            -ms-flex-pack: justify;\r\n                justify-content: space-between;\r\n    }\r\n    \r\n    .item_wrap .itemDiv2 .item_left{\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: flex;\r\n        -webkit-box-align: center;\r\n            -ms-flex-align: center;\r\n                align-items: center;\r\n    }\r\n    \r\n    .item_wrap .item_left img{\r\n        width: 70px;\r\n        height: 70px;\r\n        display: block;\r\n    }\r\n    \r\n    .item_wrap .item_left .data{\r\n        margin-left: 20px;\r\n    }\r\n    \r\n    .item_wrap .item_left .data .name{\r\n        font-weight: 600;\r\n    }\r\n    \r\n    .item_wrap .item_left .data .distance{\r\n        color: #7f8b9b;\r\n        font-size: 14px;\r\n        margin-top: 3px;\r\n    }\r\n    \r\n    .item_wrap .item_right .status{\r\n        position: relative;\r\n        color: #77818d;\r\n    }\r\n    \r\n    .item_wrap .item_right .status:before{\r\n        content: \"\";\r\n        position: absolute;\r\n        top: 5px;\r\n        left: -12px;\r\n        width: 8px;\r\n        height: 8px;\r\n        border-radius: 50%;\r\n        background: #b3bbc8;\r\n    }\r\n    \r\n    .item_wrap.offline .item_right .status{\r\n        color: #b3bbc8;\t\r\n    }\r\n    \r\n    .item_wrap.online .item_right .status:before{\r\n        background: #7fc469;\r\n    }\r\n    .glass-btn{\r\n        display: inline-block;\r\n        text-decoration: none;\r\n        border-radius: 15px;\r\n        background-color: rgba(255,255,255,0.1);\r\n        border: 1px solid rgba(255,255,255,0.1);\r\n        backdrop-filter: blur(30px);\r\n        color: rgba(255,255,255,0.8);\r\n        font-size: 14px;\r\n        letter-spacing: 2px;\r\n        cursor: pointer;\r\n        text-transform: uppercase;\r\n        width: 30%;\r\n        height: 2.5em;\r\n        margin-right: 2%;\r\n    }\r\n    .glass-btn:hover{\r\n        background-color: rgba(232, 236, 0, 0.877);\r\n        color: #000;\r\n    }\r\n\r\n    .range__slider {\r\n\t position: relative;\r\n\t width: 100%;\r\n\t height: calc(65px - 10px);\r\n\t display: flex;\r\n\t justify-content: center;\r\n\t align-items: center;\r\n\t background: rgba(255, 255, 255, 0.08);\r\n\t border-radius: 8px;\r\n\t margin-top: 3%;\r\n     margin-bottom: 6%;\r\n}\r\n .range__slider::before, .range__slider::after {\r\n\t position: absolute;\r\n\t color: #fff;\r\n\t font-size: 0.9rem;\r\n\t font-weight: bold;\r\n}\r\n .range__slider::before {\r\n\t content: attr(data-min);\r\n\t left: 10px;\r\n}\r\n .range__slider::after {\r\n\t content: attr(data-max);\r\n\t right: 10px;\r\n}\r\n .range__slider .length__titleLoop::after {\r\n\t content: attr(data-length) \" tours\";\r\n\t position: absolute;\r\n\t right: -85px;\r\n\t font-variant-numeric: tabular-nums;\r\n\t color: #fff700;\r\n}\r\n.range__slider .length__titleSeconds::after {\r\n\t content: attr(data-length) \" secondes\";\r\n\t position: absolute;\r\n\t right: -85px;\r\n\t font-variant-numeric: tabular-nums;\r\n\t color: #fff700;\r\n}\r\n #slider {\r\n\t width: calc(100% - (70px));\r\n\t height: 2px;\r\n\t border-radius: 5px;\r\n\t background: rgba(255, 255, 255, 0.314);\r\n\t outline: none;\r\n\t padding: 0;\r\n\t margin: 0;\r\n\t cursor: pointer;\r\n}\r\n #slider::-webkit-slider-thumb {\r\n\t width: 20px;\r\n\t height: 20px;\r\n\t border-radius: 50%;\r\n\t background: #fff;\r\n\t cursor: pointer;\r\n\t transition: all 0.15s ease-in-out;\r\n}\r\n #slider::-webkit-slider-thumb:hover {\r\n\t background: #d4d4d4;\r\n\t transform: scale(1.2);\r\n}\r\n #slider::-moz-range-thumb {\r\n\t width: 20px;\r\n\t height: 20px;\r\n\t border: 0;\r\n\t border-radius: 50%;\r\n\t background: #fff;\r\n\t cursor: pointer;\r\n\t transition: background 0.15s ease-in-out;\r\n}\r\n #slider::-moz-range-thumb:hover {\r\n\t background: #d4d4d4;\r\n}\r\n.field-title {\r\n\tposition: absolute;\r\n\ttop: -10px;\r\n\tleft: 8px;\r\n\ttransform: translateY(-50%);\r\n\tfont-weight: 800;\r\n\tcolor: white;\r\n\ttext-transform: uppercase;\r\n\tfont-size: 0.65rem;\r\n\tpointer-events: none;\r\n\tuser-select: none;\r\n}\r\n.settings {\r\n\t position: relative;\r\n\t height: auto;\r\n\t display: flex;\r\n\t flex-direction: column;\r\n}\r\n .settings .setting {\r\n\t position: relative;\r\n\t width: 87%;\r\n\t height: calc(40px - 10px);\r\n\t background: rgba(255, 255, 255, 0.08);\r\n\t border-radius: 8px;\r\n\t display: flex;\r\n\t align-items: center;\r\n\t padding: 10px 25px;\r\n\t color: #fff;\r\n\t margin-bottom: 20px;\r\n}\r\n .settings .setting input {\r\n\t opacity: 0;\r\n\t position: absolute;\r\n}\r\n .settings .setting input + label {\r\n\t user-select: none;\r\n}\r\n .settings .setting input + label::before, .settings .setting input + label::after {\r\n\t content: \"\";\r\n\t position: absolute;\r\n\t transition: 150ms cubic-bezier(0.24, 0, 0.5, 1);\r\n\t transform: translateY(-50%);\r\n\t top: 50%;\r\n\t right: 10px;\r\n\t cursor: pointer;\r\n}\r\n .settings .setting input + label::before {\r\n\t height: 30px;\r\n\t width: 50px;\r\n\t border-radius: 30px;\r\n\t background: rgba(214, 214, 214, 0.434);\r\n}\r\n .settings .setting input + label::after {\r\n\t height: 24px;\r\n\t width: 24px;\r\n\t border-radius: 60px;\r\n\t right: 32px;\r\n\t background: #fff;\r\n}\r\n .settings .setting input:checked + label:before {\r\n\t background: #fff700cc;\r\n\t transition: all 150ms cubic-bezier(0, 0, 0, 0.1);\r\n}\r\n .settings .setting input:checked + label:after {\r\n\t right: 14px;\r\n}\r\n .settings .setting input:focus + label:before {\r\n\t box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);\r\n}\r\n .settings .setting input:disabled + label:before, .settings .setting input:disabled + label:after {\r\n\t cursor: not-allowed;\r\n}\r\n .settings .setting input:disabled + label:before {\r\n\t background: #4f4f6a;\r\n}\r\n .settings .setting input:disabled + label:after {\r\n\t background: #909090;\r\n}\r\n \r\n    </style>\r\n    \r\n</head>\r\n<body>\r\n    <div class=\"main\" style=\"display: flex;justify-content: center;padding-top: 25%;margin-left: 10%;margin-right: 10%;\">\r\n        <div class=\"settings\" style=\"width: 100%;text-align: -webkit-center;\">            \r\n            <div class=\"length range__slider\" data-min=\"0\" data-max=\"50\">\r\n                <div class=\"length__titleLoop field-title\" data-length='1'>Nombre de passages sur la liste de joueurs</div>\r\n                <input id=\"slider\" type=\"range\" min=\"0\" max=\"50\" value=\"10\" />\r\n            </div>\r\n            <div class=\"length range__slider\" data-min=\"0\" data-max=\"120\">\r\n                <div class=\"length__titleSeconds field-title\" data-length='60'>Pause après chaque passage sur la liste</div>\r\n                <input id=\"slider\" type=\"range\" min=\"0\" max=\"120\" value=\"60\" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    \r\n    </body>\r\n    \r\n    </html>\r\n\r\n","Logo.png":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNCIgZmlsbD0iIzExMzYyZCIvPjx0ZXh0IHg9IjMyIiB5PSI0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNTVlZGMxIj5TUzwvdGV4dD48L3N2Zz4=","images/cross.png":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNCIgZmlsbD0iIzExMzYyZCIvPjx0ZXh0IHg9IjMyIiB5PSI0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNTVlZGMxIj7DlzwvdGV4dD48L3N2Zz4=","images/LongLogo2.png":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNCIgZmlsbD0iIzExMzYyZCIvPjx0ZXh0IHg9IjMyIiB5PSI0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNTVlZGMxIj5TUzwvdGV4dD48L3N2Zz4="};
    const nativeFetch = window.fetch.bind(window);
    const resourcePrefix = 'https://snippingsoul.invalid/embedded/';
    const fetch = (input, init) => {
      const url = typeof input === 'string' ? input : input?.url;
      if (url?.startsWith(resourcePrefix)) {
        const file = url.slice(resourcePrefix.length);
        return Promise.resolve(new Response(Object.hasOwn(assets, file) ? assets[file] : '', { status: Object.hasOwn(assets, file) ? 200 : 404, headers: { 'Content-Type': 'text/html;charset=utf-8' } }));
      }
      return nativeFetch(input, init);
    };
    const storageKey = 'snippingsoul.mobile.settings.v1';
    let saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) saved = {};
    const safe = key => typeof key === 'string' && !/^(ssLicense\.|soulHistory\.|__proto__$|constructor$|prototype$)/.test(key);
    const post = data => window.postMessage(data, location.origin);
    const bridge = async event => {
      if (event.source !== window || event.origin !== location.origin || !event.data) return;
      const message = event.data;
      try {
        if (message.message === 'get') {
          const requested = message.keys == null ? Object.keys(saved) : typeof message.keys === 'string' ? [message.keys] : Array.isArray(message.keys) ? message.keys : Object.keys(message.keys);
          post({ message: 'getCompleted', result: Object.fromEntries(requested.filter(key => safe(key) && Object.hasOwn(saved, key)).map(key => [key, saved[key]])) });
        } else if (message.message === 'set' && message.objPassed && typeof message.objPassed === 'object') {
          const next = { ...saved, ...Object.fromEntries(Object.entries(message.objPassed).filter(([key]) => safe(key))) };
          localStorage.setItem(storageKey, JSON.stringify(next)); saved = next;
          post({ message: 'Set Done' });
        } else if (message.message === 'getChromeExtensionUrl') {
          const file = message.whatSearch;
          if (Object.hasOwn(assets, file)) post({ message: 'getChromeExtensionUrlCompleted', url: file.endsWith('.png') ? assets[file] : resourcePrefix + file });
        } else if (message.message === 'fetchPls') {
          const url = new URL(decodeURIComponent(message.urlToFetch));
          if (url.protocol !== 'https:' || !['www.futbin.com', 'www.fut.gg', 'r2.fut.gg'].includes(url.hostname)) throw new Error('Source non autorisée.');
          const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 12000);
          try {
            const response = await nativeFetch(url.href, { credentials: 'omit', signal: controller.signal });
            if (!response.ok) throw new Error('Source indisponible.');
            post({ message: 'fetchCompleted', res: await response.text() });
          } finally { clearTimeout(timer); }
        }
      } catch {
        if (message.message === 'fetchPls') { post({ message: 'fetchError', error: 'Source externe indisponible sur ce navigateur.' }); post({ message: 'fetchCompleted', res: '' }); }
        else alert('SnippingSoul : impossible d’enregistrer ou de lire les réglages de ce navigateur.');
      }
    };
    window.addEventListener('message', bridge);
    const style = document.createElement('style');
    style.textContent = "/* SnippingSoul visual identity. Keep original DOM structure for event bindings. */\na[href=\"about:blank#removed-promotion\"],.nft:has(.inputKey),.nft:has(a[href=\"about:blank#removed-promotion\"]),.SnippingSoul-premium-overlay{display:none!important}\n.SnippingSoulDiv .nft{background:#081611!important;border-color:#1e5548!important}\n.SnippingSoulDiv h2,.titleSnippingSoul{color:#2df0bf!important}\n.divHeaderSnippingSoulImg img{object-fit:contain!important}\n/* Retired social icon next to the balance; hide its separator as well. */\n.divHeaderDiscordImg{display:none!important}\n.SnippingSoulBotBtn{background:#19e6b6!important;color:#031e17!important}\n\n/* Scoped panel refresh: preserve controls and the existing EA layout. */\n.SniperBotInAppMenu{background:#101a1e!important;color:#edf6f4!important;border:1px solid #30434a!important;border-radius:12px!important;overflow:hidden}\n.SniperBotInAppMenu .ss-history-shortcut{display:block;flex-shrink:0;width:100%;padding:12px 16px;background:#163b32;color:#64efc6;border:0;border-bottom:1px solid #326555;text-align:left;font:600 12px Bahnschrift,\"Segoe UI\",sans-serif;cursor:pointer}\n.SniperBotInAppMenu .ss-history-shortcut:hover{background:#205246}\n.SniperBotInAppMenu .ss-history-shortcut:focus-visible{outline:2px solid #64efc6;outline-offset:-3px}\n/* More specific than the legacy styles injected each time the tabs reopen. */\n.SniperBotInAppMenu .wrapper .tabs_wrap{padding:10px 12px!important;background:#101a1e!important;border-bottom:1px solid #2a3d44}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul{display:grid!important;grid-template-columns:1fr 1.35fr .85fr;gap:7px;width:100%;margin:0!important;padding:0!important;list-style:none;background:transparent!important;border:0!important}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]{position:relative;display:flex!important;justify-content:center;align-items:center;gap:8px;min-width:0;width:auto!important;min-height:49px;margin:0!important;padding:10px 9px!important;border:1px solid #354a50!important;border-radius:10px!important;background:linear-gradient(180deg,#22343a,#19282d)!important;color:#b9cdd1!important;font:600 12px/1.3 Bahnschrift,\"Segoe UI\",sans-serif!important;text-align:center;word-break:normal!important;overflow-wrap:normal!important;letter-spacing:.1px!important;cursor:pointer;box-shadow:inset 0 1px 0 #ffffff08,0 2px 4px #0002;transition:background .18s,border-color .18s,color .18s,box-shadow .18s,transform .18s;isolation:isolate}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]::before{content:\"\";display:block;width:17px;height:17px;flex:0 0 17px;background:currentColor;opacity:.85;mask:center/contain no-repeat var(--ss-tab-icon);--ss-tab-icon:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01'/%3E%3C/svg%3E\")}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs^=\"Options\"]::before{--ss-tab-icon:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='M4 7h3m4 0h9M4 17h9m4 0h3'/%3E%3Ccircle cx='9' cy='7' r='2'/%3E%3Ccircle cx='15' cy='17' r='2'/%3E%3C/svg%3E\")}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs=\"Journal\"]::before{--ss-tab-icon:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16v16H4zM8 8h8M8 12h8M8 16h4'/%3E%3C/svg%3E\")}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]:hover{background:linear-gradient(180deg,#2b454a,#21383c)!important;border-color:#528b80!important;color:#e8fff7!important;transform:translateY(-1px);box-shadow:0 4px 12px #0003}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs].active{background:linear-gradient(135deg,#76f4ce,#3edbb0)!important;border-color:#8df7d6!important;color:#07372b!important;box-shadow:inset 0 1px 0 #ffffff66,0 3px 13px #38d6a72b;font-weight:750!important}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs].active::before{opacity:1}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]:active{transform:translateY(1px);box-shadow:inset 0 2px 5px #0002}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]:focus-visible{outline:2px solid #a7ffe1;outline-offset:3px}\n@media(max-width:600px){.SniperBotInAppMenu .wrapper .tabs_wrap{padding:8px!important}.SniperBotInAppMenu .wrapper .tabs_wrap ul{gap:5px}.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]{flex-direction:column;gap:5px;padding:8px 5px!important;font-size:11px!important;min-height:62px}}\n@media(prefers-reduced-motion:reduce){.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs]{transition:none;transform:none!important}}\n.SniperBotInAppMenu .leaderboard__profile{background:#19282d!important;box-shadow:none!important;border-radius:7px!important;color:#e0eeec!important}\n.SniperBotInAppMenu .leaderboard__profiles{border-color:#30434a!important}\n.SniperBotInAppMenu .range__slider,.SniperBotInAppMenu .setting{background:#1a2a2f!important;border:1px solid #30434a;box-shadow:none!important}\n.SniperBotInAppMenu .field-title{color:#b5cbc9!important;letter-spacing:.5px}\n.SniperBotInAppMenu .length__titleLoop::after,.SniperBotInAppMenu .length__titleSeconds::after{color:#57ebbd!important}\n.SniperBotInAppMenu .settings input:checked+label::before{background:#37bd93!important}\n.SniperBotInAppMenu .SnipingLog{scrollbar-width:thin;scrollbar-color:#35545b #101a1e}\n.SniperBotInAppMenu .SnipingLog .beforeLogSpan{box-shadow:none!important;border-radius:6px!important}\n\n.SniperBotInAppMenu .ss-session-mini{display:flex;align-items:center;gap:15px;padding:12px 16px;background:#142126;border-bottom:1px solid #30434a;flex-shrink:0;color:#edf6f4}\n.ss-session-mini .ss-dial{--ss-progress:0deg;width:70px;height:70px;border-radius:50%;background:conic-gradient(#46e6b1 var(--ss-progress),#304249 0);display:grid;place-items:center;flex-shrink:0;position:relative}\n.ss-session-mini .ss-dial:before{content:\"\";position:absolute;inset:4px;background:#142126;border-radius:50%}\n.ss-session-mini .ss-countdown{position:relative;font:700 23px Bahnschrift,\"Segoe UI\",sans-serif;font-variant-numeric:tabular-nums}\n.ss-session-mini .ss-session-detail{display:flex;flex-direction:column;gap:5px;font:12px Bahnschrift,\"Segoe UI\",sans-serif}\n.ss-session-mini .ss-rounds{color:#46e6b1}.ss-session-mini .ss-elapsed{font:10px Consolas,monospace;color:#99b1b9}\n\n/* Match the search form typography while keeping secondary captions quieter. */\n.SniperBotInAppMenu{font-family:var(--ss-ea-font,UltimateTeamCondensed,sans-serif)!important;font-size:var(--ss-ea-size,16px)!important}\n.SniperBotInAppMenu .wrapper .tabs_wrap ul li[data-tabs],.SniperBotInAppMenu .settings,.SniperBotInAppMenu .setting,.SniperBotInAppMenu .setting label,.SniperBotInAppMenu .setting input,.SniperBotInAppMenu .ss-history-shortcut,.SniperBotInAppMenu .ss-session-detail,.SniperBotInAppMenu .SnipingLog{font-family:var(--ss-ea-font,UltimateTeamCondensed,sans-serif)!important;font-size:var(--ss-ea-size,16px)!important;line-height:1.3!important}\n.SniperBotInAppMenu .field-title{font-family:var(--ss-ea-font,UltimateTeamCondensed,sans-serif)!important;font-size:calc(var(--ss-ea-size,16px)*.8)!important;letter-spacing:.2px!important}\n.SniperBotInAppMenu .settings .setting.NplayersToBuy{display:flex!important;justify-content:space-between;gap:12px;box-sizing:border-box;width:100%!important;min-height:54px;height:auto!important;padding:10px 14px!important;text-align:left!important}\n.SniperBotInAppMenu .NplayersToBuy>div{position:static!important;width:145px!important;flex:0 0 145px;right:auto!important}\n.SniperBotInAppMenu .NplayersToBuy .input-group{border:1px solid #42635e;border-radius:9px;overflow:hidden;background:#10231f;box-shadow:none!important}\n.SniperBotInAppMenu .NplayersToBuy .input-group button{background:#23473e!important;color:#88f5d0!important;border:0!important;border-radius:0!important;width:32px!important;height:34px!important;flex:0 0 32px;font:600 19px/1 sans-serif;cursor:pointer}\n.SniperBotInAppMenu .NplayersToBuy .input-group button:hover:not(:disabled){background:#316658!important}\n.SniperBotInAppMenu .NplayersToBuy .input-group button:disabled{opacity:.35;cursor:default}\n.SniperBotInAppMenu .NplayersToBuy .input-group input{min-width:0!important;position:static!important;opacity:1!important;color:#e4fff5!important;height:34px!important;padding:0!important}\n.SniperBotInAppMenu button.StartBotMothod2Class{left:12px!important;right:12px!important;bottom:10px!important;width:calc(100% - 24px)!important;height:48px!important;min-height:48px;display:flex;align-items:center;justify-content:center;gap:12px;padding:0 18px!important;border:1px solid #8af2ce!important;border-radius:11px!important;background:linear-gradient(110deg,#70f0c9,#31d5a8)!important;color:#07382c!important;font:700 var(--ss-ea-size,16px)/1.2 var(--ss-ea-font,UltimateTeamCondensed,sans-serif)!important;text-shadow:none!important;box-shadow:inset 0 1px 0 #ffffff70,0 4px 16px #1fd09a24!important;transition:filter .16s,box-shadow .16s!important}\n.SniperBotInAppMenu button.StartBotMothod2Class::before{content:\"\";width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:9px solid currentColor}\n.SniperBotInAppMenu button.StartBotMothod2Class:hover:not(:disabled){filter:brightness(1.08);box-shadow:inset 0 1px 0 #ffffff70,0 5px 22px #1fd09a40!important}\n.SniperBotInAppMenu button.StartBotMothod2Class:active:not(:disabled){filter:brightness(.94)}\n.SniperBotInAppMenu button.StartBotMothod2Class:focus-visible{outline:2px solid #c7ffeb;outline-offset:3px}\n.SniperBotInAppMenu button.StartBotMothod2Class:disabled{opacity:.45;cursor:not-allowed!important}\n.SniperBotInAppMenu button.StartBotMothod2Class[hidden]{display:none!important}\n.SniperBotInAppMenu .wrapperDivOptions{padding-bottom:72px!important;box-sizing:border-box}\n@media(max-width:420px){.SniperBotInAppMenu .settings .setting.NplayersToBuy{flex-wrap:wrap}.SniperBotInAppMenu .NplayersToBuy>div{margin-left:auto}}\n\n/* Options own the available height; the start action occupies a separate row. */\n.SniperBotInAppMenu:has(>button.StartBotMothod2Class:not([hidden])){display:flex!important;flex-direction:column;min-height:0}\n.SniperBotInAppMenu:has(>button.StartBotMothod2Class:not([hidden]))>.wrapper{flex:0 0 auto}\n.SniperBotInAppMenu:has(>button.StartBotMothod2Class:not([hidden]))>.wrapperDivOptions{flex:1 1 0;min-height:0;overflow-y:auto!important;overflow-x:hidden;padding-bottom:20px!important;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#406158 #101a1e}\n.SniperBotInAppMenu:has(>button.StartBotMothod2Class:not([hidden]))>.wrapperDivOptions>.itemDiv{max-height:none!important;overflow:visible!important}\n.SniperBotInAppMenu:has(>button.StartBotMothod2Class:not([hidden]))>.SnipingLog,.SniperBotInAppMenu:has(>button.StartBotMothod2Class:not([hidden]))>.wrapperDivBtnSaveLoad{display:none!important}\n.SniperBotInAppMenu>button.StartBotMothod2Class:not([hidden]){position:static!important;flex:0 0 48px;margin:10px 12px!important;align-self:center;left:auto!important;right:auto!important;bottom:auto!important}\n\n@media(max-width:800px){.SniperBotInAppMenu{max-width:100vw!important;max-height:80dvh;overflow:auto!important}.SniperBotInAppMenu button{min-height:44px}.SniperBotInAppMenu input{font-size:16px!important}.SnippingSoulDiv{max-width:100vw;overflow:auto}}";
    document.head.append(style);
    // jQuery remains scoped to this adapter after noConflict restores EA globals.
    /*! jQuery v3.6.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,y=n.hasOwnProperty,a=y.toString,l=a.call(Object),v={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.6.1",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=y.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:v}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,y,s,c,v,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),j=function(e,t){return e===t&&(l=!0),0},D={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&v(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!y||!y.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ve(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ye(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ve(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],y=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||y.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||y.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||y.push(".#.+[+~]"),e.querySelectorAll("\\\f"),y.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),y=y.length&&new RegExp(y.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),v=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&v(p,e)?-1:t==C||t.ownerDocument==p&&v(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!y||!y.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),v(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&D.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(j),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace($," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,y){var v="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===y?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=v!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(v){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=y)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ye(function(){return[0]}),last:ye(function(e,t){return[t-1]}),eq:ye(function(e,t,n){return[n<0?n+t:n]}),even:ye(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ye(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ye(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ye(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,y,v,e){return y&&!y[S]&&(y=Ce(y)),v&&!v[S]&&(v=Ce(v,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?v||(e?d:l||y)?[]:t:f;if(g&&g(f,p,n,r),y){i=Te(p,u),y(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(v||d){if(v){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);v(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=v?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),v?v(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,y,v,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(y=o,m=0<(v=i).length,x=0<y.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=y[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=v[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+v.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ve(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ve(t.parentNode)||t),n},d.sortStable=S.split("").sort(j).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var D,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||D,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,D=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function $(){E.removeEventListener("DOMContentLoaded",$),C.removeEventListener("load",$),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",$),C.addEventListener("load",$));var B=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)B(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):B(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),v.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",v.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",v.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,v.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^([^.]*)(?:\.(.+)|)/;function we(){return!0}function Te(){return!1}function Ce(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ee(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ee(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Te;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Se(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n&&n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,we)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=y.events)||(u=y.events=Object.create(null)),(a=y.handle)||(a=y.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=be.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=Y.hasData(e)&&Y.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=be.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||S.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click",we),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?we:Te,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Te,isPropagationStopped:Te,isImmediatePropagationStopped:Te,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=we,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=we,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=we,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(t,e){S.event.special[t]={setup:function(){return Se(this,t,Ce),!1},trigger:function(){return Se(this,t),!0},_default:function(e){return Y.get(e.target,t)},delegateType:e}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return Ee(this,e,t,n,r)},one:function(e,t,n,r){return Ee(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Te),this.each(function(){S.event.remove(this,e,n,t)})}});var ke=/<script|<style|<link/i,Ae=/checked\s*(?:[^=]|=\s*.checked.)/i,Ne=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function je(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function De(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function qe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Le(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function He(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!v.checkClone&&Ae.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),He(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ye(e,"script"),De)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ye(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,qe),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(Ne,""),u,l))}return n}function Oe(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ye(r)),r.parentNode&&(n&&ie(r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(v.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ye(c),r=0,i=(o=ye(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ye(e),a=a||ye(c),r=0,i=o.length;r<i;r++)Le(o[r],a[r]);else Le(e,c);return 0<(a=ye(c,"script")).length&&ve(a,!f&&ye(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Oe(this,e,!0)},remove:function(e){return Oe(this,e)},text:function(e){return B(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return He(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)})},prepend:function(){return He(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=je(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return B(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!ke.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return He(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ye(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Pe=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Re=/^--/,Me=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Ie=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},We=new RegExp(ne.join("|"),"i"),Fe="[\\x20\\t\\r\\n\\f]",$e=new RegExp("^"+Fe+"+|((?:^|[^\\\\])(?:\\\\.)*)"+Fe+"+$","g");function Be(e,t,n){var r,i,o,a,s=Re.test(t),u=e.style;return(n=n||Me(e))&&(a=n.getPropertyValue(t)||n[t],s&&(a=a.replace($e,"$1")),""!==a||ie(e)||(a=S.style(e,t)),!v.pixelBoxStyles()&&Pe.test(a)&&We.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=n.width,u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",v.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(v,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,re.removeChild(e)),a}}))}();var ze=["Webkit","Moz","ms"],Ue=E.createElement("div").style,Xe={};function Ve(e){var t=S.cssProps[e]||Xe[e];return t||(e in Ue?e:Xe[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=ze.length;while(n--)if((e=ze[n]+t)in Ue)return e}(e)||e)}var Ge=/^(none|table(?!-c[ea]).+)/,Ye={position:"absolute",visibility:"hidden",display:"block"},Qe={letterSpacing:"0",fontWeight:"400"};function Je(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ke(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Ze(e,t,n){var r=Me(e),i=(!v.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=Be(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Pe.test(a)){if(!n)return a;a="auto"}return(!v.boxSizingReliable()&&i||!v.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Ke(e,t,n||(i?"border":"content"),o,r,a)+"px"}function et(e,t,n,r,i){return new et.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Be(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Re.test(t),l=e.style;if(u||(t=Ve(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),v.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Re.test(t)||(t=Ve(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Be(e,t,r)),"normal"===i&&t in Qe&&(i=Qe[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ge.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Ze(e,u,n):Ie(e,Ye,function(){return Ze(e,u,n)})},set:function(e,t,n){var r,i=Me(e),o=!v.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Ke(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Ke(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Je(0,t,s)}}}),S.cssHooks.marginLeft=_e(v.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Be(e,"marginLeft"))||e.getBoundingClientRect().left-Ie(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Je)}),S.fn.extend({css:function(e,t){return B(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Me(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=et).prototype={constructor:et,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=et.propHooks[this.prop];return e&&e.get?e.get(this):et.propHooks._default.get(this)},run:function(e){var t,n=et.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):et.propHooks._default.set(this),this}}).init.prototype=et.prototype,(et.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[Ve(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=et.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=et.prototype.init,S.fx.step={};var tt,nt,rt,it,ot=/^(?:toggle|show|hide)$/,at=/queueHooks$/;function st(){nt&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(st):C.setTimeout(st,S.fx.interval),S.fx.tick())}function ut(){return C.setTimeout(function(){tt=void 0}),tt=Date.now()}function lt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ct(e,t,n){for(var r,i=(ft.tweeners[t]||[]).concat(ft.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ft(o,e,t){var n,a,r=0,i=ft.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=tt||ut(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:tt||ut(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=ft.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ct,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(ft,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],ft.tweeners[n]=ft.tweeners[n]||[],ft.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ot.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(y?"hidden"in y&&(g=y.hidden):y=Y.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ct(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?ft.prefilters.unshift(e):ft.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=ft(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&at.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(lt(r,!0),e,t,n)}}),S.each({slideDown:lt("show"),slideUp:lt("hide"),slideToggle:lt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(tt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),tt=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){nt||(nt=!0,st())},S.fx.stop=function(){nt=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},rt=E.createElement("input"),it=E.createElement("select").appendChild(E.createElement("option")),rt.type="checkbox",v.checkOn=""!==rt.value,v.optSelected=it.selected,(rt=E.createElement("input")).value="t",rt.type="radio",v.radioValue="t"===rt.value;var pt,dt=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return B(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?pt:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!v.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),pt={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=dt[t]||S.find.attr;dt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=dt[o],dt[o]=r,r=null!=a(e,t,n)?o:null,dt[o]=i),r}});var ht=/^(?:input|select|textarea|button)$/i,gt=/^(?:a|area)$/i;function yt(e){return(e.match(P)||[]).join(" ")}function vt(e){return e.getAttribute&&e.getAttribute("class")||""}function mt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return B(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):ht.test(e.nodeName)||gt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),v.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a;return m(t)?this.each(function(e){S(this).addClass(t.call(this,e,vt(this)))}):(e=mt(t)).length?this.each(function(){if(r=vt(this),n=1===this.nodeType&&" "+yt(r)+" "){for(o=0;o<e.length;o++)i=e[o],n.indexOf(" "+i+" ")<0&&(n+=i+" ");a=yt(n),r!==a&&this.setAttribute("class",a)}}):this},removeClass:function(t){var e,n,r,i,o,a;return m(t)?this.each(function(e){S(this).removeClass(t.call(this,e,vt(this)))}):arguments.length?(e=mt(t)).length?this.each(function(){if(r=vt(this),n=1===this.nodeType&&" "+yt(r)+" "){for(o=0;o<e.length;o++){i=e[o];while(-1<n.indexOf(" "+i+" "))n=n.replace(" "+i+" "," ")}a=yt(n),r!==a&&this.setAttribute("class",a)}}):this:this.attr("class","")},toggleClass:function(t,n){var e,r,i,o,a=typeof t,s="string"===a||Array.isArray(t);return m(t)?this.each(function(e){S(this).toggleClass(t.call(this,e,vt(this),n),n)}):"boolean"==typeof n&&s?n?this.addClass(t):this.removeClass(t):(e=mt(t),this.each(function(){if(s)for(o=S(this),i=0;i<e.length;i++)r=e[i],o.hasClass(r)?o.removeClass(r):o.addClass(r);else void 0!==t&&"boolean"!==a||((r=vt(this))&&Y.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===t?"":Y.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+yt(vt(n))+" ").indexOf(t))return!0;return!1}});var xt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(xt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:yt(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},v.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),v.focusin="onfocusin"in C;var bt=/^(?:focusinfocus|focusoutblur)$/,wt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=y.call(e,"type")?e.type:e,h=y.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!bt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,bt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,wt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,wt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),v.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var Tt=C.location,Ct={guid:Date.now()},Et=/\?/;S.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||S.error("Invalid XML: "+(n?S.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var St=/\[\]$/,kt=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,Nt=/^(?:input|select|textarea|keygen)/i;function jt(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||St.test(n)?i(n,t):jt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)jt(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&Nt.test(this.nodeName)&&!At.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(kt,"\r\n")}}):{name:t.name,value:n.replace(kt,"\r\n")}}).get()}});var Dt=/%20/g,qt=/#.*$/,Lt=/([?&])_=[^&]*/,Ht=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ot=/^(?:GET|HEAD)$/,Pt=/^\/\//,Rt={},Mt={},It="*/".concat("*"),Wt=E.createElement("a");function Ft(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function $t(t,i,o,a){var s={},u=t===Mt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Bt(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Wt.href=Tt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":It,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Bt(Bt(e,S.ajaxSettings),t):Bt(S.ajaxSettings,e)},ajaxPrefilter:Ft(Rt),ajaxTransport:Ft(Mt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,y=S.ajaxSetup({},t),v=y.context||y,m=y.context&&(v.nodeType||v.jquery)?S(v):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=y.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Ht.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(y.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),y.url=((e||y.url||Tt.href)+"").replace(Pt,Tt.protocol+"//"),y.type=t.method||t.type||y.method||y.type,y.dataTypes=(y.dataType||"*").toLowerCase().match(P)||[""],null==y.crossDomain){r=E.createElement("a");try{r.href=y.url,r.href=r.href,y.crossDomain=Wt.protocol+"//"+Wt.host!=r.protocol+"//"+r.host}catch(e){y.crossDomain=!0}}if(y.data&&y.processData&&"string"!=typeof y.data&&(y.data=S.param(y.data,y.traditional)),$t(Rt,y,t,T),h)return T;for(i in(g=S.event&&y.global)&&0==S.active++&&S.event.trigger("ajaxStart"),y.type=y.type.toUpperCase(),y.hasContent=!Ot.test(y.type),f=y.url.replace(qt,""),y.hasContent?y.data&&y.processData&&0===(y.contentType||"").indexOf("application/x-www-form-urlencoded")&&(y.data=y.data.replace(Dt,"+")):(o=y.url.slice(f.length),y.data&&(y.processData||"string"==typeof y.data)&&(f+=(Et.test(f)?"&":"?")+y.data,delete y.data),!1===y.cache&&(f=f.replace(Lt,"$1"),o=(Et.test(f)?"&":"?")+"_="+Ct.guid+++o),y.url=f+o),y.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(y.data&&y.hasContent&&!1!==y.contentType||t.contentType)&&T.setRequestHeader("Content-Type",y.contentType),T.setRequestHeader("Accept",y.dataTypes[0]&&y.accepts[y.dataTypes[0]]?y.accepts[y.dataTypes[0]]+("*"!==y.dataTypes[0]?", "+It+"; q=0.01":""):y.accepts["*"]),y.headers)T.setRequestHeader(i,y.headers[i]);if(y.beforeSend&&(!1===y.beforeSend.call(v,T,y)||h))return T.abort();if(u="abort",b.add(y.complete),T.done(y.success),T.fail(y.error),c=$t(Mt,y,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,y]),h)return T;y.async&&0<y.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},y.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(y,T,n)),!i&&-1<S.inArray("script",y.dataTypes)&&S.inArray("json",y.dataTypes)<0&&(y.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(y,s,T,i),i?(y.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===y.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(v,[o,l,T]):x.rejectWith(v,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,y,i?o:a]),b.fireWith(v,[T,l]),g&&(m.trigger("ajaxComplete",[T,y]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var _t={0:200,1223:204},zt=S.ajaxSettings.xhr();v.cors=!!zt&&"withCredentials"in zt,v.ajax=zt=!!zt,S.ajaxTransport(function(i){var o,a;if(v.cors||zt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(_t[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Ut,Xt=[],Vt=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xt.pop()||S.expando+"_"+Ct.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Vt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Vt,"$1"+r):!1!==e.jsonp&&(e.url+=(Et.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Xt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),v.createHTMLDocument=((Ut=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Ut.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(v.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=yt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return B(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=_e(v.pixelPosition,function(e,t){if(t)return t=Be(e,n),Pe.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return B(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Gt=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Gt,"$1")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Yt=C.jQuery,Qt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Qt),e&&C.jQuery===S&&(C.jQuery=Yt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});
    const jQuery = window.jQuery.noConflict(true), $ = jQuery;
    window.__ssMobileActive = true;
    (()=>{var as=(n,e)=>()=>{try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var Qo=as(()=>{var ns,ar=0,Ye=0,Ze=0,Re=0,nr=!1,I=[],pe=!1,je=!1,is=[];is.length=100;var rs=[];rs.length=100;var O,se,ye,Be,$t,Kt,_t,lt,it,Oe,Fn,D="Active",H=Infinity,hi=0,Un=0,le,Z,vi=0,Rt,Pe=[],ue=!1,at=!1,bi=0,Tt=[],Yt=0,Wt=0,zn=!1,Je,ss,ls,os,cs,He=[],xe=[],Bn,G,ds,ir,Ba=!1,Sa=!1,xi=0,Vn=0,us=0,Gn=0,ms=0,jn=0,Hn=0,Pt=1800,Qe,ya=!1,ct=!1,We=!0,$n=!1,K=0,ps=0,$e=[],Ft=[],fs=!1,gs=0,ys=0,qt=0,Qt=0,rr=[],sr=!1,rt=!1,wi="tabone",hs,lr,vs,Ci,ee=!1,Ei="https://r2.fut.gg/27/",ha=null,Ni=null,Sn=5,xa="SnippingSoulGalleryCollectedPlayers",bs=1,Mn=null,_e={},wa=!1,xs=0,dt=null,Bi=[["SnippingSoulBotBtn",0,"Bienvenue dans le tutoriel SnippingSoul ! Cliquez sur « Assistant SnippingSoul » pour ouvrir le panneau. Cette démonstration est simulée : aucun joueur ne sera acheté et aucun crédit ne sera dépensé.","body",0,"SnippingSoulBotBtn",0],["glass-btn",0,"Choisissez entre « Achat immédiat » et « Enchères ». Cliquez sur « Achat immédiat » pour ouvrir les réglages du sniping.","body",0,"glass-btn",0],["inline-list-select ut-search-filter-control has-default has-image",0,"Créons un filtre. Commencez par ouvrir le choix de la qualité.","body",0,"inline-list-select ut-search-filter-control has-default has-image",0],["with-icon",3,"Sélectionnez « Or » pour rechercher uniquement les cartes or.","body",4,"with-icon",3],["inline-list-select ut-search-filter-control has-default has-image",5,"Ouvrez maintenant le choix du pays ou de la région.","body",0,"inline-list-select ut-search-filter-control has-default has-image",5],["with-icon",1,"Sélectionnez « Argentine ».","body",4,"with-icon",1],["price-filter",3,"Définissez le prix maximal auquel l’assistant peut acheter un joueur. Pour cet exemple, saisissez 350 crédits.","body",0,"done",0],["addToSnipeFilter",0,"Ajoutez ce filtre à votre liste en cliquant sur « Ajouter aux filtres d’achat ».","body",0,"addToSnipeFilter",0],["leaderboard",0,"Votre filtre apparaît ici. Vous pouvez consulter ses critères et modifier le prix d’achat. Vous pouvez aussi créer un filtre en recherchant un joueur par son nom.","body",0,"NextBtn",0],["leaderboard__value",0,"Cette valeur définit le nombre de recherches à effectuer pour ce filtre à chaque passage.","body",0,"NextBtn",0],["tabs_wrap",0,"Ouvrez « Options d’achat immédiat » pour régler la session.","body",0,"tabs_wrap",0],["itemDiv",0,"Réglez le nombre de tours de la liste, la pause entre deux tours et la vitesse des recherches. Vous pouvez également activer la remise en vente après achat.","body",0,"NextBtn",0],["StartBotMothod2Class",0,"Cliquez sur « Démarrer les achats » pour lancer la démonstration.","body",0,"NextBtn",0],["SniperBotInAppMenu",0,"L’onglet « Journal » affiche les recherches et leurs résultats. Un symbole ✅ indique un achat confirmé.","body",0,"NextBtn",0],["SniperBotInAppMenu",0,"La démonstration montre une recherche, une tentative manquée puis un achat réussi. L’assistant attend ensuite la durée définie dans les options. Ces opérations sont simulées et ne figurent pas dans votre historique réel.","body",0,"NextBtn",0],["StopSnipingBtn",0,"Pour interrompre la session, cliquez sur le bouton rouge « Arrêter les achats ».","body",0,"StopSnipingBtn",0],["",0,"Le tutoriel est terminé ! Préparez vos filtres avant de lancer une vraie session et faites des pauses régulières. Retrouvez vos achats, vos ventes détectées et vos tentatives dans « Mon activité ».","body",0,"completeBtn",0]],ce=0,Ne=null,be=null,Si=0,ot=!0,oa=0,Ca=4500,Ma,Q=0,j,ws,Cs,Es,pa=[],fa=[],Ns,Kn,Bs,he=[],oe=[[]],_a,Ta,ti,Ss,Pa,Jt,ka,Ia,ca=[],La=[],Aa=[],Oa,Da,Ra,Xt,Fa,Ua,za,Va,Ga,ja,Ha,$a,da=[],Zt=[],Ka=[],ua=[],kt=[],Qa=[],ma=[],ea=[],Ya=[],Wa,pa,fa,ta,qa,Ja,Xa,Za,en,tn,an,nn,rn,sn,ln,on,cn,Ms,dn,un,mn,ze,ke,Mi,or=5,aa,na,z=[],Qn=[],_n=new Map,_i={minteamid:0,minLeagueId:0,minNation:0},Se=0,we=0,nt,Lt,ia=0,Me=!1,ra={75:300,76:350,77:350,78:350,79:350,80:350,81:350,82:350,83:850,84:1400,85:3500,86:7e3,87:10500,88:15e3,89:22500,90:3e4,91:42750,92:70500,93:228e3,94:25e4,95:549e3,96:985e3,97:3091e3,98:15e6,99:15e6},Tn=!1,Ti,va=!1,wn,cr,dr,ur,tt,mr,Pi=0,_s=[5,10,15,30],sa=null,At=null,Xe=!1,Ea=null,Ot=[],Ge=!1,me=null,De=[],pn=[];/* Inserted into rCont's closure by the development script. No extra EA requests. */

function ssSession(){}function ssTrack(){}
Hs();async function Ts(){nr=!0;var n;n=document.createElement("div"),n.className="SnippingSoulDiv",document.getElementsByClassName("ut-navigation-container-view")[0].appendChild(n),n.style.display="none";var e=`input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    .listFUTItem.selected .marketAvgSpan, .listFUTItem.selected .marketAvgPrice, .listFUTItem.selected .profitNetPrice, .listFUTItem.selected .profitSpan, .listFUTItem.selected .boughtSpan, .listFUTItem.selected .boughtPrice {
    color: #fff000 !important;
    }
    
    .tooltip {
        position: relative;
        display: inline-block;
      }
      
      .tooltip .tooltiptext {
        visibility: hidden;
        width: 300px;
        background-color: #fff700;
        color: #000;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: -50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
      }
      
      .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
      }

      .length__titleSpeed::after {
        content: attr(data-length);
        font-variant-numeric: tabular-nums;
        color: #fff700;
        position: absolute;
        right: -85px;
    }
    
    .length__titleSpeed[data-length="0"]::after {
        content: "Slow";
    }
    
    .length__titleSpeed[data-length="1"]::after {
        content: "Moyenne";
    }
    
    .length__titleSpeed[data-length="2"]::after {
        content: "Élevée";
    }
    
    .length__titleSpeed[data-length="3"]::after {
        content: "Turbo";
    }



.blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(1px);
    z-index: 999;
    display: none;
}

.tutorial-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    z-index: 1001;
    display: none;
    color: black;
    text-align: center;
    overflow: hidden;
}

.tutorial-content {
    position: relative;
}

.close-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

/* Highlighted element */
.highlighted {
    position: relative;
    z-index: 1002;
    outline: 3px solid yellow;
}

/* Continue or Complete button at the bottom */
.bottom-btn {
    display: block;
    margin: 20px auto 0;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
}
.bottom-btn:hover {
    background-color: #0056b3;
}
.round-time-bar {
  overflow: hidden;
}
.round-time-bar div {
  height: 5px;
  animation: roundtime calc(var(--duration) * 1s) steps(var(--duration))
    forwards;
  transform-origin: left center;
  background: #fff700;
}
.round-time-bar[data-style="smooth"] div {
  animation: roundtime calc(var(--duration) * 1s) linear forwards;
}
@keyframes roundtime {
  to {
    transform: scaleX(0);
  }
}
.checkbox-wrapper-22 .switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }
  .checkbox-wrapper-22 .switch input {
    display:none;
  }
  .checkbox-wrapper-22 .slider {
    background-color: #3a3d3d;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .4s;
  }
  .checkbox-wrapper-22 .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: .4s;
    width: 26px;
  }
  .checkbox-wrapper-22 input:checked + .slider {
    background-color: #00ffd0;
  }
  .checkbox-wrapper-22 input:checked + .slider:before {
    transform: translateX(26px);
  }
  .checkbox-wrapper-22 .slider.round {
    border-radius: 34px;
  }
  .checkbox-wrapper-22 .slider.round:before {
    border-radius: 50%;
  }
    button.StartBotMothod2Class:hover {
        box-shadow: 0 0 25px #7257d3;
    }
    .containerPaywall {
    perspective: 1000px;
	box-sizing: border-box;
	color: #ffffff;
    font-family: 'Roboto', sans-serif;
}
.boxPaywall {
    position: relative;
    width: 421px;
    background: #121216;
    border-radius: 20px;
    border: 2px solid transparent;
    background: linear-gradient(#121216, #121216) padding-box,
        linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%) border-box;
    box-shadow: 0 10px 40px rgba(205, 127, 50, 0.2);
    padding: 30px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.headerPaywall {
    text-align: center;
    margin-bottom: 25px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.5s ease;
}
.headerPaywall.show {
    opacity: 1;
    transform: translateY(0);
}
.headerPaywall-line1 {
    background: linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.5px;
}
.headerPaywall-line2 {
    background: linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
    font-size: 20px;
    margin-top: 5px;
}
.state-content {
    display: flex;
    flex-direction: column;
    opacity: 1;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translateX(0);
}
.state-content.hidden {
    opacity: 0;
    transform: translateX(20px);
    pointer-events: none;
    position: absolute;
    /* Take out of flow when hidden so it doesn't add height */
    visibility: hidden;
}
.state-content.hiding {
    opacity: 0;
    transform: translateX(-20px);
}
/* State 1 Styles */
.center-contentPaywall {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}
.text-normal {
    font-size: 18px;
    font-weight: 400;
}
.text-value {
    font-size: 36px;
    font-weight: 900;
    background: linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
.bottom-contentPaywall {
    text-align: center;
    font-size: 15px;
    font-weight: 300;
    color: #cccccc;
    line-height: 1.5;
}
.top-contentPaywall {
    text-align: center;
    font-size: 15px;
    line-height: 1.4;
    font-weight: 400;
    margin-bottom: 15px;
}
.graph-section {
    width: 100%;
    height: 120px;
    margin: 10px 0;
    position: relative;
}
.tooltipPaywall {
    position: absolute;
    top: 35%;
    left: 7%;
    background: rgba(18, 18, 22, 0.9);
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    pointer-events: none;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    border: 1px solid #CD7F32;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    z-index: 10;
    white-space: nowrap;
}
.graph-section:hover .tooltipPaywall {
    opacity: 1;
    transform: translateY(0);
}
.user-marker {
    position: absolute;
    left: 20%;
    bottom: 28%;
    font-size: 24px;
    z-index: 5;
    filter: drop-shadow(0 0 5px rgba(230, 161, 87, 0.5));
    opacity: 0;
    transform: translate(-50%, 50%) scale(0);
    animation: markerPopIn 0.5s ease-out forwards 1s, pulse 2s infinite ease-in-out 1.5s;
}
@keyframes markerPopIn {
    to {
        opacity: 1;
        transform: translate(-50%, 50%) scale(1);
    }
}
@keyframes pulse {
    0% {
        transform: translate(-50%, 50%) scale(1);
    }

    50% {
        transform: translate(-50%, 50%) scale(1.1);
    }

    100% {
        transform: translate(-50%, 50%) scale(1);
    }
}
.graph-svg {
    width: 100%;
    height: 100%;
}
.lower-contentPaywall {
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    color: #cccccc;
    margin-bottom: 20px;
    line-height: 1.5;
}
.action-btn {
    background: linear-gradient(#000000, #000000) padding-box,
        linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%) border-box;
    border: 2px solid transparent;
    color: #ffffff;
    border-radius: 50px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    transition: all 0.3s ease;
}
.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(205, 127, 50, 0.4);
    background: linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%) border-box;
    color: #000000;
}
.logoSnippingSoulClass {
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 24px;
    height: 24px;
}   
    /* Base styles for overlay */
.SnippingSoul-auto-relist-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Dialog container */
.SnippingSoul-auto-relist-dialog {
    background: #181818;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    padding: 30px;
    position: relative;
    overflow: hidden;
}

/* Close button */
.SnippingSoul-auto-relist-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f5f5f5;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.SnippingSoul-auto-relist-close:hover {
    background: #e0e0e0;
    transform: scale(1.1);
}

/* Icon */
.SnippingSoul-auto-relist-icon {
    font-size: 40px;
    text-align: center;
    margin: 20px 0;
    color: #4a6cf7;
}

/* Heading */
.SnippingSoul-auto-relist-dialog h2 {
    margin: 0 0 15px 0;
    font-weight: 600;
    color: white;
    text-align: center;
}

/* Description */
.SnippingSoul-auto-relist-description {
    color: gray;
    line-height: 1.5;
    margin-bottom: 20px;
    text-align: center;
}

/* Warning section */
.SnippingSoul-auto-relist-warning {
    background: #141414;
    border-left: 4px solid #ffc107;
    padding: 15px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 20px;
}

.SnippingSoul-auto-relist-warning strong {
    color: #ff9800;
}

/* Info section */
.SnippingSoul-auto-relist-info {
    background: #141414;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.SnippingSoul-auto-relist-info-title {
    font-weight: 600;
    color: #1976d2;
    margin-bottom: 8px;
}

/* Label */
.SnippingSoul-auto-relist-label {
    display: block;
    margin: 20px 0 8px 0;
    font-weight: 500;
    color: gray;
}

/* Select dropdown */
.SnippingSoul-auto-relist-select {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #141414;
    font-size: 16px;
    color: white;
    margin-bottom: 20px;
    transition: border-color 0.3s ease;
}

.SnippingSoul-auto-relist-select:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
}

/* Buttons container */
.SnippingSoul-auto-relist-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

/* Start button */
.SnippingSoul-auto-relist-start {
    flex: 1;
    padding: 12px 20px;
    background: #4a6cf7;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.SnippingSoul-auto-relist-start:hover {
    background: #3a5af5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 108, 247, 0.3);
}

/* Stop button */
.SnippingSoul-auto-relist-stop {
    flex: 1;
    padding: 12px 20px;
    background: #ff5252;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.SnippingSoul-auto-relist-stop:hover {
    background: #ff1a1a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 82, 82, 0.3);
}

/* Responsive adjustments */
@media (max-width: 600px) {
    .SnippingSoul-auto-relist-dialog {
        padding: 20px;
        margin: 10px;
    }
    
    .SnippingSoul-auto-relist-buttons {
        flex-direction: column;
    }
}
.SnippingSoul-custom-data {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    font-family: inherit;
}

.SnippingSoul-price {
    position: absolute;
    top: 12px;
    left: 49%;
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 13px;
    padding: 0 2px;
    border-radius: 4px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
}

.SnippingSoul-price-big {
    position: absolute;
    top: 25px;
    left: 49%;
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 13px;
    padding: 0 2px;
    border-radius: 4px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
}

.SnippingSoul-positions {
    position: absolute;
    top: 15px;
    left: 80%;
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.SnippingSoul-positions-big {
    position: absolute;
    top: 35px;
    left: 85%;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.SnippingSoul-position {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 10px;
    border-radius: 3px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    white-space: nowrap;
}
.SnippingSoul-position-big {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 10px;
    border-radius: 3px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
}

.SnippingSoul-skills {
position: absolute;
    top: 75%;
    left: 76%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    background: rgba(20, 20, 20, 0.90);
}
.SnippingSoul-skills-big {
    position: absolute;
    top: 63%;
    left: 84%;
    m: translateY(-50%);
    display: flex;
    flex-direction: row;
    background: rgba(20, 20, 20, 0.90);
}

.SnippingSoul-skill-moves,
.SnippingSoul-weak-foot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
}

.SnippingSoul-skill-moves-big, .SnippingSoul-weak-foot-big {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
}

.SnippingSoul-preferred-foot {
    position: absolute;
    top: calc(50% + 37px);
    left: 86%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
}
.SnippingSoul-preferred-foot-big {
    position: absolute;
    top: calc(50% + 67px);
    left: 86%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 10px;
    border-radius: 3px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
}

.SnippingSoul-grading-score {
    position: absolute;
    top: 108px;
    left: 53%;
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 23px;
    height: 8px;
    padding: 0 2px;
    border-radius: 4px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 8px;
    font-weight: 500;
    white-space: nowrap;
}
.SnippingSoul-grading-score-big {
    position: absolute;
    top: 194px;
    left: 53%;
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 23px;
    height: 12px;
    padding: 0 2px;
    border-radius: 4px;
    background: rgba(20, 20, 20, 0.90);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
}

/* =========================================================
   SnippingSoul GALLERY
========================================================= */

.SnippingSoul-gallery {
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    padding: 28px 32px 50px;
    color: #ffffff;
    font-family: inherit;
}


/* =========================================================
   HEADER
========================================================= */

.SnippingSoul-gallery-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 24px;
}

.SnippingSoul-gallery-title {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
}

.SnippingSoul-gallery-subtitle {
    margin-top: 6px;
    font-size: 13px;
    opacity: 0.55;
}


/* =========================================================
   SYNC BUTTON
========================================================= */

.SnippingSoul-gallery-sync-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border: 0;
    border-radius: 8px;

    padding: 11px 18px;

    background: #ffffff;
    color: #111111;

    font-size: 13px;
    font-weight: 700;

    cursor: pointer;

    transition:
        transform 0.15s ease,
        opacity 0.15s ease;
}

.SnippingSoul-gallery-sync-button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
}

.SnippingSoul-sync-icon {
    font-size: 16px;
}


/* =========================================================
   SYNC PANEL
========================================================= */

.SnippingSoul-sync-panel {
    width: 100%;
    box-sizing: border-box;

    margin-bottom: 24px;
    padding: 18px 20px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.SnippingSoul-sync-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 13px;
}

.SnippingSoul-sync-header > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.SnippingSoul-sync-header strong {
    font-size: 14px;
}

.SnippingSoul-sync-status {
    font-size: 12px;
    opacity: 0.55;
}

.SnippingSoul-sync-percentage {
    font-size: 20px;
    font-weight: 700;
}

.SnippingSoul-sync-progress-track {
    width: 100%;
    height: 7px;

    overflow: hidden;

    border-radius: 20px;

    background: rgba(255, 255, 255, 0.1);
}

.SnippingSoul-sync-progress-fill {
    height: 100%;
    width: 0;

    border-radius: inherit;

    background: #ffffff;

    transition: width 0.25s ease;
}

.SnippingSoul-sync-detail {
    margin-top: 9px;

    font-size: 11px;

    opacity: 0.45;
}

.SnippingSoul-sync-error {
    margin-bottom: 20px;
    padding: 15px 18px;

    border-radius: 9px;

    background: rgba(255, 70, 70, 0.1);

    font-size: 13px;
}


/* =========================================================
   NAVIGATION
========================================================= */

.SnippingSoul-gallery-navigation {
    display: flex;
    align-items: center;
    gap: 16px;

    margin-bottom: 24px;
}

.SnippingSoul-gallery-back {
    border: 0;
    padding: 8px 13px;

    border-radius: 7px;

    background: rgba(255, 255, 255, 0.07);
    color: #ffffff;

    font-size: 12px;
    font-weight: 600;

    cursor: pointer;
}

.SnippingSoul-gallery-back:hover {
    background: rgba(255, 255, 255, 0.12);
}

.SnippingSoul-gallery-view-title {
    font-size: 22px;
    font-weight: 700;
}


/* =========================================================
   CATEGORY GRID
========================================================= */

.SnippingSoul-gallery-category-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(190px, 1fr));

    gap: 16px;
}


/* =========================================================
   CATEGORY
========================================================= */

.SnippingSoul-gallery-category {
    min-height: 150px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    box-sizing: border-box;

    padding: 22px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.07);

    cursor: pointer;

    transition:
        transform 0.18s ease,
        background 0.18s ease,
        border-color 0.18s ease;
}

.SnippingSoul-gallery-category:hover {
    transform: translateY(-3px);

    background: rgba(255, 255, 255, 0.085);
    border-color: rgba(255, 255, 255, 0.14);
}

.SnippingSoul-gallery-category-icon {
    width: 150px;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 18px;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.08);

    font-size: 20px;
}

.SnippingSoul-gallery-category-name {
    font-size: 16px;
    font-weight: 700;
}

.SnippingSoul-gallery-category-count {
    margin-top: 5px;

    font-size: 11px;

    opacity: 0.45;
}


/* =========================================================
   SET GRID
========================================================= */

.SnippingSoul-gallery-set-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(280px, 1fr));

    gap: 16px;
}


/* =========================================================
   SET
========================================================= */

.SnippingSoul-gallery-set {
    box-sizing: border-box;

    padding: 18px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.07);

    cursor: pointer;

    transition:
        transform 0.18s ease,
        background 0.18s ease,
        border-color 0.18s ease;
}

.SnippingSoul-gallery-set:hover {
    transform: translateY(-2px);

    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.13);
}

.SnippingSoul-gallery-set-top {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 58px;
    width: 100%;
    box-sizing: border-box;
}
.SnippingSoul-gallery-set-title {
    display: flex;
    align-items: center;
    gap: 10px;
}

.SnippingSoul-gallery-set-badge {
    width: 36px;
    height: 36px;
    object-fit: contain;
    flex-shrink: 0;
}

.SnippingSoul-gallery-set-league-badge {
width: 50px;
height: 50px;
object-fit: contain;
}
.SnippingSoul-gallery-set-badge-wrapper {
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.SnippingSoul-gallery-set-badge {
    width: 48px;
    height: 48px;

    object-fit: contain;
}

.SnippingSoul-gallery-set-info {
    min-width: 0;
    flex: 0 1 auto;
}

.SnippingSoul-gallery-set-dustpoints {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    margin-left: auto;
    flex-shrink: 0;
}
.SnippingSoul-dustpoint-circle {
    position: relative;
    top: 50%;
    right: 4px;
    width: 25px;
    height: 25px;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    /* Base viola scuro */
    background:
        radial-gradient(
            circle at 34% 25%,
            rgba(255, 255, 255, 0.30) 0%,
            transparent 22%
        ),
        radial-gradient(
            circle at 50% 40%,
            #795092 0%,
            #48265f 48%,
            #21162e 78%,
            #100c18 100%
        );

    /* Bordo esterno metallico */
    border: 2px solid #b9a2c7;
    overflow: hidden;
}

/* Anelli metallici interni */
.SnippingSoul-dustpoint-circle::before {
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    border: 1px solid rgba(239, 226, 255, 0.85);
    box-shadow:
        0 0 3px rgba(255, 255, 255, 0.45),
        inset 0 0 5px rgba(0, 0, 0, 0.5);
    pointer-events: none;
}

/* Riflesso sulla superficie */
.SnippingSoul-dustpoint-circle::after {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.16),
        transparent 35%,
        transparent 75%,
        rgba(0, 0, 0, 0.18)
    );
    pointer-events: none;
}

/* Icona originale */
.SnippingSoul-dustpoint-circle img {
    display: block;
    position: relative;
    z-index: 1;

    width: 54%;
    height: 54%;
    object-fit: contain;

    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
}
.SnippingSoul-gallery-set-name {
    font-size: 15px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.SnippingSoul-gallery-set-count {
    margin-top: 5px;

    font-size: 11px;

    opacity: 0.5;
}


/* =========================================================
   SET COLLECTION PROGRESS
========================================================= */

.SnippingSoul-gallery-set-progress {
    margin-top: 18px;
}

.SnippingSoul-gallery-progress-label {
    display: flex;
    justify-content: space-between;

    margin-bottom: 7px;

    font-size: 10px;

    opacity: 0.55;
}

.SnippingSoul-gallery-progress-track {
    width: 100%;
    height: 5px;

    overflow: hidden;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.09);
}

.SnippingSoul-gallery-progress-fill {
    height: 100%;

    border-radius: inherit;

    background: #ffffff;
}


/* =========================================================
   GRADES
========================================================= */

.SnippingSoul-gallery-grades {
    margin-top: 18px;
}

.SnippingSoul-grade-progress {
    display: flex;
    flex-direction: column;

    gap: 7px;
}

.SnippingSoul-grade {
    display: grid;

    grid-template-columns: 20px 1fr 58px;

    align-items: center;

    gap: 8px;
}

.SnippingSoul-grade-label {
    display: contents;

    font-size: 10px;
}

.SnippingSoul-grade-label span:first-child {
    font-weight: 700;
    opacity: 0.75;
}

.SnippingSoul-grade-label span:last-child {
    text-align: right;
    opacity: 0.4;
}

.SnippingSoul-grade-track {
    height: 4px;

    overflow: hidden;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.08);
}

.SnippingSoul-grade-fill {
    height: 100%;

    border-radius: inherit;

    background: #ffffff;

    transition: width 0.25s ease;
}


/* =========================================================
   SET SUMMARY
========================================================= */

.SnippingSoul-gallery-set-summary {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 12px;

    margin-bottom: 25px;
}

.SnippingSoul-summary-stat {
    padding: 15px;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.055);

    text-align: center;
}

.SnippingSoul-summary-stat strong {
    display: block;

    font-size: 20px;
    font-weight: 700;
}

.SnippingSoul-summary-stat span {
    display: block;

    margin-top: 4px;

    font-size: 10px;

    opacity: 0.45;
}


/* =========================================================
   TIERS
========================================================= */

.SnippingSoul-gallery-player-tiers {
    display: flex;
    flex-direction: column;

    gap: 20px;
}

.SnippingSoul-gallery-tier {
    padding: 18px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.SnippingSoul-gallery-tier-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    margin-bottom: 17px;
}

.SnippingSoul-gallery-tier-title {
    --tier-color: #b9c0d0;
    --tier-glow: rgba(185, 192, 208, 0.25);

    position: relative;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    color: var(--tier-color);
    font-size: 15px;
    font-weight: 700;
    line-height: 1;

    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.10),
        rgba(0, 0, 0, 0.45)
    );
text-indent: 0;
isolation: isolate;
    border: 2px solid var(--tier-color);
    transform: rotate(45deg);
    box-shadow:
        0 0 3px var(--tier-glow),
        inset 0 0 4px var(--tier-glow);
}


.SnippingSoul-gallery-tier-title::before {
    content: "";
    position: absolute;
    inset: 3px;
    border: 1px solid var(--tier-color);
    opacity: 0.8;
    pointer-events: none;
}

.SnippingSoul-gallery-tier-title::after {
    content: attr(data-tier);
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-45deg);
    color: var(--tier-color);
}

.SnippingSoul-gallery-tier-title[data-tier="D"],
.SnippingSoul-gallery-tier-title[data-tier="C"] {
    --tier-color: #b9c0d0;
    --tier-glow: rgba(185, 192, 208, 0.25);
}

.SnippingSoul-gallery-tier-title[data-tier="B"] {
    --tier-color: #ffd85a;
    --tier-glow: rgba(255, 216, 90, 0.4);
}

.SnippingSoul-gallery-tier-title[data-tier="A"] {
    --tier-color: #ffcf45;
    --tier-glow: rgba(255, 207, 69, 0.4);
}

.SnippingSoul-gallery-tier-title[data-tier="S"] {
    --tier-color: #b9a0ff;
    --tier-glow: rgba(185, 160, 255, 0.4);
}
.SnippingSoul-gallery-tier-cost {
    margin-top: 5px;
    font-size: 12px;
    color:lightgrey;
}

.SnippingSoul-gallery-tier-points {
    text-align: right;

    font-size: 10px;

    opacity: 1;
}

.SnippingSoul-gallery-tier-points strong {
    color: #ffffff;

    font-size: 15px;

    opacity: 1;
}

.SnippingSoul-gallery-tier-points span {
    display: block;

    margin-top: 3px;

    opacity: 0.6;
}


/* =========================================================
   PLAYER GRID
========================================================= */

.SnippingSoul-gallery-player-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(150px, 1fr));

    gap: 8px;
}


/* =========================================================
   PLAYER
========================================================= */

.SnippingSoul-gallery-player {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: border-color 0.15s ease, transform 0.15s ease;
}

.SnippingSoul-gallery-player.is-not-collected:hover {
    transform: translateY(-3px);
}

.SnippingSoul-gallery-player.is-selected {
    border-color: #2196f3;
    box-shadow: 0 0 8px rgb(33 150 243 / 60%);
}

.SnippingSoul-gallery-player:hover {
    background: rgba(255, 255, 255, 0.075);

    transform: translateY(-1px);
}

.SnippingSoul-gallery-player.is-collected {
    cursor: default;
}

.SnippingSoul-gallery-player.is-not-collected {
    //opacity: 0.52;
}


/* =========================================================
   PLAYER STATUS
========================================================= */

.SnippingSoul-player-status {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 20;

    width: 25px;
    height: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid #ffffff;

    background: rgb(0 0 0 / 65%);
    color: #ffffff;

    font-size: 17px;
    font-weight: bold;
    line-height: 1;

    box-shadow: 0 1px 4px rgb(0 0 0 / 45%);
}
.SnippingSoul-player-status.is-collected {
    background: limegreen;
    border-color: #ffffff;
    color: #ffffff;
}

.SnippingSoul-player-status.is-selected {
    background: #2196f3;
    border-color: #ffffff;
    color: #ffffff;
}

/* =========================================================
   PLAYER MAIN
========================================================= */

.SnippingSoul-player-main {
    min-width: 0;
    flex: 1;
}

.SnippingSoul-player-name {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    font-size: 12px;
    font-weight: 600;
}

.SnippingSoul-player-id {
    margin-top: 3px;

    font-size: 9px;

    opacity: 0.3;
}


/* =========================================================
   PLAYER VALUES
========================================================= */

.SnippingSoul-player-values {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;

    align-items: flex-end;

    gap: 3px;
}

.SnippingSoul-player-price {
    font-size: 11px;
    font-weight: 700;
}

.SnippingSoul-player-price span {
    font-size: 8px;
    font-weight: 400;
    opacity: 0.4;
}

.SnippingSoul-player-score {
    font-size: 10px;

    opacity: 0.6;
}

.SnippingSoul-player-score span {
    font-size: 8px;

    opacity: 0.6;
}


/* =========================================================
   ERROR
========================================================= */

.SnippingSoul-gallery-error {
    width: 100%;

    box-sizing: border-box;

    padding: 40px;

    text-align: center;

    font-size: 14px;

    opacity: 0.5;
}


/* =========================================================
   GALLERY TAB
========================================================= */

.SnippingSoulGallery {
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 100%;
    border: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
}

.SnippingSoul-gallery-tab-icon {
    font-size: 15px;
}

.SnippingSoul-gallery-tier-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    margin-right: 20px;
}

.SnippingSoul-gallery-tier-actions button {
    border: 0;
    border-radius: 6px;
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    background: aliceblue;
}

.SnippingSoul-gallery-category-leagues {
display: flex;
align-items: center;
justify-content: center;
gap: 6px;
}

.SnippingSoul-gallery-category-league-logo {
width: 50px;
height: 50px;
object-fit: contain;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

    .SnippingSoul-gallery {
        padding: 20px;
    }

    .SnippingSoul-gallery-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .SnippingSoul-gallery-sync-button {
        width: 100%;
    }

    .SnippingSoul-gallery-set-summary {
        grid-template-columns: 1fr;
    }

    .SnippingSoul-gallery-player-grid {
        grid-template-columns: 1fr;
    }
}


@media (max-width: 600px) {

    .SnippingSoul-gallery {
        padding: 15px;
    }

    .SnippingSoul-gallery-category-grid,
    .SnippingSoul-gallery-set-grid {
        grid-template-columns: 1fr;
    }

    .SnippingSoul-gallery-title {
        font-size: 22px;
    }

    .SnippingSoul-gallery-tier-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .SnippingSoul-gallery-tier-points {
        text-align: left;
    }
}
    
.SnippingSoul-premium-overlay {
    position: fixed;
    inset: 0;
    z-index: 99998;
    background: rgba(3, 5, 9, .78);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
}

.SnippingSoul-premium-dialog {
    --fp-yellow: #fff700;

    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: min(560px, calc(100vw - 28px));
    max-height: calc(100vh - 24px);
    overflow-y: auto;
    box-sizing: border-box;

    color: #f5f6fa;
    background:
        radial-gradient(ellipse at 50% 0%, rgba(255,247,0,.07), transparent 55%),
        #101218;

    border: 1px solid rgba(255,247,0,.25);
    border-radius: 18px;
    box-shadow: 0 24px 75px rgba(0,0,0,.6);

    font-family: inherit;
    text-align: left;
    animation: fpCompactIn .22s ease-out;
}

.SnippingSoul-premium-dialog *,
.SnippingSoul-premium-dialog *::before,
.SnippingSoul-premium-dialog *::after {
    box-sizing: border-box;
}

.SnippingSoul-premium-dialog button {
    font-family: inherit;
    text-transform: none;
    letter-spacing: normal;
    cursor: pointer;
}

/* Header */

.SnippingSoul-premium-topbar {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 17px 20px 0;
}

.SnippingSoul-premium-brand {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: .4px;
}

.SnippingSoul-premium-crown {
    color: var(--fp-yellow);
    font-size: 20px;
}

.SnippingSoul-premium-pill {
    padding: 4px 8px;
    border: 1px solid rgba(255,247,0,.3);
    border-radius: 20px;
    color: var(--fp-yellow);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1px;
}

.SnippingSoul-premium-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 29px;
    height: 29px;
    margin-left: auto;
    padding: 0;

    color: #a6adbd;
    background: rgba(255,255,255,.045);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 50%;
    font-size: 20px;
    line-height: 1;
}

.SnippingSoul-premium-close:hover {
    color: #fff;
    background: rgba(255,255,255,.1);
}

/* Title */

.SnippingSoul-premium-hero {
    padding: 19px 22px 15px;
}

.SnippingSoul-premium-eyebrow {
    margin-bottom: 7px;
    color: var(--fp-yellow);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.8px;
}

.SnippingSoul-premium-heading {
    margin: 0;
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -.9px;
}

.SnippingSoul-premium-heading span {
    color: var(--fp-yellow);
}

.SnippingSoul-premium-description {
    margin: 8px 0 0;
    color: #a6adbd;
    font-size: 11px;
    line-height: 1.5;
}

/* Message */

.SnippingSoul-premium-message {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0 20px 13px;
    padding: 10px 12px;

    color: #f5f2bb;
    background: rgba(255,247,0,.055);
    border: 1px solid rgba(255,247,0,.17);
    border-radius: 9px;

    font-size: 11px;
    line-height: 1.45;
}

.SnippingSoul-premium-message-icon {
    flex-shrink: 0;
    color: var(--fp-yellow);
    font-size: 17px;
}

/* Price */

.SnippingSoul-premium-price-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px 15px;
    padding: 13px 17px;

    background: linear-gradient(105deg, #222419, #171a20);
    border: 1px solid rgba(255,247,0,.28);
    border-radius: 12px;
}

.SnippingSoul-premium-price-caption {
    color: #b6bdc9;
    font-size: 10px;
}

.SnippingSoul-premium-price-value {
    margin-top: 3px;
    color: var(--fp-yellow);
    font-size: 35px;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -1px;
}

.SnippingSoul-premium-price-note {
    margin-top: 4px;
    color: #8f97a7;
    font-size: 9px;
}

.SnippingSoul-premium-price-art {
    color: rgba(255,247,0,.85);
    font-size: 37px;
}

/* Features */

.SnippingSoul-premium-features {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin: 0 20px 16px;
}

.SnippingSoul-premium-feature {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    min-height: 58px;
    padding: 9px;

    background: #171a22;
    border: 1px solid #2a2e39;
    border-radius: 10px;
    transition: border-color .18s ease;
}

.SnippingSoul-premium-feature:hover {
    border-color: rgba(255,247,0,.35);
}

.SnippingSoul-premium-feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 29px;
    width: 29px;
    height: 29px;

    color: var(--fp-yellow);
    background: rgba(255,247,0,.08);
    border-radius: 8px;
    font-size: 15px;
}

.SnippingSoul-premium-feature-copy {
    min-width: 0;
}

.SnippingSoul-premium-feature-title {
    color: #f2f3f7;
    font-size: 10px;
    font-weight: 750;
    line-height: 1.35;
}

.SnippingSoul-premium-feature-description {
    margin-top: 3px;
    color: #929aaa;
    font-size: 9px;
    line-height: 1.35;
}

.SnippingSoul-premium-feature-arrow {
    display: none;
}

/* Buttons */

.SnippingSoul-premium-actions {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0 20px;
}

.SnippingSoul-premium-dialog .SnippingSoul-premium-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    width: 100%;
    min-height: 43px;
    margin: 0;
    padding: 11px 16px;

    color: #111;
    background: var(--fp-yellow);
    border: 1px solid var(--fp-yellow);
    border-radius: 9px;

    font-size: 12px;
    font-weight: 900;
    transition: background .18s ease;
}

.SnippingSoul-premium-dialog .SnippingSoul-premium-cta:hover {
    background: #fffca3;
}

.SnippingSoul-premium-cta-diamond,
.SnippingSoul-premium-cta-arrow {
    font-size: 16px;
}

.SnippingSoul-premium-dialog .SnippingSoul-premium-dismiss {
    width: 100%;
    min-height: 30px;
    margin: 0;
    padding: 6px;

    color: #929aaa;
    background: transparent;
    border: 0;
    border-radius: 7px;
    font-size: 10px;
}

.SnippingSoul-premium-dialog .SnippingSoul-premium-dismiss:hover {
    color: #fff;
    background: rgba(255,255,255,.04);
}

/* Footer */

.SnippingSoul-premium-footer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 7px 12px 15px;

    color: #858d9c;
    font-size: 9px;
}

.SnippingSoul-premium-footer-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.SnippingSoul-premium-footer-icon {
    color: var(--fp-yellow);
}

.SnippingSoul-premium-footer-dot {
    display: none;
}

/* Compact screens */

@media (max-width: 480px) {
    .SnippingSoul-premium-dialog {
        width: calc(100vw - 20px);
        border-radius: 14px;
    }

    .SnippingSoul-premium-topbar {
        padding: 13px 14px 0;
    }

    .SnippingSoul-premium-hero {
        padding: 15px 16px 12px;
    }

    .SnippingSoul-premium-heading {
        font-size: 25px;
    }

    .SnippingSoul-premium-message,
    .SnippingSoul-premium-price-banner {
        margin-right: 13px;
        margin-left: 13px;
    }

    .SnippingSoul-premium-features {
        gap: 6px;
        margin-right: 13px;
        margin-left: 13px;
    }

    .SnippingSoul-premium-feature {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        padding: 8px;
    }

    .SnippingSoul-premium-feature-title {
        font-size: 9px;
    }

    .SnippingSoul-premium-feature-description {
        font-size: 8px;
    }

    .SnippingSoul-premium-actions {
        margin-right: 13px;
        margin-left: 13px;
    }

    .SnippingSoul-premium-footer {
        gap: 8px;
        padding-bottom: 12px;
    }
}

@keyframes fpCompactIn {
    from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(.98);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@media (prefers-reduced-motion: reduce) {
    .SnippingSoul-premium-dialog {
        animation: none;
    }

    .SnippingSoul-premium-dialog * {
        transition: none !important;
    }
}

    `,t=document.createElement("style");t.innerText=e,document.head.appendChild(t),ue=!1;var i=document.getElementsByClassName("ut-tab-bar")[0],r=!1;if(Array.from(i.children).forEach(d=>{d.classList.contains("InjectedBtn")&&(r=!0)}),!r){var s;s=document.createElement("button"),s.className="ut-tab-bar-item InjectedBtn",window.screen.height>=900?s.style="order: 7;margin-top: 100%;":window.screen.height<900&&window.screen.height>800?s.style="order: 7;":window.screen.height<=800&&(s.style="order: -1;"),s.addEventListener("mouseover",function(d){Ut(s,!0)}),s.addEventListener("mouseout",function(d){Ut(s,!1)}),s.addEventListener("click",function(d){s.classList.add("selected")});var l;l=document.createElement("img"),l.style="width: 30px;height: 30px;order: 7;";try{let d=await new Promise(function(m,g){window.addEventListener("message",function(x){x.data.message==="getChromeExtensionUrlCompleted"&&m(x.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"Logo.png"},"*")});l.src=d}catch(d){console.error(d)}var c;c=document.createElement("span"),c.innerText="SnippingSoul",c.style="color: #fff700;",s.appendChild(l),s.appendChild(c),ee?(s.style="order: 7;",l.style="width: 25px;height: 25px;",i.insertBefore(s,i.children[4])):i.insertBefore(s,i.children[8])}if(Rt==null||le==null||Z==null){le=services.Authentication.utasSession.id;var o=services.User.userDao.authDelegate.utasSession.user.selectedPersona,u=services.User.userDao.authDelegate.utasSession.user._personas._collection[o]._sku;u==="FFA27PCC"||u==="FFA27STM"?Z="pc":Z="console",Rt=services.User.userDao.authDelegate.utasSession.locale.language+services.User.userDao.authDelegate.utasSession.locale.region}li(),As(),document.getElementsByClassName("ut-tab-bar-item icon-transfer")[0].children[0].innerText.includes("(Autobuyer)")||(document.getElementsByClassName("ut-tab-bar-item icon-transfer")[0].children[0].innerText+=" (Autobuyer)"),await ol(),Dr(),await Hl(),await si(),services.Item.itemDao.itemRepo.pileSizes._collection[ItemPile.PURCHASED]=5e3,oo(),Mo()}async function Ps(){}var ks={attributes:!0,childList:!0,subtree:!0},Is=(n,e)=>{for(let t of n)t.type},Ls=new MutationObserver(Is);async function As(){window.postMessage({message:"set",objPassed:ne(["userFifaID","iframeID"],[services.User.currentUserId.toString(),"iframe0T"])},"*"),Lr("iframe0T")}function ne(n,e){let t={};for(let i=0;i<n.length;i++)t[n[i]]=e[i];return t}function pr(){I=[],Ml()}function Os(){document.getElementsByClassName("SniperBotInAppMenu")[0].remove(),Nr(),Er(),kr(),Br(),xr(),qe()}function Ds(){document.getElementsByClassName("SniperBotInAppMenu")[0].remove(),Nr(),Er(),kr(),Br(),xr(),qe()}async function Pn(){var n=document.createElement("h1");n.className="title titleSnippingSoul",n.innerText="Réglages SnippingSoul",document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0]!=null&&(document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].insertBefore(n,document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].children[0]),document.getElementsByClassName("title")[1].style="visibility:hidden");var e;try{e=await new Promise(function(i,r){window.addEventListener("message",function(s){s.data.message==="getChromeExtensionUrlCompleted"&&i(s.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"SnippingSoulOptions.html"},"*")})}catch(t){console.error(t)}document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0]!=null&&(document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].insertBefore(n,document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].children[0]),document.getElementsByClassName("title")[1].style="visibility:hidden"),fetch(e).then(t=>t.text()).then(async t=>{document.getElementsByClassName("SnippingSoulDiv")[0].innerHTML=t,document.body.style.fontFamily="UltimateTeam, sans-serif",document.getElementsByClassName("SnippingSoulDiv")[0].innerHTML+=`<style>
        .nft:hover {
            border: 1px solid #fff 44;
            box-shadow: 0 7px 50px 10px #000 aa;
            transform: scale(1.001);
            filter: brightness(1.2);
        }

     </style>
        
        `;var i=document.getElementsByClassName("MakeBidInput")[0].parentNode,r=document.createElement("div");r.style="display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;";var s=document.createElement("span");s.style="align-self: center;padding-left: 5%;",s.innerText="Retour";var l=document.createElement("input");l.type="text",l.className="GoBackInput",l.style="height: 2em;width: 9em;text-align: center;",l.name="inputTextOptions",l.placeholder="unassigned",l.setAttribute("readonly",!0),r.appendChild(s),r.appendChild(l),i.parentNode.insertBefore(r,i.nextSibling);var c=document.createElement("div");c.style="display: grid;padding-top: 3%;grid-template-columns: 10fr 4fr;";var o=document.createElement("span");o.style="align-self: center;padding-left: 5%;",o.innerText="Calculateur de taxe";var u=document.createElement("input");u.type="text",u.className="TaxInput",u.style="height: 2em;width: 9em;text-align: center;",u.name="inputTextOptions",u.placeholder="unassigned",u.setAttribute("readonly",!0),c.appendChild(o),c.appendChild(u),i.parentNode.insertBefore(c,r.nextSibling),document.getElementsByClassName("SnippingSoulDescription")[11].innerHTML=document.getElementsByClassName("SnippingSoulDescription")[11].innerHTML.replace("get your rewards","pour recevoir votre récompense"),document.getElementsByClassName("nft")[2].innerHTML=`<div class="main" style="display: grid;">
              <h2 style="text-align: center;">
                <span> Développez votre club sur</span>
                <span style="color: #fff700;"> FC27!</span>
              </h2>
              <span class="SnippingSoulDescription" style="text-align: center;color: white;visibility: hidden;">Récompenses du concours mensuel</span><h2 style="text-align: center;margin-top: auto;visibility: hidden;">\u{1F381}</h2>
              
              <span class="SnippingSoulDescription" style="text-align: center;color: white;">Retrouvez les nouvelles sur <a href="about:blank#removed-promotion" target="_blank" style="color: #fff700;">Instagram</a> pour suivre les nouveautés de l’assistant FC27 !</span>

              <span class="SnippingSoulDescription" style="text-align: center;color: white;">Prêts pour de nouvelles sessions !</span><h2 style="text-align: center;margin-top: auto;">\u{1F680}</h2>
              <span class="SnippingSoulDescription" style="text-align: center;color: #fff700;"><a href="about:blank#removed-promotion" target="_blank" style="
    color: aqua;
">Communauté SnippingSoul</a></span>
              

<span class="SnippingSoulDescription" style="text-align: center;color: white;visibility: hidden;">Récompenses du concours mensuel</span>
              <hr>
            </div>`,document.getElementsByClassName("btn-standard submitKey")[0].style="background-color: #fff700;color: black;",document.getElementsByClassName("nft")[1].innerHTML=`<div class="main" style="display: grid;">
              <h2 style="text-align: center;content-visibility: hidden;">
                <span> Raccourcis </span>
                <span style="color: #fff700;">Fonctions avancées</span>
              </h2>
              <p class="SnippingSoulDescription" style="text-align: center;content-visibility: hidden;">This section shows the hotkeys of Premium features. You can use these features in the free trial or by purchasing SnippingSoul Premium. With the latest versions, Show Auto Sniper Bot and Emergency Exit have become buttons available directly on the transfer market page, you can still use these hotkeys for convenience.</p>
              <div class="tokenInfo" style="content-visibility: hidden;">
                <div class="price">
                  <p>Afficher l’assistant d’achat</p>
                </div>
                <div class="duration">
                  <input class="AutoSniperBotKey" name="inputTextOptions" type="text" style="height: 2em;width: 9em;text-align: center;" placeholder="unassigned" readonly="">
                </div>
              </div>
              <div class="tokenInfo" style="content-visibility: hidden;">
                <div class="price">
                  <p>Arrêt d’urgence</p>
                </div>
                <div class="duration">
                  <input class="EmergencyExit" name="inputTextOptions" type="text" style="height: 2em;width: 9em;text-align: center;" placeholder="unassigned" readonly="">
                </div>
              </div>
              <div class="tokenInfo" style="content-visibility: hidden;">
                <div class="price">
                  <p> Achat manuel </p> 
                </div>
                <div class="duration">
                  <input class="ManualSnipeKey" name="inputTextOptions" type="text" style="height: 2em;width: 9em;text-align: center;" placeholder="unassigned" readonly="">
                </div>
              </div>
              <div class="tokenInfo" style="margin-top: 5%;overflow: auto;">
                <div class="price" style="color:white;font-weight: normal;">
                  <p> Vendre avec une seule touche </p> 
                </div>
                <div class="duration">
                  <input class="SellInputKey" name="inputTextOptions" type="text" style="height: 2em;width: 9em;text-align: center;" placeholder="unassigned" readonly="">
                  <input class="SellStartPrice" name="sellInputStartPrice" type="text" style="height: 2em;width: 9em;text-align: center;" placeholder="Prix de départ">
                  <input class="SellBuyNowPrice" name="sellBuyNowPrice" type="text" style="height: 2em;width: 9em;text-align: center;" placeholder="Prix d’achat immédiat">
                </div>
              </div>
              <div class="tokenInfo" style="margin-top: 5%;overflow: auto;">
                <div class="price" style="color:white;font-weight: normal;">
                  <p>Ouvrir les packs sans animation</p> 
                </div>
                <div class="duration">
                  <input class="NoAnimationPacks" name="inputTextOptions" type="checkbox" style="height: 2em;width: 9em;text-align: center;" readonly="">
                </div>
              </div>
              <div style="position: relative;top: 10px;justify-self: center;">
                <p style="text-align: center;position: relative;top: 10px;color: #fff700;">De nouvelles fonctions arrivent !</p>
              </div>
<div style="bottom: 0;position: fixed;justify-self: center;">
                <p class="SnippingSoulDescription" style="text-align: center;">Gardez cette fenêtre ouverte au premier plan pendant les achats.</p>
              </div>
              
            </div>`,document.getElementsByClassName("main")[3].children[1].src="https://www.youtube.com/embed/9d0He0KW1l0?si=q4cDNfuCp8ufWJKO",xl(),Cl(),wl(),await wr(),await si(),D!=null&&H!=null?D=="Active"?(document.getElementsByClassName("premiumStatusValue")[0].innerText=D,document.getElementsByClassName("premiumStatusValue")[0].style.color="green",document.getElementsByClassName("timeRemainingValue")[0].innerText="Sans abonnement",H<=1?(document.getElementsByClassName("timeRemainingValue")[0].style.color="red",ue||(te("Subscription ends tomorrow. Get a new subscription to continue use of Premium advantages. If you liked the extension, please leave a review <3","red","#fff",document.body),ue=!0)):H<5?(document.getElementsByClassName("timeRemainingValue")[0].style.color="orange",ue||(te("Subscription ends in "+H+" days. Get a new subscription to continue use of Premium advantages. If you like the extension, please leave a review <3","orange","#fff",document.body),ue=!0)):H<15?document.getElementsByClassName("timeRemainingValue")[0].style.color="yellow":H>=15&&(document.getElementsByClassName("timeRemainingValue")[0].style.color="green"),document.getElementsByClassName("AutoSniperBotKey")[0].disabled=!1,document.getElementsByClassName("EmergencyExit")[0].disabled=!1,document.getElementsByClassName("ManualSnipeKey")[0].disabled=!1,document.getElementsByClassName("SellInputKey")[0].disabled=!1,document.getElementsByClassName("SellStartPrice")[0].disabled=!1,document.getElementsByClassName("SellBuyNowPrice")[0].disabled=!1):(document.getElementsByClassName("premiumStatusValue")[0].innerText=D,document.getElementsByClassName("premiumStatusValue")[0].style.color="red",document.getElementsByClassName("timeRemainingValue")[0].innerText="---",document.getElementsByClassName("timeRemainingValue")[0].style.color="red",document.getElementsByClassName("AutoSniperBotKey")[0].innerText="",document.getElementsByClassName("EmergencyExit")[0].innerText="",document.getElementsByClassName("ManualSnipeKey")[0].innerText="",document.getElementsByClassName("AutoSniperBotKey")[0].disabled=!0,document.getElementsByClassName("EmergencyExit")[0].disabled=!0,document.getElementsByClassName("ManualSnipeKey")[0].disabled=!0,window.postMessage({message:"set",objPassed:ne(["AutoSniperBotKey","ManualSnipeKey","EmergencyExit"],["","",""])},"*")):(await fe(services.User.currentUserId.toString()),D=="Active"?(document.getElementsByClassName("premiumStatusValue")[0].innerText=D,document.getElementsByClassName("premiumStatusValue")[0].style.color="green",document.getElementsByClassName("timeRemainingValue")[0].innerText="Sans abonnement",H<=1?(document.getElementsByClassName("timeRemainingValue")[0].style.color="red",ue||(te("Subscription ends tomorrow. Get a new subscription to continue use of Premium advantages. If you liked the extension, please leave a review <3","red","#fff",document.body),ue=!0)):H<5?(document.getElementsByClassName("timeRemainingValue")[0].style.color="orange",ue||(te("Subscription ends in "+H+" days. Get a new subscription to continue use of Premium advantages. If you like the extension, please leave a review <3","orange","#fff",document.body),ue=!0)):H<15?document.getElementsByClassName("timeRemainingValue")[0].style.color="yellow":H>=15&&(document.getElementsByClassName("timeRemainingValue")[0].style.color="green"),document.getElementsByClassName("AutoSniperBotKey")[0].disabled=!1,document.getElementsByClassName("EmergencyExit")[0].disabled=!1,document.getElementsByClassName("ManualSnipeKey")[0].disabled=!1,document.getElementsByClassName("SellInputKey")[0].disabled=!1,document.getElementsByClassName("SellStartPrice")[0].disabled=!1,document.getElementsByClassName("SellBuyNowPrice")[0].disabled=!1):(document.getElementsByClassName("premiumStatusValue")[0].innerText=D,document.getElementsByClassName("premiumStatusValue")[0].style.color="red",document.getElementsByClassName("timeRemainingValue")[0].innerText="---",document.getElementsByClassName("timeRemainingValue")[0].style.color="red",document.getElementsByClassName("AutoSniperBotKey")[0].innerText="",document.getElementsByClassName("EmergencyExit")[0].innerText="",document.getElementsByClassName("ManualSnipeKey")[0].innerText="",document.getElementsByClassName("SellInputKey")[0].innerText="",document.getElementsByClassName("SellStartPrice")[0].innerText="",document.getElementsByClassName("SellBuyNowPrice")[0].innerText="",document.getElementsByClassName("AutoSniperBotKey")[0].disabled=!0,document.getElementsByClassName("EmergencyExit")[0].disabled=!0,document.getElementsByClassName("ManualSnipeKey")[0].disabled=!0,window.postMessage({message:"set",objPassed:ne(["AutoSniperBotKey","ManualSnipeKey","EmergencyExit"],["","",""])},"*"))),ee&&(document.getElementsByClassName("SnippingSoulDiv")[0].innerHTML=`<div class="nft"><div class="main" style="display: grid;">
            <h2 style="text-align: center;">
              <span> Parrainage SnippingSoul | </span>
              <span style="color: #fff700;"> Vos récompenses</span>
            </h2>
            <span class="SnippingSoulDescription" style="text-align: center;color: white;visibility: hidden;">Récompenses du concours mensuel</span><h2 style="text-align: center;margin-top: auto;">\u{1F381}</h2>
            <span class="SnippingSoulDescription" style="text-align: center;color: #fff700;">Donner une note <a href="about:blank#removed-promotion" target="_blank" style="color: #fff700;">sur Chrome</a> \u2B50\u2B50\u2B50\u2B50\u2B50
              <span class="SnippingSoulDescription" style="text-align: center;color: white;">| You get 2 days of Premium free</span>
            </span>
            <span class="SnippingSoulDescription" style="text-align: center;color: white;">Envoyer une capture sur <a href="about:blank#removed-promotion" target="_blank" style="color: #fff700;">Instagram</a> pour recevoir votre récompense</span>

            <span class="SnippingSoulDescription" style="text-align: center;color: white;visibility: hidden;">Récompenses du concours mensuel</span><h2 style="text-align: center;margin-top: auto;">\u{1F680}</h2>
            <span class="SnippingSoulDescription" style="text-align: center;color: #fff700;"><a href="about:blank#removed-promotion" target="_blank" style="
  color: aqua;
">Communauté SnippingSoul</a></span>
            

<span class="SnippingSoulDescription" style="text-align: center;color: white;visibility: hidden;">Récompenses du concours mensuel</span>
            <hr>
          </div></div><div class="nft">
          <div class="main" style="display: grid;grid-template-rows: 0fr 0.5fr 1.5fr 0.5fr;">
            <h2 style="text-align: center;">SnippingSoul — fonctions avancées </h2>
            <p class="SnippingSoulDescription" style="text-align: center;">Votre assistant pour le marché des transferts.</p>
            <div classs="divRoundedBtnGetPremium" style="text-align: -webkit-center;padding: 30px;">
              <a class="roundedBtn" href="about:blank#removed-promotion" target="_blank">Fonctions avancées</a>
            </div>
            <div class="divPremiumStatus" style="padding: inherit;">
              <p style="display: inline;">État :</p>
              <p style="display: inline; color: green" class="premiumStatusValue">Active</p>
              <p style="display: inline; color: green; float: right;" class="timeRemainingValue">245 days</p>
              <p style="display: inline;float: right;">Temps restant :</p>
          </div>
            <div class="tokenInfo" style="width: 101.32%;">
              <div class="price" style="width: 100%;">
                <input class="inputKey" name="inputKey" type="text" style="height: 2em;width: 35.7em;text-align: center;border-style: solid;width: 99.36%;" placeholder="Saisir une clé ici">
              </div>
              <div class="duration">
              </div>
            </div>
            <button class="btn-standard submitKey" style="background-color: rgb(255, 247, 0); color: black;">Activer les fonctions avancées</button>
            <hr>
          </div>
        </div>
        <style>
body {
	 margin: 0;
   font-family: UltimateTeam,sans-serif;
	 -webkit-font-smoothing: antialiased;
	 -moz-osx-font-smoothing: grayscale;
	 background-color: #161418;
	 color: #eee;
	 user-select: none;
}

 .nft {
	 user-select: none;
   margin-top: 1%;
   margin-right: 1%;
	 border: 1px solid #fff 22;
	 background-color: #282c34;
	 background: linear-gradient(0deg, rgba(40, 44, 52, 1) 0%, rgba(17, 0, 32, .5) 100%);
	 box-shadow: 0 7px 20px 5px #000 88;
	 border-radius: 0.7rem;
	 backdrop-filter: blur(7px);
	 -webkit-backdrop-filter: blur(7px);
	 overflow: hidden;
	 transition: 0.5s all;
}
 .nft hr {
	 width: 100%;
	 border: none;
	 border-bottom: 1px solid #888 55;
	 margin-top: 0;
}
 .nft ins {
	 text-decoration: none;
}
 .nft .main {
	 display: grid;
	 flex-direction: column;
   
	 /*width: 90%;*/
	 padding: 0.5rem;
   /*margin-left: 2%;*/
}
 .nft .main .tokenImage {
	 border-radius: 0.5rem;
	 max-width: 100%;
	 height: 250px;
	 object-fit: cover;
}
 .nft .main .SnippingSoulDescription {
	 margin: 0.5rem 0;
	 color: white;
}
 .nft .main .tokenInfo {
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
}
 .nft .main .tokenInfo .price {
	 display: flex;
	 align-items: center;
	 color: #fff700;
	 font-weight: 700;
}
 .nft .main .tokenInfo .price ins {
	 margin-left: -0.3rem;
	 margin-right: 0.5rem;
}
 .nft .main .tokenInfo .duration {
	 display: flex;
	 align-items: center;
	 color: #a89ec9;
	 margin-right: 0.2rem;
}
 .nft .main .tokenInfo .duration ins {
	 margin: 0.5rem;
	 margin-bottom: 0.4rem;
}
 .nft .main .creator {
	 display: flex;
	 align-items: center;
	 margin-top: 0.2rem;
	 margin-bottom: -0.3rem;
}
 .nft .main .creator ins {
	 color: #a89ec9;
	 text-decoration: none;
}
 .nft .main .creator .wrapper {
	 display: flex;
	 align-items: center;
	 border: 1px solid #fff 22;
	 padding: 0.3rem;
	 margin: 0;
	 margin-right: 0.5rem;
	 border-radius: 100%;
	 box-shadow: inset 0 0 0 4px #000 aa;
}
 .nft .main .creator .wrapper img {
	 border-radius: 100%;
	 border: 1px solid #fff 22;
	 width: 2rem;
	 height: 2rem;
	 object-fit: cover;
	 margin: 0;
}
 .nft ::before {
	 position: fixed;
	 content: "";
	 box-shadow: 0 0 100px 40px #fff 8;
	 top: -10%;
	 left: -100%;
	 transform: rotate(-45deg);
	 height: 60rem;
	 transition: 0.7s all;
}
 .nft:hover {
	 border: 1px solid #fff 44;
	 box-shadow: 0 7px 50px 10px #000 aa;
	 transform: scale(1.001);
	 filter: brightness(1.2);
}
 .nft:hover ::before {
	 filter: brightness(0.5);
	 top: -100%;
	 left: 200%;
}
 .bg {
	 position: fixed;
	 top: 50%;
	 left: 50%;
	 transform: translate(-50%, -50%);
}
 .bg h1 {
	 font-size: 20rem;
	 filter: opacity(0.5);
}
 
.nft::placeholder{
  text-align: center;
  color: #787878;
}
.roundedBtn {
	 font-family: "Quicksand", sans-serif;
	 display: block;
	 padding: 15px 35px;
	 border: 2px solid #fff700;
	 background: #fff0;
	 border-radius: 30px;
	 font-size: 1em;
	 font-weight: 500;
	 color: #fff700;
	 transition: 0.3s ease-in-out;
}
 .roundedBtn:hover {
	 background: #fff700;
	 color: #000;
	 cursor: pointer;
}
.SnippingSoul-gallery-buy-tier{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    border-radius: 8px;
    padding: 11px 18px;
    background: #fff;
    color: #111111;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease;
    margin-right: 10px;
}
    </style>
        
        `),D!=null&&H!=null||await fe(services.User.currentUserId.toString()),D=="Active"?(document.getElementsByClassName("premiumStatusValue")[0].innerText=D,document.getElementsByClassName("premiumStatusValue")[0].style.color="green",document.getElementsByClassName("timeRemainingValue")[0].innerText="Sans abonnement",H<=1?(document.getElementsByClassName("timeRemainingValue")[0].style.color="red",ue||(te("Subscription ends tomorrow. Get a new subscription to continue use of Premium advantages. If you liked the extension, please leave a review <3","red","#fff",document.body),ue=!0)):H<5?(document.getElementsByClassName("timeRemainingValue")[0].style.color="orange",ue||(te("Subscription ends in "+H+" days. Get a new subscription to continue use of Premium advantages. If you like the extension, please leave a review <3","orange","#fff",document.body),ue=!0)):H<15?document.getElementsByClassName("timeRemainingValue")[0].style.color="yellow":H>=15&&(document.getElementsByClassName("timeRemainingValue")[0].style.color="green")):(document.getElementsByClassName("premiumStatusValue")[0].innerText=D,document.getElementsByClassName("premiumStatusValue")[0].style.color="red",document.getElementsByClassName("timeRemainingValue")[0].innerText="---",document.getElementsByClassName("timeRemainingValue")[0].style.color="red"),document.getElementsByClassName("btn-standard submitKey")[0].addEventListener("click",ki),document.getElementsByClassName("btn-standard submitKey")[0].addEventListener("touchstart",ki)})}async function ki(n){var e=document.getElementsByClassName("inputKey")[0].value;e.length==32&&(e[0]=="F"||e[0]=="P"||e[0]=="G")?(at&&e[0]=="F"?alert("Your account is already linked to SnippingSoul and you can't access to free trial."):Lr("iframe1T"),document.getElementsByClassName("btn-standard submitKey")[0].disabled=!0,setTimeout(function(){document.getElementsByClassName("btn-standard submitKey")[0].disabled=!1},3e3)):alert("Key is not valid. If you think there is an error, please contact us at support.")}function Ut(n,e){e?n.classList.add("hover"):n.classList.remove("hover")}async function Rs(n){var e=document.body,t=document.createElement("div");t.className="blurredDialog",t.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;";var i=document.createElement("div");i.className="ut-name-squad",i.style="width: 33em;position: absolute;z-index: 100;right: 37%;top: 30%;z-index:9999;background: #101010;text-align: -webkit-center;";var r=document.createElement("header"),s=document.createElement("h1");s.innerHTML=`<img src="${wn}" width="39" height="37" style="vertical-align: text-bottom;"> SnippingSoul is almost ready! \u{1F680}`;var l=document.createElement("div");l.className="bodySection";var c=document.createElement("div");c.innerHTML=`
        <div>
            <div>
                <div>${cr}</div>
                <div style="padding: 20px;">
                    <span>
                        SnippingSoul will be available shortly! \u{1F680}
                        <br><br>
                        Les dernières vérifications de compatibilité avec le nouveau jeu sont en cours.
                        <br><br>
                        Thanks for your patience and support! \u2764\uFE0F
                        <br><br>
                        Les dernières nouvelles :
                        <br>
                        <a style="color: #fff700;" href="about:blank#removed-promotion" target="_blank">\u{1F310} SnippingSoul.com</a>
                        <br>
                        <a style="color: #fff700;" href="about:blank#removed-promotion" target="_blank">\u{1F4AC} Join our Discord</a>
                    </span>
                </div>
            </div>
        </div>`;var o=document.createElement("div");o.className="ut-button-group";var u=document.createElement("button");u.style="place-content: center;",u.onclick=function(){document.getElementsByClassName("blurredDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()};var d=document.createElement("span");d.className="btn-text",d.innerText="Compris ! \u2764\uFE0F",document.getElementsByClassName("ut-root-view")[0].prepend(t),e.appendChild(i),i.appendChild(r),r.appendChild(s),i.appendChild(l),l.appendChild(c),i.appendChild(o),o.appendChild(u),u.appendChild(d)}var Fs=new MutationObserver(async function(n,e){let t=document.getElementsByClassName("ut-tab-bar-item icon-transfer")[0];if(await Ps(),t){var i=!0;i?(await Ce(250),document.getElementsByClassName("SnippingSoulDiv")[0]||Ts(t)):document.getElementsByClassName("ut-name-squad")[0]||await Rs(t),e.disconnect();let r=document.getElementById("NotificationLayer"),s=document.getElementsByClassName("ut-navigation-container-view")[0];Ls.observe(r,ks)}});$(document).mouseup(async function(n){var e;if(document.getElementsByClassName("ut-tab-bar-item InjectedBtn")[0]!=null){if(n.target.className===""?e=n.target.parentNode:e=n.target,e.classList.contains("icon-home")||e.classList.contains("icon-squad")||e.classList.contains("icon-transfer")||e.classList.contains("icon-store")||e.classList.contains("icon-club")||e.classList.contains("icon-sbc")||e.classList.contains("icon-stadium")||e.classList.contains("icon-leaderboards")||e.classList.contains("icon-settings")||e.classList.contains("icon-evolution")){if(document.getElementsByClassName("ut-tab-bar-item InjectedBtn")[0].classList.contains("selected")){if(document.getElementsByClassName("SnippingSoulDiv")[0]==null){var t;t=document.createElement("div"),t.className="SnippingSoulDiv",document.getElementsByClassName("ut-navigation-container-view")[0].appendChild(t),await Pn(),t.style.display="none"}document.getElementsByClassName("SnippingSoulDiv")[0].style.display="none",Nl(),li(),document.getElementsByClassName("ut-tab-bar-item InjectedBtn")[0].classList.remove("selected")}document.getElementsByClassName("ut-tab-bar-item SnippingSoulGallery")[0]!=null&&document.getElementsByClassName("ut-tab-bar-item SnippingSoulGallery")[0].classList.contains("selected")?(document.getElementsByClassName("ut-tab-bar-item SnippingSoulGallery")[0].classList.remove("selected"),Rn()):document.getElementsByClassName("SnippingSoul-gallery")[0]!=null&&Rn(),document.getElementsByClassName("ut-navigation-container-view--content")[0].removeAttribute("hidden"),document.getElementsByClassName("title titleSnippingSoul")[0]!=null&&document.getElementsByClassName("title titleSnippingSoul")[0].remove(),document.getElementsByClassName("title titleSnippingSoulGallery")[0]!=null&&document.getElementsByClassName("title titleSnippingSoulGallery")[0].remove(),document.getElementsByClassName("title")[0].style="visibility:visible"}else if(e.classList.contains("InjectedBtn")){document.getElementsByClassName("SnippingSoul-gallery")[0]!=null&&Rn();var i=document.getElementsByClassName("ut-tab-bar")[0].children;if(Array.from(i).forEach(c=>{c.classList.contains("InjectedBtn")||c.classList.remove("selected")}),document.getElementsByClassName("ut-navigation-container-view--content")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("SnippingSoulDiv")[0]==null){var t;t=document.createElement("div"),t.className="SnippingSoulDiv",document.getElementsByClassName("ut-navigation-container-view")[0].appendChild(t),await Pn()}else if(document.getElementsByClassName("SnippingSoulDiv")[0].style.display="block",document.getElementsByClassName("nft")[0]==null&&await Pn(),await wr(),await si(),document.getElementsByClassName("title titleSnippingSoul")[0]==null){var r=document.createElement("h1");r.className="title titleSnippingSoul",r.innerText="Réglages SnippingSoul",document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0]!=null&&(document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].insertBefore(r,document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].children[0]),document.getElementsByClassName("title")[1].style="visibility:hidden")}}else if(e.classList.contains("SnippingSoulGallery")){document.getElementsByClassName("SnippingSoulDiv")[0]&&(document.getElementsByClassName("SnippingSoulDiv")[0].style.display="none",document.getElementsByClassName("ut-tab-bar-item InjectedBtn")[0].classList.remove("selected"));var i=document.getElementsByClassName("ut-tab-bar")[0].children;if(Array.from(i).forEach(o=>{o.classList.contains("SnippingSoulGallery")||o.classList.remove("selected")}),document.getElementsByClassName("ut-navigation-container-view--content")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("SnippingSoul-gallery")[0]==null&&Po(),document.getElementsByClassName("title titleSnippingSoulGallery")[0]==null){var r=document.createElement("h1");r.className="title titleSnippingSoulGallery",r.innerText="Galerie SnippingSoul",document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0]!=null&&(document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].insertBefore(r,document.getElementsByClassName("ut-navigation-bar-view navbar-style-landscape currency-purchase")[0].children[0]),document.getElementsByClassName("title")[1].style="visibility:hidden")}}if(Rt==null||le==null||Z==null){le=services.Authentication.utasSession.id;var s=services.User.userDao.authDelegate.utasSession.user.selectedPersona,l=services.User.userDao.authDelegate.utasSession.user._personas._collection[s]._sku;l==="FFA27PCC"||l==="FFA27STM"?Z="pc":Z="console",Rt=services.User.userDao.authDelegate.utasSession.locale.language+services.User.userDao.authDelegate.utasSession.locale.region}window.setTimeout(async function(){if(document.getElementsByClassName("SquadPanel SBCSquadPanel")[0]!=null){if(document.getElementsByClassName("btn-standard importSquadBtn")[0]==null){buttonImportSBC=document.createElement("button"),buttonImportSBC.className="btn-standard importSquadBtn",buttonImportSBC.innerText="Importer depuis Futbin",buttonImportSBC.style="margin: 0.5rem auto;width: calc(100% - 1rem);background-color: #fff700;color: black;",buttonImportSBC.addEventListener("click",async function(o){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?(gl(),ul()):Ie("Import from Futbin \u{1F9E9}","Get SnippingSoul Premium in order to import SBCs from Futbin.")});var c=document.getElementsByClassName("sbc-button-container");c[0].insertBefore(buttonImportSBC,c[0].firstChild)}if(document.getElementsByClassName("btn-standard generateSolutionsBtn")[0]==null){buttonGenerateSolutionsSBC=document.createElement("button"),buttonGenerateSolutionsSBC.className="btn-standard generateSolutionsBtn",buttonGenerateSolutionsSBC.innerText="Générer des solutions (Era1.4)",buttonGenerateSolutionsSBC.style="margin: 0.5rem auto;width: calc(100% - 1rem);background-color: #00ffd0;color: black;",buttonGenerateSolutionsSBC.addEventListener("click",async function(u){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?(oe[0]=[],Xn()):Ie("ERA SBC SOLVER \u{1F9E9}","Get SnippingSoul Premium in order to generate SBCs with Era AI.")}),buttonGenerateSolutionsSBC.addEventListener("touchstart",async function(u){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?(oe[0]=[],Xn()):Ie("ERA SBC SOLVER \u{1F9E9}","Get SnippingSoul Premium in order to generate SBCs with Era AI.")});var c=document.getElementsByClassName("sbc-button-container");c[0].insertBefore(buttonGenerateSolutionsSBC,c[0].firstChild),ro(c[0])}}},250),window.setTimeout(async function(){if((document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.assigncards")||document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.assigncards"))&&document.getElementsByClassName("show-unassigned-btn")[0]==null){try{Pe=(await new Promise(function(o,u){window.addEventListener("message",function(d){d.data.message==="getCompleted"&&o(d.data.result)}),window.postMessage({message:"get",keys:["unassignedCompleteListSaved"]},"*")})).unassignedCompleteListSaved,Pe=Pe.filter(function(o){return o!==null})}catch(c){console.error(c),Pe=[]}Pe.length>50&&js()}},250),window.setTimeout(async function(){document.getElementsByClassName("title")[0]&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&(document.getElementsByClassName("SnippingSoulBotBtn")[0]==null&&zs(),document.getElementsByClassName("SnippingSoulTutorial")[0]==null&&Vs(),ot&&(ot=!1,window.postMessage({message:"set",objPassed:ne(["firstTimeInTransferMarketStorage"],[ot])},"*"),hn(ce))),document.getElementsByClassName("title")[0]&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("nav.label.transferList")&&(document.getElementsByClassName("SnippingSoulTotItemsDiv")[0]||(await el(),Us())),Dr(),e.classList.contains("tutorialGold")?(ce++,e.classList.remove("tutorialGold"),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0].style=""),Ve(ce)):e.classList.contains("tutorialArgentina")&&(ce++,e.classList.remove("tutorialArgentina"),Ve(ce)),(document.getElementsByClassName("title")[0]&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("nav.label.transferList")||document.getElementsByClassName("title")[0]&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.clubplayers"))&&Ci!=document.getElementsByClassName("listFUTItem selected")[0]&&(Ci=document.getElementsByClassName("listFUTItem selected")[0],Z&&Z!="pc"&&await jl(),await lo())},250)}});function Us(){var n=document.querySelectorAll(".ut-section-header-view h2.title");n.forEach(e=>{if(e.innerText===services.Localization.localize("tradepile.dock.categories.expired.sold")){var t=document.createElement("div");t.className="SnippingSoulTotItemsDiv",t.style="flex:2;font-size: 18px;";var i=document.createElement("span");i.className="buyNowTotSpan",i.textContent="Bénéfice net : ";var r=document.createElement("span");r.className="currency-coins value marketAvg";let o=0;e.parentNode.parentNode.querySelectorAll(".currency-coins.value.profitNetPrice").forEach(d=>{let m=d.innerText.match(/^([\d,.]+)/);if(m&&m[1]){let g=parseInt(m[1].replace(/\D/g,""));isNaN(g)||(o+=g)}}),r.innerText=o.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),o>0?(r.style.backgroundColor="limegreen",r.style.padding="0.2em"):o===0?t.style.display="none":(r.style.backgroundColor="red",r.style.padding="0.2em");var s=document.createElement("span");s.className="marketAvgSpanT",s.textContent=" Moyenne du marché : ";var l=document.createElement("span");l.className="currency-coins value marketAvg",l.innerText=parseInt(Vn).toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),t.appendChild(i),t.appendChild(r),Z&&Z!="pc",e.parentNode.insertBefore(t,e.nextSibling)}else if(e.innerText===services.Localization.localize("tradepile.dock.categories.expired.notsold")){var t=document.createElement("div");t.className="SnippingSoulTotItemsDiv",t.style="flex:2;font-size: 18px;",vo(e);var i=document.createElement("span");i.className="buyNowTotSpan",i.textContent="Bénéfice net : ";var r=document.createElement("span");r.className="currency-coins value marketAvg";let m=0;e.parentNode.parentNode.querySelectorAll(".currency-coins.value.profitNetPrice").forEach(B=>{let w=B.innerText.match(/^([\d,.]+)/);if(w&&w[1]){let f=parseInt(w[1].replace(/\D/g,""));isNaN(f)||(m+=f)}}),r.innerText=m.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),m>0?(r.style.backgroundColor="limegreen",r.style.padding="0.2em"):m===0?t.style.display="none":(r.style.backgroundColor="red",r.style.padding="0.2em");var s=document.createElement("span");s.className="marketAvgSpanT",s.textContent=" Moyenne du marché : ";var l=document.createElement("span");l.className="currency-coins value marketAvg",l.innerText=parseInt(Gn).toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),t.appendChild(i),t.appendChild(r),Z&&Z!="pc",e.parentNode.insertBefore(t,e.nextSibling)}else if(e.innerText===services.Localization.localize("tradepile.dock.categories.current")){var t=document.createElement("div");t.className="SnippingSoulTotItemsDiv",t.style="flex:2;font-size: 18px;";var i=document.createElement("span");i.className="buyNowTotSpan",i.textContent="Bénéfice net : ";var r=document.createElement("span");r.className="currency-coins value marketAvg";let m=0;var c=e.parentNode.parentNode.querySelectorAll(".currency-coins.value.profitNetPrice");c.forEach(C=>{let B=C.innerText.match(/^([\d,.]+)/);if(B&&B[1]){let w=parseInt(B[1].replace(/\D/g,""));isNaN(w)||(m+=w)}}),r.innerText=m.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),m>0?(r.style.backgroundColor="limegreen",r.style.padding="0.2em"):m===0?t.style.display="none":(r.style.backgroundColor="red",r.style.padding="0.2em");var s=document.createElement("span");s.className="marketAvgSpanT",s.textContent=" Moyenne du marché : ";var l=document.createElement("span");l.className="currency-coins value marketAvg",l.innerText=parseInt(jn).toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),Z&&Z!="pc",t.appendChild(i),t.appendChild(r),e.parentNode.insertBefore(t,e.nextSibling)}else if(e.innerText===services.Localization.localize("tradepile.dock.categories.available")){var t=document.createElement("div");t.className="SnippingSoulTotItemsDiv",t.style="flex:2;";var s=document.createElement("span");s.className="marketAvgSpanT",s.textContent=" Moyenne du marché : ";let d=0;var c=e.parentNode.parentNode.querySelectorAll(".currency-coins.value.marketAvgPrice");c.forEach(x=>{let C=x.innerText.match(/^([\d,.]+)/);if(C&&C[1]){let B=parseInt(C[1].replace(/\D/g,""));isNaN(B)||(d+=B)}}),d>0?(t.style.backgroundColor="limegreen",t.style.padding="0.2em"):d===0?t.style.display="none":(t.style.backgroundColor="red",t.style.padding="0.2em");var l=document.createElement("span");l.className="currency-coins value marketAvg",l.innerText=Hn,Z&&Z!="pc",e.parentNode.insertBefore(t,e.nextSibling)}})}function zs(){var n=document.getElementsByClassName("menu-container")[0],e=document.createElement("button");e.className="ea-filter-bar-item-view SnippingSoulBotBtn",e.style="background-color: #fff700;color: black;",e.innerText="Assistant SnippingSoul",e.addEventListener("click",Ii),e.addEventListener("touchstart",Ii),n&&(document.getElementsByClassName("SnippingSoulBotBtn")[0]||n.appendChild(e))}function Vs(){var n=document.getElementsByClassName("menu-container")[0],e=document.createElement("button");e.className="SnippingSoulTutorial",e.innerText="\u{1F4D6}",e.addEventListener("click",function(t){hn(ce)}),e.addEventListener("touchstart",function(t){hn(ce)}),n&&(document.getElementsByClassName("SnippingSoulTutorial")[0]||n.appendChild(e))}async function Ii(){document.getElementsByClassName("SniperBotInAppMenu")[0]===void 0&&(pr(),qt==0&&await Rl())}function ai(){let n=document.createElement("div");n.id="unassigned-players-table",n.style.cssText=`
        position: fixed;
        top: 100px;
        right: 20px;
        width: 300px;
        background: #2d3748;
        border: 1px solid #4a5568;
        border-radius: 8px;
        padding: 15px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        max-height: 500px;
        overflow-y: auto;
    `;let e=document.createElement("h3");e.textContent="Joueurs non attribués",e.style.cssText="color: #e2e8f0; margin-top: 0; text-align: center;";let t=document.createElement("table");t.style.cssText="width: 100%; border-collapse: collapse; color: #e2e8f0;";let i=document.createElement("thead"),r=document.createElement("tr"),s=document.createElement("th");s.textContent="Nom",s.style.cssText="border: 1px solid #4a5568; padding: 8px; text-align: center; font-size: 12px;";let l=document.createElement("th");l.textContent="Note",l.style.cssText="border: 1px solid #4a5568; padding: 8px; text-align: center; font-size: 12px;";let c=document.createElement("th");c.textContent="Déplacer",c.style.cssText="border: 1px solid #4a5568; padding: 8px; text-align: center; font-size: 12px;",r.appendChild(s),r.appendChild(l),r.appendChild(c),i.appendChild(r),t.appendChild(i);let o=document.createElement("tbody");Pe.forEach(d=>{let m=document.createElement("tr");m.style.cssText="border-bottom: 1px solid #4a5568;";let g=document.createElement("td");g.textContent=`${d._staticData.firstName} ${d._staticData.lastName}`,g.style.cssText="border: 1px solid #4a5568; padding: 8px; text-align: center; font-size: 12px;";let x=document.createElement("td");x.textContent=d._rating,x.style.cssText="border: 1px solid #4a5568; padding: 8px; text-align: center; font-size: 12px;";let C=document.createElement("td");C.style.cssText="border: 1px solid #4a5568; padding: 8px; text-align: center;";let B=document.createElement("button");B.textContent="Déplacer",B.style.cssText=`
            background: #4299e1;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 10px;
        `,B.onclick=()=>{Gs(d.id),m.remove();let w=Pe.findIndex(f=>f.id===d.id);w>-1&&Pe.splice(w,1)},C.appendChild(B),m.appendChild(g),m.appendChild(x),m.appendChild(C),o.appendChild(m)}),t.appendChild(o),n.appendChild(e),n.appendChild(t);let u=document.createElement("button");u.textContent="Fermer",u.style.cssText=`
        position: absolute;
        top: 10px;
        right: 10px;
        background: #e53e3e;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    `,u.onclick=()=>n.remove(),n.appendChild(u),document.body.appendChild(n)}function Gs(n){if(repositories.Item.isPileFull(ItemPile.TRANSFER))te("Transfer list is full","#e53e3e","white",document.body);else{let e=Pe.findIndex(t=>t.id===n);if(e>-1){let t=Pe.splice(e,1)[0],i=t._staticData.firstName+" "+t._staticData.lastName;t=services.Item.itemDao.itemFactory.createItem(t),services.Item.move(t,ItemPile.TRANSFER),fr(),te(`Player ${i} moved to transfer list. Please refresh the page to see the right card.`,"#38a169","white",document.body);let r=document.getElementById("unassigned-players-table");r&&(r.remove(),ai())}else te("Player not found","#e53e3e","white",document.body)}}function ni(n){Pe.push(n),fr();let e=document.getElementById("unassigned-players-table");e&&(e.remove(),ai())}function js(){let n=document.createElement("button");n.textContent="Voir les éléments non attribués",n.className="show-unassigned-btn",n.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4299e1;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 999;
        font-size: 14px;
    `,document.getElementById("unassigned-players-table")==null&&(n.onclick=ai,document.body.appendChild(n))}function fr(){try{window.postMessage({message:"set",objPassed:ne(["unassignedCompleteListSaved"],[Pe])},"*")}catch(n){console.error("Error saving to localStorage:",n)}}async function Hs(){UTPaginatedItemListView.prototype.setItems=al,UTSectionedItemListView.prototype.addItems=nl,UTItemTableCellView.prototype._generate=Zs,EATargetActionView.prototype._triggerActions=Xs,UTTransfersHubViewController.prototype.eTransferListTileSelected=Ws,UTHomeHubViewController.prototype.eTransferListTileSelected=qs,UTClubHubViewController.prototype.ePlayersTileSelected=Js,UTTransferListSplitViewController.prototype.dealloc=Ys,UTDataProviderFactory.prototype.getItemRarityDP=Ks,UTMarketSearchFiltersView.prototype.setFilters=$s,UTSBCEligibilityDTO.prototype.buildString=Ql,UTTransfersDAO.prototype.bid=tl,UTSquadSlotView.prototype.render=bo,UTItemTableCellView.prototype.render=xo,UTLargePlayerItemView.prototype.renderItem=wo,UTSBCChallengeRequirementsView.prototype.renderChallengeRequirements=Kl,UTPackAnimationViewController.prototype.runAnimation=Or,UTSBCRequirementsViewController.prototype.renderChallenge=$l,UTItemDomainRepository.prototype.setPileSize=Wl,UTSquadBuildingChallengeDAO.prototype.loadChallenge=ao,UTSBCService.prototype.submitChallenge=no,UTSBCHubView.prototype.eTileSelected=io,UTItemDomainRepository.prototype.isPileFull=No}function $s(n,e){this._searchFilters.setFilters(n,e),sr=!0,je||(Ma=Object.create(Object.getPrototypeOf(n.searchCriteria),Object.getOwnPropertyDescriptors(n.searchCriteria))),this._searchFilters.togglePlayerNameRow(n.searchCriteria.type===SearchType.PLAYER)}function Ks(n){var e=[],t=repositories.Rarity.values().filter(function(i){var r=!0,s=0<n.itemSubTypes.filter(function(o){return i.itemSubTypes.includes(o)}).length,l=0<n.itemTypes.filter(function(o){return i.itemTypes.includes(o)}).length,c=!n.tradableOnly||i.tradeable;return n.quality!==SearchLevel.ANY&&(r=n.quality===SearchLevel.SPECIAL?i.id>ItemRarity.LOCK:i.levels===!0),c&&i.searchable&&i.id!==ItemRarity.LOCK&&i.id!==ItemRarity.DEFAULT&&(l||s)&&r}).sort(function(i,r){return i.id<=ItemRarity.RARE&&r.id>ItemRarity.RARE?-1:r.id<=ItemRarity.RARE&&i.id>ItemRarity.RARE?1:services.Localization.localize("item.raretype"+i.id).localeCompare(services.Localization.localize("item.raretype"+r.id))});return e.push(new UTDataProviderEntryDTO(-1,-1,services.Localization.localize("roles.defaultRole"))),e.concat(t.map(function(i){return sr||rr.push(i.id),new UTDataProviderEntryDTO(i.id,i.id,services.Localization.localize("item.raretype"+i.id))}))}async function Qs(){services.Item.clearTransferMarketCache(),services.Item.itemDao.itemRepo.pileSizes._collection[ItemPile.PURCHASED]=5e3;var n=new UTMarketSearchResultsViewController,e=new UTSearchCriteriaDTO,t=I[K][24];for(var i in t)e.hasOwnProperty(i)&&(e[i]=t[i]);e.maxBuy=parseInt(I[K][10]),e.minBid=Q,n.initWithSearchCriteria(e),DebugUtils.Assert(JSUtils.isValid(e),"Missing search criteria object when requesting items."),e&&(services.Module.set(3355443200),n.paginationViewModel.stopAuctionUpdates(),services.Item.searchTransferMarket(e,1).observe(n,async function(r,s){if(r.unobserve(n),!s.success||!JSUtils.isObject(s.data)){J();var l=new Date;O=l.getHours()+":"+l.getMinutes()+":"+l.getSeconds();var c=O+"Trop de requêtes. Faites une pause avant de reprendre les recherches.";return ae(c,"red",O),NetworkErrorManager.checkCriticalStatus(s.status)?void NetworkErrorManager.handleStatus(s.status):(services.Notification.queue([services.Localization.localize("popup.error.searcherror"),UINotificationType.NEGATIVE]),void((a=n.getNavigationController())===null||a===void 0||a.popViewController()))}if(services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Results - List View"}),services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Item - Detail View"}),s&&s.data&&s.data.items.length>0){const ssDetected=performance.now();let ssSent;let u=s.data.items.reduce((x,C)=>C._auction.buyNowPrice<x._auction.buyNowPrice?C:x),d=u._auction.tradeId,m=u._auction.buyNowPrice,g=u;var o=u._staticData.name;u._auction._tradeState==="active"&&(ssSent=performance.now(),fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/trade/${d}/bid`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify({bid:m}),method:"PUT",mode:"cors",credentials:"omit"})).then(async x=>{try{var C={};return x.status==200&&(C=await x.json()),C.status=x.status,C}catch{throw new Error("Failed to parse JSON response.")}}).then(async x=>{const ssFinished=performance.now(),ssTiming={reactionMs:ssSent-ssDetected,responseMs:ssFinished-ssSent,totalMs:ssFinished-ssDetected};if(x.status==461)ssTrack("missed",{player:o,price:m,tradeId:d,timing:ssTiming,source:"sniping",note:"Un autre utilisateur a acheté cet élément."});if(rt=!0,x.status==200){ssTrack("purchase",{id:"purchase:"+d,player:o,price:m,itemId:g.id,tradeId:d,rating:g.rating,timing:ssTiming,targetPrice:Be?I[K][12]:null,source:"sniping"});if(Be){var C=parseInt(I[K][12]);parseInt(I[K][12])<950?C-=50:parseInt(I[K][12])<9500?C-=100:parseInt(I[K][12])<99500?C-=250:parseInt(I[K][12])>=99500&&(C-=1e3),repositories.Item.isPileFull(ItemPile.TRANSFER)||(services.Item.move(g,ItemPile.TRANSFER),services.Item.list(g,C,parseInt(I[K][12]),3600))}else repositories.Item.isPileFull(ItemPile.TRANSFER)?(ni(g),services.Item.move(g,ItemPile.PURCHASED)):services.Item.move(g,ItemPile.TRANSFER);ii(),ri(),document.getElementsByClassName("view-navbar-currency-coins")[0]&&(document.getElementsByClassName("view-navbar-currency-coins")[0].textContent=services.Localization.localizeNumber(x.credits)),Un++}else if(x.status==473){J();var B=new Date;O=B.getHours()+":"+B.getMinutes()+":"+B.getSeconds();var w=O+" La pile des éléments non attribués est pleine. Assistant arrêté.";ae(w,"red",O)}else if(x.status==401){J();var B=new Date;O=B.getHours()+":"+B.getMinutes()+":"+B.getSeconds();var w=O+" Accès refusé. Assistant arrêté : reconnectez-vous.";ae(w,"red",O)}We=!0;try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}if(x.status==200){if(o!=null&&m!=null&&(ae(O+" Acheté "+o+" à "+m,"green",O,o,m),o=void 0,m=void 0,D==null&&await fe(String(services.User.currentUserId)),D!="Active")){ke--;var f=new Date().toISOString().split("T")[0];if(window.postMessage({message:"set",objPassed:ne(["snipedOnDate","limitRemainingPlayersToBuyToday"],[f,ke])},"*"),ke<=0){J();var B=new Date;O=B.getHours()+":"+B.getMinutes()+":"+B.getSeconds();var w=O+"You reached the limit of players that can be bought for today without using SnippingSoul Premium.";ae(w,"red",O),Ie("Daily snipes limit reached \u{1F3AF}","You reached the limit of players that can be bought for today without using SnippingSoul Premium.")}}}else x.status==461&&o!=null&&m!=null&&(ae(O+" trouvé "+o+" à "+m+" mais un autre utilisateur l’a déjà acheté.","orange",O,o,m),m=void 0,o=void 0);document.getElementsByClassName("ut-number-input-control")[2]==null?(J(),alert("Something went wrong. Please start again. I hope to fix this soon ;) error 0x0009")):(Q==0?Q+=150:Q<1e3?Q+=50:Q<1e4?Q+=100:Q<5e4?Q+=250:Q<1e5?Q+=500:Q+=1e3,Q<parseInt(I[K][10])||(document.getElementsByClassName("ut-number-input-control")[2].value=0),Qt++);try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}setTimeout(()=>{if(services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Search"}),ze!="Unlimited"&&Un>=ze){J();var v=new Date;O=v.getHours()+":"+v.getMinutes()+":"+v.getSeconds();var y=O+" Nombre de joueurs à acheter atteint !";ae(y,"#ff00f7",O)}Qt<parseInt(I[K][9])?It(K,!1):(L(document.getElementsByClassName("btn-standard")[8]),K++,It(K,!0)),rt=!1},Qe+1e3)}).catch(x=>{console.error("Error placing bid:",x)})}else{console.error("Auction information not found in t.data.auctionInfo"),We=!0;try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}document.getElementsByClassName("ut-number-input-control")[2]==null?(J(),alert("Something went wrong. Please start again. I hope to fix this soon ;) error 0x0009")):(Q==0?Q+=150:Q<1e3?Q+=50:Q<1e4?Q+=100:Q<5e4?Q+=250:Q<1e5?Q+=500:Q+=1e3,Q<parseInt(I[K][10])||(document.getElementsByClassName("ut-number-input-control")[2].value=0),Qt++);try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}setTimeout(()=>{services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Search"}),Qt<parseInt(I[K][9])?It(K,!1):(L(document.getElementsByClassName("btn-standard")[8]),K++,It(K,!0)),rt=!1},Qe+1e3)}}))}function Ys(){this._itemDetailController.dealloc(),this._itemDetailController=null,this._listController.dealloc(),this._listController=null,this._clubSearchController&&(this._clubSearchController.dealloc(),this._clubSearchController=null);var n=getDefaultDispatcher();n.removeObserver(AppNotification.ITEM_ACTIVATE,this),n.removeObserver(AppNotification.ITEM_DISCARD,this),n.removeObserver(AppNotification.ITEM_LIST,this),n.removeObserver(AppNotification.ITEM_MOVE,this),n.removeObserver(AppNotification.ITEM_CLEARSOLD,this),ya=!1,ct=!1}async function Ws(){var n=this.getNavigationController();if(ya=!0,ct=!1,n){var e=ee?new UTTransferListViewController:new UTTransferListSplitViewController;e.init(),n.pushViewController(e)}}async function qs(){TelemetryManager.trackEvent(TelemetryManager.Sections.HOME,TelemetryManager.Categories.BUTTON_PRESS,"Home - Transfer List Tile");var n=this.getNavigationController();if(ya=!0,ct=!1,n){var e=ee?new UTTransferListViewController:new UTTransferListSplitViewController;e.init(),n.pushViewController(e)}}function Js(){var n=new UTSearchCriteriaDTO;ya=!1,ct=!0,n.type=SearchType.PLAYER,this.gotoClubSearchResults(n)}function Xs(n,e){n=="itemCompare"?Ba=!0:Ba=!1,n=="itemBio"?Sa=!0:Sa=!1;var t=this,i=this._targets.get(n);i&&i.forEach(function(r){return r.action.call(r.target,t,n,e)},this)}async function Zs(){if(!this._generated){var n=document.createElement("li");if(n.classList.add("listFUTItem"),this._btnAction=new UTImageButtonControl,this._btnAction.getRootElement().classList.add("btnAction"),n.appendChild(this._btnAction.getRootElement()),this.__rowContent=document.createElement("div"),this.__rowContent.classList.add("rowContent"),this.__entityContainer=document.createElement("div"),this.__entityContainer.classList.add("entityContainer"),this.__name=document.createElement("div"),this.__name.classList.add("name"),this.__entityContainer.appendChild(this.__name),this.__rowContent.appendChild(this.__entityContainer),this.__auction=document.createElement("div"),this.__auction.classList.add("auction"),(ct||ya)&&!Ba&&!Sa&&!document.getElementsByClassName("ut-pinned-list-container SearchResults")[0]&&!document.getElementsByClassName("ut-pinned-list-container SquadConsumables")[0]&&!document.getElementsByClassName("ut-pinned-list-container SquadConsumablesSection")[0]){var e=!1,t=document.createElement("div");t.className="SnippingSoulTopBarPlayerList",t.style="right: 0em;padding: 0.5em;position: absolute;color:white;z-index: 1;",ct&&(G=ir,e=!0);var i=document.createElement("span");i.className="marketAvgSpan",i.textContent="Moyenne du marché : ",i.style="color: white;display: none;";var r=document.createElement("span");r.className="currency-coins value marketAvgPrice";var s=document.createElement("span");s.className="boughtSpan",s.textContent=" Acheté à : ";var l=document.createElement("span");l.className="currency-coins value boughtPrice";var c=document.createElement("span");c.className="profitSpan",c.textContent=" Bénéfice net : ";var o=document.createElement("span");o.className="currency-coins value profitNetPrice";var u=document.createElement("span");u.className="playerIdApp",u.textContent=G.definitionId,u.style="display:none;",t.appendChild(u),G._marketAverage===-1?r.innerText="Invendable":r.innerText=parseInt(G._marketAverage).toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region);var d=He.find(f=>f.ID===G.id);if(l.innerText=d?.playerBoughtPrice.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),d?.playerBoughtPrice===0){if(G._auction._tradeState=="inactive"){e=!0;var m=100,g=0}else if(e=!1,G._auction._tradeState=="closed"){if(d)var g=G._auction.currentBid-.05*G._auction.currentBid-d.playerBoughtPrice;var m=100}else if(G._auction._tradeState=="active"){if(d)var g=G._auction.buyNowPrice-.05*G._auction.buyNowPrice-d.playerBoughtPrice;var m=100}else if(G._auction._tradeState=="expired"){if(d)var g=G._auction.buyNowPrice-.05*G._auction.buyNowPrice-d.playerBoughtPrice;var m=100}}else if(e=!1,G._auction._tradeState=="closed"){if(d)var g=G._auction.currentBid-.05*G._auction.currentBid-d.playerBoughtPrice,m=Math.floor((G._auction.currentBid-.05*G._auction.currentBid-d.playerBoughtPrice)/d.playerBoughtPrice*100)}else if(G._auction._tradeState=="inactive")var g="-",m=100;else if(G._auction._tradeState=="active"){if(d)var g=G._auction.buyNowPrice-.05*G._auction.buyNowPrice-d.playerBoughtPrice,m=Math.floor((G._auction.buyNowPrice-.05*G._auction.buyNowPrice-d.playerBoughtPrice)/d.playerBoughtPrice*100)}else if(G._auction._tradeState=="expired"&&d)var g=G._auction.buyNowPrice-.05*G._auction.buyNowPrice-d.playerBoughtPrice,m=Math.floor((G._auction.buyNowPrice-.05*G._auction.buyNowPrice-d.playerBoughtPrice)/d.playerBoughtPrice*100);g!="-"&&(o.innerText=parseInt(g).toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region,{maximumFractionDigits:0})+" ("+m+"%)"),m>0?(o.style.backgroundColor="limegreen",o.style.padding="0.2em"):(o.style.backgroundColor="red",o.style.padding="0.2em"),Z&&Z!="pc",!e&&!ct&&g!="-"&&d!=null&&(t.appendChild(s),t.appendChild(l),t.appendChild(c),t.appendChild(o)),n.prepend(t)}var x=document.createElement("div");x.classList.add("auctionStartPrice"),x.classList.add("auctionValue"),this.__auctionStartLabel=document.createElement("span"),this.__auctionStartLabel.classList.add("label"),x.appendChild(this.__auctionStartLabel),this.__auctionStartValue=document.createElement("span"),this.__auctionStartValue.classList.add("currency-coins"),this.__auctionStartValue.classList.add("value"),x.appendChild(this.__auctionStartValue),this.__auction.appendChild(x);var C=document.createElement("div");C.classList.add("auctionValue"),this.__auctionBidLabel=document.createElement("span"),this.__auctionBidLabel.classList.add("label"),C.appendChild(this.__auctionBidLabel),this.__auctionBidValue=document.createElement("span"),this.__auctionBidValue.classList.add("currency-coins"),this.__auctionBidValue.classList.add("value"),C.appendChild(this.__auctionBidValue),this.__auction.appendChild(C);var B=document.createElement("div");B.classList.add("auctionValue"),this.__auctionBuyLabel=document.createElement("span"),this.__auctionBuyLabel.classList.add("label"),B.appendChild(this.__auctionBuyLabel),this.__auctionBuyValue=document.createElement("span"),this.__auctionBuyValue.classList.add("currency-coins"),this.__auctionBuyValue.classList.add("value"),B.appendChild(this.__auctionBuyValue),this.__auction.appendChild(B);var w=document.createElement("div");w.classList.add("auction-state"),this.__auctionTimeLabel=document.createElement("span"),this.__auctionTimeLabel.classList.add("label"),w.appendChild(this.__auctionTimeLabel),this.__auctionTime=document.createElement("span"),this.__auctionTime.classList.add("time"),w.appendChild(this.__auctionTime),this.__auction.appendChild(w),this.__rowContent.appendChild(this.__auction),n.appendChild(this.__rowContent),this.__root=n,this._generated=!0}}async function el(){xi=0,Vn=0,us=0,Gn=0,ms=0,jn=0,Hn=0;var n=document.querySelectorAll(".listFUTItem");n.forEach(e=>{if(e.querySelector(".currency-coins.value.marketAvgPrice")&&e.querySelector(".auction .currency-coins.value")){var t=e.querySelector(".currency-coins.value.marketAvgPrice").innerText,i=e.querySelector(".auction .currency-coins.value").innerText,r=e.parentElement.parentElement.children[0].children[0].innerText;r===services.Localization.localize("tradepile.dock.categories.expired.sold")?(xi+=parseInt(i.replace(/\D/g,"")),Vn+=parseInt(t.replace(/\D/g,""))):r===services.Localization.localize("tradepile.dock.categories.expired.notsold")?Gn+=parseInt(t.replace(/\D/g,"")):r===services.Localization.localize("tradepile.dock.categories.current")?jn+=parseInt(t.replace(/\D/g,"")):r===services.Localization.localize("tradepile.dock.categories.available")&&(Hn+=parseInt(t.replace(/\D/g,"")))}})}function tl(n,e){var t=this,i=new EAObservable,r=new UTHttpRequest(this.authDelegate),s=n.getAuctionData().tradeId;return r.requestType=HttpRequestMethod.PUT,r.setPath("/ut/game/"+GAME_NAME+"/trade/"+s+"/bid"),r.setRequestBody({bid:e}),this.requestDelegate.send(r).observe(this,function(l,c){l.unobserve(t);var o=new UTHttpResponseDTO,u=null,d=[];JSUtils.assignPropertyValues(c,o),c.success&&JSUtils.isObject(c.response)?(d=t.itemFactory.generateItemsFromAuctionData(c.response.auctionInfo,c.response.duplicateItemIdList),c.response.dynamicObjectivesUpdates&&(u=t.updateFactory.createObjectivesUpdate(c.response.dynamicObjectivesUpdates)),o.response={coins:c.response.credits,items:d},0<d.length?n.update(d[0]):n.getAuctionData().setStale(!0)):o.response={coins:0,items:[]},i.notify(o),0<d.length&&getDefaultDispatcher().notify(AppNotification.ITEM_BID,t,{itemIds:d.map(function(m){return hs=m.definitionId,lr=m,vs=m._staticData.name,m.id})}),u&&getDefaultDispatcher().notify(AppNotification.OBJECTIVE_UPDATE,t,u)}),i}function al(n,e){var t=this;return document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.clubplayers")&&!Ba&&!Sa&&(ds=n),this.removeListRows(),n.forEach(function(i){ir=i;var r=new UTItemTableCellView;r.setData(i,void 0,void 0,e),t.listRows.push(r)}),this.listRows}function nl(n,e,t,i){var r=this;return t=t||ListItemPriority.DEFAULT,n.forEach(function(s){G=s,r.listRows.push(r.generateListRow(s,e,t,i))}),this.listRows}async function gr(){for(let n=1;n<=5;n++){try{let e=await fetch("https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/club/stats/club",{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",method:"GET",mode:"cors",credentials:"omit"});if(e.ok)return(await e.json()).stat[2].typeValue;bi++}catch{bi++}await new Promise(e=>setTimeout(e,1e3))}return te("numFailedFetchToClub error","red","#fff",document.body),null}async function il(){let n=await gr(),e=91,t=[],i=0,r=0;if(n!==null){for(;i<n;){let s=Math.min(e,n-i);try{let l=await fetch("https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/club",{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",method:"POST",mode:"cors",credentials:"omit",body:`{"count":${s},"searchAltPositions":true,"sort":"desc","sortBy":"value","start":${i},"type":"player"}`});if(l.ok){let c=await l.json();t=t.concat(c.itemData),i+=s}else if(r++,r>=5)break}catch{if(r++,r>=5)break;await new Promise(c=>setTimeout(c,1e3))}}return t}}async function rl(){try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getCompleted"&&e(i.data.result)}),window.postMessage({message:"get",keys:["listOfTransferListPlayersApp"]},"*")});return n.listOfTransferListPlayersApp&&(He=n.listOfTransferListPlayersApp),!0}catch(n){console.error(n)}}async function sl(){try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getCompleted"&&e(i.data.result)}),window.postMessage({message:"get",keys:["listOfPlayersInClub"]},"*")});return n.listOfPlayersInClub&&(xe=n.listOfPlayersInClub),!0}catch(n){console.error(n)}}async function ll(n){await new Promise(e=>{window.setTimeout(function(){He||(He=[]);let t=new Map(He.map(i=>[i.ID,i]));He=n.map(i=>{let r=t.get(i.id);if(r){let s=r.playerBoughtPrice>0?r.playerBoughtPrice:i.lastSalePrice;return{ID:i.id,Timestamp:r.Timestamp,boolean:!0,name:r.name,overall:i.rating,definedID:r.definedID,playerBoughtPrice:s,marketAverage:i._marketAverage,gradingScore:i.sbsScore}}return{ID:i.id,Timestamp:0,boolean:!0,name:i._staticData.name,overall:i.rating,definedID:i.definitionId,playerBoughtPrice:i.lastSalePrice,marketAverage:i._marketAverage,gradingScore:i.sbsScore}}),e()},200)})}async function ol(){var n=await gr();if(n!==null&&(j=await il(n),await sl(),await dl(j)),Bn=Object.values(services.Item.itemDao.itemRepo.transfer._collection),Bn){var e=Bn.filter(t=>t.type==="player");await rl(),await ll(e)}await cl()}async function cl(){window.postMessage({message:"set",objPassed:ne(["listOfPlayersInClub"],[xe])},"*"),window.postMessage({message:"set",objPassed:ne(["listOfTransferListPlayersApp"],[He])},"*")}async function dl(n){await new Promise(e=>{window.setTimeout(function(){xe||(xe=[]),xe.length>0&&xe.forEach(t=>{t.boolean=!1}),n.forEach(t=>{if(xe.length>0)var i=xe.find(s=>s.definedID===t.assetId);else var i=void 0;if(i){var r={ID:t.id,Timestamp:i.Timestamp,boolean:!0,name:null,overall:t.rating,definedID:t.assetId,playerBoughtPrice:i.lastSalePrice,marketAverage:t.marketAverage,gradingScore:t.gradingScore};xe.push(r)}else{var r={ID:t.id,Timestamp:0,boolean:!0,name:null,overall:t.rating,definedID:t.assetId,playerBoughtPrice:t.lastSalePrice,marketAverage:t.marketAverage,gradingScore:t.gradingScore};xe.push(r)}}),xe=xe.filter(t=>t.boolean),e()},200)})}function ul(){var n=document.getElementsByClassName("ut-tab-bar-view game-navigation")[0],e=document.createElement("div");e.className="blurredBgSaveDialog",e.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;right: 1em;";var t=document.createElement("div");t.className="ut-name-squad",t.style="width: 29em;position: absolute;z-index: 100;right: 40%;top: 40%;background: #151616;text-align: center;";var i=document.createElement("header"),r=document.createElement("h1");r.innerText="Adresse Futbin du DCE";var s=document.createElement("div");s.className="bodySection";var l=document.createElement("input");l.type="text",l.className="ut-text-input-control round",l.maxlength="70";var c=document.createElement("span");c.className="ut-name-squad--hint",c.innerText="Coller le lien ici";var o=document.createElement("div");o.className="ut-button-group";var u=document.createElement("button");u.onclick=function(){var x=document.getElementsByClassName("ut-text-input-control round")[0].value;ml(x),document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()};var d=document.createElement("span");d.className="btn-text",d.innerText="Importer";var m=document.createElement("button");m.onclick=function(){document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()},m.className="negative";var g=document.createElement("span");g.className="btn-text",g.innerText="Annuler",n.appendChild(e),n.appendChild(t),t.appendChild(i),i.appendChild(r),t.appendChild(s),s.appendChild(l),s.appendChild(c),t.appendChild(o),o.appendChild(u),u.appendChild(d),o.appendChild(m),m.appendChild(g)}async function ml(n){var e=[],t=[],i=[],r=[],s,l;if(vi<5)try{let w=await new Promise(function(v,y){window.addEventListener("message",function(h){h.data.message==="fetchCompleted"&&v(h.data.res)}),window.postMessage({message:"fetchPls",urlToFetch:encodeURIComponent(n)},"*")});for(var c=new DOMParser,o=c.parseFromString(w,"text/html"),u=o.querySelector('script[data-react-data], div[data-react-type$="SbcSquadPageData.ReactData"] script[type="application/json"]').innerHTML,d=JSON.parse(u),m=0;m<11;m++){d.squadData.squad[m*2+1].statsCard.playerImages.playerSpecialImage?e.push(d.squadData.squad[m*2+1].statsCard.playerImages.playerSpecialImage.fixed.url.image1x.split(".png")[0].split("/p").pop()):e.push(d.squadData.squad[m*2+1].playerImage.fixed.url.image1x.split(".png")[0].split("/").pop()),i.push(m),t.push(d.squadData.squad[m*2+1].rareType);var g={pc:parseInt(d.squadData.squad[m*2+1].price.pc.price),xblps:parseInt(d.squadData.squad[m*2+1].price.ps.price)};r.push(g)}for(var s=o.querySelector(".breadcrumbs").children[4].children[1].href.split("/squad-building-challenges/")[1].split("/")[1],x=[],C=[],B=[],m=e.length-1;m>=0;m--)x.push(e[m]),C.push(t[m]),B.push(r[m]);return x.length>0&&await pl(x,s,C,B,i),!0}catch(w){console.error(w)}else te("Error fetching players from Futbin. Check if this is the right SBC. Please try again respecting Futbin in order to don't stress their services. If you exceed, your IP might be banned from them. Just reboot your router in order to fix it.","red","#fff",document.getElementsByClassName("ut-squad-overview ui-layout-left")[0]),Ce(1e3),vi=0}async function pl(n,e,t,i,r){Tt=[],Yt=0,Wt=0;let s=[];zn=!1;for(let l=0;l<n.length;l++)s.push(yr(n,i,t,l,e,r));await Promise.all(s),await fl(Tt,e,n,Yt,Wt,r)}async function yr(n,e,t,i,r,s,l=0){return new Promise((c,o)=>{l<5&&!zn?setTimeout(function(){fetch("https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/club",{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:`{"count":20,"defId":"${n[i]}","rarityIds":"${t[i]}","sort":"desc","sortBy":"value","start":0,"type":"player"}`,method:"POST",mode:"cors",credentials:"omit"}).then(async u=>{let d=await u.json();if(d.itemData.length>0){for(var m=!1,g=0;g<d.itemData.length;g++)if(d.itemData[g].rareflag==t[i]){Tt[i]=d.itemData[g].id,m=!0;break}m||(Tt[i]="0",Yt+=parseInt(e[i].pc),Wt+=parseInt(e[i].xblps))}else Tt[i]="0",Yt+=parseInt(e[i].pc),Wt+=parseInt(e[i].xblps);c(d)}).catch(async function(u){l++,await Ce(1e3),c(await yr(n,e,t,i,r,s,l))})},50*i):(Tt[i]="0",Yt+=parseInt(e[i].pc),Wt+=parseInt(e[i].xblps),zn=!0,o(new Error("Max fetch attempts exceeded")))})}function te(n,e,t,i){var r;r=document.createElement("div"),r.innerText=n,r.style="text-align: center;border-radius: 2px;padding: 16px;position: fixed;z-index: 99;left: 30%;width: 30%;font-size: 17px;",r.style.backgroundColor=e,r.style.color=t,i.prepend(r),r.className="snackbar show",setTimeout(function(){r.remove()},3e3)}async function fl(n,e,t,i,r,s){for(var l='{"players":[',c=0;c<n.length;c++)n[c]=="0"?l+=`{"index":${s[c]},"itemData":{"id":${t[c]},"dream":true}}`:l+=`{"index":${s[c]},"itemData":{"id":${n[c]},"dream":false}}`,c+1<=n.length&&(l+=",");if(n.length<23)for(var o=0,u=0;u<23;u++)s[o]!=u?(l+=`{"index":${u},"itemData":{"id":0,"dream":false}}`,u+1<23&&(l+=",")):o++;l+="]}",setTimeout(()=>{fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/sbs/challenge/${e}/squad`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:l,method:"PUT",mode:"cors",credentials:"omit"}).then(async d=>{await zr(e);var m=document.getElementsByClassName("title")[0].innerText;setTimeout(()=>{L(document.getElementsByClassName("ut-navigation-button-control")[0]);var g=document.getElementsByClassName("ut-sbc-challenge-table-row-view--title");g.length==0&&(g=document.getElementsByClassName("tileHeader")),setTimeout(()=>{for(var x=0;x<g.length;x++)if(g[x].innerText==m){g[x].className=="tileHeader"?L(g[x].parentNode.parentNode):(L(g[x].parentNode.parentNode),setTimeout(()=>{L(document.getElementsByClassName("btn-standard primary")[0])},150));break}},150),setTimeout(()=>{Z==="pc"?document.getElementsByClassName("ut-squad-summary-value costRemaining")[0].innerText=i:document.getElementsByClassName("ut-squad-summary-value costRemaining")[0].innerText=r},1300)},800)})},0)}window.addEventListener("message",async function(n){if(n.data.message=="removeIframe1")n.data.premiumStatus=="Active"?(document.getElementsByClassName("premiumStatusValue")[0].innerText=n.data.premiumStatus,document.getElementsByClassName("premiumStatusValue")[0].style.color="green",document.getElementsByClassName("timeRemainingValue")[0].innerText=n.data.timeRemainingInDays+" days",document.getElementsByClassName("timeRemainingValue")[0].style.color="green",document.getElementsByClassName("AutoSniperBotKey")[0].disabled=!1,document.getElementsByClassName("EmergencyExit")[0].disabled=!1,document.getElementsByClassName("ManualSnipeKey")[0].disabled=!1,document.getElementsByClassName("SellInputKey")[0].disabled=!1,document.getElementsByClassName("SellStartPrice")[0].disabled=!1,document.getElementsByClassName("SellBuyNowPrice")[0].disabled=!1,D=n.data.premiumStatus,H=n.data.timeRemainingInDays):(document.getElementsByClassName("premiumStatusValue")[0].innerText=n.data.premiumStatus,document.getElementsByClassName("premiumStatusValue")[0].style.color="red",document.getElementsByClassName("timeRemainingValue")[0].innerText="---",document.getElementsByClassName("timeRemainingValue")[0].style.color="red",document.getElementsByClassName("AutoSniperBotKey")[0].innerText="",document.getElementsByClassName("EmergencyExit")[0].innerText="",document.getElementsByClassName("ManualSnipeKey")[0].innerText="",document.getElementsByClassName("SellInputKey")[0].innerText="",document.getElementsByClassName("SellStartPrice")[0].innerText="",document.getElementsByClassName("SellBuyNowPrice")[0].innerText="",document.getElementsByClassName("AutoSniperBotKey")[0].disabled=!0,document.getElementsByClassName("EmergencyExit")[0].disabled=!0,document.getElementsByClassName("ManualSnipeKey")[0].disabled=!0,D=n.data.premiumStatus,window.postMessage({message:"set",objPassed:ne(["AutoSniperBotKey","ManualSnipeKey","EmergencyExit"],["","",""])},"*"));else if(n.data.message=="removeIframe0")D=n.data.premiumStatus,H=n.data.timeRemainingInDays;else if(n.data.greeting==="hello")window.postMessage({userFifaID:services.User.currentUserId.toString(),teamEst:document.querySelector(".view-navbar-clubinfo-est")?.innerText,teamName:document.querySelector(".view-navbar-clubinfo-name")?.innerText,teamBadge:document.querySelector(".view-navbar-clubinfo-badge")?.src},"*");else if(n.data.greeting==="FrominjectedScript")window.postMessage({res:"done"},"*");else if(n.data.message!=="iframeFutbinMsg"){if(n.data.greeting==="Inject"){if(nr){var e=document.querySelector(".ut-tab-bar"),t=!1;if(Array.from(e.children).forEach(o=>{o.classList.contains("InjectedBtn")&&(t=!0)}),!t){var i;i=document.createElement("button"),i.className="ut-tab-bar-item InjectedBtn",window.screen.height>=900?i.style="order: 7;margin-top: 100%;":window.screen.height<900&&window.screen.height>800?i.style="order: 7;":window.screen.height<=800&&(i.style="order: -1;"),i.addEventListener("mouseover",function(o){Ut(i,!0)}),i.addEventListener("mouseout",function(o){Ut(i,!1)}),i.addEventListener("click",function(o){i.classList.add("selected")});var r;r=document.createElement("img"),r.style="width: 30px;height: 30px;order: 7;";try{let o=await new Promise(function(u,d){window.addEventListener("message",function(m){m.data.message==="getChromeExtensionUrlCompleted"&&u(m.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"Logo.png"},"*")});r.src=o}catch(o){console.error(o)}var s;if(s=document.createElement("span"),s.innerText="SnippingSoul",s.style="color: #fff700;",i.appendChild(r),i.appendChild(s),e.insertBefore(i,e.children[8]),Rt==null||le==null||Z==null){le=services.Authentication.utasSession.id;var l=services.User.userDao.authDelegate.utasSession.user.selectedPersona,c=services.User.userDao.authDelegate.utasSession.user._personas._collection[l]._sku;c==="FFA27PCC"||c==="FFA27STM"?Z="pc":Z="console",Rt=services.User.userDao.authDelegate.utasSession.locale.language+services.User.userDao.authDelegate.utasSession.locale.region}}li()}window.postMessage({injDone:"Injection Done"},"*"),sendResponse({success:!0})}}});function gl(){window.postMessage({message:"sidRequest"},"*")}Fs.observe(document,{childList:!0,subtree:!0});$(document).delegate("input","click",function(n){n.target.classList.contains("ut-text-input-control")&&br()});document.addEventListener("input",function(n){n.target.classList.contains("ut-text-input-control")&&(document.addEventListener("touchstart",hr),br())},!1);document.addEventListener("click",hr);function hr(n){document.activeElement.tagName!="INPUT"?Fn=!1:Fn=!0}function L(n){try{var e=document.createEvent("MouseEvents");e.initEvent("mouseover",!0,!0),n.dispatchEvent(e),(e=document.createEvent("MouseEvents")).initEvent("mousedown",!0,!0),n.dispatchEvent(e),(e=document.createEvent("MouseEvents")).initEvent("mouseup",!0,!0),n.dispatchEvent(e),(e=document.createEvent("MouseEvents")).initEvent("click",!0,!0),n.dispatchEvent(e)}catch{}}function yl(){document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&(L(document.getElementsByClassName("btn-standard primary")[0]),window.setTimeout(function(){document.getElementsByClassName("currency-coins value")[2]!=null?(vr(),window.setTimeout(function(){document.getElementsByClassName("btn-text")[9]!==void 0&&(document.getElementsByClassName("btn-text")[9].innerText,services.Localization.localize("infopanel.label.sendTradePile"))},1400)):window.setTimeout(function(){L(document.getElementsByClassName("ut-navigation-button-control")[0]),L(document.getElementsByClassName("btn-standard increment-value")[0])},300)},400))}async function hl(){(document.getElementsByClassName("title")[0].innerText===services.Localization.localize("nav.label.transferList")||document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.assigncards"))&&(L(document.getElementsByClassName("accordian")[0]),window.setTimeout(async function(){try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getCompleted"&&e(i.data.result)}),window.postMessage({message:"get",keys:["SellStartPrice","SellBuyNowPrice"]},"*")});document.getElementsByClassName("ut-number-input-control filled")[0].value=n.SellStartPrice,document.getElementsByClassName("ut-number-input-control filled")[1].value=n.SellBuyNowPrice}catch(n){console.error(n)}},200),window.setTimeout(function(){document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.assigncards")?L(document.getElementsByClassName("btn-standard primary")[2]):L(document.getElementsByClassName("btn-standard primary")[4])},300))}function vr(){var n;Object.keys(services.Item.itemDao.itemRepo.unassigned._collection).length>0&&(services.Item.itemDao.itemRepo.unassigned._collection={}),n=document.getElementsByClassName("listFUTItem has-auction-data")[0],L(document.getElementsByClassName("btn-standard buyButton currency-coins")[0]),window.setTimeout(function(){try{if(services.Localization.localize("navbar.label.playerBio")==document.getElementsByClassName("btn-text")[2].innerText||document.getElementsByClassName("btn-text")[2].innerText===void 0)return;if(window.focus(),document.getElementsByClassName("btn-text")[2].parentElement.focus(),window.focus(),L(document.getElementsByClassName("btn-text")[2].parentElement),ii(),ri())for(;;);}catch{}},10),Object.keys(services.Item.itemDao.itemRepo.unassigned._collection).length>0&&setTimeout(()=>{services.Item.itemDao.itemRepo.unassigned._collection={},services.Item.itemDao.itemRepo.unassigned.reset()},300)}function ii(){repositories.Item.isPileFull(ItemPile.TRANSFER)&&setTimeout(()=>{document.getElementsByClassName("listFUTItem has-auction-data selected won")[0]&&ni(lr)},500)}function ri(){Pi++,window.postMessage({message:"set",objPassed:ne(["completedSnipesCount"],[Pi])},"*")}function br(){let n=document.getElementsByClassName("ut-text-input-control");document.getElementsByClassName("ut-text-input-control")[0].nextElementSibling==null&&$(n[0]).on("input",function(){window.setTimeout(function(){vl()},500)})}function xr(){var n=document.getElementsByClassName("button-container"),e=document.createElement("button");e.className="btn-standard addToSnipeFilter",e.style="background-color: #00adff;",ee?(se=="Achat immédiat"||se=="Enchères")&&(e.innerText="Ajouter un filtre"):se=="Achat immédiat"?e.innerText="Ajouter aux filtres d’achat":se=="Enchères"&&(e.innerText="Ajouter aux filtres d’enchères"),e.addEventListener("click",Yn),e.addEventListener("touchstart",Yn),n[0].appendChild(e)}function Yn(n){if(document.getElementsByClassName("ea-filter-bar-item-view")[0].classList.contains("selected")){var e=document.getElementsByClassName("ut-text-input-control")[0].value;if(ee)var t=document.getElementsByClassName("inline-container")[1].children[0].innerText,i=document.getElementsByClassName("inline-container")[2].children[0].innerText,r=document.getElementsByClassName("inline-container")[3].children[0].innerText,s=document.getElementsByClassName("inline-container")[4].children[0].innerText,l=document.getElementsByClassName("inline-container")[5].children[0].innerText,c=document.getElementsByClassName("inline-container")[6].children[0].innerText,o=document.getElementsByClassName("inline-container")[7].children[0].innerText,u=document.getElementsByClassName("inline-container")[8].children[0].innerText;else var t=document.getElementsByClassName("inline-container")[1].innerText,i=document.getElementsByClassName("inline-container")[2].innerText,r=document.getElementsByClassName("inline-container")[3].innerText,s=document.getElementsByClassName("inline-container")[4].innerText,l=document.getElementsByClassName("inline-container")[5].innerText,c=document.getElementsByClassName("inline-container")[6].innerText,o=document.getElementsByClassName("inline-container")[7].innerText,u=document.getElementsByClassName("inline-container")[8].innerText;var d=3,m=document.getElementsByClassName("ut-number-input-control")[5].value.replace(/,/g,"");m=m.replace(/\s/g,""),m=m.replace(/\./g,""),d==""&&(d=3);var g=Ma,x=document.getElementsByClassName("ut-search-filter-control--row-image")[0].src,C=document.getElementsByClassName("ut-search-filter-control--row-image")[2].src,B=document.getElementsByClassName("ut-search-filter-control--row-image")[3].src,w=document.getElementsByClassName("ut-search-filter-control--row-image")[4].src,f=document.getElementsByClassName("ut-search-filter-control--row-image")[5].src,v=document.getElementsByClassName("ut-search-filter-control--row-image")[6].src,y=document.getElementsByClassName("ut-search-filter-control--row-image")[7].src,h=document.getElementsByClassName("ut-search-filter-control--row-image")[8].src,E=[x,C,B,w,f,v,y,h],A=[e,ar,t,i,r,s,l,c,o,d,m,"","",0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,u,g,E];I.push(A);var P="";n&&parseInt(n)>0&&(P=n),fn(e,x,C,B,w,f,v,y,d,m,"",P,0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,h)}else if(document.getElementsByClassName("ea-filter-bar-item-view")[1].classList.contains("selected")||document.getElementsByClassName("ea-filter-bar-item-view")[2].classList.contains("selected")||document.getElementsByClassName("ea-filter-bar-item-view")[3].classList.contains("selected")){var b,M,T,Y,F,V,p,N,_,S=document.getElementsByClassName("inline-container");ee?(S.length>1&&(b=S[1].children[0].innerText),S.length>2&&(M=S[2].children[0].innerText),S.length>3&&(T=S[3].children[0].innerText),S.length>4&&(Y=S[4].children[0].innerText),S.length>5&&(F=S[5].children[0].innerText),S.length>6&&(V=S[6].children[0].innerText),S.length>7&&(p=S[7].children[0].innerText),S.length>8&&(N=S[8].children[0].innerText),S.length>9&&(_=S[9].children[0].innerText)):(S.length>1&&(b=S[1].innerText),S.length>2&&(M=S[2].innerText),S.length>3&&(T=S[3].innerText),S.length>4&&(Y=S[4].innerText),S.length>5&&(F=S[5].innerText),S.length>6&&(V=S[6].innerText),S.length>7&&(p=S[7].innerText),S.length>8&&(N=S[8].innerText),S.length>9&&(_=S[9].innerText));var d=3,m=document.getElementsByClassName("ut-number-input-control")[5].value.replace(/,/g,"");m=m.replace(/\s/g,""),m=m.replace(/\./g,""),d==""&&(d=3);var k;document.getElementsByClassName("ea-filter-bar-item-view")[1].classList.contains("selected")?k=1:document.getElementsByClassName("ea-filter-bar-item-view")[2].classList.contains("selected")?k=2:document.getElementsByClassName("ea-filter-bar-item-view")[3].classList.contains("selected")&&(k=3);var g=Ma,R,W,ie,ve,q,U,re,X,de;document.getElementsByClassName("ut-search-filter-control--row-image")[0]!==void 0&&(R=document.getElementsByClassName("ut-search-filter-control--row-image")[0].src),document.getElementsByClassName("ut-search-filter-control--row-image")[2]!==void 0&&(W=document.getElementsByClassName("ut-search-filter-control--row-image")[2].src),document.getElementsByClassName("ut-search-filter-control--row-image")[3]!==void 0&&(ie=document.getElementsByClassName("ut-search-filter-control--row-image")[3].src),document.getElementsByClassName("ut-search-filter-control--row-image")[4]!==void 0&&(ve=document.getElementsByClassName("ut-search-filter-control--row-image")[4].src),document.getElementsByClassName("ut-search-filter-control--row-image")[5]!==void 0&&(q=document.getElementsByClassName("ut-search-filter-control--row-image")[5].src),document.getElementsByClassName("ut-search-filter-control--row-image")[6]!==void 0&&(U=document.getElementsByClassName("ut-search-filter-control--row-image")[6].src),document.getElementsByClassName("ut-search-filter-control--row-image")[7]!==void 0&&(re=document.getElementsByClassName("ut-search-filter-control--row-image")[7].src),document.getElementsByClassName("ut-search-filter-control--row-image")[7]!==void 0&&(X=document.getElementsByClassName("ut-search-filter-control--row-image")[7].src),document.getElementsByClassName("ut-search-filter-control--row-image")[8]!==void 0&&(X=document.getElementsByClassName("ut-search-filter-control--row-image")[8].src),document.getElementsByClassName("ut-search-filter-control--row-image")[9]!==void 0&&(de=document.getElementsByClassName("ut-search-filter-control--row-image")[9].src);var ge=[R,W,ie,ve,q,U,re,X,de],A=[void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,d,m,"","",k,b,M,T,Y,F,V,p,N,_,void 0,g,ge];I.push(A),fn(void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,d,m,"","",k,R,W,ie,ve,q,U,re,X,de,void 0)}}function Wn(n){return n<150?150:n<1e3?50*Math.round((n-150)/50)+150:n<1e4?100*Math.round((n-1e3)/100)+1e3:n<5e4?250*Math.round((n-1e4)/250)+1e4:n<1e5?500*Math.round((n-5e4)/500)+5e4:1e3*Math.round((n-1e5)/1e3)+1e5}function vl(){var n=document.getElementsByClassName("ut-button-group playerResultsList"),e=0;if(n[0]&&n[0].firstElementChild!==null){var t=document.getElementsByTagName("button"),i=0;for(let r=0;r<t.length;r++)t[r].parentNode.classList=="ut-button-group playerResultsList"&&(t[r].id=i,t[r].addEventListener("click",bl),i++)}}function bl(n){n.target.parentNode.classList.contains("ut-button-group")&&(ns=n.target.firstElementChild.innerText,ar=n.target.lastElementChild.innerText)}function xl(){var n=document.getElementsByName("inputTextOptions");Array.from(n).forEach(e=>{e.addEventListener("keydown",function(t){var i=!1;Array.from(n).forEach(r=>{t.key==r.value&&(i=!0,alert("This key is already in use. Please choose another one."))}),i?i=!1:(e.value=t.key,El(),qn())})})}function wl(){var n=document.getElementsByClassName("NoAnimationPacks")[0];n.addEventListener("change",function(e){window.postMessage({message:"set",objPassed:ne(["NoAnimationPacks"],[document.getElementsByClassName("NoAnimationPacks")[0].checked])},"*")})}function Cl(){var n=document.getElementsByName("sellInputStartPrice")[0],e=document.getElementsByName("sellBuyNowPrice")[0];n.addEventListener("keyup",function(t){qn()}),e.addEventListener("keyup",function(t){qn()})}function El(){window.postMessage({message:"set",objPassed:ne(["SearchInput","MinBidPlusInput","MinBidMinusInput","MaxBidPlusInput","MaxBidMinusInput","BuyNowMinPlusInput","BuyNowMinMinusInput","BuyNowMaxPlusInput","BuyNowMaxMinusInput","BuyNowInput","MakeBidInput","AutoSniperBotKey","ManualSnipeKey","SellInputKey","SellStartPrice","SellBuyNowPrice","EmergencyExit","GoBackInput","TaxInput"],[document.getElementsByClassName("SearchInput")[0].value,document.getElementsByClassName("MinBidPlusInput")[0].value,document.getElementsByClassName("MinBidMinusInput")[0].value,document.getElementsByClassName("MaxBidPlusInput")[0].value,document.getElementsByClassName("MaxBidMinusInput")[0].value,document.getElementsByClassName("BuyNowMinPlusInput")[0].value,document.getElementsByClassName("BuyNowMinMinusInput")[0].value,document.getElementsByClassName("BuyNowMaxPlusInput")[0].value,document.getElementsByClassName("BuyNowMaxMinusInput")[0].value,document.getElementsByClassName("BuyNowInput")[0].value,document.getElementsByClassName("MakeBidInput")[0].value,document.getElementsByClassName("AutoSniperBotKey")[0].value,document.getElementsByClassName("ManualSnipeKey")[0].value,document.getElementsByClassName("SellInputKey")[0].value,document.getElementsByClassName("SellStartPrice")[0].value,document.getElementsByClassName("SellBuyNowPrice")[0].value,document.getElementsByClassName("EmergencyExit")[0].value,document.getElementsByClassName("GoBackInput")[0].value,document.getElementsByClassName("TaxInput")[0].value])},"*")}function qn(){try{window.postMessage({message:"set",objPassed:ne(["SellStartPrice","SellBuyNowPrice"],[document.getElementsByClassName("SellStartPrice")[0].value,document.getElementsByClassName("SellBuyNowPrice")[0].value])},"*")}catch{}}async function wr(){if(!ee)try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getCompleted"&&e(i.data.result)}),window.postMessage({message:"get",keys:["SearchInput","MinBidPlusInput","MinBidMinusInput","MaxBidPlusInput","MaxBidMinusInput","BuyNowMinPlusInput","BuyNowMinMinusInput","BuyNowMaxPlusInput","BuyNowMaxMinusInput","BuyNowInput","MakeBidInput","AutoSniperBotKey","ManualSnipeKey","SellInputKey","SellStartPrice","SellBuyNowPrice","EmergencyExit","GoBackInput","TaxInput"]},"*")});setTimeout(()=>{n.SearchInput!=null&&(document.getElementsByClassName("SearchInput")[0].value=n.SearchInput),n.MinBidPlusInput!=null&&(document.getElementsByClassName("MinBidPlusInput")[0].value=n.MinBidPlusInput),n.MinBidMinusInput!=null&&(document.getElementsByClassName("MinBidMinusInput")[0].value=n.MinBidMinusInput),n.MaxBidPlusInput!=null&&(document.getElementsByClassName("MaxBidPlusInput")[0].value=n.MaxBidPlusInput),n.MaxBidMinusInput!=null&&(document.getElementsByClassName("MaxBidMinusInput")[0].value=n.MaxBidMinusInput),n.BuyNowMinPlusInput!=null&&(document.getElementsByClassName("BuyNowMinPlusInput")[0].value=n.BuyNowMinPlusInput),n.BuyNowMinMinusInput!=null&&(document.getElementsByClassName("BuyNowMinMinusInput")[0].value=n.BuyNowMinMinusInput),n.BuyNowMaxPlusInput!=null&&(document.getElementsByClassName("BuyNowMaxPlusInput")[0].value=n.BuyNowMaxPlusInput),n.BuyNowMaxMinusInput!=null&&(document.getElementsByClassName("BuyNowMaxMinusInput")[0].value=n.BuyNowMaxMinusInput),n.BuyNowInput!=null&&(document.getElementsByClassName("BuyNowInput")[0].value=n.BuyNowInput),n.MakeBidInput!=null&&(document.getElementsByClassName("MakeBidInput")[0].value=n.MakeBidInput),n.AutoSniperBotKey!=null&&(document.getElementsByClassName("AutoSniperBotKey")[0].value=n.AutoSniperBotKey),n.ManualSnipeKey!=null&&(document.getElementsByClassName("ManualSnipeKey")[0].value=n.ManualSnipeKey),n.SellInputKey!=null&&(document.getElementsByClassName("SellInputKey")[0].value=n.SellInputKey),n.SellStartPrice!=null&&(document.getElementsByClassName("SellStartPrice")[0].value=n.SellStartPrice),n.SellBuyNowPrice!=null&&(document.getElementsByClassName("SellBuyNowPrice")[0].value=n.SellBuyNowPrice),n.EmergencyExit!=null&&(document.getElementsByClassName("EmergencyExit")[0].value=n.EmergencyExit),n.GoBackInput!=null&&(document.getElementsByClassName("GoBackInput")[0].value=n.GoBackInput),n.TaxInput!=null&&(document.getElementsByClassName("TaxInput")[0].value=n.TaxInput)},300)}catch(n){console.error(n)}}async function si(){try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getCompleted"&&e(i.data.result)}),window.postMessage({message:"get",keys:["NoAnimationPacks"]},"*")});n.NoAnimationPacks!=null?(document.getElementsByClassName("NoAnimationPacks")[0]&&(document.getElementsByClassName("NoAnimationPacks")[0].checked=n.NoAnimationPacks),n.NoAnimationPacks?Ca=0:Ca=4500):(window.postMessage({message:"set",objPassed:ne(["NoAnimationPacks"],[!1])},"*"),document.getElementsByClassName("NoAnimationPacks")[0]&&(document.getElementsByClassName("NoAnimationPacks")[0].checked=n.NoAnimationPacks),Ca=0),UTPackAnimationViewController.prototype.runAnimation=Or}catch(n){console.error(n)}}function Nl(){document.removeEventListener("keydown",Cr)}function li(){document.addEventListener("keydown",Cr)}async function Cr(n){try{let s=await new Promise(function(l,c){window.addEventListener("message",function(o){o.data.message==="getCompleted"&&l(o.data.result)}),window.postMessage({message:"get",keys:["SearchInput","MinBidPlusInput","MinBidMinusInput","MaxBidPlusInput","MaxBidMinusInput","BuyNowMinPlusInput","BuyNowMinMinusInput","BuyNowMaxPlusInput","BuyNowMaxMinusInput","BuyNowInput","MakeBidInput","AutoSniperBotKey","ManualSnipeKey","SellInputKey","EmergencyExit","GoBackInput","TaxInput"]},"*")});if(!Fn){if(s.SearchInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.SearchInput&&L(document.getElementsByClassName("btn-standard primary")[0]),s.MinBidPlusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.MinBidPlusInput&&L(document.getElementsByClassName("btn-standard increment-value")[0]),s.MinBidMinusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.MinBidMinusInput&&L(document.getElementsByClassName("btn-standard decrement-value")[0]),s.MaxBidPlusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.MaxBidPlusInput&&L(document.getElementsByClassName("btn-standard increment-value")[1]),s.MaxBidMinusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.MaxBidMinusInput&&L(document.getElementsByClassName("btn-standard decrement-value")[1]),s.BuyNowMinPlusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.BuyNowMinPlusInput&&L(document.getElementsByClassName("btn-standard increment-value")[2]),s.BuyNowMinMinusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.BuyNowMinMinusInput&&L(document.getElementsByClassName("btn-standard decrement-value")[2]),s.BuyNowMaxPlusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.BuyNowMaxPlusInput&&L(document.getElementsByClassName("btn-standard increment-value")[3]),s.BuyNowMaxMinusInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&n.key===s.BuyNowMaxMinusInput&&L(document.getElementsByClassName("btn-standard decrement-value")[3]),s.BuyNowInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.searchresults")&&n.key===s.BuyNowInput&&vr(),s.MakeBidInput!=null&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.searchresults")&&n.key===s.MakeBidInput&&L(document.getElementsByClassName("btn-standard bidButton")[0]),s.AutoSniperBotKey!=null&&document.getElementsByClassName("SniperBotInAppMenu")[0]===void 0&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&document.getElementsByClassName("ea-filter-bar-item-view")[0].classList.contains("selected")&&n.key===s.AutoSniperBotKey&&pr(),s.ManualSnipeKey!=null&&n.key===s.ManualSnipeKey&&yl(),s.SellInputKey!=null&&n.key===s.SellInputKey&&hl(),s.EmergencyExit!=null&&n.key===s.EmergencyExit){J();var e=new Date;O=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();var t=O+" — Assistant arrêté manuellement";ae(t,"red",O),document.getElementsByClassName("StopSnipingBtn")[0]&&Array.from(document.getElementsByClassName("StopSnipingBtn")).forEach(l=>{l.remove()});var i=document.getElementsByClassName("timerCountdown");if(i){var r=i[i.length-1];r&&Je&&(Je.stop(),r.innerHTML=Je.getTimeStopped())}}s.GoBackInput!=null&&n.key===s.GoBackInput&&(L(document.getElementsByClassName("ut-navigation-button-control")[0]),J()),s.TaxInput!=null&&n.key===s.TaxInput&&(document.getElementsByClassName("taxCalculator")[0]?(document.getElementsByClassName("blurredDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()):Bl())}}catch(s){console.error(s)}}async function Bl(){var n=document.body,e=document.createElement("div");e.className="blurredDialog",e.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;";var t=document.createElement("div");t.className="ut-name-squad taxCalculator",t.style="width: 36em;position: absolute;z-index: 100;right: 37%;top: 30%;z-index:9999;background: #151616;text-align: center;";var i=document.createElement("header");i.style="display: grid;grid-template-columns: 1fr 0.05fr;grid-template-rows: 1fr;";var r=document.createElement("h1");r.style="grid-area: 1 / 1 / 2 / 2; color: #fff700;",r.innerText="Tax Calculator";var s=document.createElement("input");try{let C=await new Promise(function(B,w){window.addEventListener("message",function(f){f.data.message==="getChromeExtensionUrlCompleted"&&B(f.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"images/cross.png"},"*")});s.src=C}catch(C){console.error(C)}s.height="14",s.width="14",s.type="image",s.className="closeDialog",s.style="grid-area: 1 / 2 / 2 / 3;align-self: center;",s.onclick=function(){document.getElementsByClassName("blurredDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()};var l=document.createElement("div");l.className="bodySection",l.style="background-color: black; padding: 0.5em;";var c=document.createElement("div");c.style.backgroundColor="black";var o=document.createElement("p");o.textContent="Prix :";var u=document.createElement("input");u.type="text",u.className="ut-number-input-control",u.style.width="50%",u.style.textAlign="center";var d=document.createElement("div");d.style.paddingBottom="10px";var m=document.createElement("span");m.className="spanTax",m.textContent=" Taxe EA : | ";var g=document.createElement("span");g.className="spanNet",g.textContent=" Prix net : | ";var x=document.createElement("span");x.className="spanSellFor",x.textContent=" Vendre pour ",d.appendChild(u),c.appendChild(o),c.appendChild(d),c.appendChild(m),c.appendChild(g),c.appendChild(x),document.getElementsByClassName("ut-root-view")[0].prepend(e),n.appendChild(t),t.appendChild(i),i.appendChild(r),i.appendChild(s),t.appendChild(l),l.appendChild(c),u.addEventListener("input",function(){var C=parseInt(u.value.replace(/\D/g,""))||0;u.value=C.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region);var B=C*.05,w=C-B,f=C+B;m.innerText=" Taxe EA : "+B.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region)+" | ",g.innerText=" Prix net : "+w.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region)+" | ",x.innerText=" Vendre pour "+f.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region)+" to win "+C.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region)})}function Er(){var n=`.wrapper .tabs_wrap ul{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        background: #212121;
        color: rgb(255, 255, 255);
        align-items: center;
    }
    
    .wrapper .tabs_wrap ul li{
        width: 100%;
        text-align: center;
        border-right: 1px solid #c1c4c9;
        padding: 13px 15px;
        cursor: pointer;
        -webkit-transition: all 0.2s ease;
        -o-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    
    .wrapper .tabs_wrap ul li:last-child{
        border-right: 0px;
    }
    
    .wrapper .container .item_wrap{
        padding: 10px 20px;
        border-bottom: 1px solid #ebedec;
        cursor: pointer;
    }
    
    .wrapper .container .item_wrap:hover{
        background: #e9ecf1;
    }
    
    .wrapper .container .itemDiv2{
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
    }
    
    .item_wrap .itemDiv2 .item_left{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
    }
    
    .item_wrap .item_left img{
        width: 70px;
        height: 70px;
        display: block;
    }
    
    .item_wrap .item_left .data{
        margin-left: 20px;
    }
    
    .item_wrap .item_left .data .name{
        font-weight: 600;
    }
    
    .item_wrap .item_left .data .distance{
        color: #7f8b9b;
        font-size: 14px;
        margin-top: 3px;
    }
    
    .item_wrap .item_right .status{
        position: relative;
        color: #77818d;
    }
    
    .item_wrap .item_right .status:before{
        content: "";
        position: absolute;
        top: 5px;
        left: -12px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #b3bbc8;
    }
    
    .item_wrap.offline .item_right .status{
        color: #b3bbc8;	
    }
    
    .item_wrap.online .item_right .status:before{
        background: #7fc469;
    }`,e=`
    .wrapper .tabs_wrap ul li:hover,
    .wrapper .tabs_wrap ul li.active{
        background: #fff700 !important;
        color: #000;
    }
    `,t=`
    .wrapper .tabs_wrap ul li:hover,
    .wrapper .tabs_wrap ul li.active{
        background: rgb(122, 207, 255);
        color: #000;
    }
    `,i=document.createElement("style");i.innerText=n,document.head.appendChild(i);var r;r=document.createElement("div"),r.className="wrapper";var s;s=document.createElement("div"),s.className="tabs_wrap";var l;if(l=document.createElement("ul"),se=="Achat immédiat"){var c=document.createElement("style");c.innerText=e,document.head.appendChild(c);var o;o=document.createElement("li"),o.setAttribute("data-tabs","Liste de joueurs"),o.innerText="Liste de joueurs",o.setAttribute("letter-spacing","-1px"),o.className="active",o.addEventListener("click",qe),o.addEventListener("touchstart",qe);var u,d;u=document.createElement("li"),u.setAttribute("data-tabs","Options d’achat immédiat"),u.innerText="Options d’achat immédiat",u.setAttribute("letter-spacing","-1px"),u.addEventListener("click",Ai),u.addEventListener("touchstart",Ai)}else if(se=="Enchères"){var c=document.createElement("style");c.innerText=t,document.head.appendChild(c);var o;o=document.createElement("li"),o.setAttribute("data-tabs","Liste de joueurs"),o.innerText="Liste de joueurs",o.setAttribute("letter-spacing","-1px"),o.className="active",o.addEventListener("click",qe),o.addEventListener("touchstart",qe);var u,m;u=document.createElement("li"),u.setAttribute("data-tabs","Options des enchères"),u.innerText="Options des enchères",u.setAttribute("letter-spacing","-1px"),u.addEventListener("click",Li),u.addEventListener("touchstart",Li)}var g;g=document.createElement("li"),g.setAttribute("data-tabs","Journal"),g.innerText="Journal",g.setAttribute("letter-spacing","-1px"),g.addEventListener("click",ga),g.addEventListener("touchstart",ga),r.appendChild(s),s.appendChild(l),l.appendChild(o),l.appendChild(u),l.appendChild(g);var x=document.getElementsByClassName("SniperBotInAppMenu")[0];x.insertBefore(r,x.children[0]);var C=document.querySelectorAll(".tabs_wrap ul li"),B=document.querySelectorAll(".item_wrap");C.forEach(w=>{w.addEventListener("click",()=>{C.forEach(f=>{f.classList.remove("active"),f.style.width="100%",f.style.background="#212121"}),w.classList.add("active"),B.forEach(f=>{f.style.display="none"})})})}async function Li(){Ir();try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getChromeExtensionUrlCompleted"&&e(i.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"sniperBotBidOptionPage.html"},"*")});sniperBotBidOptionPageHtml=n}catch(n){console.error(n)}fetch(sniperBotBidOptionPageHtml).then(n=>n.text()).then(n=>{document.getElementsByClassName("itemDiv")[0].innerHTML=n,ye==null?($("#UseDefinedBidPrices").prop("checked",!1),ye=!1):ye?($("#UseDefinedBidPrices").prop("checked",!0),ye=!0):($("#UseDefinedBidPrices").prop("checked",!1),ye=!1);let e={fill:"rgb(122, 207, 255)",background:"rgba(255, 255, 255, 0.214)"},t=document.getElementsByClassName("length range__slider"),i=document.getElementsByClassName("length__titleLoop field-title")[0],r=document.getElementsByClassName("length__titleSeconds field-title")[0],s=document.getElementsByClassName("length__titleTimeRemaining field-title")[0];t[0].querySelector("input").addEventListener("input",o=>{i.setAttribute("data-length",o.target.value),l(o.target,i),$t=o.target.value}),t[1].querySelector("input").addEventListener("input",o=>{r.setAttribute("data-length",o.target.value),l(o.target,r),Kt=o.target.value}),t[2].querySelector("input").addEventListener("input",o=>{s.setAttribute("data-length",o.target.value),Oe=o.target.value,l(o.target,s)});function l(o,u){let d=100*(o.value-o.min)/(o.max-o.min),m=`linear-gradient(90deg, ${e.fill} ${d}%, ${e.background} ${d+.1}%)`;o.style.background=m,o==t[2].querySelector("input")?(o.value==0&&u.setAttribute("data-length","1 minute"),o.value==1&&u.setAttribute("data-length","5 minutes"),o.value==2&&u.setAttribute("data-length","10 minutes"),o.value==3&&u.setAttribute("data-length","15 minutes"),o.value==4&&u.setAttribute("data-length","30 minutes"),o.value==5&&u.setAttribute("data-length","45 minutes"),o.value==6&&u.setAttribute("data-length","60 minutes")):u.setAttribute("data-length",o.value)}$t==null?($t=document.getElementsByClassName("length range__slider")[0].querySelector("input").value,l(t[0].querySelector("input"),i)):(document.getElementsByClassName("length range__slider")[0].querySelector("input").value=$t,l(t[0].querySelector("input"),i)),Kt==null?(Kt=document.getElementsByClassName("length range__slider")[1].querySelector("input").value,l(t[1].querySelector("input"),r)):(document.getElementsByClassName("length range__slider")[1].querySelector("input").value=Kt,l(t[1].querySelector("input"),r)),Oe==null?(Oe=document.getElementsByClassName("length range__slider")[2].querySelector("input").value,l(t[2].querySelector("input"),s)):(document.getElementsByClassName("length range__slider")[2].querySelector("input").value=Oe,l(t[2].querySelector("input"),s)),$("input[name=UseDefinedBidPrices]").change(function(){if($(this).is(":checked")){ye=!0;for(var o=document.getElementsByClassName("BidAmountSpan"),u=document.getElementsByClassName("MaxBidReachableInput"),d=0;d<o.length;d++)o[d].parentElement.style="display:visible",u[d].parentElement.style="display:none",o[d].parentElement.parentElement.style="grid-template-columns: 9fr 8fr 8fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr";ye=!0}else{ye=!1;for(var o=document.getElementsByClassName("BidAmountSpan"),m=document.getElementsByClassName("MaxBidReachableInput"),d=0;d<o.length;d++)o[d].parentElement.style="display:none",m[d].parentElement.style="display:visible",o[d].parentElement.parentElement.style="grid-template-columns: 9fr 8fr 8fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr";ye=!1}$("input[name=BidAmountInput]").val("")});var c=document.querySelectorAll(".range__slider, .setting");c.forEach(o=>{o.style.backgroundColor="#212121"})})}async function Ai(){Ir();try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getChromeExtensionUrlCompleted"&&e(i.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"sniperBotSnipeOptionPage.html"},"*")});sniperBotSnipeOptionPageHtml=n}catch(n){console.error(n)}ze==null&&(ze="Unlimited"),fetch(sniperBotSnipeOptionPageHtml).then(n=>n.text()).then(n=>{document.getElementsByClassName("itemDiv")[0].innerHTML=n;var e=document.createElement("div");e.className="setting NplayersToBuy",e.innerHTML=`Nombre maximal d’achats<div style="text-align-last: center;place-self: center;right: 9px;position: absolute;width: 32%;">
<div class="input-group" style="display: flex;justify-content: center;align-items: center;flex-direction: row;box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3), 4px 7px 15px rgba(0, 0, 0, 0.2),9px 15px 25px rgba(0, 0, 0, 0.2);border-radius: 15px;max-width: 360px;width: 100%;">
  <button id="decrementNumOfPlayersToBuy" class="decrement-btn" style="background: white;width: 2em;height: 2em;border-bottom-left-radius: 15px;border-top-left-radius: 15px;">-</button>
  <input type="text" id="inputNumOfPlayersToBuy" value="${ze==="Unlimited"?"Illimité":ze}" class="input-field" style="background: #f0ffff00;height: 2em;border: none;color: white;width: 100%;text-align: center;position: relative;opacity: 100;" disabled>
  <button id="incrementNumOfPlayersToBuy" class="increment-btn" style="background: white;width: 2em;height: 2em;border-bottom-right-radius: 15px;border-top-right-radius: 15px;">+</button>
</div>
</div>`;let t={fill:"#fff700",background:"rgba(255, 255, 255, 0.214)"},i=document.getElementsByClassName("length range__slider");var r=document.createElement("div");r.className="length range__slider",r.setAttribute("data-min","0"),r.setAttribute("data-max","3");var s=document.createElement("div");s.className="length__titleSpeed field-title",s.setAttribute("data-length","3"),s.innerText="Vitesse de recherche";var l=document.createElement("input");l.id="slider",l.type="range",l.setAttribute("min","0"),l.setAttribute("max","3"),l.setAttribute("value","1"),l.style="background: linear-gradient(90deg, rgb(255, 247, 0) 53.3333%, rgba(255, 255, 255, 0.216) 53.4333%);",r.appendChild(s),r.appendChild(l);var c=document.createElement("div");c.style="padding: 10px;    padding-top: 5px;    padding-bottom: 5px;    padding-left: 8px;    margin: 3px;    background: #212121;    color: rgb(255, 255, 255);    display: grid;    justify-content: start;    align-items: center;    border-radius: 12px;    grid-template-columns: auto auto auto;    column-gap: 10px;    @property --x { syntax: 'angle';    initial-value: 1deg;    inherits: true; };    /* background: #fbff0000; */    border: 2px solid #fbff00;    color: white;    /* text-shadow: 0 0 10px #4ec668; */    box-shadow: 0 0 5px #fbff006b;    box-sizing: border-box;";var o=document.createElement("span");o.style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;width: 15px;height: 15px;",o.innerText="\u26A0\uFE0F";var u=document.createElement("span");u.style="flex-grow: 1;min-width: 0px;display: block;white-space: normal;",u.innerHTML=`<span style="font-weight: normal;">Si vous utilisez </span><span style="/* font-weight: bold; */color: yellow;">le mode turbo ou rapide</span><span style="font-weight: normal;">, évitez les sessions prolongées : le marché des transferts peut être temporairement restreint.</span>
    <span style="color: yellow;/* font-weight: bold; */">Privilégiez une vitesse modérée et faites des pauses régulières.</span>`,c.appendChild(o),c.appendChild(u),document.getElementsByClassName("main")[0]&&(document.getElementsByClassName("main")[0].style="display: flex;justify-content: center;padding-top: 5%;margin-left: 10%;margin-right: 10%;"),document.getElementsByClassName("settings")[0]&&(document.getElementsByClassName("settings")[0].appendChild(e),document.getElementsByClassName("settings")[0].appendChild(r),document.getElementsByClassName("settings")[0].appendChild(c));let d=document.getElementsByClassName("length__titleLoop field-title")[0],m=document.getElementsByClassName("length__titleSeconds field-title")[0];i[0].querySelector("input").addEventListener("input",E=>{d.setAttribute("data-length",E.target.value),g(E.target,d),_t=parseInt(E.target.value)}),i[1].querySelector("input").addEventListener("input",E=>{m.setAttribute("data-length",E.target.value),g(E.target,m),lt=parseInt(E.target.value)}),r.querySelector("input").addEventListener("input",E=>{s.setAttribute("data-length",E.target.value),g(E.target,s),it=E.target.value}),g(i[0].querySelector("input"),d),g(i[1].querySelector("input"),m),g(r.querySelector("input"),s),_t==null?(_t=parseInt(document.getElementsByClassName("length range__slider")[0].querySelector("input").value),g(i[0].querySelector("input"),d)):(document.getElementsByClassName("length range__slider")[0].querySelector("input").value=parseInt(_t),g(i[0].querySelector("input"),d)),lt==null?(lt=parseInt(document.getElementsByClassName("length range__slider")[1].querySelector("input").value),g(i[1].querySelector("input"),m)):(document.getElementsByClassName("length range__slider")[1].querySelector("input").value=parseInt(lt),g(i[1].querySelector("input"),m)),it==null?(it=l.value,g(r.querySelector("input"),s)):(l.value=it,g(r.querySelector("input"),s));function g(E,A){let P=100*(E.value-E.min)/(E.max-E.min),b=`linear-gradient(90deg, ${t.fill} ${P}%, ${t.background} ${P+.1}%)`;E.style.background=b,A.setAttribute("data-length",E.value)}var x=document.getElementById("decrementNumOfPlayersToBuy"),C=document.getElementById("incrementNumOfPlayersToBuy"),B=document.getElementById("inputNumOfPlayersToBuy");if(ze==="Unlimited"?x.disabled=!0:(ze===100&&(C.disabled=!0),x.disabled=!1),x.addEventListener("click",()=>{let E;B.value==="Illimité"?E=0:E=parseInt(B.value),E>0&&(E--,B.value=E,ze=E),E===0&&(B.value="Illimité",x.disabled=!0,ze="Unlimited"),C.disabled=!1}),C.addEventListener("click",()=>{let E;B.value==="Illimité"?E=0:E=parseInt(B.value),E<100&&(E++,B.value=E,ze=E),E===100&&(C.disabled=!0),x.disabled=!1}),!ee){var w=document.createElement("div");w.className="setting";var f=document.createElement("input");f.type="checkbox",f.id="UseAutoSell",f.name="UseAutoSell";var v=document.createElement("label");v.setAttribute("for","UseAutoSell"),v.innerText="Revendre automatiquement après achat",w.appendChild(f),w.appendChild(v);var y=document.getElementsByClassName("settings")[0];y.insertBefore(w,y.children[1].nextElementSibling),Be==null?($("#UseAutoSell").prop("checked",!1),Be=!1):Be?($("#UseAutoSell").prop("checked",!0),Be=!0):($("#UseAutoSell").prop("checked",!1),Be=!1),$("input[name=UseAutoSell]").change(function(){if($(this).is(":checked")){Be=!0;for(var E=document.getElementsByClassName("SellAt"),A=document.getElementsByClassName("BuyNowClass"),P=document.getElementsByClassName("searchesClass"),b=0;b<E.length;b++)E[b].parentElement.style.display="",A[b].parentElement.style.left="0",P[b].parentElement.style.left="0",I[b][12]==null?E[b].value="":E[b].value=I[b][12];Be=!0}else{Be=!1;for(var E=document.getElementsByClassName("SellAt"),A=document.getElementsByClassName("BuyNowClass"),P=document.getElementsByClassName("searchesClass"),b=0;b<E.length;b++)E[b].parentElement.style.display="none",A[b].parentElement.style.left="50%",P[b].parentElement.style.left="50%";Be=!1}})}var h=document.querySelectorAll(".range__slider, .setting");h.forEach(E=>{E.style.backgroundColor="#212121"})})}async function Nr(){var n=`.leaderboard {
            max-height: inherit;
            overflow-y: auto;
            padding-bottom: 7%;
            box-sizing: border-box;
            width: 100%;
      }
          .leaderboard__title {
            position: absolute;
            z-index: 2;
            top: 50%;
            right: calc(var(--start) * .75);
            transform: translateY(-50%);
            text-transform: uppercase;
            margin: 0;
            
            span {
              display: block;
            }
            
            span--top {
              font-size: 17px;
              font-weight: 700;
              letter-spacing: 6.5px;
            }
            
            span--bottom {
              font-size: 17px;
              font-weight: 500;
              letter-spacing: 3.55px;
              opacity: .65;
              transform: translateY(-2px);
            }
          }
          
          .leaderboard__icon {
            fill: #fff;
            opacity: .35;
            width: 50px;
            position: absolute;
            top: 50%;
            left: var(--start);
            transform: translate(-50%, -50%);
          }
        
        
        .leaderboard__profiles {
          background-color: #fff0;
          //border-radius: 0 0 12px 12px;
          display: grid;
          row-gap: 8px;
          border: solid;
          border-width: 0.01px;
          border-color: #556c95;
        }
        
        .leaderboard__profile {
          display: grid;
          grid-template-columns: 8fr 8fr 8fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr;
          align-items: center;
          padding: 10px 15px 10px 10px;
          border-radius: 10px;
          box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
          cursor: pointer;
          transition: transform .25s cubic-bezier(.7,.98,.86,.98), box-shadow .25s cubic-bezier(.7,.98,.86,.98);
          background-color: #ffffff05;
          
          .leaderboard:hover {
            transform: scale(1.2);
            box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
          }
        }
        
        .leaderboard__picture {
          max-width: 100%;
          width: 60px;
          border-radius: 50%;
          box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
        }
        
       .leaderboard__name {
          color: #fff700;
          font-weight: 600;
          font-size: 16px;
          
          margin-left: 4px;
        }
        
       .leaderboard__value {
          color: #35d8ac;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          
          .leaderboard > span {
            opacity: .8;
            font-weight: 600;
            font-size: 13px;
            margin-left: 3px;
          }
        }
      
      // bare minimuu styles
      
      body {
        margin: 0;
        background-color: #eaeaea;
        display: grid;
        height: 100vh;
        place-items: center;
        font-family: UltimateTeam, sans-serif;
        font-size: 1.6rem;
      }
      
      .leaderboard {
            max-height: inherit;
            overflow-y: auto;
            padding-bottom: 7%;
            box-sizing: border-box;
            width: 100%;
      }

      .form__field {
        font-family: inherit;
        width: 95%;
        border: 0;
        border-bottom: 2px solid;
        outline: 0;
        font-size: 1rem;
        color: white;
        padding: 0px 0;
        background: transparent;
        transition: border-color 0.2s;
        text-align: center;
      }
      
      .form__field:focus {
        //padding-bottom: 6px;  
        font-weight: 500;
        border-width: 3px;
        //border-image: linear-gradient(to right, white, blue);
        border-image-splice: 1;
      }
      

    .timerCountdown::after {
        content: " secondes";
    }

    .squadName:hover {
        background-color: #0089ff5c;
        font-weight: bold;
    }
      `,e=document.createElement("style");e.innerText=n,document.head.appendChild(e);var t;if(t=document.createElement("div"),t.className="SniperBotInAppMenu",ee){var i=document.getElementsByClassName("ut-pinned-list-container ut-content-container")[0];t.style="position: relative;background-color: #282c34;"}else{var i=document.getElementsByClassName("ut-pinned-list-container ut-content-container")[0];i.style="width: 90%;flex-direction: row;",t.style="user-select: none;border: 1px solid #fff 22;background-color: #282c34;background: linear-gradient(90deg, rgb(34 42 50) 0%, rgb(48 43 39 / 72%) 120%);box-shadow: 0 7px 20px 5px #000 88;overflow: hidden;transition: 0.5s all;margin-left: 10px;max-height: 85%;height: 100%; width: 61%;position: relative;"}i.appendChild(t);var r;r=document.createElement("article"),r.className="leaderboard",ee&&(r.style="overflow-y: auto;max-height: 563px;height: 20em;");var s;s=document.createElement("h1"),s.className="leaderboard__title";var l;l=document.createElement("span"),l.className="leaderboard__title--top",l.innerText="Nom du joueur";var c;c=document.createElement("span"),c.className="leaderboard__title--bottom",c.innerText="Note générale",t.appendChild(r);var o;if(o=document.createElement("div"),o.className="wrapperDivBtnSaveLoad",o.style="display: flex;position: absolute;bottom: 0px;height: 7%; width: 100%;",t.appendChild(o),!ee){var u;u=document.createElement("button"),u.innerText="Enregistrer",u.className="SaveBtn",u.style="background-color: lime;border-style: solid;border-color: lime;cursor: pointer;font-family: UltimateTeam, sans-serif;text-align-last: center;width: 100%;",D==null&&await fe(String(services.User.currentUserId)),D=="Active"?(u.addEventListener("click",Oi),u.addEventListener("touchstart",Oi)):u.addEventListener("click",function(){Ie("Save and Load your filters \u{1F4BE}","Buy SnippingSoul Premium in order to Save and Load your favourite filters.")});var d;d=document.createElement("button"),d.innerText="Charger",d.className="SaveBtn",d.style="background-color: mediumaquamarine;border-style: solid;border-color: mediumaquamarine;cursor: pointer;font-family: UltimateTeam, sans-serif;text-align-last: center;width: 100%;",se=="Achat immédiat"?(D==null&&await fe(String(services.User.currentUserId)),D=="Active"?(d.addEventListener("click",Ri),d.addEventListener("touchstart",Ri)):d.addEventListener("click",function(){Ie("Save and Load your filters \u{1F4BE}","Buy SnippingSoul Premium in order to Save and Load your favourite filters.")})):(D==null&&await fe(String(services.User.currentUserId)),D=="Active"?(d.addEventListener("click",Di),d.addEventListener("touchstart",Di)):d.addEventListener("click",function(){Ie("Save and Load your filters \u{1F4BE}","Buy SnippingSoul Premium in order to Save and Load your favourite filters.")})),o.appendChild(u),o.appendChild(d)}}function Oi(){se=="Enchères"?Tr():se=="Achat immédiat"&&_r(),Tl()}async function Di(){ci();var n=[];try{n=(await new Promise(function(t,i){window.addEventListener("message",function(r){r.data.message==="getCompleted"&&t(r.data.result)}),window.postMessage({message:"get",keys:["FilterSaved"]},"*")})).FilterSaved}catch(e){console.error(e)}n&&window.setTimeout(function(){for(var e=0;e<n.length;e++){var t=n[e];Sr(t.name,t.value)}},200)}async function Ri(){L(document.getElementsByClassName("ea-filter-bar-item-view")[0]),ci(),document.getElementsByClassName("bodySection")[0].innerHTML=`<style>.tabs {
        display: flex;
        flex-wrap: wrap; // make sure it wraps
    }
    .tabs label {
        order: 1; // Put the labels first
        display: block;
        padding: .5rem .5rem;
        width: 45%;
        text-align: -webkit-center;
        cursor: pointer;
      background: #90caf900;
      font-weight: 500;
      transition: background ease 0.2s;
    }
    .tabs .tab {
      order: 99; // Put the tabs last
      flex-grow: 1;
        width: 100%;
        display: none;
      background: #fff0;
    }
    .tabs input[type="radio"] {
        display: none;
    }
    .tabs input[type="radio"]:checked + label {
        background: #fff;
        color: black;
    }
    .tabs input[type="radio"]:checked + label + .tab {
        display: block;
    }
    
    .settingsPl {
             position: relative;
        display: flex;
        flex-direction: column;
        overflow: auto;    padding-left: 1rem;
        padding-right: 1rem;
        padding-top: .5rem;
    }
     .settingsPl .setting {
         position: relative;
         height: calc(52px - 10px);
         background: rgb(71 98 103 / 20%);
         border-radius: 8px;
         display: flex;
         align-items: center;
         padding: 1px 25px;
         color: #fff;
         margin-bottom: 8px;
    }
     .settingsPl .setting input {
         opacity: 0;
         position: absolute;
    }
     .settingsPl .setting input + label {
         user-select: none;
    }
     .settingsPl .setting input + label::before, .settingsPl .setting input + label::after {
         content: "";
         position: absolute;
         transition: 150ms cubic-bezier(0.24, 0, 0.5, 1);
         transform: translateY(-50%);
         top: 50%;
         right: 10px;
         cursor: pointer;
    }
     .settingsPl .setting input + label::before {
         height: 30px;
         width: 50px;
         border-radius: 30px;
         background: rgba(214, 214, 214, 0.434);
    }
     .settingsPl .setting input + label::after {
         height: 24px;
         width: 24px;
         border-radius: 60px;
         right: 32px;
         background: #fff;
    }
     .settingsPl .setting input:checked + label:before {
         background: #fff700cc;
         transition: all 150ms cubic-bezier(0, 0, 0, 0.1);
    }
     .settingsPl .setting input:checked + label:after {
         right: 14px;
    }
     .settingsPl .setting input:focus + label:before {
         box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);
    }
     .settingsPl .setting input:disabled + label:before, .settingsPl .setting input:disabled + label:after {
         cursor: not-allowed;
    }
     .settingsPl .setting input:disabled + label:before {
         background: rgba(214, 214, 214, 0.434);
    }
     .settingsPl .setting input:disabled + label:after {
         background: #909090;
    }
     .settingsPl::-webkit-scrollbar {
      width: 8px;
    }
    
     /* Estilos barra (thumb) de scroll */
    .settingsPl::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    
    .settingsPl::-webkit-scrollbar-thumb:active {
      background-color: #999999;
    }
    
    .settingsPl::-webkit-scrollbar-thumb:hover {
      background: #b3b3b3;
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    
     /* Estilos track de scroll */
    .settingsPl::-webkit-scrollbar-track {
      background: #e1e1e1;
      border-radius: 4px;
    }
    
    .settingsPl::-webkit-scrollbar-track:hover, 
    .settingsPl::-webkit-scrollbar-track:active {
      background: #d4d4d4;
    }
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #fff700;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        display: none; /* Initially hidden */
      }
    
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    
    <div class="tabs">
      <input type="radio" name="tabs" id="tabtwo" checked="checked">
      <label for="tabtwo">Les moins chers</label>
      <div class="tab"><style>
.angry-grid {
   display: grid; 

   grid-template-rows: 1fr 1fr 1fr;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   
   gap: 10px;
   padding: .5em;   
}
  
#item-0 {

   background-color: #0000004d; 
   grid-row-start: 1;
   grid-column-start: 1;

   grid-row-end: 2;
   grid-column-end: 2;height: 2em;
    align-content: center;
   
}
#item-1 {

   background-color: #0000004d; 
   grid-row-start: 1;
   grid-column-start: 2;

   grid-row-end: 2;
   grid-column-end: 3;height: 2em;
    align-content: center;
   
}
#item-2 {

   background-color: #0000004d; 
   grid-row-start: 1;
   grid-column-start: 3;

   grid-row-end: 2;
   grid-column-end: 4;height: 2em;
    align-content: center;
   
}
#item-3 {

   background-color: #0000004d; 
   grid-row-start: 1;
   grid-column-start: 4;

   grid-row-end: 2;
   grid-column-end: 5;height: 2em;
    align-content: center;
   
}
#item-4 {

   background-color: #0000004d; 
   grid-row-start: 2;
   grid-column-start: 1;

   grid-row-end: 3;
   grid-column-end: 2;height: 2em;
    align-content: center;
   
}
#item-5 {

   background-color: #0000004d; 
   grid-row-start: 2;
   grid-column-start: 2;

   grid-row-end: 3;
   grid-column-end: 3;height: 2em;
    align-content: center;
   
}
#item-6 {

   background-color: #0000004d; 
   grid-row-start: 2;
   grid-column-start: 3;

   grid-row-end: 3;
   grid-column-end: 4;height: 2em;
    align-content: center;
   
}
#item-7 {

   background-color: #0000004d; 
   grid-row-start: 2;
   grid-column-start: 4;

   grid-row-end: 3;
   grid-column-end: 5;height: 2em;
    align-content: center;
   
}
#item-8 {

   background-color: #0000004d; 
   grid-row-start: 3;
   grid-column-start: 1;

   grid-row-end: 4;
   grid-column-end: 2;height: 2em;
    align-content: center;
   
}
#item-9 {

   background-color: #0000004d; 
   grid-row-start: 3;
   grid-column-start: 2;

   grid-row-end: 4;
   grid-column-end: 3;height: 2em;
    align-content: center;
   
}
#item-10 {

   background-color: #0000004d; 
   grid-row-start: 3;
   grid-column-start: 3;

   grid-row-end: 4;
   grid-column-end: 4;height: 2em;
    align-content: center;
   
}
#item-11 {

   background-color: #0000004d; 
   grid-row-start: 3;
   grid-column-start: 4;

   grid-row-end: 4;
   grid-column-end: 5;height: 2em;
    align-content: center;
   
}.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3), 4px 7px 15px rgba(0, 0, 0, 0.2),
    9px 15px 25px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  max-width: 360px;
}

.input-field {
  width: 100%;
  text-align: center;
}

.decrement-btn {
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
}

.increment-btn {
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
}

.button:hover {
  background-color: #e6e6e6;
}

.button:active {
  box-shadow: inset 4px 5px 10px rgba(0, 0, 0, 0.5);
}
.selectedClass {
    background-color: #fff700 !important;
    color: black;
  }
</style>
<div style="background: #101010;">Sélection de la note</div>

<div class="angry-grid">
  
  <div class="cheapestClass" id="item-0">81</div>
  <div class="cheapestClass" id="item-1">82</div>
  <div class="cheapestClass" id="item-2">83</div>
  <div class="cheapestClass" id="item-3">84</div>
  <div class="cheapestClass" id="item-4">85</div>
  <div class="cheapestClass" id="item-5">86</div>
  <div class="cheapestClass" id="item-6">87</div>
  <div class="cheapestClass" id="item-7">88</div>
  <div class="cheapestClass" id="item-8">89</div>
  <div class="cheapestClass" id="item-9">90</div>
  <div class="cheapestClass" id="item-10">91</div>
  <div class="cheapestClass" id="item-11">92</div>
</div>
<div style="background: #101010;">Nombre de joueurs les moins chers</div>

<div style="text-align: -webkit-center;padding: .5em;">
<div class="input-group">
  <button id="decrement" class="decrement-btn" style="background: white;width: 2em;height: 2em;">-</button>
  <input type="number" id="inputNumCheapest" value="5" class="input-field" style="background: #f0ffff00;height: 2em;border: none;color: white;">
  <button id="increment" class="increment-btn" style="background: white;width: 2em;height: 2em;">+</button>
</div>
</div>       


</div>
      
      <input type="radio" name="tabs" id="tabthree">
      <label for="tabthree">Personnalisé</label>
      <div class="tab">
      <div class="filtersContentDialog" style="display: grid;grid-template-columns: 10fr 1fr;align-items: center;grid-row-gap: 2px;background: #0000004d;"></div>
      </div>
    </div>`;let n=null;var e=document.querySelectorAll(".cheapestClass");e.forEach(d=>{d.addEventListener("click",()=>{n&&document.getElementById(n).classList.remove("selectedClass"),n=d.id,d.classList.add("selectedClass")})});var t=document.getElementById("decrement"),i=document.getElementById("increment"),r=document.getElementById("inputNumCheapest");t.addEventListener("click",()=>{let d=parseInt(r.value);d>1&&(d--,r.value=d),d===1&&(t.disabled=!0),i.disabled=!1}),i.addEventListener("click",()=>{let d=parseInt(r.value);d<30&&(d++,r.value=d),d===30&&(i.disabled=!0),t.disabled=!1}),r.addEventListener("change",()=>{let d=parseInt(r.value);isNaN(d)||d<1?r.value=1:d>30&&(r.value=30),t.disabled=d===1,i.disabled=d===30});for(var s=document.querySelectorAll('.tabs input[type="radio"]'),l=0;l<s.length;l++)s[l].addEventListener("change",function(){wi=this.getAttribute("id"),wi==="tabthree"?document.getElementsByClassName("LoadAndAdjust")[0].style="display: none;":document.getElementsByClassName("LoadAndAdjust")[0].style=""});var c=[];try{c=(await new Promise(function(m,g){window.addEventListener("message",function(x){x.data.message==="getCompleted"&&m(x.data.result)}),window.postMessage({message:"get",keys:["FilterSaved"]},"*")})).FilterSaved}catch(d){console.error(d)}c&&window.setTimeout(function(){for(var d=0;d<c.length;d++){var m=c[d];Sr(m.name,m.value)}},200);var o=document.createElement("button");o.onclick=function(){Ul()},o.className="LoadAndAdjust";var u=document.createElement("span");u.className="btn-text",u.innerText="Charger",o.appendChild(u),document.getElementsByClassName("ut-button-group")[1].insertBefore(o,document.getElementsByClassName("negative")[0]),fs=!0,gs=0}async function kn(n){document.getElementsByClassName("ut-number-input-control")[5].value=parseInt(n),document.getElementsByClassName("ut-number-input-control")[5].dispatchEvent(new Event("input")),L(document.getElementsByClassName("btn-standard increment-value")[3]),L(document.getElementsByClassName("btn-standard decrement-value")[3])}async function In(n,e){return new Promise((t,i)=>{if(n!=null&&n!=""){L(document.getElementsByClassName("ut-content")[0]);var r=document.getElementsByClassName("ut-text-input-control")[0];r.value=n,r.dispatchEvent(new Event("input")),window.setTimeout(function(){try{for(var s=0;1e3>=s;s++)if(document.getElementsByClassName("btn-text")[s].innerText.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")==n.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")){document.getElementsByClassName("btn-text")[s].nextSibling.innerText.toString()===e.toString()&&L(document.getElementsByClassName("btn-text")[s]),t(!0);break}}catch{L(document.getElementsByClassName("ut-content")[0]),t(!1)}},1e3)}else t(!1)})}async function Ln(n){var e=document.getElementsByClassName("inline-container")[3];L(e);var t=await Sl(parseInt(n));L(document.getElementsByClassName("with-icon")[t+1])}async function Sl(n){return rr.indexOf(n)}function Fi(n){let e=parseInt(n.value);e<1e3?e+=50:e<1e4?e+=100:e<5e4?e+=250:e<1e5?e+=500:e+=1e3,n.value=e}function Ui(n){let e=parseInt(n.value);e>0&&(e<=150?e=0:e<=1e3?e-=50:e<=1e4?e-=100:e<=5e4?e-=250:e<=1e5?e-=500:e-=1e3,n.value=e)}function Ml(){var n=`

   .glass-btn{
    display: inline-block;
    text-decoration: none;
    border-radius: 15px;
    background-color: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(30px);
    color: rgba(255,255,255,0.8);
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    text-transform: uppercase;
    width: 30%;
    height: 2.5em;
    margin-right: 2%;
}
.glass-btn:hover{
    background-color: rgba(232, 236, 0, 0.877);
    color: #000;
}`,e=document.createElement("style");e.innerText=n,document.head.appendChild(e);var t;if(t=document.createElement("div"),t.className="wrapperMainSnipeBid",ee){var i=document.getElementsByClassName("ut-pinned-list-container ut-content-container")[0];t.style="display: flex;justify-content: center;padding-top: 10%;padding-bottom: 10%;margin-left: 10%;margin-right: 10%;"}else{var i=document.getElementsByClassName("ut-pinned-list-container ut-content-container")[0];i.style="width: 90%;flex-direction: row;",t.style="display: flex;justify-content: center;padding-top: 50%;margin-left: 10%;margin-right: 10%;"}var r;r=document.createElement("div"),r.className="SniperBotInAppMenu",r.style="",ee?r.style="position: relative;background-color: #282c34;":r.style="user-select: none;border: 1px solid #fff 22;background-color: #282c34;background: linear-gradient(90deg, rgb(34 42 50) 0%, rgb(48 43 39 / 72%) 120%);box-shadow: 0 7px 20px 5px #000 88;overflow: hidden;transition: 0.5s all;margin-left: 10px;max-height: 85%;height: 100%; width: 50%;position: relative;",i.appendChild(r);var s;s=document.createElement("button"),s.className="glass-btn",s.id="snipeBtn",s.innerText="Achat immédiat",s.addEventListener("click",zi),s.addEventListener("touchstart",zi);var l;l=document.createElement("button"),l.className="glass-btn",l.id="bidBtn",l.innerText="Enchères",l.addEventListener("click",Vi),l.addEventListener("touchstart",Vi),r.appendChild(t),t.appendChild(s),ee?document.querySelector(".SniperBotInAppMenu").scrollIntoView(!1):t.appendChild(l)}function zi(){se="Achat immédiat",Os()}function Vi(){se="Enchères",ye=!1,Ds()}async function fn(n,e,t,i,r,s,l,c,o,u,d,m,g,x,C,B,w,f,v,y,h,E,A){var P=document.getElementsByClassName("leaderboard")[0],b=document.getElementsByClassName("leaderboard")[0].children.length,M=document.createElement("main");M.className="leaderboard__profiles";var T;T=document.createElement("article"),T.className="leaderboard__profile",T.style="grid-template-rows: 0.2fr 1fr; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr;";var Y;if(n==""?n="Filtre personnalisé":g==0||(g==1?n="Entraîneurs":g==2?n="Éléments du club":g==3&&(n="Consommables")),Y=document.createElement("span"),Y.className="leaderboard__name",Y.style="grid-row-start: 1; grid-column-start: 1; grid-row-end: 2; grid-column-end: 5;",Y.innerText=n,T.appendChild(Y),se=="Achat immédiat"){var F;F=document.createElement("span"),F.className="leaderboard__value",F.style="grid-row-start: 2; grid-column-start: 5; grid-row-end: 3; grid-column-end: 9; position: relative; left: 50%; padding-left: 1em;";var V;V=document.createElement("span"),V.innerText="Achat immédiat ",V.style="font-size: 13px;color: #4d8585;",V.className="BuyNowClass";var p=document.createElement("div");p.className="input-group",p.style="justify-content: center; align-items: center; flex-direction: row; box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3), 4px 7px 15px rgba(0, 0, 0, 0.2), 9px 15px 25px rgba(0, 0, 0, 0.2); border-radius: 15px;";var N=document.createElement("button");N.id="decrementBuyNow"+b,N.className="decrement-btn",N.style="background: white; width: 2em; height: 2em; border-bottom-left-radius: 15px; border-top-left-radius: 15px; position: relative;",N.textContent="-";var _=document.createElement("input");_.type="number",_.id="inputBuyNow"+b,_.value=u,_.className="input-field",_.style="background: #f0ffff00; height: 2em; border: none; color: white; position: relative; opacity: 1; text-align: center; width: inherit;";var S=document.createElement("button");S.id="incrementBuyNow"+b,S.className="increment-btn",S.style="background: white; width: 2em; height: 2em; border-bottom-right-radius: 15px; border-top-right-radius: 15px; position: relative;",S.textContent="+",p.appendChild(N),p.appendChild(_),p.appendChild(S);var k;k=document.createElement("span"),k.innerText="Recherches ",k.style="font-size: 13px;color: #4d8585;",k.className="searchesClass";var R;R=document.createElement("span"),R.innerText="À chaque recherche, le prix minimal augmente jusqu’à ce plafond. Utilisez de préférence le prix minimal du joueur.",R.className="tooltiptext";var W=document.createElement("div");W.className="input-group",W.style="justify-content: center; align-items: center; flex-direction: row; box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3), 4px 7px 15px rgba(0, 0, 0, 0.2), 9px 15px 25px rgba(0, 0, 0, 0.2); border-radius: 15px;";var ie=document.createElement("button");ie.id="decrementSearches"+b,ie.className="decrement-btn",ie.style="background: white; width: 2em; height: 2em; border-bottom-left-radius: 15px; border-top-left-radius: 15px; position: relative;",ie.textContent="-";var ve=document.createElement("input");ve.type="number",ve.id="inputSearches"+b,ve.value=o,ve.className="input-field",ve.style="background: #f0ffff00; height: 2em; border: none; color: white; position: relative; opacity: 1; text-align: center; width: inherit;";var q=document.createElement("button");q.id="incrementSearches"+b,q.className="increment-btn",q.style="background: white; width: 2em; height: 2em; border-bottom-right-radius: 15px; border-top-right-radius: 15px; position: relative;",q.textContent="+",W.appendChild(ie),W.appendChild(ve),W.appendChild(q);var U;U=document.createElement("span"),U.className="leaderboard__value",U.style="grid-row-start: 2; grid-column-start: 1; grid-row-end: 3; grid-column-end: 5; position: relative; left: 50%; padding-left: 1em;";var re;re=document.createElement("span"),re.innerText="Vendre à ",re.className="SellAt",re.style="font-size: 13px;color: #4d8585;";var X=document.createElement("div");X.className="input-group",X.style="justify-content: center; align-items: center; flex-direction: row; box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3), 4px 7px 15px rgba(0, 0, 0, 0.2), 9px 15px 25px rgba(0, 0, 0, 0.2); border-radius: 15px;";var de=document.createElement("button");de.id="decrementSellAt"+b,de.className="decrement-btn",de.style="background: white; width: 2em; height: 2em; border-bottom-left-radius: 15px; border-top-left-radius: 15px; position: relative;",de.textContent="-";var ge=document.createElement("input");ge.type="number",ge.id="inputSellAt"+b,m==null?ge.value="":ge.value=m,ge.className="input-field",ge.style="background: #f0ffff00; height: 2em; border: none; color: white; position: relative; opacity: 1; text-align: center; width: inherit;";var Fe=document.createElement("button");Fe.id="incrementSellAt"+b,Fe.className="increment-btn",Fe.style="background: white; width: 2em; height: 2em; border-bottom-right-radius: 15px; border-top-right-radius: 15px; position: relative;",Fe.textContent="+",X.appendChild(de),X.appendChild(ge),X.appendChild(Fe);var et;et=document.createElement("span"),et.className="leaderboard__value",et.style="grid-row-start: 2; grid-column-start: 9; grid-row-end: 3; grid-column-end: 13; display: none; padding-left: 1em;",T.appendChild(U),U.appendChild(k),U.appendChild(W),T.appendChild(F),F.appendChild(V),F.appendChild(p),T.appendChild(et),et.appendChild(re),et.appendChild(X),Be?(et.style.display="",F.style.left="0",U.style.left="0"):(et.style.display="none",F.style.left="50%",U.style.left="50%")}else if(se=="Enchères"){var F;F=document.createElement("span"),F.className="leaderboard__value";var V;V=document.createElement("span"),V.innerText="Montant de l’enchère",V.style="font-size: 13px;color: #4d8585;",V.className="BidAmountSpan";var p;p=document.createElement("input"),p.value=d,p.className="form__field BidAmountInput",p.name="BidAmountInput",p.setAttribute("autocomplete","off");var k;k=document.createElement("span"),k.innerText="Plafond de recherche",k.style="font-size: 13px;color: #4d8585;",o<150&&(o="");var W;W=document.createElement("input"),W.value=o,W.className="form__field MaxBidReachableInput",W.setAttribute("autocomplete","off");var U;U=document.createElement("span"),U.className="leaderboard__value",ye?(F.style="display:visible",U.style="display:none",T.style="grid-template-columns: 9fr 8fr 8fr 8fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr"):(F.style="display:none",U.style="display:visible",T.style="grid-template-columns: 9fr 8fr 8fr 8fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr"),T.appendChild(F),F.appendChild(V),F.appendChild(p),T.appendChild(U),U.appendChild(k),U.appendChild(W)}if(P.appendChild(M),M.appendChild(T),g==0){var ut=document.createElement("input");ut.src=e,ut.height="20",ut.width="20",ut.type="image",ut.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 5; grid-row-end: 2; grid-column-end: 5;";var mt=document.createElement("input");mt.src=t,mt.height="20",mt.width="20",mt.type="image",mt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 6; grid-row-end: 2; grid-column-end: 6;";var pt=document.createElement("input");pt.src=i,pt.height="20",pt.width="20",pt.type="image",pt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 7; grid-row-end: 2; grid-column-end: 7;";var ft=document.createElement("input");ft.src=r,ft.height="20",ft.width="20",ft.type="image",ft.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 8; grid-row-end: 2; grid-column-end: 8;";var gt=document.createElement("input");gt.src=s,gt.height="15",gt.width="20",gt.type="image",gt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 9; grid-row-end: 2; grid-column-end: 9;";var yt=document.createElement("input");yt.src=l,yt.height="20",yt.width="20",yt.type="image",yt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 10; grid-row-end: 2; grid-column-end: 10;";var ht=document.createElement("input");ht.src=c,ht.height="20",ht.width="20",ht.type="image",ht.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 11; grid-row-end: 2; grid-column-end: 11;";var vt=document.createElement("input");vt.src=A,vt.height="20",vt.width="20",vt.type="image",vt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 12; grid-row-end: 2; grid-column-end: 12;",T.appendChild(ut),T.appendChild(mt),T.appendChild(pt),T.appendChild(ft),T.appendChild(gt),T.appendChild(yt),T.appendChild(ht),T.appendChild(vt)}else if(g==1||g==2||g==3){if(x){var bt=document.createElement("input");bt.src=x,bt.height="20",bt.width="20",bt.type="image",bt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 5; grid-row-end: 2; grid-column-end: 5;",T.appendChild(bt)}if(C){var xt=document.createElement("input");xt.src=C,xt.height="20",xt.width="20",xt.type="image",xt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 6; grid-row-end: 2; grid-column-end: 6;",T.appendChild(xt)}if(B){var wt=document.createElement("input");wt.src=B,wt.height="20",wt.width="20",wt.type="image",wt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 7; grid-row-end: 2; grid-column-end: 7;",T.appendChild(wt)}if(w){var Ct=document.createElement("input");Ct.src=w,Ct.height="20",Ct.width="20",Ct.type="image",Ct.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 8; grid-row-end: 2; grid-column-end: 8;",T.appendChild(Ct)}if(f){var Et=document.createElement("input");Et.src=f,Et.height="20",Et.width="20",Et.type="image",Et.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 9; grid-row-end: 2; grid-column-end: 9;",T.appendChild(Et)}if(v){var Nt=document.createElement("input");Nt.src=v,Nt.height="20",Nt.width="20",Nt.type="image",Nt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 10; grid-row-end: 2; grid-column-end: 10;",T.appendChild(Nt)}if(y){var Bt=document.createElement("input");Bt.src=y,Bt.height="20",Bt.width="20",Bt.type="image",Bt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 11; grid-row-end: 2; grid-column-end: 11;",T.appendChild(Bt)}if(h){var St=document.createElement("input");St.src=h,St.height="20",St.width="20",St.type="image",St.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 12; grid-row-end: 2; grid-column-end: 12;",T.appendChild(St)}if(E){var Mt=document.createElement("input");Mt.src=E,Mt.height="20",Mt.width="20",Mt.type="image",Mt.style="justify-self: center; block-size: auto; grid-row-start: 1; grid-column-start: 13; grid-row-end: 2; grid-column-end: 13;",T.appendChild(Mt)}}var Te=document.createElement("input");try{let Ee=await new Promise(function(Vt,Yo){window.addEventListener("message",function(yi){yi.data.message==="getChromeExtensionUrlCompleted"&&Vt(yi.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"images/cross.png"},"*")});Te.src=Ee}catch(Ee){console.error(Ee)}Te.height="14",Te.width="14",Te.type="image",Te.className="deletePlayerRow",Te.style="padding-left: 40%; grid-row-start: 1; grid-column-start: 14; grid-row-end: 2; grid-column-end: 14;",Te.id=document.getElementsByClassName("deletePlayerRow").length,Te.addEventListener("click",function(){Gi(Te)}),Te.addEventListener("touchstart",function(){Gi(Te)}),T.appendChild(Te);var Cn=document.getElementById("decrementSearches"+b),qr=document.getElementById("incrementSearches"+b),st=document.getElementById("inputSearches"+b);Cn&&Cn.addEventListener("click",function(){gi(-1)}),Cn&&qr.addEventListener("click",function(){gi(1)}),st&&st.addEventListener("change",function(){Jr()});function gi(Ee){var Vt=parseInt(st.value)+Ee;Vt>=1&&Vt<=100&&(st.value=Vt)}function Jr(){var Ee=parseInt(st.value);isNaN(Ee)||Ee<1?st.value=1:Ee>100&&(st.value=100)}var Xr=document.getElementById("decrementBuyNow"+b),Zr=document.getElementById("incrementBuyNow"+b),En=document.getElementById("inputBuyNow"+b);Zr.addEventListener("click",function(){Fi(En)}),Xr.addEventListener("click",function(){Ui(En)}),En.addEventListener("change",function(){let Ee=yn(Number(this.value));this.value=Ee});var es=document.getElementById("decrementSellAt"+b),ts=document.getElementById("incrementSellAt"+b),Nn=document.getElementById("inputSellAt"+b);ts.addEventListener("click",function(){Fi(Nn)}),es.addEventListener("click",function(){Ui(Nn)}),Nn.addEventListener("change",function(){let Ee=yn(Number(this.value));this.value=Ee}),P.scrollTop=P.scrollHeight}function Gi(n){I.splice(n.id,1),n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);for(var e=document.getElementsByClassName("deletePlayerRow"),t=0;t<e.length;t++){var i=e[t].parentNode,r=t;e[t].id=r;var s=i.querySelector('[id^="decrementSearches"]');s&&(s.id="decrementSearches"+r);var l=i.querySelector('[id^="incrementSearches"]');l&&(l.id="incrementSearches"+r);var c=i.querySelector('[id^="inputSearches"]');c&&(c.id="inputSearches"+r);var o=i.querySelector('[id^="decrementBuyNow"]');o&&(o.id="decrementBuyNow"+r);var u=i.querySelector('[id^="incrementBuyNow"]');u&&(u.id="incrementBuyNow"+r);var d=i.querySelector('[id^="inputBuyNow"]');d&&(d.id="inputBuyNow"+r);var m=i.querySelector('[id^="decrementSellAt"]');m&&(m.id="decrementSellAt"+r);var g=i.querySelector('[id^="incrementSellAt"]');g&&(g.id="incrementSellAt"+r);var x=i.querySelector('[id^="inputSellAt"]');x&&(x.id="inputSellAt"+r)}}function Br(){var n=document.getElementsByClassName("SniperBotInAppMenu")[0],e;e=document.createElement("article"),e.className="SnipingLog",e.style="display: flex;flex-direction: column;max-height: inherit;overflow-y: auto;box-sizing: border-box;width: 100%;",n.appendChild(e)}function ae(n,e,t,i,r){if(n.includes("Recherches terminées"))ssSession("finished");if(document.getElementsByClassName("SnipingLog")[0]!=null){var s=document.getElementsByClassName("SnipingLog")[0],l=document.createElement("div");if(l.className="beforeLogSpan",n.includes("Recherche en cours"))l.innerHTML=`<div class="beforeLogSpan" style="padding: 10px;padding-top: 5px;padding-bottom: 5px;margin: 3px;background: #212121;color: rgb(255, 255, 255);display: grid;justify-content: start;align-items: center;border-radius: 12px;grid-template-columns: auto auto auto auto auto auto;column-gap: 10px;">
            <span style="max-width:3.5em;">${t}</span>
            <span class="fut_icon icon_magnifier" style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;"></span>
            <span>Recherche en cours </span>
            <span style="font-weight: bold;">${i}</span>
            <span class=""> sur le marché</span></div>`;else if(n.includes("Acheté")||n.includes("Enchère placée"))l.innerHTML=`<div class="beforeLogSpan" style="padding: 10px;padding-top: 5px;padding-left: 8px;padding-bottom: 5px;margin: 3px;display: grid;justify-content: start;align-items: center;border-radius: 12px;grid-template-columns: auto auto auto auto auto auto auto auto;column-gap: 10px;@property --x { syntax: 'angle';initial-value: 1deg;inherits: true; };background: #4ec668b8;border: 2px solid #4ec668;color: white;box-shadow: 0 0 7px #4ec668;box-sizing: border-box;">
            <span style="max-width:3.5em;">${t}</span>
            <span style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;width: 15px;height: 15px;">${n.includes("Enchère placée")?"↔":"✅"}</span>
            <span>${n.includes("Enchère placée")?"Enchère placée sur":"Acheté"} </span>
            <span style="font-weight: bold;">${i}</span>
            <span style=""> à </span>
            <span style="font-weight: bold;">${r} </span>
            <img style="justify-content: center;align-items: center;width: 15px;height: 15px;" src="./images/coinIcon.png">`;else if((n.includes("Trouvé")||n.includes("trouvé")))l.innerHTML=`<div class="beforeLogSpan" style=" padding: 10px; padding-top: 5px; padding-bottom: 5px; padding-left: 8px; margin: 3px; background: #212121; display: grid; justify-content: start; align-items: center; border-radius: 12px; grid-template-columns: auto auto auto; column-gap: 10px; border: 2px solid #fbff00; color: white; box-shadow: 0 0 5px #fbff006b; box-sizing: border-box; ">
            <span style="max-width:3.5em;">${t}</span>
            <span style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;width: 15px;height: 15px;">\u{1F440}</span>
            <span style="flex-grow: 1;min-width: 0px;display: block;white-space: normal;">
            <span style="font-weight: normal;">Trouvé</span><span style="color: yellow;"> ${i}</span><span style="font-weight: normal;"> à </span>
            <span style="color: yellow;">${r}</span><span style="font-weight: normal;"> mais un autre utilisateur l’a déjà acheté.</span></span>`;else if(n.includes("arrêté"))l.innerHTML=`<div class="beforeLogSpan" style="padding: 10px; padding-top: 5px; padding-bottom: 5px; padding-left: 8px; margin: 3px; background: #212121; color: rgb(255, 255, 255); display: grid; justify-content: start; align-items: center; border-radius: 12px; grid-template-columns: auto auto auto; column-gap: 10px; border: 2px solid #ff1010; color: #db1818e6; box-sizing: border-box;">
            <span style="max-width:3.5em;">${t}</span>
            <span style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;width: 15px;height: 15px;">\u26D4</span>
            <span>Assistant arrêté manuellement</span>`;else if(n.includes("terminées")||n.includes("Nombre"))l.innerHTML=`<div class="beforeLogSpan" style="padding: 10px;padding-top: 5px;padding-bottom: 5px;padding-left: 8px;margin: 3px;background: #212121;display: grid;justify-content: start;align-items: center;border-radius: 12px;grid-template-columns: auto auto auto;column-gap: 10px;border: 2px solid #ff00f7;color: white;box-shadow: 0 0 5px #ff00f7;box-sizing: border-box;">
            <span style="max-width:3.5em;">${t}</span>
            <span style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;width: 15px;height: 15px;">\u{1F3C1}</span>
            <span>${n}</span>`;else if(n.includes("Request")||n.includes("Unassigned")||n.includes("Unauthorized")||n.includes("reached")||n.includes("already")||n.includes("Skipping")||n.includes("criteria"))l.innerHTML=`<div class="beforeLogSpan" style=" padding: 10px; padding-top: 5px; padding-bottom: 5px; padding-left: 8px; margin: 3px; background: #212121; color: rgb(255, 255, 255); display: grid; justify-content: start; align-items: center; border-radius: 12px; grid-template-columns: auto auto auto; column-gap: 10px; border: 2px solid #ff1010; color: #db1818e6; box-sizing: border-box;">
            <span style="max-width:3.5em;">${t}</span>
            <span style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 10px;width: 15px;height: 15px;">\u26A0\uFE0F</span>
            <span>${n}</span>`;else{var c;if(c=document.createElement("span"),c.className="logSpan",c.innerText=n,c.style=`color: ${e};`,n.includes("Acheté")){var o;o=document.createElement("img"),o.src="./images/coinIcon.png",o.style="width: 20px;height: 20px;",c.appendChild(o)}s.appendChild(c)}s.appendChild(l),s.scrollTop=s.scrollHeight}}function oi(n){ssSession("pause",n);var e=document.getElementsByClassName("SnipingLog")[0],t=new Date;O=t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();var i=document.createElement("div");i.className="beforeLogSpan",i.innerHTML=`
    <div class="beforeLogSpan" style="padding: 10px;padding-top: 5px;padding-bottom: 5px;padding-left: 8px;margin: 3px;background: #212121;display: grid;justify-content: start;align-items: center;border-radius: 12px;grid-template-columns: auto auto auto;column-gap: 10px;border: 2px solid #00d9ff;color: white;box-shadow: 0 0 5px #00d9ff;box-sizing: border-box;"><span style="max-width: 3.5em;">${O}</span>
    <span style="background: #3b3b3b73;color: rgb(255 255 255);display: flex;justify-content: center;align-items: center;border-radius: 12px;padding: 7px;">\u23F3</span>
    <span class="logSpan" style="color: #00d9ff;">En attente de <span class="timerCountdown"></span></span></div>`,e.appendChild(i);try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}var r=document.getElementsByClassName("timerCountdown"),s=r[r.length-1];Je=new _l(s,n/1e3),Je.init(),Je.start()}function _l(n,e){var t={};return t.elem=n,t.seconds=e,t.totalTime=e*100,t.usedTime=0,t.startTime=+new Date,t.timer=null,t.timeStopped=null,t.count=function(){if(t.timeStopped!==null)clearInterval(t.timer),t.elem.innerHTML=t.timeStopped;else{t.usedTime=Math.floor((+new Date-t.startTime)/10);var i=t.totalTime-t.usedTime;if(i<=0)t.elem.innerHTML="00:00",clearInterval(t.timer);else{var r=Math.floor(i/6e3),s=Math.floor((i-r*60*100)/100),l=i-Math.floor(i/100)*100;t.elem.innerHTML=t.fillZero(r)+":"+t.fillZero(s)}}},t.init=function(){t.timer&&(clearInterval(t.timer),t.elem.innerHTML="00:00",t.totalTime=e*100,t.usedTime=0,t.startTime=+new Date,t.timer=null),t.timeStopped=null},t.start=function(){t.timer||(t.timer=setInterval(t.count,1))},t.stop=function(){t.timer&&(clearInterval(t.timer),t.timer=null,t.timeStopped=t.elem.innerHTML)},t.getTimeStopped=function(){return t.timeStopped},t.fillZero=function(i){return i<10?"0"+i:i},t}function Tl(){var n=document.getElementsByClassName("ut-pinned-list-container ut-content-container")[0],e=document.createElement("div");e.className="blurredBgSaveDialog",e.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;right: 1em;";var t=document.createElement("div");t.className="ut-name-squad",t.style="width: 40em;position: absolute;z-index: 100;background: #151616;text-align: center;";var i=document.createElement("header"),r=document.createElement("h1");r.innerText="Nom du filtre";var s=document.createElement("div");s.className="bodySection";var l=document.createElement("input");l.type="text",l.className="ut-text-input-control round",l.maxlength="15";var c=document.createElement("span");c.className="ut-name-squad--hint",c.innerText="15 caractères maximum";var o=document.createElement("div");o.className="ut-button-group";var u=document.createElement("button");u.onclick=async function(){var x=[];try{x=(await new Promise(function(B,w){window.addEventListener("message",function(f){f.data.message==="getCompleted"&&B(f.data.result)}),window.postMessage({message:"get",keys:["FilterSaved"]},"*")})).FilterSaved}catch(C){console.error(C)}window.setTimeout(function(){x==null&&(x=[]);var C=document.getElementsByClassName("ut-text-input-control round")[0].value;x.push({name:C,value:I}),window.postMessage({message:"set",objPassed:ne(["FilterSaved"],[x])},"*"),document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()},100)};var d=document.createElement("span");d.className="btn-text",d.innerText="Enregistrer";var m=document.createElement("button");m.onclick=function(){document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()},m.className="negative";var g=document.createElement("span");g.className="btn-text",g.innerText="Annuler",n.appendChild(e),n.appendChild(t),t.appendChild(i),i.appendChild(r),t.appendChild(s),s.appendChild(l),s.appendChild(c),t.appendChild(o),o.appendChild(u),u.appendChild(d),o.appendChild(m),m.appendChild(g)}function ci(){var n=document.getElementsByClassName("ut-navigation-container-view")[0],e=document.getElementsByClassName("ut-tab-bar-view game-navigation")[0],t=document.createElement("div");t.className="blurredBgSaveDialog",t.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index: 10;right: 1em;";var i=document.createElement("div");i.className="ut-name-squad",i.style="width: 53em;position: relative;z-index: 100;font-family: UltimateTeam,sans-serif;margin: 0px auto;background: #151616;text-align: center;";var r=document.createElement("header"),s=document.createElement("h1");s.innerText="Filtres enregistrés";var l=document.createElement("div");l.className="bodySection",l.style="padding: 0;";var c=document.createElement("div");c.className="filtersContentDialog",c.style="display: grid;grid-template-columns: 22em 2em;align-items: center;border-bottom: solid;border-color: #556c95;border-width: thin;";var o=document.createElement("div");o.className="ut-button-group";var u=document.createElement("button");u.onclick=function(){document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()},u.className="negative";var d=document.createElement("span");d.className="btn-text",d.innerText="Annuler",e.appendChild(t),n.appendChild(i),i.appendChild(r),r.appendChild(s),i.appendChild(l),l.appendChild(c),i.appendChild(o),o.appendChild(u),u.appendChild(d)}async function Sr(n,e){var t=document.createElement("button");t.className="btnsquadName",t.style="width: 100%;height: 40px;color: #fff600;text-transform: uppercase;padding-left: 9%;",t.innerText=n,t.onclick=async function(){document.getElementsByClassName("blurredBgSaveDialog")[0]&&document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0]&&document.getElementsByClassName("ut-name-squad")[0].remove();for(var r=document.getElementsByClassName("leaderboard__profiles"),s=r.length-1;s>=0;s--)r[s].remove();for(var l=[],c=!1,o=0;o<e.length;o++)if(l=[],e[o][13]!=null)if(c=!1,e[o][13]==0)L(document.getElementsByClassName("ea-filter-bar-item-view")[0]),L(document.getElementsByClassName("btn-standard")[8]),l.push(e[o][25][0]),l.push(e[o][25][1]),l.push(e[o][25][2]),l.push(e[o][25][3]),l.push(e[o][25][4]),l.push(e[o][25][5]),l.push(e[o][25][6]),l.push(e[o][25][7]),l.push(e[o][25][8]),L(document.getElementsByClassName("ut-content")[0]),e[o][9]>50&&(e[o][9]=3),fn(e[o][0],l[0],l[1],l[2],l[3],l[4],l[5],l[6],e[o][9],e[o][10],e[o][11],e[o][12],0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,l[7]),await Ce(20);else{L(document.getElementsByClassName("ea-filter-bar-item-view")[e[o][13]]),L(document.getElementsByClassName("btn-standard")[8]),await Ce(200);for(var u=14;u<=22;u++){var d=u-13;if(e[o][u]&&document.getElementsByClassName("inline-container")[d]&&document.getElementsByClassName("inline-container")[d].innerText.toUpperCase()==e[o][u].toUpperCase())l.push(document.getElementsByClassName("ut-search-filter-control--row-image")[d-1].src);else{L(document.getElementsByClassName("inline-container")[d]),await Ce(50);for(var s=0;s<document.getElementsByClassName("with-icon").length&&document.getElementsByClassName("with-icon")[s]!=null;s++)if(document.getElementsByClassName("with-icon")[s].innerText.toUpperCase()==e[o][u].toUpperCase()){l.push(document.getElementsByClassName("with-icon")[s].style.backgroundImage.slice(4,-1).replace(/"/g,"")),L(document.getElementsByClassName("with-icon")[s]),await Ce(20);break}}}L(document.getElementsByClassName("ut-content")[0]),fn(void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,e[o][9],e[o][10],e[o][11],e[o][12],e[o][13],l[0],l[1],l[2],l[3],l[4],l[5],l[6],l[7],l[8],void 0),await Ce(20)}else te("The new update has improved the filters by adding the possibility of sniping players with playstyle and sniping consumables. Old filters will not work and will need to be recreated.","red","#fff",document.body),c=!0;if(!c)if(I.length==0)I=e;else{var m=I.concat(e);I=m}};var i=document.createElement("input");try{let r=await new Promise(function(s,l){window.addEventListener("message",function(c){c.data.message==="getChromeExtensionUrlCompleted"&&s(c.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"images/cross.png"},"*")});i.src=r}catch(r){console.error(r)}i.height="18",i.width="18",i.type="image",i.className="deleteFilterRowInLoad",i.id=document.getElementsByClassName("deleteFilterRowInLoad").length,i.onclick=async function(){var r=[];try{r=(await new Promise(function(l,c){window.addEventListener("message",function(o){o.data.message==="getCompleted"&&l(o.data.result)}),window.postMessage({message:"get",keys:["FilterSaved"]},"*")})).FilterSaved}catch(s){console.error(s)}window.setTimeout(function(){r.splice(i.id,1),i.previousElementSibling.remove(),i.remove();for(var s=document.getElementsByClassName("deleteFilterRowInLoad"),l=0;l<s.length;l++)s[l].id=l;window.postMessage({message:"set",objPassed:ne(["FilterSaved"],[r])},"*")},100)},document.getElementsByClassName("filtersContentDialog")[0].appendChild(t),document.getElementsByClassName("filtersContentDialog")[0].appendChild(i)}async function Pl(n){if(n<I.length)if(Ma=I[n][24],L(document.getElementsByClassName("ea-filter-bar-item-view")[I[n][13]]),ps=I[n][13],I[n][13]==0){var i,r=document.getElementsByClassName("inline-container")[1];if(L(r),ee){var e=document.querySelectorAll(".inline-list-select select")[0];if(e&&!e.disabled){for(var t=0;t<e.options.length;t++)if(e.options[t].innerText.toUpperCase()===I[n][2].toUpperCase()){e.value=e.options[t].value;break}e.dispatchEvent(new Event("change"))}}else for(i=0;1e3>=i&&document.getElementsByClassName("with-icon")[i]!=null;i++)document.getElementsByClassName("with-icon")[i].innerText.toUpperCase()==I[n][2].toUpperCase()&&L(document.getElementsByClassName("with-icon")[i]);var i,r=document.getElementsByClassName("inline-container")[2];if(L(r),ee){var e=document.querySelectorAll(".inline-list-select select")[1];if(e&&!e.disabled){for(var t=0;t<e.options.length;t++)if(e.options[t].innerText.toUpperCase()===I[n][3].toUpperCase()){e.value=e.options[t].value;break}e.dispatchEvent(new Event("change"))}}else for(i=0;1e3>=i&&document.getElementsByClassName("with-icon")[i]!=null;i++)document.getElementsByClassName("with-icon")[i].innerText.toUpperCase()==I[n][3].toUpperCase()&&L(document.getElementsByClassName("with-icon")[i]);var i,r=document.getElementsByClassName("inline-container")[3];if(L(r),ee){var e=document.querySelectorAll(".inline-list-select select")[2];if(e&&!e.disabled){for(var t=0;t<e.options.length;t++)if(e.options[t].innerText.toUpperCase()===I[n][4].toUpperCase()){e.value=e.options[t].value;break}e.dispatchEvent(new Event("change"))}}else for(i=0;1e3>=i&&document.getElementsByClassName("with-icon")[i]!=null;i++)document.getElementsByClassName("with-icon")[i].innerText.toUpperCase()==I[n][4].toUpperCase()&&L(document.getElementsByClassName("with-icon")[i]);var i,r=document.getElementsByClassName("inline-container")[4];if(L(r),ee){var e=document.querySelectorAll(".inline-list-select select")[3];if(e&&!e.disabled){for(var t=0;t<e.options.length;t++)if(e.options[t].innerText.toUpperCase()===I[n][5].toUpperCase()){e.value=e.options[t].value;break}e.dispatchEvent(new Event("change"))}}else for(i=0;1e3>=i&&document.getElementsByClassName("with-icon")[i]!=null;i++)document.getElementsByClassName("with-icon")[i].innerText.toUpperCase()==I[n][5].toUpperCase()&&L(document.getElementsByClassName("with-icon")[i]);var i,r=document.getElementsByClassName("inline-container")[5];if(L(r),ee){var e=document.querySelectorAll(".inline-list-select select")[4];if(e&&!e.disabled){for(var t=0;t<e.options.length;t++)if(e.options[t].innerText.toUpperCase()===I[n][6].toUpperCase()){e.value=e.options[t].value;break}e.dispatchEvent(new Event("change"))}}else for(i=0;1e3>=i&&document.getElementsByClassName("with-icon")[i]!=null;i++)document.getElementsByClassName("with-icon")[i].innerText.toUpperCase()==I[n][6].toUpperCase()&&L(document.getElementsByClassName("with-icon")[i]);var i,r=document.getElementsByClassName("inline-container")[6];if(L(r),ee){var e=document.querySelectorAll(".inline-list-select select")[5];if(e&&!e.disabled){for(var t=0;t<e.options.length;t++)if(e.options[t].innerText.toUpperCase()===I[n][7].toUpperCase()){e.value=e.options[t].value;break}e.dispatchEvent(new Event("change"))}}else for(i=0;1e3>=i&&document.getElementsByClassName("with-icon")[i]!=null;i++)document.getElementsByClassName("with-icon")[i].innerText.toUpperCase()==I[n][7].toUpperCase()&&L(document.getElementsByClassName("with-icon")[i]);window.setTimeout(function(){var c,o=document.getElementsByClassName("inline-container")[7];if(L(o),ee){var s=document.querySelectorAll(".inline-list-select select")[6];if(s&&!s.disabled){for(var l=0;l<s.options.length;l++)if(s.options[l].innerText.toUpperCase()===I[n][8].toUpperCase()){s.value=s.options[l].value;break}s.dispatchEvent(new Event("change"))}}else for(c=0;1e3>=c&&document.getElementsByClassName("with-icon")[c]!=null;c++)document.getElementsByClassName("with-icon")[c].innerText.toUpperCase()==I[n][8].toUpperCase()&&L(o=document.getElementsByClassName("with-icon")[c]);if(I[n][0]!=null&&I[n][0]!=""){L(document.getElementsByClassName("ut-content")[0]);var c=document.getElementsByClassName("ut-text-input-control")[0];c.value=I[n][0],c.dispatchEvent(new Event("input")),window.setTimeout(function(){try{for(var d=0;1e3>=d;d++)if(document.getElementsByClassName("btn-text")[d].innerText.toUpperCase()==I[n][0].toUpperCase()&&parseInt(document.getElementsByClassName("btn-subtext")[d].innerText)==parseInt(I[n][1])){L(document.getElementsByClassName("btn-text")[d]);break}}catch{J(),alert("Something went wrong. Please start again. I hope to fix this soon ;) Cannot find the player in Player Name")}},500)}var c,o=document.getElementsByClassName("inline-container")[8];if(L(o),ee){var s=document.querySelectorAll(".inline-list-select select")[7];if(s&&!s.disabled){for(var l=0;l<s.options.length;l++)if(s.options[l].innerText.toUpperCase()===I[n][23].toUpperCase()){s.value=s.options[l].value;break}s.dispatchEvent(new Event("change"))}}else for(c=0;1e3>=c&&document.getElementsByClassName("with-icon")[c]!=null;c++)document.getElementsByClassName("with-icon")[c].innerText.toUpperCase()==I[n][23].toUpperCase()&&L(document.getElementsByClassName("with-icon")[c]);se=="Achat immédiat"?window.setTimeout(function(){L(document.getElementsByClassName("ut-number-input-control")[5]),document.getElementsByClassName("ut-number-input-control")[5].value=I[n][10],document.getElementsByClassName("ut-number-input-control")[5].dispatchEvent(new Event("input")),L(document.getElementsByClassName("btn-standard increment-value")[3]),L(document.getElementsByClassName("btn-standard decrement-value")[3])},500):se=="Enchères"&&window.setTimeout(function(){ye||(L(document.getElementsByClassName("ut-number-input-control")[3]),document.getElementsByClassName("ut-number-input-control")[3].value=I[n][9],document.getElementsByClassName("ut-number-input-control")[3].dispatchEvent(new Event("input")),L(document.getElementsByClassName("btn-standard increment-value")[1]),L(document.getElementsByClassName("btn-standard decrement-value")[1]))},500)},300)}else await kl(n);else Ze=1}async function kl(n){try{var e=document.getElementsByClassName("inline-container");for(let r=0;r<e.length;r++){let s=e[r];if(r>0&&!s.parentElement.classList.contains("disabled")||ee&&r>=0&&!s.parentElement.classList.contains("disabled")){await new Promise(c=>{L(s),setTimeout(c,100)});let l=14+r-1;if(ee){var t=document.querySelectorAll(".inline-list-select select")[r];if(t&&!t.disabled){for(var i=0;i<t.options.length;i++)if(t.options[i].innerText.toUpperCase()===I[n][l+1].toUpperCase()){t.value=t.options[i].value;break}t.dispatchEvent(new Event("change"))}}else for(let c=0;c<1e3&&document.getElementsByClassName("with-icon")[c]!==void 0;c++)document.getElementsByClassName("with-icon")[c].innerText.toUpperCase()===I[n][l].toUpperCase()&&await new Promise(o=>{L(document.getElementsByClassName("with-icon")[c]),setTimeout(o,100)})}}}finally{se=="Achat immédiat"?window.setTimeout(function(){L(document.getElementsByClassName("ut-number-input-control")[5]),document.getElementsByClassName("ut-number-input-control")[5].value=I[n][10],document.getElementsByClassName("ut-number-input-control")[5].dispatchEvent(new Event("input")),L(document.getElementsByClassName("btn-standard increment-value")[3]),L(document.getElementsByClassName("btn-standard decrement-value")[3])},500):se=="Enchères"&&window.setTimeout(function(){ye||(L(document.getElementsByClassName("ut-number-input-control")[3]),document.getElementsByClassName("ut-number-input-control")[3].value=I[n][9],document.getElementsByClassName("ut-number-input-control")[3].dispatchEvent(new Event("input")),L(document.getElementsByClassName("btn-standard increment-value")[1]),L(document.getElementsByClassName("btn-standard decrement-value")[1]))},500)}}function Jn(){if(pe){je=!1,pe=!1,We=!0,J();return}else{var n=lt*1e3;if(os=lt,ls=_t,cs=Be,Q=0,Re<_t)Re===0?(je=!0,We=!0,$n=!0,Ye=0,Ze=0,L(document.getElementsByClassName("btn-standard")[8]),It(Ye,!0)):(oi(n),je=!0,We=!0,$n=!0,Ye=0,Ze=0,mr=setTimeout(function(){It(Ye,!0)},n));else{var e=new Date;O=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds(),ae(O+" — Recherches terminées","#ff00f7",O),Re=0,je=!1,pe=!1,We=!0}}}function Mr(){if(pe){je=!1,pe=!1,We=!0;return}else{je=!0,$n=!1;var n=Kt*1e3;if(Re<$t)Re===0?(Ye=0,Ze=0,hi=0,bn(Ye)):(oi(n),setTimeout(function(){Ye=0,Ze=0,hi=0,bn(Ye)},n)),Re++;else{Re=0;var e=new Date;O=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds(),ae(O+" — Recherches terminées","#ff00f7",O)}}}function _r(){if(document.getElementsByClassName("leaderboard__profiles").length>0){var n=document.getElementsByClassName("searchesClass");Array.from(I).forEach((e,t)=>{var i=n[t].parentElement.children[1].children[1].id.replace(/[^0-9]/g,"");e[9]=document.getElementById("inputSearches"+i).value,e[10]=document.getElementById("inputBuyNow"+i).value,e[12]=document.getElementById("inputSellAt"+i).value})}}function Tr(){if(document.getElementsByClassName("form__field BidAmountInput").length>0&&document.getElementsByClassName("form__field MaxBidReachableInput").length>0){var n=document.getElementsByClassName("form__field BidAmountInput"),e=document.getElementsByClassName("form__field MaxBidReachableInput");Array.from(I).forEach((t,i)=>{t[9]=e[i].value,t[11]=n[i].value})}}async function It(n,e){if(K=n,document.getElementsByClassName("title")[0]&&document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&!pe)if(ss=I,e?(Qt=0,Q=0,Pt=1800):Pt=300,it==0?Qe=1500:it==1?Qe=1e3:it==2?Qe=600:it==3?Qe=300:Qe=1e3,n>=I.length&&(ssSession("round"),Ze=1,Re++),Ze===0){if(I[n][0]==null||I[n][0]=="")I[n][13]==0?t="Filtre personnalisé":I[n][13]==1?t="Entraîneurs":I[n][13]==2?t="Éléments du club":I[n][13]==3&&(t="Consommables");else var t=I[n][0];Pr(Pt),window.setTimeout(async function(){if(pe){J();return}else{var r=new Date;O=r.getHours()+":"+r.getMinutes()+":"+r.getSeconds(),ssTrack("search",{player:t,source:"sniping"}),ae(O+" Recherche en cours "+t+" sur le marché","#ffffff",O,t),Qs()}},Pt)}else{Q=0;var i=new Date;O=i.getHours()+":"+i.getMinutes()+":"+i.getSeconds(),Jn()}else{J();return}}function Pr(n){ssSession("delay",n);aa||(aa=document.querySelectorAll(".round-time-bar")),aa.forEach(e=>{e.style=`--duration: ${n/1e3};`,e.classList.remove("round-time-bar"),e.offsetWidth,e.classList.add("round-time-bar")})}function kr(){var n=document.getElementsByClassName("SniperBotInAppMenu")[0],e;e=document.createElement("div"),e.className="wrapperDivOptions";var t;if(t=document.createElement("div"),t.className="itemDiv",e.appendChild(t),n.appendChild(e),se==="Achat immédiat"){var i;i=document.createElement("button"),i.innerText="Démarrer les achats",i.className="StartBotMothod2Class",i.style="height: 7%;cursor: pointer;font-family: UltimateTeam, sans-serif;text-align-last: center;width: 100%;position: absolute;bottom: 0px;border-radius: 8px;background-image: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);color: white;font-size: large;transition: all 0.3s ease-in-out;",i.addEventListener("click",Hi),i.addEventListener("touchstart",Hi),n.appendChild(i)}else if(se==="Enchères"){var r;r=document.createElement("button"),r.innerText="Démarrer les enchères",r.className="StartBotMothod2Class",r.style="background-color: rgb(122 207 255);height: 7%;border-style: solid;border-color: rgb(122 207 255);cursor: pointer;font-family: UltimateTeam, sans-serif;text-align-last: center;width: 100%;position: absolute;bottom: 0px;",r.addEventListener("click",ji),r.addEventListener("touchstart",ji),n.appendChild(r)}}function ji(){if(pe=!1,Re=0,ye){for(var n=0;n<I.length;n++)if(I[n][11]==""||parseInt(I[n][11])<150){alert("Renseignez les montants des enchères dans la liste des joueurs. Chaque montant doit être supérieur à 150 crédits et inférieur au plafond de recherche."),J();break}}pe?(J(),qe()):(di(),ga(),Mr())}async function Hi(){if(pe=!1,rt=!1,Re=0,Be){for(var n=0;n<I.length;n++)if(I[n][12]==""||parseInt(I[n][12])<150){te("Renseignez tous les prix de revente dans la liste des joueurs. Chaque prix doit être supérieur à 150 crédits.","red","#fff",document.body),J();break}}for(var n=0;n<I.length;n++)if(I[n][10]==""||parseInt(I[n][10])<150){te("Renseignez tous les prix d’achat immédiat dans la liste des joueurs avant de continuer.","red","#fff",document.body),J();break}pe?(J(),qe()):(di(),ga(),Un=0,I.length>0?(D==null&&await fe(String(services.User.currentUserId)),D!="Active"?(Mi=await Il(),Mi?Jn():(J(),Ie("Daily snipes limit reached \u{1F3AF}","You reached the limit of players that can be bought for today without using SnippingSoul Premium."))):Jn()):(te("Ajoutez des joueurs à la liste pour lancer les achats","red","#fff",document.body),J(),qe()))}async function Il(){try{let e=await new Promise(function(t,i){window.addEventListener("message",function(r){r.data.message==="getCompleted"&&t(r.data.result)}),window.postMessage({message:"get",keys:["snipedOnDate","limitRemainingPlayersToBuyToday"]},"*")});if(e.limitRemainingPlayersToBuyToday!=null&&e.snipedOnDate!=null)isResetPlayersLimit=await Yl(e.snipedOnDate),isResetPlayersLimit||(ke=e.limitRemainingPlayersToBuyToday);else{var n=new Date().toISOString().split("T")[0];ke=or,window.postMessage({message:"set",objPassed:ne(["snipedOnDate","limitRemainingPlayersToBuyToday"],[ke,n])},"*")}return!(ke<=0)}catch(e){console.error(e)}}function di(){ssSession("start");buttonStop=document.createElement("button"),buttonStop.className="StopSnipingBtn",ee?buttonStop.style="width: 70px;height: 70px;background-color: red;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-family: UltimateTeam, sans-serif;font-size: 16px;color: black;z-index: 1000;":buttonStop.style="background-color: red;font-size: 16px;cursor: pointer;right: 35em;position: fixed;height: 2.8rem;line-height: 2.8rem;box-sizing: border-box;border-radius: 1.5rem;display: block;font-family: UltimateTeam,sans-serif;font-size: 1.3em;overflow: hidden;padding: 0 1rem;text-align: center;text-overflow: ellipsis;white-space: nowrap;",buttonStop.innerText="Arrêter les achats",buttonStop.addEventListener("click",gn),buttonStop.addEventListener("touchstart",gn),document.getElementsByClassName("view-navbar-currency")[0].prepend(buttonStop)}function gn(){J();var n=new Date;O=n.getHours()+":"+n.getMinutes()+":"+n.getSeconds();var e=O+" — Assistant arrêté manuellement";ae(e,"red",O);var t=document.getElementsByClassName("timerCountdown");if(t){var i=t[t.length-1];i&&Je&&(Je.stop(),i.innerHTML=Je.getTimeStopped())}document.getElementsByClassName("StopSnipingBtn")[0]&&Array.from(document.getElementsByClassName("StopSnipingBtn")).forEach(r=>{r.remove()})}function J(){ssSession("stop");pe=!0,je=!1,We=!0,Ye=0,clearTimeout(mr),document.getElementsByClassName("StopSnipingBtn")[0]&&Array.from(document.getElementsByClassName("StopSnipingBtn")).forEach(n=>{n.remove()})}function Ir(){if(se=="Enchères"?Tr():se=="Achat immédiat"&&_r(),document.getElementsByClassName("wrapperDivOptions")!=null||document.getElementsByClassName("leaderboard")!=null||document.getElementsByClassName("StartBotMothod2Class")!=null){document.getElementsByClassName("wrapperDivOptions")[0].removeAttribute("hidden"),document.getElementsByClassName("leaderboard")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("StartBotMothod2Class")[0].removeAttribute("hidden"),document.getElementsByClassName("wrapperDivBtnSaveLoad")[0].style="display: flex;position: absolute;bottom: 0px;height: 7%; width: 100%; visibility:hidden;",document.getElementsByClassName("SnipingLog")[0].style="display: flex;flex-direction: column;max-height: inherit;overflow-y: auto;padding-bottom: 7%;box-sizing: border-box;width: 100%;visibility:hidden";var n=document.querySelectorAll(".tabs_wrap ul li");n.forEach(t=>{t.getAttribute("data-tabs")==="Options d’achat immédiat"?(t.classList.add("active"),t.style.width="100%",t.style.background="#212121"):t.classList.remove("active")});var e=document.querySelectorAll(".range__slider, .setting");e.forEach(t=>{t.style.backgroundColor="#212121"})}je&&(pe||gn())}function qe(){if(document.getElementsByClassName("wrapperDivOptions")!=null||document.getElementsByClassName("leaderboard")!=null||document.getElementsByClassName("StartBotMothod2Class")!=null||document.getElementsByClassName("SnipingLog")!=null){document.getElementsByClassName("wrapperDivOptions")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("SnipingLog")[0].style="display: flex;flex-direction: column;max-height: inherit;overflow-y: auto;padding-bottom: 7%;box-sizing: border-box;width: 100%;visibility:hidden",document.getElementsByClassName("leaderboard")[0].removeAttribute("hidden"),document.getElementsByClassName("StartBotMothod2Class")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("wrapperDivBtnSaveLoad")[0].style="display: flex;position: absolute;bottom: 0px;height: 7%; width: 100%; visibility:visible;";var n=document.querySelectorAll(".tabs_wrap ul li");n.forEach(e=>{e.getAttribute("data-tabs")==="Liste de joueurs"?(e.classList.add("active"),e.style.width="100%",e.style.background="#212121"):e.classList.remove("active")})}je&&(pe||gn())}function ga(){if(document.getElementsByClassName("wrapperDivOptions")!=null||document.getElementsByClassName("leaderboard")!=null||document.getElementsByClassName("StartBotMothod2Class")!=null||document.getElementsByClassName("SnipingLog")!=null){document.getElementsByClassName("wrapperDivOptions")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("SnipingLog")[0].style="display: flex;flex-direction: column;max-height: inherit;overflow-y: auto;box-sizing: border-box;width: 100%;visibility:visible",document.getElementsByClassName("leaderboard")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("StartBotMothod2Class")[0].setAttribute("hidden","hidden"),document.getElementsByClassName("wrapperDivBtnSaveLoad")[0].style="display: flex;position: absolute;bottom: 0px;height: 7%; width: 100%; visibility:hidden;";var n=document.querySelectorAll(".tabs_wrap ul li");if(n.forEach(t=>{t.getAttribute("data-tabs")==="Journal"?(t.classList.add("active"),t.style.width="100%",t.style.background="#212121"):t.classList.remove("active")}),!aa){var e=document.createElement("div");e.className="round-time-bar",e.style="--duration: 2;",e.setAttribute("data-style","smooth"),e.innerHTML="<div></div>",document.getElementsByClassName("SnipingLog")[0].parentNode.insertBefore(e,document.getElementsByClassName("SnipingLog")[0]),aa=document.querySelectorAll(".round-time-bar")}}}function Ce(n){return new Promise(e=>{window.setTimeout(()=>{e()},n)})}async function fe(){D="Active";H=Infinity;at=!0;}async function Ll(){await fe();}async function Lr(){await fe();}function yn(n){return n<=1e3?Math.round(n/50)*50:n<=1e4?Math.round(n/100)*100:n<=5e4?Math.round(n/250)*250:n<=1e5?Math.round(n/500)*500:Math.round(n/1e3)*1e3}function Al(n){let e=parseFloat(n);return n.endsWith("K")||n.endsWith("k")?e*=1e3:(n.endsWith("M")||n.endsWith("m"))&&(e*=1e6),Math.round(e)}async function Ol(){ci(),document.getElementsByClassName("bodySection")[0].innerHTML=`<style>.spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #fff700;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }
    
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .progress-container {
    position: relative;
    width: 80%;
    box-shadow: 2px 2px 20px rgb(234 248 13 / 62%);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  .progress-bar {
       flex-grow: 1;
    height: 15px;
    background: linear-gradient(-45deg, #aecf29 0%, #fff700 100%);
    position: relative;
  }
  .label1 {
    position: absolute;
    top: -0.5em;
    transform: translateY(-50%);
    text-align: center;
    color: #fff;
    width: 33.333%;
  }
  .low-label {
    left: 0;
  }
  .medium-label {
    left: 33.333%;
  }
  .high-label {
    right: 0;
  }</style>
<div style="text-align: -webkit-center;margin: 2em;"> 
<div id="loadingSpinner" class="spinner"></div></div>
<div style="text-align: -webkit-center;margin: 2em;"> 
<span class="prePlayerNameAdjusting">  </span> <span class="playerNameAdjusting"> </span></div>
<div> 
<div style="text-align: center;background: #101010;"> Nombre de joueurs sur le marché </div>
<div class="progress-container">
  <div class="progress-bar" id="low"></div>
  </div>
  <div style="position: relative;">
  <div class="label1 low-label">Faible</div>
  <div class="label1 medium-label">Moyenne</div>
  <div class="label1 high-label">Élevée</div>
  </div>
</div>`,document.getElementsByClassName("progress-container")[0].style.width=qt+"%",qt<40?(document.getElementsByClassName("progress-container")[0].style.boxShadow="2px 2px 20px rgb(0 255 90 / 62%);",document.getElementsByClassName("progress-bar")[0].style.background="linear-gradient(-45deg, #29cf4d 0%, #00ff80 100%);"):qt<65?(document.getElementsByClassName("progress-container")[0].style.boxShadow="2px 2px 20px rgb(234 248 13 / 62%);",document.getElementsByClassName("progress-bar")[0].style.background="linear-gradient(-45deg, #aecf29 0%, #fff700 100%);"):(document.getElementsByClassName("progress-container")[0].style.boxShadow="2px 2px 20px rgb(255 0 0 / 62%);",document.getElementsByClassName("progress-bar")[0].style.background="linear-gradient(-45deg, #cf2929 0%, #ff0000 100%);"),document.querySelector(".ut-name-squad header h1").innerText="Ajout de joueurs à la liste SnippingSoul",document.getElementsByClassName("ut-button-group")[1].remove()}function Dl(n){document.getElementsByClassName("prePlayerNameAdjusting")[0].innerText="Ajout à la liste SnippingSoul : ",document.getElementsByClassName("playerNameAdjusting")[0].innerText=n}async function Rl(){var n="https://www.futbin.com/market";try{let r=await new Promise(function(s,l){window.addEventListener("message",async function(c){c.data.message==="fetchCompleted"&&s(c.data.res)}),window.postMessage({message:"fetchPls",urlToFetch:encodeURIComponent(n)},"*")});var e=new DOMParser,t=e.parseFromString(r,"text/html");if(Z=="pc")var i=t.getElementsByClassName("progress-bar")[1];else var i=t.getElementsByClassName("progress-bar")[0];return i&&(qt=parseInt(i.innerText).toString()),!0}catch(r){console.error(r)}}async function Fl(n){var e="https://www.futbin.com/players?page=1",t="&eUnt=1",i="&player_rating="+n+"-"+n;if(Z=="pc")var r="&pc_price=200-15000000",s="&sort=pc_price&order=asc";else var r="&ps_price=200-15000000",s="&sort=ps_price&order=asc";var l=e+t+r+i+s;$e=[],await zl(l)}async function Ul(){var n=document.getElementsByClassName("selectedClass")[0].innerText;n||(n="85"),await Fl(n),document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove(),await Gl()}async function zl(n){let e=!1;try{let r=await new Promise(function(s,l){window.addEventListener("message",async function(c){c.data.message==="fetchCompleted"&&s(c.data.res)}),window.postMessage({message:"fetchPls",urlToFetch:encodeURIComponent(n)},"*")});e=!0;var t=new DOMParser,i=t.parseFromString(r,"text/html");return i.querySelectorAll("tbody tr").forEach(function(s){if(s.querySelector(".table-player-name")){var l=s.querySelector(".table-player-name").textContent.trim(),c=s.querySelector(".rating-square").textContent.trim(),o=s.querySelector(".table-player-revision").textContent.trim(),u=s.querySelectorAll(".playercard-27")[0].children[1].getAttribute("alt");if(Z=="pc")var d=s.querySelectorAll(".price")[1].textContent.trim();else var d=s.querySelectorAll(".price")[0].textContent.trim();var m=s.querySelectorAll(".playercard-27")[0].children[0].src.split(".png")[0].split("/").pop().split("_")[0];if(d=Al(d),parseInt(d)>0){var g=parseInt(d)-parseInt(d)*.05;g=yn(g);var x=[l,c,o,d,m,g,u];$e.push(x)}}}),e&&await Vl(),!0}catch(r){console.error(r)}}async function Vl(){if($e.length==0){console.warn("[FUTBIN] No players found. Trying FUT.GG fallback...");try{var n=document.getElementsByClassName("selectedClass")[0]?.innerText||"85";if(te("Futbin unavailable. Trying FUT.GG...","#333","#fff",document.body),$e=await Eo(n),$e.length==0){te("No players found on Futbin or FUT.GG.","red","#fff",document.body);return}console.log("[FUT.GG] Fallback successful:",$e.length,"players")}catch(t){console.error("[FUT.GG] Fallback failed:",t),te("Unable to load players from Futbin or FUT.GG.","red","#fff",document.body);return}}parseInt(document.getElementById("inputNumCheapest").value)<$e.length?Sn=parseInt(document.getElementById("inputNumCheapest").value):Sn=$e.length,Ft=[];for(var e=0;e<Sn;e++)Ft.push($e[e])}async function Gl(){Ol(),await Ar(0)}async function Ar(n){if(document.getElementsByClassName("title")[0].innerText!==services.Localization.localize("navbar.label.search")&&document.getElementsByClassName("title")[0].innerText!==services.Localization.localize("navbar.label.searchresults")){document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove(),te("Error in cheapest filter search","red","#fff",document.body);return}if(n>=Ft.length){document.getElementsByClassName("blurredBgSaveDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove();return}let e=Ft[n];ys=0,Dl(e[0]);try{if(e[4]!==void 0&&e[4]!==null&&e[4]!==-1){var t=await In(e[0],e[1]);if(t){await Ln(e[4]);var i=await An();i=i-i*.05,await kn(i)}else{let s=e[0].split(" ").slice(0,2).join(" ");var t=await In(s,e[1]);if(t){await Ln(e[4]);var i=await An();i=i-i*.05,await kn(i)}else{var t=await In(e[6],e[1]);if(t){await Ln(e[4]);var i=await An();i=i-i*.05,await kn(i)}else te("Cannot find the player in Player Name","red","#fff",document.getElementsByClassName("ut-name-squad")[0])}}}else te("Rarity not found, skip to next player.","red","#fff",document.body)}catch(r){console.error("Error in processing player:",e[0],r)}await new Promise(r=>setTimeout(r,1e3)),e[4]!==void 0&&e[4]!==null&&t&&Yn(),await Ar(n+1)}async function An(){let n=1/0;for(let e=0;e<Ft.length;e++){let t=Ft[e][3];t<n&&(n=t)}return n}async function jl(){if(document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0]&&document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0].parentElement.remove(),document.getElementsByClassName("title")[0].innerText===services.Localization.localize("nav.label.transferList"))if(document.getElementsByClassName("listFUTItem selected")[0]&&!document.getElementsByClassName("listFUTItem selected")[0].classList.contains("won"))if(document.getElementsByClassName("listFUTItem selected")[0].children[0].children[0]){var n=parseInt(document.getElementsByClassName("listFUTItem selected")[0].children[0].children[0].innerText,10),e=He.find(s=>parseInt(s.definedID,10)===n),t=e?Wn(e.marketAverage):0;if(t>0){var i=document.createElement("div");i.innerHTML=`<div>
                                                <button class="accordian SellAtmarketAvgPriceBtn" style="background: #fff700;color: black;">
                                                    <span class="btn-text">Sell at Market average price (${services.Localization.localizeNumberShort(t,1)})</span>
                                                    <span class="btn-subtext"></span>
                                                </button>
                                            </div>`,document.getElementsByClassName("ut-button-group")[1]&&document.getElementsByClassName("ut-button-group")[1].children[10]&&document.getElementsByClassName("ut-button-group")[1].children[10].parentNode.insertBefore(i,document.getElementsByClassName("ut-button-group")[1].children[10]);var r=t;r>0&&(r<=150?r=0:r<=1e3?r-=50:r<=1e4?r-=100:r<=5e4?r-=250:r<=1e5?r-=500:r-=1e3),document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0]&&(document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0].addEventListener("click",()=>{Ki(r,t)}),document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0].addEventListener("touchstart",()=>{Ki(r,t)}))}}else document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0]&&document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0].parentElement.remove();else document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0]&&document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0].parentElement.remove()}async function Ki(n,e){var t=!0;document.getElementsByClassName("accordian")[0].classList.contains("SellAtmarketAvgPriceBtn")||document.getElementsByClassName("title")[0].innerText===services.Localization.localize("nav.label.transferList")&&(L(document.getElementsByClassName("accordian")[0]),window.setTimeout(async function(){document.getElementsByClassName("ut-number-input-control filled")[0]&&document.getElementsByClassName("ut-number-input-control filled")[1]?(document.getElementsByClassName("ut-number-input-control filled")[0].value=n,document.getElementsByClassName("ut-number-input-control filled")[1].value=e):t=!1},200),window.setTimeout(function(){t&&(document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.assigncards")?L(document.getElementsByClassName("btn-standard")[1]):L(document.getElementsByClassName("btn-standard")[8]),document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0]&&document.getElementsByClassName("SellAtmarketAvgPriceBtn")[0].parentElement.remove())},300))}function Or(){if(!this.running){this.running=!0;var n=this.getView(),e=services.Configuration.getItemRarity(this.presentedItem);n.setPackTier(this.packTier),n.generateItem(this.presentedItem),n.runAnimation(this.presentedItem,e),this.animationTimeout=window.setTimeout(this.runCallback.bind(this),Ca)}}async function Dr(){if(!document.getElementsByClassName("divHeaderSnippingSoulImg")[0]&&document.getElementsByClassName("view-navbar-currency")[0]&&document.getElementsByClassName("view-navbar-currency")[0].parentNode){var n;n=document.createElement("img"),n.className="view-navbar-clubinfo-entitlement",n.style="width: auto;";try{let u=await new Promise(function(d,m){window.addEventListener("message",function(g){g.data.message==="getChromeExtensionUrlCompleted"&&d(g.data.url)}),window.postMessage({message:"getChromeExtensionUrl",whatSearch:"images/LongLogo2.png"},"*")});n.src=u}catch(u){console.error(u)}var e=document.createElement("div"),t=document.createElement("a");t.removeAttribute("href"),t.target="_blank",e.style="right: 50%;position: absolute;",e.className="divHeaderSnippingSoulImg",t.appendChild(n),e.appendChild(t),document.getElementsByClassName("view-navbar-currency")[0].parentNode.insertBefore(e,document.getElementsByClassName("view-navbar-currency")[0]);var i;i=document.createElement("img"),i.className="view-navbar-clubinfo-entitlement",i.style="width: auto;",i.src=dr;var r=document.createElement("div"),s=document.createElement("a");s.removeAttribute("href"),s.target="_blank",r.style="right: 1%;position: relative;border-color: transparent #f2f2f2;border-style: none solid;border-width: 1px;border-left: none;padding: 0 .5rem;text-align: right;display: flex;align-items: center;height: 75%;",r.className="divHeaderPaypalImg",s.appendChild(i),r.appendChild(s);var l;l=document.createElement("img"),l.className="view-navbar-clubinfo-entitlement",l.style="width: 2rem;",l.src=ur;var c=document.createElement("div"),o=document.createElement("a");o.removeAttribute("href"),o.target="_blank",c.style="right: 1%;position: relative;border-color: transparent #f2f2f2;border-style: none solid;border-width: 1px;border-left: none;padding: 0 .5rem;text-align: right;display: flex;align-items: center;height: 75%;",c.className="divHeaderDiscordImg",o.appendChild(l),c.appendChild(o),document.getElementsByClassName("view-navbar-currency")[0].parentNode.insertBefore(c,document.getElementsByClassName("view-navbar-currency")[0])}}function hn(n){if(n>=Bi.length){ce=0;return}let[e,t,i,r,s,l,c]=Bi[n],o=r==="body"?document.body:document.getElementsByClassName(r)[s],u=document.getElementById("blurOverlay");u||(u=document.createElement("div"),u.className="blur-overlay",u.id="blurOverlay",document.body.appendChild(u));let d=document.getElementById("tutorialBox");if(d)d.querySelector("p").innerText=i;else{d=document.createElement("div"),d.className="tutorial-box",d.id="tutorialBox";let g=document.createElement("div");if(g.className="tutorial-content",n!=0){let C=document.createElement("span");C.className="close-btn",C.innerText="X",C.onclick=()=>{Rr(!0)},g.appendChild(C)}let x=document.createElement("p");x.innerText=i,g.appendChild(x),d.appendChild(g)}o.appendChild(d);var m;if(e!=""){var m=document.getElementsByClassName(e)[t];m.classList.add("highlighted"),ce!=12&&ce!=15&&(m.style.position="relative"),m.style.zIndex="1002"}if(l==="NextBtn"||l==="completeBtn"){let g=document.getElementById("bottom-btn");g||(g=document.createElement("button"),g.className="bottom-btn",g.id="bottom-btn",d.appendChild(g)),l==="NextBtn"?g.innerText="Continuer":l==="completeBtn"&&(document.getElementsByClassName("tabs_wrap")[0].children[0].children[0].style="",document.getElementsByClassName("tabs_wrap")[0].children[0].children[1].style="",document.getElementsByClassName("tabs_wrap")[0].children[0].children[2].style="",g.innerText="Terminer"),n==12?(document.getElementsByClassName("StartBotMothod2Class")[0].disabled=!0,g.onclick=()=>{document.getElementsByClassName("StartBotMothod2Class")[0]&&(document.getElementsByClassName("StartBotMothod2Class")[0].disabled=!1),ga(),document.getElementsByClassName("tabs_wrap")[0].children[0].children[1].style="pointer-events: none;cursor: none;width: 100%; background: rgb(33, 33, 33);",n++,ce=n,Ve(n)}):n==9?g.onclick=()=>{Ne.removeEventListener("click",be),document.getElementsByClassName("tabs_wrap")[0].children[0].children[0].style="pointer-events: none;cursor: none;width: 100%; background: rgb(33, 33, 33);",document.getElementsByClassName("tabs_wrap")[0].children[0].children[2].style="pointer-events: none;cursor: none;width: 100%; background: rgb(33, 33, 33);",n++,ce=n,Ve(n)}:n==14?setTimeout(()=>{var x=new Date;O=x.getHours()+":"+x.getMinutes()+":"+x.getSeconds(),ae(O+" Recherche en cours : filtre personnalisé sur le marché","#ffffff",O,"Filtre personnalisé"),setTimeout(()=>{ae(O+" Trouvé Joueur de démonstration à 350, mais un autre utilisateur l’a acheté.","orange",O,"Filtre personnalisé","350"),setTimeout(()=>{ae(O+" Acheté Joueur de démonstration à 350","green",O,"Joueur de démonstration","350"),setTimeout(()=>{var C=lt*1e3;oi(C)},300)},300)},300),g.onclick=()=>{di(),n++,ce=n,Ve(n)}},100):g.onclick=()=>{n++,ce=n,Ve(n)}}else Ne=document.getElementsByClassName(l)[c],n==2?(document.getElementsByClassName("ut-pinned-list")[0]&&(document.getElementsByClassName("ut-pinned-list")[0].style="transform: none;"),be=()=>{Ne.removeEventListener("click",be),n++,ce=n,Ve(n)},Ne.addEventListener("click",be)):n==3?(document.getElementsByClassName("ut-pinned-list")[0]&&(document.getElementsByClassName("ut-pinned-list")[0].style="transform: none;"),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0].style="z-index: 1000;"),document.getElementsByClassName("with-icon")[3].classList.add("tutorialGold")):n==5?(document.getElementsByClassName("ut-pinned-list")[0]&&(document.getElementsByClassName("ut-pinned-list")[0].style="transform: none;"),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0].style=""),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[5]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[5].style="z-index: 1000;"),document.getElementsByClassName("with-icon")[1].classList.add("tutorialArgentina")):n==6?(document.getElementsByClassName("ut-numeric-input-spinner-control")[3].scrollIntoView(),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[5]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[5].style=""),document.getElementsByClassName("ut-number-input-control")[5].style="pointer-events: none;cursor: none;",document.getElementsByClassName("btn-standard decrement-value")[3].disabled=!0,be=()=>{Si+=1,document.getElementsByClassName("btn-standard decrement-value")[3].disabled=!0,Si==4&&(document.getElementsByClassName("btn-standard decrement-value")[3].disabled=!1,document.getElementsByClassName("ut-number-input-control")[5].style="",Ne.removeEventListener("click",be),n++,ce=n,Ve(n))},Ne=document.getElementsByClassName("btn-standard increment-value")[3],document.getElementsByClassName("btn-standard increment-value")[3].addEventListener("click",be)):n==10?(be=()=>{Ne.removeEventListener("click",be),n++,ce=n,Ve(n)},Ne=document.getElementsByClassName("tabs_wrap")[0].children[0].children[1],Ne.addEventListener("click",be)):(be=()=>{Ne.removeEventListener("click",be),n++,ce=n,Ve(n)},Ne.addEventListener("click",be));u.style.display="block",d.style.display="block",m&&(m.style.zIndex="1002")}function Rr(n){n&&(document.getElementsByClassName("tabs_wrap")[0]&&(document.getElementsByClassName("tabs_wrap")[0].children[0].children[0].style="pointer-events: none;cursor: none;width: 100%; background: rgb(33, 33, 33);",document.getElementsByClassName("tabs_wrap")[0].children[0].children[1].style="pointer-events: none;cursor: none;width: 100%; background: rgb(33, 33, 33);",document.getElementsByClassName("tabs_wrap")[0].children[0].children[2].style="pointer-events: none;cursor: none;width: 100%; background: rgb(33, 33, 33);"),document.getElementsByClassName("btn-standard decrement-value")[3]&&(document.getElementsByClassName("btn-standard decrement-value")[3].disabled=!1),document.getElementsByClassName("ut-number-input-control")[5]&&(document.getElementsByClassName("ut-number-input-control")[5].style=""),document.getElementsByClassName("ut-pinned-list")[0]&&(document.getElementsByClassName("ut-pinned-list")[0].style="transform: none;"),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[0].style=""),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[5]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image")[5].style=""),document.getElementsByClassName("ut-pinned-list")[0]&&(document.getElementsByClassName("ut-pinned-list")[0].style="transform: ;"),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image is-open")[0]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image is-open")[0].style="z-index: 1;"),Ne&&Ne.removeEventListener("click",be));let e=document.getElementById("tutorialBox"),t=document.getElementById("blurOverlay");if((ce==2||ce==3)&&(document.getElementsByClassName("ut-pinned-list")[0]&&(document.getElementsByClassName("ut-pinned-list")[0].style="transform: ;"),document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image is-open")[0]&&(document.getElementsByClassName("inline-list-select ut-search-filter-control has-default has-image is-open")[0].style="z-index: 1;")),e){e.style.display="none",e.remove();let i=document.getElementsByClassName("highlighted")[0];i&&(i.classList.remove("highlighted"),i.style.zIndex=""),t&&(t.style.display="none",t.remove())}}function Ve(n){Rr(!1),setTimeout(()=>{hn(n)},100)}async function Hl(){try{let n=await new Promise(function(e,t){window.addEventListener("message",function(i){i.data.message==="getCompleted"&&e(i.data.result)}),window.postMessage({message:"get",keys:["firstTimeInTransferMarketStorage"]},"*")});return n&&(n.firstTimeInTransferMarketStorage==null?ot=!0:n.firstTimeInTransferMarketStorage==!0||n.firstTimeInTransferMarketStorage==!1?ot=n.firstTimeInTransferMarketStorage:ot=!0),!0}catch(n){console.error(n)}}function $l(i){var e=this.getView(),t=this.sbcViewModel.getSbcSet(),i=t?.getChallenge(i);oa=i.id,na=this.sbcViewModel.challenges._collection.findIndex(r=>r.id===i.id),Vr(),i&&t&&e.render(i,t.awards,this.showCustomRequirements,t.isSingleChallenge)}function Kl(n,e){var t=this;ws=n,Cs=n.eligibilityRequirements,Ns=n.repeatable,z=[],n.squad&&(Kn=n.squad.simpleBrickIndices,n.squad._formation.positions.forEach((i,r)=>{Kn.includes(r)||z.push(i.typeName)})),Bs=n.id,requestAnimationFrame(function(){if(t.getRootElement()){t.__requirementsTitle.textContent=services.Localization.localize("sbc.requirements.challenge"),DOMKit.empty(t.__requirements);var i=n.squad,r=n.eligibilityRequirements.map(function(c){return t.generateRequirementListRow(c.buildString(),n.isRequirementMet(c),n.getRequirementCounter(c))});if(i&&e){var s=services.Localization.localize("sbc.requirements.numplayers")+" "+i.getNumOfRequiredPlayers(),l=t.generateRequirementListRow(s,i.isSquadFull());Es=i.getNumOfRequiredPlayers(),r.push(l)}r.forEach(function(c){return t.__requirements.appendChild(c)})}})}function Ql(){var n=this,e=services.Localization,t=this.count,i=this.getFirstKey(),r="scope"+this.scope,s="sbc.requirements.",l=t===1?s+"player."+r:s+"players."+r,c="",o=this.getValue(i);function u(f){return f.map(function(v,y,h){return y<h.length-1?v+" "+e.localize("label.general.or").toUpperCase():v}).join(" ")}if(this.isCombinedRequirement){x=e.localize(l+".val",[t.toString()]);var d=[];this.kvPairs.keys().forEach(function(f){var v=Number(f);switch(o=n.getValue(v),v){case SBCEligibilityKey.ALL_PLAYERS_CHEMISTRY_POINTS:var y="sbc.requirements.combined.team.player-chemistry-points."+r;d.push(u(o.map(function(P){return e.localize(y,[P.toString()])})));break;case SBCEligibilityKey.CHEMISTRY_POINTS:d.push(u(o.map(function(P){return e.localize("sbc.requirements.combined.team.chemistry-points."+r,[P.toString()])})));break;case SBCEligibilityKey.NATION_ID:d.push(u(o.map(function(P){return UTLocalizationUtil.nationIdToName(P,e)})));break;case SBCEligibilityKey.LEAGUE_ID:d.push(u(o.map(function(P){return UTLocalizationUtil.leagueIdToName(P,e)})));break;case SBCEligibilityKey.CLUB_ID:d.push(u(Array.from(new Set(o.map(function(P){return UTLocalizationUtil.teamIdToAbbr15(P,e)})))));break;case SBCEligibilityKey.PLAYER_MIN_OVR:d.push(u(o.map(function(P){return e.localize("sbc.requirements.rating.min.val",[P.toString()])})));break;case SBCEligibilityKey.PLAYER_MAX_OVR:d.push(u(o.map(function(P){return e.localize("sbc.requirements.rating.max.val",[P.toString()])})));break;case SBCEligibilityKey.PLAYER_EXACT_OVR:d.push(u(o.map(function(P){return e.localize("sbc.requirements.rating.exact.val",[P.toString()])})));break;case SBCEligibilityKey.PLAYER_TRADABILITY:var h=o.map(function(P){var b="sbc.requirements."+(P===1?"untradable":"tradable")+"."+r;return e.localize(b,[t.toString()])});d.push(u(h));break;case SBCEligibilityKey.PLAYER_RARITY_GROUP:var E=e.localize(s+"rare."+r,[t.toString()]),A=u(o.map(function(P){return e.localize("Player_Group_"+P)}));d.push(A+": "+E);break;default:DebugUtils.Assert(!1,"Reached default case for eligibility string: "+f)}},this),c=d.join(" + ")+": "+x}else switch(i){case SBCEligibilityKey.ALL_PLAYERS_CHEMISTRY_POINTS:c=e.localize(s+"team.player-chemistry-points."+r,o.map(function(f){return _a=f,f.toString()})),Ta=this.scope;break;case SBCEligibilityKey.CHEMISTRY_POINTS:c=e.localize(s+"team.chemistry-points."+r,o.map(function(f){return ti=f,f.toString()})),Ss=this.scope;break;case SBCEligibilityKey.TEAM_STAR_RATING:c=e.localize(s+"team.rating."+r,o.map(function(f){return f.toString()}));break;case SBCEligibilityKey.TEAM_RATING:c=e.localize(s+"team.rating1to100."+r,o.map(function(f){return Pa=f,f.toString()})),Jt=this.scope;break;case SBCEligibilityKey.PLAYER_QUALITY:var m=o[0];c=(c=e.localize("sbc.requirements.playerQuality"))+" "+e.localize(s+r),m===SBCEligibilityQualityType.BRONZE?c+=" "+e.localize("packtype.bronze"):m===SBCEligibilityQualityType.SILVER?c+=" "+e.localize("packtype.silver"):c+=" "+e.localize("packtype.gold"),ka=this.scope,Ia=m;break;case SBCEligibilityKey.PLAYER_LEVEL:var g=e.localize(s+"rare."+r,[t.toString()]),C=this.scope;c=u(o.map(function(f){return ca.includes(f)||(ca.push(f),La.push(C),Aa.push(t)),e.localize("search.cardLevels.cardLevel"+f)}))+": "+g;break;case SBCEligibilityKey.SAME_NATION_COUNT:c=e.localize(l,[o.toString(),e.localize(s+"subType.nation")]),Oa=parseInt(o.toString()),Da=this.scope;break;case SBCEligibilityKey.SAME_LEAGUE_COUNT:c=e.localize(l,[o.toString(),e.localize(s+"subType.league")]),Ra=parseInt(o.toString()),Xt=this.scope;break;case SBCEligibilityKey.SAME_CLUB_COUNT:c=e.localize(l,[o.toString(),e.localize(s+"subType.club")]),Fa=parseInt(o.toString()),Ua=this.scope;break;case SBCEligibilityKey.NATION_COUNT:c=e.localize(s+"nations."+r,o.map(function(f){return za=f,f.toString()})),Va=this.scope;break;case SBCEligibilityKey.LEAGUE_COUNT:c=e.localize(s+"leagues."+r,o.map(function(f){return Ga=f,f.toString()})),ja=this.scope;break;case SBCEligibilityKey.CLUB_COUNT:c=e.localize(s+"clubs."+r,o.map(function(f){return Ha=f,f.toString()})),$a=this.scope;break;case SBCEligibilityKey.NATION_ID:var x=e.localize(l+".val",[t.toString()]),C=this.scope;c=u(o.map(function(f){return da.includes(o)||(da.push(o),Zt.push(C),Ka.push(t)),UTLocalizationUtil.nationIdToName(f,e)}))+": "+x;break;case SBCEligibilityKey.LEAGUE_ID:var x=e.localize(l+".val",[t.toString()]),C=this.scope;c=u(o.map(function(f){return ua.includes(o)||(ua.push(o),kt.push(C),Qa.push(t)),UTLocalizationUtil.leagueIdToName(f,e)}))+": "+x;break;case SBCEligibilityKey.CLUB_ID:x=e.localize(l+".val",[t.toString()]);var C=this.scope;c=u(Array.from(new Set(o.map(function(f){return ma.includes(o)||(ma.push(o),ea.push(C),Ya.push(t)),UTLocalizationUtil.teamIdToAbbr15(f,e)}))))+": "+x;break;case SBCEligibilityKey.LEGEND_COUNT:var B=o[0]===1?"legend.":"legends.";c=e.localize(s+B+r,o.map(function(f){return f.toString()}));break;case SBCEligibilityKey.PLAYER_RARITY:c=u(o.map(function(f){return pa=f,e.localize("item.raretype"+f)}))+": "+(x=e.localize(s+"rare."+r,[t.toString()])),Wa=this.scope,fa=t;break;case SBCEligibilityKey.PLAYER_RARITY_GROUP:x=e.localize(s+"rare."+r,[t.toString()]),c=u(o.map(function(f){return ta=f,e.localize("Player_Group_"+f)}))+": "+x,qa=this.scope,Ja=t;break;case SBCEligibilityKey.PLAYER_MAX_OVR:c=e.localize(s+"rating.max."+r,[t.toString(),o[0].toString()]),Xa=this.scope,Za=t,en=o[0];break;case SBCEligibilityKey.PLAYER_MIN_OVR:c=e.localize(s+"rating.min."+r,[t.toString(),o[0].toString()]),tn=this.scope,an=t,nn=o[0];break;case SBCEligibilityKey.PLAYER_EXACT_OVR:c=e.localize(s+"rating.exact."+r,[t.toString(),o[0].toString()]),rn=this.scope,sn=t,ln=o[0];break;case SBCEligibilityKey.FIRST_OWNER_PLAYERS_COUNT:c=e.localize(s+"firstowner."+r,[o[0].toString()]),on=this.scope,cn=t,Ms=o[0];break;case SBCEligibilityKey.PLAYER_TRADABILITY:var w=o[0]===1?"untradable":"tradable";c=e.localize(s+w+"."+r,[t.toString()]),dn=this.scope,un=o[0],mn=t;break;default:DebugUtils.Assert(!1,"Reached default case building eligibility string: "+i)}return c}async function Yl(n){var e=new Date().toISOString().split("T")[0];return n!==e?(ke=or,n=e,window.postMessage({message:"set",objPassed:ne(["snipedOnDate","limitRemainingPlayersToBuyToday"],[e,ke])},"*"),!0):!1}function Ie(n,e){if(document.querySelector(".SnippingSoul-premium-dialog"))return;var t=document.createElement("div");t.className="SnippingSoul-premium-overlay";var i=document.createElement("div");i.className="SnippingSoul-premium-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","SnippingSoul-premium-heading"),i.setAttribute("tabindex","-1");var r=document.createElement("div");r.className="SnippingSoul-premium-topbar";var s=document.createElement("div");s.className="SnippingSoul-premium-brand",s.innerHTML='<span class="SnippingSoul-premium-crown">\u265B</span><span>SnippingSoul</span>';var l=document.createElement("span");l.className="SnippingSoul-premium-pill",l.textContent="PREMIUM";var c=document.createElement("button");c.type="button",c.className="SnippingSoul-premium-close",c.setAttribute("aria-label","Close dialog"),c.textContent="\xD7",r.appendChild(s),r.appendChild(l),r.appendChild(c);var o=document.createElement("div");o.className="SnippingSoul-premium-hero";var u=document.createElement("div");u.className="SnippingSoul-premium-hero-copy";var d=document.createElement("div");d.className="SnippingSoul-premium-eyebrow",d.textContent="VOTRE ASSISTANT DE MARCHÉ";var m=document.createElement("h2");m.className="SnippingSoul-premium-heading",m.id="SnippingSoul-premium-heading";var g=String(n||"Unlock your full potential"),x=g.trim().split(/\s+/),C=x.splice(-2).join(" "),B=x.join(" ");B&&m.appendChild(document.createTextNode(B));var w=document.createElement("span");w.textContent=C||g,m.appendChild(w);var f=document.createElement("p");f.className="SnippingSoul-premium-description",f.textContent="Accéder aux fonctions avancées",u.appendChild(d),u.appendChild(m),u.appendChild(f),o.appendChild(u);var v=document.createElement("div");v.className="SnippingSoul-premium-message";var y=document.createElement("span");y.className="SnippingSoul-premium-message-icon",y.textContent="\u03DF";var h=document.createElement("span");h.textContent=String(e||""),v.appendChild(y),v.appendChild(h);var E=document.createElement("div");E.className="SnippingSoul-premium-price-banner";var A=document.createElement("div");A.className="SnippingSoul-premium-price-copy";var P=document.createElement("div");P.className="SnippingSoul-premium-price-caption",P.textContent="Formules à partir de";var b=document.createElement("div");b.className="SnippingSoul-premium-price-value",b.textContent="\u20AC14,99";var M=document.createElement("div");M.className="SnippingSoul-premium-price-note",M.textContent="Choisir une formule";var T=document.createElement("div");T.className="SnippingSoul-premium-price-art",T.setAttribute("aria-hidden","true"),T.textContent="\u265B",A.appendChild(P),A.appendChild(b),A.appendChild(M),E.appendChild(A),E.appendChild(T);var Y=[{icon:"\u{1F9E9}",title:"SBC Solver",description:"Solve SBCs faster"},{icon:"\u25C6\uFE0E",title:"Gallery Players",description:"Buy players for sets"},{icon:"\u{1F3AF}",title:"Unlimited snipes",description:"Trade without limits"},{icon:"\u2B07\uFE0F",title:"Futbin Import",description:"Import SBC solutions"},{icon:"\u{1F4BE}",title:"Filtres enregistrés",description:"Save and reuse filters"},{icon:"\u{1F4F1}",title:"Mobile sniping",description:"Snipe from your phone"}],F=document.createElement("div");F.className="SnippingSoul-premium-features",Y.forEach(function(q){var U=document.createElement("div");U.className="SnippingSoul-premium-feature";var re=document.createElement("div");re.className="SnippingSoul-premium-feature-icon",re.textContent=q.icon;var X=document.createElement("div");X.className="SnippingSoul-premium-feature-copy";var de=document.createElement("div");de.className="SnippingSoul-premium-feature-title",de.textContent=q.title;var ge=document.createElement("div");ge.className="SnippingSoul-premium-feature-description",ge.textContent=q.description;var Fe=document.createElement("span");Fe.className="SnippingSoul-premium-feature-arrow",Fe.textContent="\u203A",Fe.setAttribute("aria-hidden","true"),X.appendChild(de),X.appendChild(ge),U.appendChild(re),U.appendChild(X),U.appendChild(Fe),F.appendChild(U)});var V=document.createElement("div");V.className="SnippingSoul-premium-actions";var p=document.createElement("button");p.type="button",p.className="SnippingSoul-premium-cta";var N=document.createElement("span");N.textContent="SnippingSoul — fonctions avancées";var _=document.createElement("span");_.className="SnippingSoul-premium-cta-arrow",_.textContent="\u2192",_.setAttribute("aria-hidden","true"),p.appendChild(N),p.appendChild(_);var S=document.createElement("button");S.type="button",S.className="SnippingSoul-premium-dismiss",S.textContent="Maybe later \u{1F552}",V.appendChild(p),V.appendChild(S);var k=document.createElement("div");k.className="SnippingSoul-premium-footer";var R=[["\u2662","Premium features"],["\u2022","Simple subscription plans"],["\u2713","SnippingSoul support"]];R.forEach(function(q,U){if(U>0){var re=document.createElement("span");re.className="SnippingSoul-premium-footer-dot",re.textContent="\u2022",k.appendChild(re)}var X=document.createElement("span");X.className="SnippingSoul-premium-footer-item";var de=document.createElement("span");de.className="SnippingSoul-premium-footer-icon",de.textContent=q[0];var ge=document.createElement("span");ge.textContent=q[1],X.appendChild(de),X.appendChild(ge),k.appendChild(X)});var W=document.activeElement;function ie(){document.removeEventListener("keydown",ve),t.remove(),i.remove(),W&&W.isConnected&&typeof W.focus=="function"&&W.focus()}function ve(q){if(q.key==="Escape"&&ie(),q.key==="Tab"){var U=i.querySelectorAll('button:not([disabled]), [href], [tabindex="0"]');if(!U.length)return;var re=U[0],X=U[U.length-1];q.shiftKey&&document.activeElement===re?(q.preventDefault(),X.focus()):!q.shiftKey&&document.activeElement===X&&(q.preventDefault(),re.focus())}}c.addEventListener("click",ie),S.addEventListener("click",ie),p.addEventListener("click",function(){void 0,ie()}),t.addEventListener("click",ie),i.addEventListener("click",function(q){q.stopPropagation()}),i.appendChild(r),i.appendChild(o),i.appendChild(v),i.appendChild(E),i.appendChild(F),i.appendChild(V),i.appendChild(k),document.body.appendChild(t),document.body.appendChild(i),document.addEventListener("keydown",ve),c.focus()}function Wl(n,e){(n===8||n===6)&&(e=5e3),this.pileSizes.set(n,e)}function Dt(n,e){let t=n.filter(o=>o!==null),i=JSON.stringify(t.map(o=>o.assetId));if(_n.has(i))return _n.get(i);let r=0,s={teamid:{},nation:{},leagueId:{}},l=new Map;n.forEach((o,u)=>{if(o===null)return;let d=z[u];(e.intesaDaRaggiungere===0||o.possiblePositions.includes(d))&&(s.teamid[o.teamid]=(s.teamid[o.teamid]||0)+1,s.nation[o.nation]=(s.nation[o.nation]||0)+1,s.leagueId[o.leagueId]=(s.leagueId[o.leagueId]||0)+1,l.set(o.assetId,0))}),n.forEach((o,u)=>{if(o===null)return;let d=z[u];if(o.possiblePositions.includes(d)){let m=0;s.teamid[o.teamid]>=7?m+=3:s.teamid[o.teamid]>=4?m+=2:s.teamid[o.teamid]>=2&&(m+=1),s.nation[o.nation]>=8?m+=3:s.nation[o.nation]>=5?m+=2:s.nation[o.nation]>=2&&(m+=1),s.leagueId[o.leagueId]>=8?m+=3:s.leagueId[o.leagueId]>=5?m+=2:s.leagueId[o.leagueId]>=3&&(m+=1),l.set(o.assetId,Math.min(m,3))}}),l.forEach(o=>r+=o);let c={total:r,playerChemistry:l};return _n.set(i,c),c}function vn(n){let e=n.reduce((s,l)=>s+l,0),t=e/z.length,i=0;n.forEach((s,l)=>{s>t&&(i+=l<z.length?s-t:.5*(s-t))});let r=Math.round(i+e)/z.length;return Math.min(Math.max(Math.floor(r),0),99)}function ql(n,e=[],t=0){oe[0].length>0&&oe[0].forEach(u=>{e.push(u.rating)});let i=Math.max(n-5,75),r=Math.min(n+5,99),s=Object.keys(ra).map(Number).filter(u=>u>=i&&u<=r),l=[],c=1/0;function o(u,d,m){if(u.length===z.length){vn(u)===n&&m<c&&(c=m,l.push({formation:[...u],cost:m}),l.length>5&&(l.sort((x,C)=>x.cost-C.cost),l.pop()));return}for(let g=d;g<s.length;g++){let x=s[g],C=m+ra[x];C>c||(u.push(x),o(u,g,C),u.pop())}}return e.length===z.length?(vn(e)===n&&l.push({formation:[...e],cost:t}),l):(o([...e],0,t),l.sort((u,d)=>u.cost-d.cost),l)}function Jl(n,e){let t=0;return e.forEach(i=>{i.teamid===n.teamid&&(t+=1),i.nation===n.nation&&(t+=1),i.leagueId===n.leagueId&&(t+=1)}),t}function la(n,e,t,i,r,s,l,c){if(Me||l.foundValid)return l.formazioniLocali;if(Date.now()-r>3e4)return Me=!0,l.formazioniLocali;if(l.formazioniLocali.length>=c||l.foundValid)return l.formazioniLocali;if(n.filter(g=>g!==null).length===z.length){let g=n.filter(B=>B!==null),x=vn(g.map(B=>B.rating)),C=g.reduce((B,w)=>B+w.marketAverage,0);return e>=t.intesaDaRaggiungere&&(t.ratingMinimo===null||x>=t.ratingMinimo)&&(t.ratingMassimo===null||x<=t.ratingMassimo)&&jt(g,t)?l.formazioniLocali.some(w=>JSON.stringify(w.formazione.map(f=>f.assetId))===JSON.stringify(g.map(f=>f.assetId)))?(C<Qn.costo&&(Qn={formazione:[...g],intesa:e,costo:C}),l.formazioniLocali):(l.formazioniLocali.push({formazione:[...g],intesa:e,costo:C}),l.foundValid=!0,Me=!0,l.formazioniLocali):l.formazioniLocali}if(e<t.intesaDaRaggiungere){let g=n.map((B,w)=>B===null?w:-1).filter(B=>B!==-1),x=0,C=0;for(let B of g){let w=z[B];x=0,C=0,Se!=0?x=Se:x=t.ratingMinimo,we!=0?C=we:C=t.ratingMinimo,t.ratingMinimo!==null&&t.ratingMinimo<=75&&(C=t.ratingMinimo+10);let f=j.filter(y=>!n.some(h=>h&&h.assetId===y.assetId)&&y.possiblePositions.includes(w)&&(t.ratingMinimo===null||y.rating>=x&&y.rating<=C)&&(t.ratingMassimo===null||y.rating<=t.ratingMassimo+2)&&jt([...n.filter(h=>h!==null),y],t));if(n.filter(y=>y!==null).length>0&&(f=f.filter(y=>Jl(y,n.filter(h=>h!==null))>0)),t.ratingMinimo!==null&&f.sort((y,h)=>{let E=y.rating/y.marketAverage;return h.rating/h.marketAverage-E}),t.isMinOrMax_playerLevel!==null&&t.isMinOrMax_playerLevel.length>0){var u=t.isMinOrMax_playerLevel.some(y=>y===0||y===2);if(u){let y=[];t.valuePlayerLevel_playerLevel.forEach((h,E)=>{var A=t.isMinOrMax_playerLevel[E];if(A===0||A===2){let P=[];h===1?P=f.filter(b=>b.rating<=64):h===2?P=f.filter(b=>b.rating>64&&b.rating<75):h===3&&(P=f.filter(b=>b.rating>=75)),y=[...new Set([...y,...P])]}}),y.length>0&&(f=y)}}if(t.isMinOrMax_playerQuality!==null&&(t.isMinOrMax_playerQuality===0?t.qualityFromRequirements_playerQuality===2?f=f.filter(y=>y.rating>64):t.qualityFromRequirements_playerQuality===3&&(f=f.filter(y=>y.rating>74)):t.isMinOrMax_playerQuality===1?t.qualityFromRequirements_playerQuality===1?f=f.filter(y=>y.rating<=64):t.qualityFromRequirements_playerQuality===2?f=f.filter(y=>y.rating<=74):t.qualityFromRequirements_playerQuality===3&&(f=f.filter(y=>y.rating>75)):t.isMinOrMax_playerQuality===2&&(t.qualityFromRequirements_playerQuality===1?f=f.filter(y=>y.rating<=64):t.qualityFromRequirements_playerQuality===2?f=f.filter(y=>y.rating<=74&&y.rating>64):t.qualityFromRequirements_playerQuality===3&&(f=f.filter(y=>y.rating>75)))),n.filter(y=>y!==null&&y.groups&&y.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)).length<t.numPlayersOfplayerRarityGroupX_playerRarityGroup&&t.isMinOrMax_playerRarityGroup!==null&&(t.isMinOrMax_playerRarityGroup===0?f=f.filter(y=>y.groups&&y.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)):t.isMinOrMax_playerRarityGroup===1&&(f=f.filter(y=>y.groups&&!y.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)))),Dn(n,t)||(t.isMinOrMax_sameNationCount!==null&&(f=f.filter(y=>{let h=n.filter(E=>E!==null&&E.nation===y.nation).length;return t.isMinOrMax_sameNationCount===0?h<t.sameNationCountValue_sameNationCount:h<=t.sameNationCountValue_sameNationCount})),t.isMinOrMax_SameLeagueCount!==null&&(f=f.filter(y=>{let h=n.filter(E=>E!==null&&E.leagueId===y.leagueId).length;return t.isMinOrMax_SameLeagueCount===0?h<t.sameLeagueCountValue_SameLeagueCount:h<=t.sameLeagueCountValue_SameLeagueCount})),t.isMinOrMax_SameClubCount!==null&&(f=f.filter(y=>{let h=n.filter(E=>E!==null&&E.teamid===y.teamid).length;return t.isMinOrMax_SameClubCount===0?h<t.sameClubCountValue_SameClubCount:h<=t.sameClubCountValue_SameClubCount}))),t.isMinOrMax_NationCount!==null){let y=new Set(n.filter(h=>h!==null).map(h=>h.nation));t.isMinOrMax_NationCount===0&&y.size<t.NationCountValue_NationCount?f.sort((h,E)=>y.has(h.nation)-y.has(E.nation)):t.isMinOrMax_NationCount===1&&y.size>=t.NationCountValue_NationCount&&f.sort((h,E)=>y.has(E.nation)-y.has(h.nation))}if(t.isMinOrMax_leagueCount!==null){let y=new Set(n.filter(h=>h!==null).map(h=>h.leagueId));t.isMinOrMax_leagueCount===0&&y.size<t.numLeagueCount_leagueCount?f.sort((h,E)=>y.has(h.leagueId)-y.has(E.leagueId)):t.isMinOrMax_leagueCount===1&&y.size>=t.numLeagueCount_leagueCount&&f.sort((h,E)=>y.has(E.leagueId)-y.has(h.leagueId))}if(t.isMinOrMax_clubCount!==null){let y=new Set(n.filter(h=>h!==null).map(h=>h.teamid));t.isMinOrMax_clubCount===0&&y.size<t.clubValue_ClubCount?f.sort((h,E)=>y.has(h.teamid)-y.has(E.teamid)):t.isMinOrMax_clubCount===1&&y.size>=t.clubValue_ClubCount&&f.sort((h,E)=>y.has(E.teamid)-y.has(h.teamid))}if(t.isMinOrMax_playerMaxOvr!==null&&(f=f.filter(y=>{let h=n.filter(E=>E!==null&&E.rating<=t.valuePlayerMaxOvr_playerMaxOvr).length;return t.isMinOrMax_playerMaxOvr===0?h<t.numPlayerMaxOvr_playerMaxOvr:h<=t.numPlayerMaxOvr_playerMaxOvr})),t.isMinOrMax_playerMinOvr!==null&&(f=f.filter(y=>{let h=n.filter(E=>E!==null&&E.rating>=t.valuePlayerMinOvr_playerMinOvr).length;return t.isMinOrMax_playerMinOvr===0?h<t.numPlayerMinOvr_playerMinOvr:h<=t.numPlayerMinOvr_playerMinOvr})),t.isMinOrMax_playerExactOvr!==null&&(f=f.filter(y=>{let h=n.filter(E=>E!==null&&E.rating===t.valuePlayerExactOvr_playerExactOvr).length;return t.isMinOrMax_playerExactOvr===0?h<t.numPlayerExactOvr_playerExactOvr:h<=t.numPlayerExactOvr_playerExactOvr})),t.isMinOrMax_PlayerTradability!==null){let y=n.filter(E=>E!==null&&E.untradeable).length,h=t.NumUntradableOrTradable_PlayerTradability-y;t.isMinOrMax_PlayerTradability===0&&h>0&&h>=z.length-n.length?f=f.filter(E=>E.untradeable):t.isMinOrMax_PlayerTradability===1&&y>t.NumUntradableOrTradable_PlayerTradability&&(f=f.filter(E=>!E.untradeable))}if(t.isMinOrMax_firstOwnerPlayersCount!==null){let y=n.filter(E=>E!==null&&E.owners===1).length,h=t.numPlayerFirstOwner_firstOwnerPlayersCount-y;t.isMinOrMax_firstOwnerPlayersCount===0&&h>0&&h>=z.length-n.length?f=f.filter(E=>E.owners===1):t.isMinOrMax_firstOwnerPlayersCount===1&&y>t.numPlayerFirstOwner_firstOwnerPlayersCount&&(f=f.filter(E=>E.owners!==1))}if(f.length!==0){f.sort((y,h)=>y.rating!==h.rating?y.rating-h.rating:t.prefUntradable&&y.untradeable!==h.untradeable?h.untradeable-y.untradeable:t.prefStoragePile&&y.pile!==h.pile?h.pile===10?1:-1:y.rareflag!==h.rareflag?y.rareflag-h.rareflag:0);for(let y of f){if(!Wi(n,y,t))continue;n[B]=y;let E=Dt(n,t).total;if(l.formazioniLocali=la([...n],E,t,i,r,s,l,c),Me||(n[B]=null,l.formazioniLocali.length>=c))return l.formazioniLocali;if(E>=t.intesaDaRaggiungere)break}if(e>=t.intesaDaRaggiungere)break}}}if(e>=t.intesaDaRaggiungere){let g=n.map((B,w)=>B===null?w:-1).filter(B=>B!==-1),x=0,C=0;if(Se!=0?x=Se:x=t.ratingMinimo,we!=0?C=we:C=t.ratingMinimo,t.ratingMinimo===null||t.ratingMinimo<=75)for(let B of g){let w=j.filter(v=>!n.some(y=>y&&y.assetId===v.assetId)&&(t.ratingMinimo===null||v.rating>=x&&v.rating<=C)&&(t.ratingMassimo===null||v.rating<=t.ratingMassimo+2)&&jt([...n.filter(y=>y!==null),v],t));if(t.isMinOrMax_playerLevel!==null&&t.isMinOrMax_playerLevel.length>0&&t.isMinOrMax_playerLevel.some(y=>y===0||y===2)){let y=[];t.valuePlayerLevel_playerLevel.forEach((h,E)=>{let A=t.isMinOrMax_playerLevel[E];if(A===0||A===2){let P=[];h===1?P=w.filter(b=>b.rating<=64):h===2?P=w.filter(b=>b.rating>64&&b.rating<75):h===3&&(P=w.filter(b=>b.rating>=75)),y=[...new Set([...y,...P])]}}),y.length>0&&(w=y)}if(t.isMinOrMax_playerQuality!==null&&(t.isMinOrMax_playerQuality===0?t.qualityFromRequirements_playerQuality===2?w=w.filter(v=>v.rating>64):t.qualityFromRequirements_playerQuality===3&&(w=w.filter(v=>v.rating>74)):t.isMinOrMax_playerQuality===1?t.qualityFromRequirements_playerQuality===1?w=w.filter(v=>v.rating<=64):t.qualityFromRequirements_playerQuality===2?w=w.filter(v=>v.rating<=74):t.qualityFromRequirements_playerQuality===3&&(w=w.filter(v=>v.rating>75)):t.isMinOrMax_playerQuality===2&&(t.qualityFromRequirements_playerQuality===1?w=w.filter(v=>v.rating<=64):t.qualityFromRequirements_playerQuality===2?w=w.filter(v=>v.rating<=74&&v.rating>64):t.qualityFromRequirements_playerQuality===3&&(w=w.filter(v=>v.rating>75)))),n.filter(v=>v!==null&&v.groups&&v.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)).length<t.numPlayersOfplayerRarityGroupX_playerRarityGroup&&t.isMinOrMax_playerRarityGroup!==null&&(t.isMinOrMax_playerRarityGroup===0?w=w.filter(v=>v.groups&&v.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)):t.isMinOrMax_playerRarityGroup===1&&(w=w.filter(v=>v.groups&&!v.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)))),Dn(n,t)||(t.isMinOrMax_sameNationCount!==null&&(w=w.filter(v=>{let y=n.filter(h=>h!==null&&h.nation===v.nation).length;return t.isMinOrMax_sameNationCount===0?y<t.sameNationCountValue_sameNationCount:y<=t.sameNationCountValue_sameNationCount})),t.isMinOrMax_SameLeagueCount!==null&&(w=w.filter(v=>{let y=n.filter(h=>h!==null&&h.leagueId===v.leagueId).length;return t.isMinOrMax_SameLeagueCount===0?y<t.sameLeagueCountValue_SameLeagueCount:y<=t.sameLeagueCountValue_SameLeagueCount})),t.isMinOrMax_SameClubCount!==null&&(w=w.filter(v=>{let y=n.filter(h=>h!==null&&h.teamid===v.teamid).length;return t.isMinOrMax_SameClubCount===0?y<t.sameClubCountValue_SameClubCount:y<=t.sameClubCountValue_SameClubCount}))),t.isMinOrMax_NationCount!==null){let v=new Set(n.filter(y=>y!==null).map(y=>y.nation));t.isMinOrMax_NationCount===0&&v.size<t.NationCountValue_NationCount?w.sort((y,h)=>v.has(y.nation)-v.has(h.nation)):t.isMinOrMax_NationCount===1&&v.size>=t.NationCountValue_NationCount&&w.sort((y,h)=>v.has(h.nation)-v.has(y.nation))}if(t.isMinOrMax_leagueCount!==null){let v=new Set(n.filter(y=>y!==null).map(y=>y.leagueId));t.isMinOrMax_leagueCount===0&&v.size<t.numLeagueCount_leagueCount?w.sort((y,h)=>v.has(y.leagueId)-v.has(h.leagueId)):t.isMinOrMax_leagueCount===1&&v.size>=t.numLeagueCount_leagueCount&&w.sort((y,h)=>v.has(h.leagueId)-v.has(y.leagueId))}if(t.isMinOrMax_clubCount!==null){let v=new Set(n.filter(y=>y!==null).map(y=>y.teamid));t.isMinOrMax_clubCount===0&&v.size<t.clubValue_ClubCount?w.sort((y,h)=>v.has(y.teamid)-v.has(h.teamid)):t.isMinOrMax_clubCount===1&&v.size>=t.clubValue_ClubCount&&w.sort((y,h)=>v.has(h.teamid)-v.has(y.teamid))}if(t.isMinOrMax_playerMaxOvr!==null&&(w=w.filter(v=>{let y=n.filter(h=>h!==null&&h.rating<=t.valuePlayerMaxOvr_playerMaxOvr).length;return t.isMinOrMax_playerMaxOvr===0?y<t.numPlayerMaxOvr_playerMaxOvr:y<=t.numPlayerMaxOvr_playerMaxOvr})),t.isMinOrMax_playerMinOvr!==null&&(w=w.filter(v=>{let y=n.filter(h=>h!==null&&h.rating>=t.valuePlayerMinOvr_playerMinOvr).length;return t.isMinOrMax_playerMinOvr===0?y<t.numPlayerMinOvr_playerMinOvr:y<=t.numPlayerMinOvr_playerMinOvr})),t.isMinOrMax_playerExactOvr!==null&&(w=w.filter(v=>{let y=n.filter(h=>h!==null&&h.rating===t.valuePlayerExactOvr_playerExactOvr).length;return t.isMinOrMax_playerExactOvr===0?y<t.numPlayerExactOvr_playerExactOvr:y<=t.numPlayerExactOvr_playerExactOvr})),t.isMinOrMax_PlayerTradability!==null){let v=n.filter(h=>h!==null&&h.untradeable).length,y=t.NumUntradableOrTradable_PlayerTradability-v;t.isMinOrMax_PlayerTradability===0&&y>0&&y>=z.length-n.length?w=w.filter(h=>h.untradeable):t.isMinOrMax_PlayerTradability===1&&v>t.NumUntradableOrTradable_PlayerTradability&&(w=w.filter(h=>!h.untradeable))}if(t.isMinOrMax_firstOwnerPlayersCount!==null){let v=n.filter(h=>h!==null&&h.owners===1).length,y=t.numPlayerFirstOwner_firstOwnerPlayersCount-v;t.isMinOrMax_firstOwnerPlayersCount===0&&y>0&&y>=z.length-n.length?w=w.filter(h=>h.owners===1):t.isMinOrMax_firstOwnerPlayersCount===1&&v>t.numPlayerFirstOwner_firstOwnerPlayersCount&&(w=w.filter(h=>h.owners!==1))}w.sort((v,y)=>v.rating!==y.rating?v.rating-y.rating:t.prefUntradable&&v.untradeable!==y.untradeable?y.untradeable-v.untradeable:t.prefStoragePile&&v.pile!==y.pile?y.pile===10?1:-1:0);for(let v of w){if(!Wi(n,v,t))continue;n[B]=v;let h=Dt(n,t).total;if(l.formazioniLocali=la([...n],h,t,i,r,s,l,c),Me||(n[B]=null,l.formazioniLocali.length>=c||l.foundValid))return l.formazioniLocali}}else{let B=nt[ia].formation.slice();if(t.isMinOrMax_playerMinOvr!==null&&t.isMinOrMax_playerMinOvr===0){let M=[...B].sort((Y,F)=>F-Y)[t.numPlayerMinOvr_playerMinOvr-1],T=0;for(let Y=0;Y<B.length;Y++)B[Y]>=M&&T<t.numPlayerMinOvr_playerMinOvr&&(B[Y]=t.valuePlayerMinOvr_playerMinOvr,T++);C=t.valuePlayerMinOvr_playerMinOvr}let w=n.reduce((b,M)=>(M!==null&&(b[M.rating]=(b[M.rating]||0)+1),b),{});for(let b in w)for(let M=0;M<w[b];M++){let T=B.indexOf(parseInt(b));T!==-1&&B.splice(T,1)}let f=j.filter(b=>!n.some(M=>M&&M.assetId===b.assetId)&&(t.ratingMinimo===null||b.rating>=x&&b.rating<=C)&&(t.ratingMassimo===null||b.rating<=t.ratingMassimo+2)&&jt([...n.filter(M=>M!==null),b],t));if(t.isMinOrMax_playerLevel!==null&&t.isMinOrMax_playerLevel.length>0&&t.isMinOrMax_playerLevel.some(M=>M===0||M===2)){let M=[];t.valuePlayerLevel_playerLevel.forEach((T,Y)=>{let F=t.isMinOrMax_playerLevel[Y];if(F===0||F===2){let V=[];T===1?V=f.filter(p=>p.rating<=64):T===2?V=f.filter(p=>p.rating>64&&p.rating<75):T===3&&(V=f.filter(p=>p.rating>=75)),M=[...new Set([...M,...V])]}}),M.length>0&&(f=M)}if(t.isMinOrMax_playerQuality!==null&&(t.isMinOrMax_playerQuality===0?t.qualityFromRequirements_playerQuality===2?f=f.filter(b=>b.rating>64):t.qualityFromRequirements_playerQuality===3&&(f=f.filter(b=>b.rating>74)):t.isMinOrMax_playerQuality===1?t.qualityFromRequirements_playerQuality===1?f=f.filter(b=>b.rating<=64):t.qualityFromRequirements_playerQuality===2?f=f.filter(b=>b.rating<=74):t.qualityFromRequirements_playerQuality===3&&(f=f.filter(b=>b.rating>75)):t.isMinOrMax_playerQuality===2&&(t.qualityFromRequirements_playerQuality===1?f=f.filter(b=>b.rating<=64):t.qualityFromRequirements_playerQuality===2?f=f.filter(b=>b.rating<=74&&b.rating>64):t.qualityFromRequirements_playerQuality===3&&(f=f.filter(b=>b.rating>75)))),n.filter(b=>b!==null&&b.groups&&b.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)).length<t.numPlayersOfplayerRarityGroupX_playerRarityGroup&&t.isMinOrMax_playerRarityGroup!==null&&(t.isMinOrMax_playerRarityGroup===0?f=f.filter(b=>b.groups&&b.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)):t.isMinOrMax_playerRarityGroup===1&&(f=f.filter(b=>b.groups&&!b.groups.includes(t.valuePlayerRarityGroup_playerRarityGroup)))),Dn(n,t)||(t.isMinOrMax_sameNationCount!==null&&(f=f.filter(b=>{let M=n.filter(T=>T!==null&&T.nation===b.nation).length;return t.isMinOrMax_sameNationCount===0?M<t.sameNationCountValue_sameNationCount:M<=t.sameNationCountValue_sameNationCount})),t.isMinOrMax_SameLeagueCount!==null&&(f=f.filter(b=>{let M=n.filter(T=>T!==null&&T.leagueId===b.leagueId).length;return t.isMinOrMax_SameLeagueCount===0?M<t.sameLeagueCountValue_SameLeagueCount:M<=t.sameLeagueCountValue_SameLeagueCount})),t.isMinOrMax_SameClubCount!==null&&(f=f.filter(b=>{let M=n.filter(T=>T!==null&&T.teamid===b.teamid).length;return t.isMinOrMax_SameClubCount===0?M<t.sameClubCountValue_SameClubCount:M<=t.sameClubCountValue_SameClubCount}))),t.isMinOrMax_NationCount!==null){let b=new Set(n.filter(M=>M!==null).map(M=>M.nation));t.isMinOrMax_NationCount===0&&b.size<t.NationCountValue_NationCount?f.sort((M,T)=>b.has(M.nation)-b.has(T.nation)):t.isMinOrMax_NationCount===1&&b.size>=t.NationCountValue_NationCount&&f.sort((M,T)=>b.has(T.nation)-b.has(M.nation))}if(t.isMinOrMax_leagueCount!==null){let b=new Set(n.filter(M=>M!==null).map(M=>M.leagueId));t.isMinOrMax_leagueCount===0&&b.size<t.numLeagueCount_leagueCount?f.sort((M,T)=>b.has(M.leagueId)-b.has(T.leagueId)):t.isMinOrMax_leagueCount===1&&b.size>=t.numLeagueCount_leagueCount&&f.sort((M,T)=>b.has(T.leagueId)-b.has(M.leagueId))}if(t.isMinOrMax_clubCount!==null){let b=new Set(n.filter(M=>M!==null).map(M=>M.teamid));t.isMinOrMax_clubCount===0&&b.size<t.clubValue_ClubCount?f.sort((M,T)=>b.has(M.teamid)-b.has(T.teamid)):t.isMinOrMax_clubCount===1&&b.size>=t.clubValue_ClubCount&&f.sort((M,T)=>b.has(T.teamid)-b.has(M.teamid))}if(t.isMinOrMax_playerMaxOvr!==null&&(f=f.filter(b=>{let M=n.filter(T=>T!==null&&T.rating<=t.valuePlayerMaxOvr_playerMaxOvr).length;return t.isMinOrMax_playerMaxOvr===0?M<t.numPlayerMaxOvr_playerMaxOvr:M<=t.numPlayerMaxOvr_playerMaxOvr})),t.isMinOrMax_playerMinOvr!==null&&(f=f.filter(b=>{let M=n.filter(T=>T!==null&&T.rating>=t.valuePlayerMinOvr_playerMinOvr).length;return t.isMinOrMax_playerMinOvr===0?M<t.numPlayerMinOvr_playerMinOvr:M<=t.numPlayerMinOvr_playerMinOvr})),t.isMinOrMax_playerExactOvr!==null&&(f=f.filter(b=>{let M=n.filter(T=>T!==null&&T.rating===t.valuePlayerExactOvr_playerExactOvr).length;return t.isMinOrMax_playerExactOvr===0?M<t.numPlayerExactOvr_playerExactOvr:M<=t.numPlayerExactOvr_playerExactOvr})),t.isMinOrMax_PlayerTradability!==null){let b=n.filter(T=>T!==null&&T.untradeable).length,M=t.NumUntradableOrTradable_PlayerTradability-b;t.isMinOrMax_PlayerTradability===0&&M>0&&M>=z.length-n.length?f=f.filter(T=>T.untradeable):t.isMinOrMax_PlayerTradability===1&&b>t.NumUntradableOrTradable_PlayerTradability&&(f=f.filter(T=>!T.untradeable))}if(t.isMinOrMax_firstOwnerPlayersCount!==null){let b=n.filter(T=>T!==null&&T.owners===1).length,M=t.numPlayerFirstOwner_firstOwnerPlayersCount-b;t.isMinOrMax_firstOwnerPlayersCount===0&&M>0&&M>=z.length-n.length?f=f.filter(T=>T.owners===1):t.isMinOrMax_firstOwnerPlayersCount===1&&b>t.numPlayerFirstOwner_firstOwnerPlayersCount&&(f=f.filter(T=>T.owners!==1))}f.sort((b,M)=>b.rating!==M.rating?b.rating-M.rating:t.prefUntradable&&b.untradeable!==M.untradeable?M.untradeable-b.untradeable:t.prefStoragePile&&b.pile!==M.pile?M.pile===10?1:-1:b.rareflag!==M.rareflag?b.rareflag-M.rareflag:0);for(let b of g){if(B.length===0)break;var d=B.shift(),m=f.find(M=>M.rating===d&&!n.some(T=>T&&T.assetId===M.assetId));m&&(n[b]=m,f=f.filter(M=>M!==m))}let h=Dt(n,t).total,E=n.filter(b=>b!==null).length,A=n.filter(b=>b!==null),P=vn(A.map(b=>b.rating));if(E===z.length&&jt(n,t)&&P>=t.ratingMinimo){let b=A.reduce((M,T)=>M+T.marketAverage,0);return l.formazioniLocali.push({formazione:[...A],intesa:e,costo:b}),l.foundValid=!0,Me=!0,l.formazioniLocali}else if(Me=!0,l.formazioniLocali=la([...n],h,t,i,r,s,l,c),Me)return l.formazioniLocali}}return l.formazioniLocali}function Qi(n,e){let t={minTeamId:[],minLeagueId:[],minNation:[]};if(n.forEach(i=>{(Array.isArray(e.minTeamId)?e.minTeamId.flat(1/0):[e.minTeamId]).includes(i.teamid)&&t.minTeamId.push(i),e.minLeagueId&&(Array.isArray(e.minLeagueId)?e.minLeagueId.flat(1/0):[e.minLeagueId]).includes(i.leagueId)&&t.minLeagueId.push(i),e.minNation&&(Array.isArray(e.minNation)?e.minNation.flat(1/0):[e.minNation]).includes(i.nation)&&t.minNation.push(i)}),e.ratingMinimo!==null){let i=e.ratingMinimo;Object.keys(t).forEach(r=>{t[r]=t[r].sort((s,l)=>{let c=Math.abs(s.rating-i),o=Math.abs(l.rating-i);return c!==o?c-o:s.rating-l.rating})})}else Object.keys(t).forEach(i=>{t[i].sort((r,s)=>r.rating-s.rating)});return t}function jt(n,e){let t={teamid:{},nation:{},league:{},rareflag:{},playerLevel:{low:0,mid:0,high:0},playerRarityGroup:{},playerMaxOvr:0,playerMinOvr:0,playerExactOvr:0,untradeable:0,firstOwner:0};n.forEach(s=>{t.teamid[s.teamid]=(t.teamid[s.teamid]||0)+1,t.nation[s.nation]=(t.nation[s.nation]||0)+1,t.league[s.leagueId]=(t.league[s.leagueId]||0)+1,t.rareflag[s.rareflag]=(t.rareflag[s.rareflag]||0)+1,s.untradeable&&(t.untradeable+=1),s.owners===1&&(t.firstOwner+=1),s.rating<=64?t.playerLevel.low+=1:s.rating>64&&s.rating<=74?t.playerLevel.mid+=1:s.rating>=75&&(t.playerLevel.high+=1),s.groups&&s.groups.includes(e.valuePlayerRarityGroup_playerRarityGroup)&&(t.playerRarityGroup[e.valuePlayerRarityGroup_playerRarityGroup]=(t.playerRarityGroup[e.valuePlayerRarityGroup_playerRarityGroup]||0)+1),s.rating<=e.valuePlayerMaxOvr_playerMaxOvr&&(t.playerMaxOvr+=1),s.rating>=e.valuePlayerMinOvr_playerMinOvr&&(t.playerMinOvr+=1),s.rating===e.valuePlayerExactOvr_playerExactOvr&&(t.playerExactOvr+=1)});let i=z.length-n.filter(s=>s!==null).length;var r=n.filter(s=>s!==null).length;if(e.isMinOrMax_sameNationCount!==null&&r>e.sameNationCountValue_sameNationCount){let s=Object.keys(t.nation),l;e.isMinOrMax_sameNationCount===0?l=!1:e.isMinOrMax_sameNationCount===1&&(l=!0);for(let c of s){let o=t.nation[c],u=e.sameNationCountValue_sameNationCount-o;if(e.isMinOrMax_sameNationCount===0&&u<=i){l=!0;break}else if(e.isMinOrMax_sameNationCount===1&&o>e.sameNationCountValue_sameNationCount){l=!1;break}}if(!l)return!1}if(e.isMinOrMax_SameLeagueCount!==null&&r>e.sameLeagueCountValue_SameLeagueCount){let s=Object.keys(t.league),l;e.isMinOrMax_SameLeagueCount===0?l=!1:e.isMinOrMax_SameLeagueCount===1&&(l=!0);for(let c of s){let o=t.league[c],u=e.sameLeagueCountValue_SameLeagueCount-o;if(e.isMinOrMax_SameLeagueCount===0&&u<=i){l=!0;break}else if(e.isMinOrMax_SameLeagueCount===1&&o>e.sameLeagueCountValue_SameLeagueCount){l=!1;break}}if(!l)return!1}if(e.isMinOrMax_SameClubCount!==null&&r>e.sameClubCountValue_SameClubCount){let s=Object.keys(t.teamid),l;e.isMinOrMax_SameClubCount===0?l=!1:e.isMinOrMax_SameClubCount===1&&(l=!0);for(let c of s){let o=t.teamid[c],u=e.sameClubCountValue_SameClubCount-o;if(e.isMinOrMax_SameClubCount===0&&u<=i){l=!0;break}else if(e.isMinOrMax_SameClubCount===1&&o>e.sameClubCountValue_SameClubCount){l=!1;break}}if(!l)return!1}if(e.isMinOrMax_NationCount!==null){let s=Object.keys(t.nation).length;if(r>e.NationCountValue_NationCount){if(e.isMinOrMax_NationCount===0&&s<e.NationCountValue_NationCount)return!1;if(e.isMinOrMax_NationCount===1&&s>e.NationCountValue_NationCount)return!1}}if(e.isMinOrMax_leagueCount!==null){let s=Object.keys(t.league).length;if(r>e.numLeagueCount_leagueCount){if(e.isMinOrMax_leagueCount===0&&s<e.numLeagueCount_leagueCount)return!1;if(e.isMinOrMax_leagueCount===1&&s>e.numLeagueCount_leagueCount)return!1}}if(e.isMinOrMax_clubCount!==null){let s=Object.keys(t.teamid).length;if(r>e.clubValue_ClubCount){if(e.isMinOrMax_clubCount===0&&s<e.clubValue_ClubCount)return!1;if(e.isMinOrMax_clubCount===1&&s>e.clubValue_ClubCount)return!1}}if(e.isMinOrMax_playerMaxOvr!==null){if(e.isMinOrMax_playerMaxOvr===0&&e.numPlayerMaxOvr_playerMaxOvr-t.playerMaxOvr>i){if(t.playerMaxOvr<e.numPlayerMaxOvr_playerMaxOvr)return!1}else if(e.isMinOrMax_playerMaxOvr===1&&t.playerMaxOvr>e.numPlayerMaxOvr_playerMaxOvr)return!1}if(e.isMinOrMax_playerMinOvr!==null){if(e.isMinOrMax_playerMinOvr===0&&e.numPlayerMinOvr_playerMinOvr-t.playerMinOvr>i){if(t.playerMinOvr<e.numPlayerMinOvr_playerMinOvr)return!1}else if(e.isMinOrMax_playerMinOvr===1&&t.playerMinOvr>e.numPlayerMinOvr_playerMinOvr)return!1}if(e.isMinOrMax_playerExactOvr!==null){if(e.isMinOrMax_playerExactOvr===0&&e.numPlayerExactOvr_playerExactOvr-t.playerExactOvr>i){if(t.playerExactOvr<e.numPlayerExactOvr_playerExactOvr)return!1}else if(e.isMinOrMax_playerExactOvr===1&&t.playerExactOvr>e.numPlayerExactOvr_playerExactOvr)return!1}if(e.isMinOrMax_PlayerTradability!==null){let s=e.NumUntradableOrTradable_PlayerTradability-t.untradeable;if(e.isMinOrMax_PlayerTradability===0&&s>0&&s>=i)return!1;if(e.isMinOrMax_PlayerTradability===1&&t.untradeable>e.NumUntradableOrTradable_PlayerTradability)return!1}if(e.isMinOrMax_firstOwnerPlayersCount!==null){let s=e.numPlayerFirstOwner_firstOwnerPlayersCount-t.firstOwner;if(e.isMinOrMax_firstOwnerPlayersCount===0&&s>0&&s>=i)return!1;if(e.isMinOrMax_firstOwnerPlayersCount===1&&t.firstOwner>e.numPlayerFirstOwner_firstOwnerPlayersCount)return!1}if(e.isMinOrMax_AllPlayersChemistryPoints!==null){let l=Dt(n,e).playerChemistry;for(let c of n){if(c===null)continue;let o=l.get(c.assetId)||0;if(e.isMinOrMax_AllPlayersChemistryPoints===0){if(n.length===z.length&&o<e.numChemistryAllPlayers_AllPlayersChemistryPoints)return!1}else if(e.isMinOrMax_AllPlayersChemistryPoints===1&&o>e.numChemistryAllPlayers_AllPlayersChemistryPoints)return!1}}if(z.length===n.length&&e.numPlayersOfplayerRarityGroupX_playerRarityGroup!=null&&(t.playerRarityGroup==null||Object.keys(t.playerRarityGroup).length===0))return!1;if(e.maxteamid){for(let s of e.maxteamid)if((t.teamid[s]||0)>e.maxteamidCount)return!1}if(e.maxNation){for(let s of e.maxNation)if((t.nation[s]||0)>e.maxNationCount)return!1}if(e.maxLeagueId){for(let s of e.maxLeagueId)if((t.league[s]||0)>e.maxLeagueIdCount)return!1}if(e.isMinOrMax_playerRarity===1&&(t.rareflag[e.rarityFromRequirements_playerRarity]||0)>e.numrarityFromRequirements_playerRarity)return!1;if(Array.isArray(e.isMinOrMax_playerLevel)){for(let s=0;s<e.isMinOrMax_playerLevel.length;s++)if(e.isMinOrMax_playerLevel[s]===1){if(e.valuePlayerLevel_playerLevel[s]===1&&t.playerLevel.low>e.numPlayerLevel_playerLevel[s])return!1;if(e.valuePlayerLevel_playerLevel[s]===2&&t.playerLevel.mid>e.numPlayerLevel_playerLevel[s])return!1;if(e.valuePlayerLevel_playerLevel[s]===3&&t.playerLevel.high>e.numPlayerLevel_playerLevel[s])return!1}else if(e.isMinOrMax_playerLevel[s]===0){if(e.valuePlayerLevel_playerLevel[s]===1&&e.numPlayerLevel_playerLevel[s]-t.playerLevel.low>=z.length-n.length&&t.playerLevel.low<e.numPlayerLevel_playerLevel[s])return!1;if(e.valuePlayerLevel_playerLevel[s]===2&&e.numPlayerLevel_playerLevel[s]-t.playerLevel.mid>=z.length-n.length&&t.playerLevel.mid<e.numPlayerLevel_playerLevel[s])return!1;if(e.valuePlayerLevel_playerLevel[s]===3&&e.numPlayerLevel_playerLevel[s]-t.playerLevel.high>=z.length-n.length&&t.playerLevel.high<e.numPlayerLevel_playerLevel[s])return!1}}if(e.isMinOrMax_playerRarityGroup===0&&e.numPlayersOfplayerRarityGroupX_playerRarityGroup-t.playerRarityGroup[e.valuePlayerRarityGroup_playerRarityGroup]>=z.length-n.length){if((t.playerRarityGroup[e.valuePlayerRarityGroup_playerRarityGroup]||0)<e.numPlayersOfplayerRarityGroupX_playerRarityGroup)return!1}else if(e.isMinOrMax_playerRarityGroup===1&&(t.playerRarityGroup[e.valuePlayerRarityGroup_playerRarityGroup]||0)>e.numPlayersOfplayerRarityGroupX_playerRarityGroup)return!1;return!0}async function Xn(n=1){var e={ratingMinimo:null,ratingMassimo:null,minTeamId:[],minTeamIdCount:[],minLeagueId:[],minLeagueIdCount:[],minNation:[],minNationCount:[],maxNation:[],maxNationCount:[],maxLeagueId:null,maxLeagueIdCount:null,maxteamid:null,maxteamidCount:null,prefUntradable:document.getElementById("checkboxPrefUntreadable").checked,prefStoragePile:document.getElementById("checkboxPrefStorage").checked,isMinOrMax_playerRarity:Wa!==void 0?Wa:null,rarityFromRequirements_playerRarity:pa!==void 0?pa:null,numrarityFromRequirements_playerRarity:fa!==void 0?fa:null,isMinOrMax_playerQuality:ka!==void 0?ka:null,qualityFromRequirements_playerQuality:Ia!==void 0?Ia:null,valuePlayerLevel_playerLevel:ca!==void 0?ca:null,isMinOrMax_playerLevel:La!==void 0?La:null,numPlayerLevel_playerLevel:Aa!==void 0?Aa:null,valuePlayerRarityGroup_playerRarityGroup:ta!==void 0?ta:null,isMinOrMax_playerRarityGroup:qa!==void 0?qa:null,numPlayersOfplayerRarityGroupX_playerRarityGroup:Ja!==void 0?Ja:null,sameNationCountValue_sameNationCount:Oa!==void 0?Oa:null,isMinOrMax_sameNationCount:Da!==void 0?Da:null,sameLeagueCountValue_SameLeagueCount:Ra!==void 0?Ra:null,isMinOrMax_SameLeagueCount:Xt!==void 0?Xt:null,sameClubCountValue_SameClubCount:Fa!==void 0?Fa:null,isMinOrMax_SameClubCount:Ua!==void 0?Ua:null,NationCountValue_NationCount:za!==void 0?za:null,isMinOrMax_NationCount:Va!==void 0?Va:null,numLeagueCount_leagueCount:Ga!==void 0?Ga:null,isMinOrMax_leagueCount:ja!==void 0?ja:null,clubValue_ClubCount:Ha!==void 0?Ha:null,isMinOrMax_clubCount:$a!==void 0?$a:null,isMinOrMax_playerMaxOvr:Xa!==void 0?Xa:null,numPlayerMaxOvr_playerMaxOvr:Za!==void 0?Za:null,valuePlayerMaxOvr_playerMaxOvr:en!==void 0?en:null,isMinOrMax_playerMinOvr:tn!==void 0?tn:null,numPlayerMinOvr_playerMinOvr:an!==void 0?an:null,valuePlayerMinOvr_playerMinOvr:nn!==void 0?nn:null,isMinOrMax_playerExactOvr:rn!==void 0?rn:null,numPlayerExactOvr_playerExactOvr:sn!==void 0?sn:null,valuePlayerExactOvr_playerExactOvr:ln!==void 0?ln:null,isMinOrMax_PlayerTradability:dn!==void 0?dn:null,isUntradableOrTradable_PlayerTradability:un!==void 0?un:null,NumUntradableOrTradable_PlayerTradability:mn!==void 0?mn:null,isMinOrMax_firstOwnerPlayersCount:on!==void 0?on:null,numPlayerFirstOwner_firstOwnerPlayersCount:cn!==void 0?cn:null,isMinOrMax_AllPlayersChemistryPoints:Ta!==void 0?Ta:null,numChemistryAllPlayers_AllPlayersChemistryPoints:_a!==void 0?_a:null,intesaDaRaggiungere:ti||0};Jt!=null?Jt===0?e.ratingMinimo=Pa:e.ratingMassimo=Pa:(e.ratingMinimo=null,e.ratingMassimo=null),ea!=null?ea.forEach((p,N)=>{p===0?(e.minTeamId.push(ma[N]),e.minTeamIdCount.push(Ya[N])):(e.maxteamid.push(ma[N]),e.maxteamidCount.push(Ya[N]))}):(e.minTeamId=[],e.minTeamIdCount=[],e.maxteamid=null,e.maxteamidCount=null),va=!1,Tn=!1,kt!=null?kt.forEach((p,N)=>{p===0||p===2?(kt[N]=0,va=!0,e.minLeagueId.push(ua[N]),e.minLeagueIdCount.push(Qa[N])):(e.maxLeagueId.push(ua[N]),e.maxLeagueIdCount.push(Qa[N]))}):(e.minLeagueId=[],e.minLeagueIdCount=[],e.maxLeagueId=null,e.maxLeagueIdCount=null),Zt!=null?Zt.forEach((p,N)=>{p===0?(e.minNation.push(da[N]),e.minNationCount.push(Ka[N])):(e.maxNation.push(da[N]),e.maxNationCount.push(Ka[N]))}):(e.minNation=[],e.minNationCount=[],e.maxNation=null,e.maxNationCount=null),j.forEach(p=>{if(!p.marketAverage){let N;p.rating<=75?N=ra[75]:p.rating>92?N=ra[92]+(p.rating-92)*5e4:N=ra[p.rating]||0,p.rareflag>1&&(N*=10),p.marketAverage=N}}),j=j.filter(p=>(!p.loansInfo||p.loansInfo.length===0)&&p.marketAverage&&(p.pile===7||p.pile===10)),Qn={formazione:[],intesa:0,costo:1/0},Me=!1;let t=e.minTeamId?j.filter(p=>e.minTeamId.some(N=>Array.isArray(N)?N.includes(p.teamid):p.teamid===N)):[],i=e.minLeagueId?j.filter(p=>e.minLeagueId.some(N=>Array.isArray(N)?N.includes(p.leagueId):p.leagueId===N)):[],r=e.minNation?j.filter(p=>e.minNation.some(N=>Array.isArray(N)?N.includes(p.nation):p.nation===N)):[];var s;e.isMinOrMax_playerQuality!==null&&(e.isMinOrMax_playerQuality===0?e.qualityFromRequirements_playerQuality===2?(t=t.filter(p=>p.rating>64),i=i.filter(p=>p.rating>64),r=r.filter(p=>p.rating>64),s=j.filter(p=>p.rating>64)):e.qualityFromRequirements_playerQuality===3&&(t=t.filter(p=>p.rating>=75),i=i.filter(p=>p.rating>=75),r=r.filter(p=>p.rating>=75),s=j.filter(p=>p.rating>=75)):e.isMinOrMax_playerQuality===1?e.qualityFromRequirements_playerQuality===1?(t=t.filter(p=>p.rating<=64),i=i.filter(p=>p.rating<=64),r=r.filter(p=>p.rating<=64),s=j.filter(p=>p.rating<=64)):e.qualityFromRequirements_playerQuality===2?(t=t.filter(p=>p.rating<=74),i=i.filter(p=>p.rating<=74),r=r.filter(p=>p.rating<=74),s=j.filter(p=>p.rating<=74)):e.qualityFromRequirements_playerQuality===3&&(t=t.filter(p=>p.rating>=75),i=i.filter(p=>p.rating>=75),r=r.filter(p=>p.rating>=75),s=j.filter(p=>p.rating>=75)):e.isMinOrMax_playerQuality===2&&(e.qualityFromRequirements_playerQuality===1?(t=t.filter(p=>p.rating<=64),i=i.filter(p=>p.rating<=64),r=r.filter(p=>p.rating<=64),s=j.filter(p=>p.rating<=64)):e.qualityFromRequirements_playerQuality===2?(t=t.filter(p=>p.rating<=74&&p.rating>64),i=i.filter(p=>p.rating<=74&&p.rating>64),r=r.filter(p=>p.rating<=74&&p.rating>64),s=j.filter(p=>p.rating<=74&&p.rating>64)):e.qualityFromRequirements_playerQuality===3&&(t=t.filter(p=>p.rating>=75),i=i.filter(p=>p.rating>=75),r=r.filter(p=>p.rating>=75),s=j.filter(p=>p.rating>=75))));let l=[[]];if(e.isMinOrMax_SameClubCount===0&&e.sameClubCountValue_SameClubCount>0){let p;va?p=i:p=j,e.ratingMinimo!==null&&(p=p.filter(_=>_.rating>=e.ratingMinimo-10&&_.rating<=e.ratingMinimo+10)),e.isMinOrMax_playerQuality!==null&&(e.isMinOrMax_playerQuality===0?e.qualityFromRequirements_playerQuality===2?p=p.filter(_=>_.rating>64):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(_=>_.rating>=75)):e.isMinOrMax_playerQuality===1?e.qualityFromRequirements_playerQuality===1?p=p.filter(_=>_.rating<=64):e.qualityFromRequirements_playerQuality===2?p=p.filter(_=>_.rating<=74):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(_=>_.rating>=75)):e.isMinOrMax_playerQuality===2&&(e.qualityFromRequirements_playerQuality===1?p=p.filter(_=>_.rating<=64):e.qualityFromRequirements_playerQuality===2?p=p.filter(_=>_.rating<=74&&_.rating>64):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(_=>_.rating>=75))));let N=p.reduce((_,S)=>(_[S.teamid]||(_[S.teamid]=[]),_[S.teamid].push(S),_),{});l=Object.values(N).flatMap(_=>Ue(_,e.sameClubCountValue_SameClubCount,null,null,e)),l.length===0&&va&&(Tn=!0,Ti="Not enough players of the same club in the required league")}let c=[[]];if(e.isMinOrMax_clubCount!==null&&e.isMinOrMax_clubCount===1){let p=j;e.ratingMinimo!==null&&(p=p.filter(S=>S.rating>=e.ratingMinimo-10&&S.rating<=e.ratingMinimo+10)),e.isMinOrMax_playerQuality!==null&&(e.isMinOrMax_playerQuality===0?e.qualityFromRequirements_playerQuality===2?p=p.filter(S=>S.rating>64):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(S=>S.rating>=75)):e.isMinOrMax_playerQuality===1?e.qualityFromRequirements_playerQuality===1?p=p.filter(S=>S.rating<=64):e.qualityFromRequirements_playerQuality===2?p=p.filter(S=>S.rating<=74):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(S=>S.rating>=75)):e.isMinOrMax_playerQuality===2&&(e.qualityFromRequirements_playerQuality===1?p=p.filter(S=>S.rating<=64):e.qualityFromRequirements_playerQuality===2?p=p.filter(S=>S.rating<=74&&S.rating>64):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(S=>S.rating>=75))));let N=p.reduce((S,k)=>(S[k.teamid]||(S[k.teamid]=[]),S[k.teamid].push(k),S),{}),_=Object.values(N).reduce((S,k)=>k.length>S.length?k:S,[]);c=Ue(_,2,null,null,e)}if(he&&he.length>0&&(oe[0]=j.filter(p=>he.includes(p.id)),he=[]),e.ratingMinimo!==null){we=0;let p=e.ratingMinimo;nt=ql(p),nt.length>0&&(Lt=nt[0].formation,Se=Math.min(...Lt),we=Math.max(...Lt)),e.ratingMinimo<=75&&(Se=e.ratingMinimo-10,we=e.ratingMinimo+10),t=t.filter(N=>N.rating>=Se&&N.rating<=we),i=i.filter(N=>N.rating>=Se&&N.rating<=we),r=r.filter(N=>N.rating>=Se&&N.rating<=we),l=l.filter(N=>N.every(_=>_.rating>=Se&&_.rating<=we)),c=c.filter(N=>N.every(_=>_.rating>=Se&&_.rating<=we))}let o=1e3,u=[[]],d=[[]],m=[[]];var g=e.ratingMinimo!==null&&e.ratingMinimo>75?nt:null;e.minTeamId&&(u=e.minTeamId.map((p,N)=>{let _=Array.isArray(p)?t.filter(S=>p.includes(S.teamid)):t.filter(S=>S.teamid===p);return Ue(_,e.minTeamIdCount[N],g,o,e)}).reduce((p,N)=>p.flatMap(_=>N.map(S=>[..._,...S])),[[]]).filter(p=>e.ratingMinimo!==null&&e.ratingMinimo>75?Ke(p,g):!0).slice(0,o)),e.minLeagueId&&(d=e.minLeagueId.map((p,N)=>{var _=Array.isArray(p)?i.filter(k=>p.includes(k.leagueId)):i.filter(k=>k.leagueId===p),S=0;if(l.length>0&&e.isMinOrMax_SameClubCount!==null&&e.isMinOrMax_SameClubCount===0&&(S=l[0].length),g!==null){let k=new Set(g.flatMap(R=>R.formation));return _=_.filter(R=>k.has(R.rating)),Xl(_,e.minLeagueIdCount[N]-S,g,o,e,l)}return Ue(_,e.minLeagueIdCount[N]-S,g,o,e,l)}).reduce((p,N)=>p.flatMap(_=>N.map(S=>[..._,...S])),[[]]).filter(p=>e.ratingMinimo!==null&&e.ratingMinimo>75?Ke(p,g):!0).slice(0,o)),e.minNation&&(m=e.minNation.map((p,N)=>{let _=Array.isArray(p)?r.filter(S=>p.includes(S.nation)):r.filter(S=>S.nation===p);return Ue(_,e.minNationCount[N],g,o,e)}).reduce((p,N)=>p.flatMap(_=>N.map(S=>[..._,...S])),[[]]).filter(p=>e.ratingMinimo!==null&&e.ratingMinimo>75?Ke(p,g):!0).slice(0,o)),l=l.filter(p=>e.ratingMinimo!==null&&e.ratingMinimo>75?Ke(p,g):!0);let x=[[]];if(e.valuePlayerRarityGroup_playerRarityGroup===23&&e.numrarityFromRequirements_playerRarity==null){if(e.numrarityFromRequirements_playerRarity=1,e.isMinOrMax_playerRarity=0,e.rarityFromRequirements_playerRarity=3,e.numrarityFromRequirements_playerRarity>0&&e.isMinOrMax_playerRarity===0&&e.rarityFromRequirements_playerRarity!==0&&e.rarityFromRequirements_playerRarity!==1){let p=0;if(oe&&oe[0]&&oe[0].length>0&&(p=oe[0].filter(N=>N.rareflag===e.rarityFromRequirements_playerRarity||N.rareflag===11).length),!(p>=e.numrarityFromRequirements_playerRarity)){let N=e.numrarityFromRequirements_playerRarity-p;if(N>0){let _=[];oe&&oe[0]&&(_=oe[0].map(k=>k.assetId));let S=j.filter(k=>k.rareflag===e.rarityFromRequirements_playerRarity&&!_.includes(k.assetId)).sort((k,R)=>k.rating-R.rating);S.length===0&&(S=j.filter(k=>k.rareflag===11&&!_.includes(k.assetId)).sort((k,R)=>k.rating-R.rating)),x=Ue(S,N,e.ratingMinimo!==null?g:null,o,e).filter(k=>e.ratingMinimo!==null&&e.ratingMinimo>75?Ke(k,g):!0).slice(0,o)}}}}else if(e.numrarityFromRequirements_playerRarity>0&&e.isMinOrMax_playerRarity===0&&e.rarityFromRequirements_playerRarity!==0&&e.rarityFromRequirements_playerRarity!==1){let p=0;if(oe&&oe[0]&&oe[0].length>0&&(p=oe[0].filter(N=>N.rareflag===e.rarityFromRequirements_playerRarity).length),!(p>=e.numrarityFromRequirements_playerRarity)){let N=e.numrarityFromRequirements_playerRarity-p;if(N>0){let _=[];oe&&oe[0]&&(_=oe[0].map(k=>k.assetId));let S;e.isMinOrMax_playerQuality!==null?S=s.filter(k=>k.rareflag===e.rarityFromRequirements_playerRarity&&!_.includes(k.assetId)).sort((k,R)=>k.rating-R.rating):S=j.filter(k=>k.rareflag===e.rarityFromRequirements_playerRarity&&!_.includes(k.assetId)).sort((k,R)=>k.rating-R.rating),x=Ue(S,N,e.ratingMinimo!==null?g:null,o,e).filter(k=>e.ratingMinimo!==null&&e.ratingMinimo>75?Ke(k,g):!0).slice(0,o)}}}function C(p,N){let _=p.slice();for(let S=p.length-1;S>0;S--){let k=Math.floor(Math.random()*(S+1));[_[S],_[k]]=[_[k],_[S]]}return _.slice(0,N)}let B=1e3,w=[],f=C(u,Math.min(B,u.length)),v=C(d,Math.min(B,d.length)),y=C(m,Math.min(B,m.length)),h=C(l,Math.min(B,l.length)),E=C(c,Math.min(B,c.length));f.length===0&&f.push([]),v.length===0&&v.push([]),y.length===0&&y.push([]),h.length===0&&h.push([]),E.length===0&&E.push([]);var A=[];for(let p of f)for(let N of v)for(let _ of y)for(let S of x)for(let k of h)for(let R of E)for(let W of oe||[]){let ie=[...p,...N,..._,...S,...k,...R,...W];if(new Set(ie.map(U=>U.assetId)).size!==ie.length||e.ratingMinimo!==null&&e.ratingMinimo>75&&!Ke(ie,nt))continue;A.push(ie);let q=On(ie,z);for(let U of q)new Set(U.map(X=>X.positionIndex)).size===ie.length&&w.push(U)}if(w.length===0&&A.length>0){let p=[];for(let N of A){let _=Yi(N,z);p.push(_)}w.push(...p)}let P=[[]];if((w.length===0||w.length===1)&&Xt!==null&&e.isMinOrMax_SameLeagueCount===0){let p=j;e.ratingMinimo!==null&&(p=p.filter(N=>N.rating>=e.ratingMinimo-10&&N.rating<=e.ratingMinimo+10)),e.isMinOrMax_playerLevel!==null&&(e.isMinOrMax_playerLevel.includes(0)?(e.valuePlayerLevel_playerLevel.includes(1)&&(p=p.filter(N=>N.rating<=64)),e.valuePlayerLevel_playerLevel.includes(2)&&(p=p.filter(N=>N.rating>64&&N.rating<75)),e.valuePlayerLevel_playerLevel.includes(3)&&(p=p.filter(N=>N.rating>=75))):e.isMinOrMax_playerLevel.includes(2)&&(e.valuePlayerLevel_playerLevel.includes(1)&&(p=p.filter(N=>N.rating<=64)),e.valuePlayerLevel_playerLevel.includes(2)&&(p=p.filter(N=>N.rating>64&&N.rating<75)),e.valuePlayerLevel_playerLevel.includes(3)&&(p=p.filter(N=>N.rating>=75)))),e.isMinOrMax_playerQuality!==null&&(e.isMinOrMax_playerQuality===0?e.qualityFromRequirements_playerQuality===2?p=p.filter(N=>N.rating>64):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(N=>N.rating>=75)):e.isMinOrMax_playerQuality===1?e.qualityFromRequirements_playerQuality===1?p=p.filter(N=>N.rating<=64):e.qualityFromRequirements_playerQuality===2?p=p.filter(N=>N.rating<=74):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(N=>N.rating>=75)):e.isMinOrMax_playerQuality===2&&(e.qualityFromRequirements_playerQuality===1?p=p.filter(N=>N.rating<=64):e.qualityFromRequirements_playerQuality===2?p=p.filter(N=>N.rating<=74&&N.rating>64):e.qualityFromRequirements_playerQuality===3&&(p=p.filter(N=>N.rating>=75))));var b=p.reduce((N,_)=>(N[_.leagueId]||(N[_.leagueId]=[]),N[_.leagueId].push(_),N),{}),M=Object.values(b).reduce((N,_)=>_.length>N.length?_:N,[]);P=Ue(M,4,null,1e3,e);var T=[];w.length=0;for(let N of P){let _=On(N,z);for(let S of _)S.length>0&&w.push(S)}}let Y=[[]];if((w.length===0||w.length===1)&&e.isMinOrMax_playerQuality!==null&&e.isMinOrMax_playerQuality===0){e.numrarityFromRequirements_playerRarity=e.numPlayersOfplayerRarityGroupX_playerRarityGroup,e.isMinOrMax_playerRarity=0,e.rarityFromRequirements_playerRarity=e.valuePlayerRarityGroup_playerRarityGroup,s=s.filter(p=>Array.isArray(p.groups)&&p.groups.includes(ta)).sort((p,N)=>p.rating-N.rating),Y=Ue(s,6,null,1e3,e);var F=[];w.length=0;for(let p of Y){let N=On(p,z);for(let _ of N)_.length>0&&w.push(_)}}if((w.length===0||w.length===1)&&e.isMinOrMax_playerLevel&&e.isMinOrMax_playerLevel.length>0){let p=[];if(e.isMinOrMax_playerLevel.forEach((N,_)=>{(N===0||N===2)&&p.push({level:e.valuePlayerLevel_playerLevel[_],count:e.numPlayerLevel_playerLevel[_],minOrMax:N})}),p.length>0){let N=[[]];for(let _ of p){let S=j.filter(R=>_.level===1?R.rating<=64:_.level===2?R.rating>64&&R.rating<75:_.level===3?R.rating>=75:!1);S.sort((R,W)=>R.rating-W.rating);let k=Ue(S,_.count,null,o,e);N=N.flatMap(R=>k.map(W=>[...R,...W]))}N=N.filter((_,S)=>{let k=_.map(R=>R.assetId);return new Set(k).size===k.length}),w.length=0;for(let _ of N){let S=Yi(_,z);S.length>0&&w.push(S)}}}w.sort((p,N)=>{let _=p.reduce((k,R)=>R?k+R.rating:k,0)/p.filter(k=>k).length,S=N.reduce((k,R)=>R?k+R.rating:k,0)/N.filter(k=>k).length;if(e.ratingMinimo!==null){let k=Math.abs(_-e.ratingMinimo),R=Math.abs(S-e.ratingMinimo);if(k!==R)return k-R}return _-S}),ia=0;var V=Date.now();Tn?Gr("Error solving this SBC",Ti):Ur(w,e,n,V)}function Ue(n,e,t=null,i=1e4,r){let s=Date.now(),l=1e4;if(e>n.length||e<=0)return[];if(e===n.length)return[n.slice()];if(e===1)return n.map(u=>[u]);let c=[],o=[];for(o.push({pos:-1,comb:[],teamCounts:{}});o.length>0&&c.length<i&&Date.now()-s<=l;){let{pos:u,comb:d,teamCounts:m}=o.pop();if(d.length===e){(t===null||Ke(d,t))&&Fr(d,r)&&c.push([...d]);continue}for(let g=n.length-1;g>u;g--){let x=[...d,n[g]],C={...m};C[n[g].teamid]=(C[n[g].teamid]||0)+1;let B=x.map(w=>w.assetId);if(new Set(B).size===B.length){if(r.sameClubCountValue_SameClubCount!==void 0&&r.sameClubCountValue_SameClubCount!==null){let w=Object.values(C);if(r.isMinOrMax_SameClubCount===1&&Math.max(...w)>r.sameClubCountValue_SameClubCount)continue}o.push({pos:g,comb:x,teamCounts:C})}}}return c.slice(0,i)}function Xl(n,e,t=null,i=1e4,r){let s=Date.now(),l=1e4;if(e>n.length||e<=0)return[];if(e===n.length)return[n.slice()];if(e===1)return n.map(m=>[m]);let c=t?new Set(t.flatMap(m=>m.formation)):null,o=c?n.filter(m=>c.has(m.rating)):n,u=[],d=[];for(d.push({pos:-1,comb:[],teamCounts:{}});d.length>0&&u.length<i&&Date.now()-s<=l;){let{pos:m,comb:g,teamCounts:x}=d.pop();if(g.length===e){(t===null||Ke(g,t))&&Fr(g,r)&&u.push([...g]);continue}for(let C=o.length-1;C>m;C--){let B=[...g,o[C]],w={...x};w[o[C].teamid]=(w[o[C].teamid]||0)+1;let f=B.map(v=>v.assetId);if(new Set(f).size===f.length){if(r.sameClubCountValue_SameClubCount!==void 0&&r.sameClubCountValue_SameClubCount!==null){let v=Object.values(w);if(r.isMinOrMax_SameClubCount===1&&Math.max(...v)>r.sameClubCountValue_SameClubCount)continue}Zl(B,t)&&d.push({pos:C,comb:B,teamCounts:w})}}}return u.slice(0,i)}function Ke(n,e){for(let t of e){let i=[...t.formation],r=n.map(l=>l.rating),s=!0;for(let l of r){let c=i.indexOf(l);if(c!==-1)i.splice(c,1);else{s=!1;break}}if(s)return!0}return!1}function Zl(n,e){for(let t of e){let r=[...t.formation],s=!0;for(let l of n){let c=r.indexOf(l.rating);if(c===-1){s=!1;break}r.splice(c,1)}if(s)return!0}return!1}function Fr(n,e){if(!e)return!0;if(e.sameClubCountValue_SameClubCount!==void 0&&e.sameClubCountValue_SameClubCount!==null){let t=n.reduce((r,s)=>(r[s.teamid]=(r[s.teamid]||0)+1,r),{}),i=Object.values(t);if(e.isMinOrMax_SameClubCount===1&&Math.max(...i)>e.sameClubCountValue_SameClubCount)return!1}if(e.valuePlayerRarityGroup_playerRarityGroup!==void 0&&e.valuePlayerRarityGroup_playerRarityGroup!==null&&z.length-n.length<=e.numPlayersOfplayerRarityGroupX_playerRarityGroup&&n.filter(i=>i.groups?.includes(e.valuePlayerRarityGroup_playerRarityGroup)).length<e.numPlayersOfplayerRarityGroupX_playerRarityGroup)return!1;if(e.sameNationCountValue_sameNationCount!==void 0&&e.sameNationCountValue_sameNationCount!==null&&n.length>=e.sameNationCountValue_sameNationCount){let t=n.reduce((r,s)=>(r[s.nation]=(r[s.nation]||0)+1,r),{}),i=Object.values(t);if(e.isMinOrMax_sameNationCount===0&&Math.max(...i)<e.sameNationCountValue_sameNationCount)return!1}return!0}function On(n,e){let t=[],i=new Set,r=(s,l)=>{if(s===n.length){t.push([...l]);return}let c=n[s];for(let o=0;o<e.length;o++)!i.has(o)&&c.possiblePositions.includes(e[o])&&(i.add(o),l.push({player:c,positionIndex:o}),r(s+1,l),l.pop(),i.delete(o))};return r(0,[]),t}function Yi(n,e){let t=new Array(e.length).fill(null),i=new Set,r=new Set,s=new Set,l=new Map;return e.forEach((c,o)=>{l.has(c)||l.set(c,[]),l.get(c).push(o)}),n.sort((c,o)=>c.possiblePositions.length-o.possiblePositions.length),n.forEach(c=>{if(!(r.has(c)||s.has(c.assetId))){for(let o of c.possiblePositions)if(l.has(o)){let u=l.get(o);for(let d of u)if(!i.has(d)){t[d]=c,i.add(d),r.add(c),s.add(c.assetId);break}u.every(d=>i.has(d))&&l.delete(o);break}}}),n.forEach(c=>{if(!r.has(c)&&!s.has(c.assetId)){for(let o=0;o<t.length;o++)if(!i.has(o)){t[o]=c,i.add(o),r.add(c),s.add(c.assetId);break}}}),t}function Wi(n,e,t){let i=n.filter(s=>s!==null);return!(i.reduce((s,l)=>s+l.rating,0)/i.length>=t.ratingMinimo&&e.rating<t.ratingMinimo)}function Dn(n,e){let t={nation:{},league:{},teamid:{}};if(n.filter(i=>i!==null).forEach(i=>{t.nation[i.nation]=(t.nation[i.nation]||0)+1,t.league[i.leagueId]=(t.league[i.leagueId]||0)+1,t.teamid[i.teamid]=(t.teamid[i.teamid]||0)+1}),e.isMinOrMax_sameNationCount!==null){let i=Object.keys(t.nation),r=!1;for(let s of i){let l=t.nation[s];if(e.isMinOrMax_sameNationCount===0&&l>=e.sameNationCountValue_sameNationCount){r=!0;break}else if(e.isMinOrMax_sameNationCount===1&&l<=e.sameNationCountValue_sameNationCount){r=!0;break}}if(!r)return!1}if(e.isMinOrMax_SameLeagueCount!==null){let i=Object.keys(t.league),r=!1;for(let s of i){let l=t.league[s];if(e.isMinOrMax_SameLeagueCount===0&&l>=e.sameLeagueCountValue_SameLeagueCount){r=!0;break}else if(e.isMinOrMax_SameLeagueCount===1&&l<=e.sameLeagueCountValue_SameLeagueCount){r=!0;break}}if(!r)return!1}if(e.isMinOrMax_SameClubCount!==null){let i=Object.keys(t.teamid),r=!1;for(let s of i){let l=t.teamid[s];if(e.isMinOrMax_SameClubCount===0&&l>=e.sameClubCountValue_SameClubCount){r=!0;break}else if(e.isMinOrMax_SameClubCount===1&&l<=e.sameClubCountValue_SameClubCount){r=!0;break}}if(!r)return!1}return!0}function Ur(n,e,t,i){let r=[];if(n.length===0){let s=new Array(z.length).fill(null),l={formazioniLocali:[],foundValid:!1,costoMinimo:1/0},o=Dt(s,e).total;la([...s],o,e,Qi(j,e),i,_i,l,t-r.length),l.formazioniLocali.forEach(u=>{r.some(d=>d.costo===u.costo)||r.push(u)}),qi(r);return}for(let s of n){if(Me||r.length>=t)break;let l=new Array(z.length).fill(null);s.forEach((d,m)=>{d!==null&&d.player&&d.positionIndex!==void 0?l[d.positionIndex]=d.player:l[m]=d});let c={formazioniLocali:[],foundValid:!1,costoMinimo:1/0},u=Dt(l,e).total;if(la([...l],u,e,Qi(j,e),i,_i,c,t-r.length),c.formazioniLocali.forEach(d=>{r.some(m=>m.costo===d.costo)||r.push(d)}),r.length>=t){Me=!0;break}else Me=!1}e.ratingMinimo!==null&&r.length===0&&ia<nt.length-1?(Me=!1,ia++,Lt=nt[ia].formation,Se=Math.min(...Lt),we=Math.max(...Lt),Ur(n,e,t,i)):qi(r)}async function qi(n){if(n.sort((t,i)=>t.costo-i.costo),n.length===0)Gr("Error solving this SBC","");else{var e=await eo(n[0].formazione);await to(e);for(let t=0;t<n.length;t++)n[t].formazione.forEach(i=>{})}}async function eo(n){let t=[];var i=0;for(let s=0;s<23;s++)Kn.includes(s)?t.push({index:s,itemData:{id:0,dream:!1}}):i<n.length?(t.push({index:s,itemData:{id:n[i].id,dream:!1}}),i++):t.push({index:s,itemData:{id:0,dream:!1}});return JSON.stringify({players:t})}async function to(n){setTimeout(()=>{fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/sbs/challenge/${oa}/squad`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:n,method:"PUT",mode:"cors",credentials:"omit"}).then(async e=>{await zr(oa),setTimeout(()=>{L(document.getElementsByClassName("ut-navigation-button-control")[0]);var t=document.getElementsByClassName("ut-sbc-challenge-table-row-view--title");t.length==0&&(t=document.getElementsByClassName("tileHeader")),setTimeout(()=>{t[na].className=="tileHeader"?L(t[na].parentNode.parentNode):(L(t[na].parentNode.parentNode),setTimeout(()=>{L(document.getElementsByClassName("btn-standard primary")[0])},500))},500)},1e3)})},0)}async function zr(){setTimeout(()=>{fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/sbs/challenge/${oa}/squad`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",mode:"cors",credentials:"omit"}),services.SBC.reset()},100)}function ao(n,e){var t=this,i=new EAObservable,r=new UTHttpRequest(this.authDelegate);return oa=n,Vr(),e?r.setPath("/ut/game/"+GAME_NAME+"/sbs/challenge/"+n+"/squad"):(r.setPath("/ut/game/"+GAME_NAME+"/sbs/challenge/"+n),r.setRequestType(HttpRequestMethod.POST)),services.UTUtasRequestQueue.send(r).observe(this,function(s,l){s.unobserve(t);var c=new UTHttpResponseDTO;JSUtils.assignPropertyValues(l,c),l.success&&l.response&&!JSUtils.isString(l.response)?c.response={squad:factories.Squad.createSBCSquad(l.response.squad,t.factory,l.response.playerRequirements)}:c.response={squad:null},i.notify(c)}),i}function Vr(){ma=[],ua=[],da=[],Wa=null,pa=null,fa=null,ka=null,Ia=null,ca=[],La=[],Aa=[],ta=null,qa=null,Ja=null,Oa=null,Da=null,Ra=null,Xt=null,Fa=null,Ua=null,za=null,Va=null,Ga=null,ja=null,Ha=null,$a=null,Xa=null,Za=null,en=null,tn=null,an=null,nn=null,rn=null,sn=null,ln=null,dn=null,un=null,mn=null,on=null,cn=null,Ta=null,_a=null,ti=null,Jt=null,Pa=null,ea=[],kt=[],Zt=[],Ka=[],Qa=[],Ya=[]}function no(n,e,t,i){var r=this,s=new EAObservable,l=new UTServiceResponseDTO;if(!services.Configuration.checkFeatureEnabled(UTServerSettingsRepository.KEY.SBC_ENABLED))return l.status=UtasErrorCode.SERVICE_IS_DISABLED,s.notify(l),s;if(!n.squad)return l.status=HttpStatusCode.BAD_REQUEST,l.success=!1,s.notify(l),s;function c(u,d){if(u.unobserve(r),l.success=d.success,l.status=d.status,l.error=d.error,l.success&&JSUtils.isObject(d.response)){var m=d.response;l.data={challengeId:m.challengeId,credits:m.credits||0,grantedChallengeAwards:m.grantedChallengeAwards||[],objectiveUpdates:m.objectiveUpdates||null,preOrderPacks:m.preOrderPacks||0,recoveredPacks:m.recoveredPacks||0,setId:m.setId,setCompleted:!1},n.timesCompleted++,n.status=SBCChallengeStatus.COMPLETED,n.onDataChange.notify({status:n.status,timesCompleted:n.timesCompleted}),e.challengesCompletedCount++,l.data.setCompleted=e.challengesComplete(),l.data.setCompleted&&(e.timesCompleted++,e.isRepeatable&&!e.isComplete()?(e.challengesCompletedCount=0,e.getChallenges().forEach(function(C){return C.reset()})):e.isFavourite&&r.toggleFavouriteTag(e));var g=o.getFieldPlayers().map(function(C){return C.item});repositories.Item.remove(g),services.Squad.resetSquadsCache(),m.objectiveUpdates&&getDefaultDispatcher().notify(AppNotification.OBJECTIVE_UPDATE,r,m.objectiveUpdates),e&&e.repeatabilityMode!==SBCRepeatabilityMode.NON_REPEATABLE&&e.timesCompleted===1&&r.repository.reset()}else{var x=d.response;l.data=x}s.notify(l)}var o=n.squad;return o._players.forEach(u=>{u._item.id!==0&&(j=j.filter(d=>d.id!==u._item.id))}),this.saveChallenge(n).observe(this,function(u,d){u.unobserve(r),d.success?(i?r.sbcDAO.submitChallenge(n.id,t,repositories.Chemistry.version):r.sbcDAO.submitChallenge(n.id,t)).observe(r,c):(l.success=d.success,l.status=d.status,l.error=d.error,s.notify(l))}),s}function io(n,e,t){this.isInteractionEnabled()&&this._triggerActions(UTSBCHubView.Event.TILE_SELECTED,{index:this.sbcSetTiles.indexOf(n),set:n.getData()}),na=this.sbcSetTiles.indexOf(n)}function ro(n){if(document.getElementsByClassName("divPref")[0]===void 0){var e=document.createElement("div");e.className="divPref",e.style="display: flex;place-content: space-evenly;",e.innerHTML=`<div><p>Priorité aux invendables</p><div class="checkbox-wrapper-22" style="justify-self: center;">
        <label class="switch" for="checkboxPrefUntreadable">
            <input type="checkbox" id="checkboxPrefUntreadable">
            <div class="slider round"></div>
        </label>
        </div></div>
        <div><p>Priorité au stockage DCE</p>
        <div class="checkbox-wrapper-22" style="justify-self: center;">
        <label class="switch" for="checkboxPrefStorage">
            <input type="checkbox" id="checkboxPrefStorage">
            <div class="slider round"></div>
        </label>
        </div>`,n.insertBefore(e,n.children[1]);var t=document.createElement("div");t.className="divChoosePlayers",t.style="align-self: center;",t.innerHTML=`<p>Choisir les joueurs à utiliser</p>
        <button class="btn-standard choosePlayers" style="margin: 0.5rem auto;width: calc(41% - 1rem);background-color: rgb(58 61 61);color: #ffffff;padding: 10px;">+</button>`,n.insertBefore(t,n.children[2]),document.getElementsByClassName("choosePlayers")[0].addEventListener("click",async function(i){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?Ji():Ie("ERA SBC SOLVER \u{1F9E9}","Get SnippingSoul Premium in order to generate SBCs with Era AI.")}),document.getElementsByClassName("choosePlayers")[0].addEventListener("touchstart",async function(i){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?Ji():Ie("ERA SBC SOLVER \u{1F9E9}","Get SnippingSoul Premium in order to generate SBCs with Era AI.")})}}function Ji(){var n=document.body;he=[];var e=document.createElement("div");e.className="blurredDialog",e.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;";var t=document.createElement("div");t.className="ut-name-squad",t.style="width: 65em;position: absolute;right: 23%;top: 10%;z-index: 9999;background: rgb(21, 22, 22);text-align: center;";var i=document.createElement("header"),r=document.createElement("h2");r.innerText="Choisir les joueurs pour le DCE";var s=document.createElement("div");s.className="bodySection",s.style="justify-self: center;";var l=document.createElement("div");let c="rating",o=-1;function u(v,y){let h="";return v.forEach(E=>{let A=repositories.Item.getStaticDataByDefId(E.assetId&ItemIdMask.DATABASE),P=A.firstName+" "+A.lastName,b=E.pile===10?"SBC storage":"Club",M=services.Localization.localize("item.raretype"+E.rareflag),T=y.includes(E.assetId)?"checked":"",Y=services.Localization.localize("search.nationName.nation".concat(E.nation)),F=services.Localization.localize("global.leagueabbr15.".concat(APP_YEAR,".league").concat(E.leagueId)),V=services.Localization.localize("global.teamabbr15.".concat(APP_YEAR,".team").concat(E.teamid));h+=`
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${P}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${E.rating}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${M}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${Y}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${F}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${V}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${E.untradable?"Yes":"No"}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${b}</td>
                    <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">
                        <input type="checkbox" class="select-player-checkbox" data-playerid="${E.id}" ${T}>
                    </td>
                </tr>
            `}),h}function d(v,y,h){let E=[...v];return E.sort((A,P)=>{let b,M;switch(y){case"name":return b=repositories.Item.getStaticDataByDefId(A.assetId&ItemIdMask.DATABASE).firstName+" "+repositories.Item.getStaticDataByDefId(A.assetId&ItemIdMask.DATABASE).lastName,M=repositories.Item.getStaticDataByDefId(P.assetId&ItemIdMask.DATABASE).firstName+" "+repositories.Item.getStaticDataByDefId(P.assetId&ItemIdMask.DATABASE).lastName,b.localeCompare(M)*h;case"rating":return(A.rating-P.rating)*h;case"rarity":return(A.rareflag-P.rareflag)*h;case"untradable":return(A.untradable===P.untradable?0:A.untradable?-1:1)*h;case"pile":return(A.pile-P.pile)*h;case"nation":return b=services.Localization.localize("search.nationName.nation"+A.nation),M=services.Localization.localize("search.nationName.nation"+P.nation),b.localeCompare(M)*h;case"leagueId":return b=services.Localization.localize("global.leagueabbr15."+APP_YEAR+".league"+A.leagueId),M=services.Localization.localize("global.leagueabbr15."+APP_YEAR+".league"+P.leagueId),b.localeCompare(M)*h;case"teamid":return b=services.Localization.localize("global.teamabbr15."+APP_YEAR+".team"+A.teamid),M=services.Localization.localize("global.teamabbr15."+APP_YEAR+".team"+P.teamid),b.localeCompare(M)*h;default:return 0}}),E}let m=[...j],g=`
        <div class="scrollable-box" style="max-width: 1000px; max-height: 500px; overflow-y: auto; padding: 10px;">
            <table id="choosePlayersTable" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-name">Nom</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-rating">Note</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-rarity">Rareté</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-nation">Pays</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-leagueId">Championnat</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-teamid">Équipe</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-untradable">Invendable</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center; cursor:pointer;" id="sort-pile">Pile</th>
                        <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">Sélectionner</th>
                    </tr>
                </thead>
                <tbody>
    `;g+=u(d(m,c,o),he),g+=`
                </tbody>
            </table>
        </div>
    `,l.innerHTML=g,setTimeout(()=>{function v(){let y=document.querySelector("#choosePlayersTable tbody"),h=m;c&&(h=d(m,c,o)),y.innerHTML=u(h,he),document.querySelectorAll(".select-player-checkbox").forEach(E=>{E.addEventListener("change",function(){let A=parseInt(this.getAttribute("data-playerid"));this.checked?he.includes(A)||he.push(A):he=he.filter(P=>P!==A)})})}document.getElementById("sort-name").addEventListener("click",function(){o=c==="name"?-o:1,c="name",v()}),document.getElementById("sort-rating").addEventListener("click",function(){o=c==="rating"?-o:-1,c="rating",v()}),document.getElementById("sort-rarity").addEventListener("click",function(){o=c==="rarity"?-o:1,c="rarity",v()}),document.getElementById("sort-nation").addEventListener("click",function(){o=c==="nation"?-o:1,c="nation",v()}),document.getElementById("sort-leagueId").addEventListener("click",function(){o=c==="leagueId"?-o:1,c="leagueId",v()}),document.getElementById("sort-teamid").addEventListener("click",function(){o=c==="teamid"?-o:1,c="teamid",v()}),document.getElementById("sort-untradable").addEventListener("click",function(){o=c==="untradable"?-o:1,c="untradable",v()}),document.getElementById("sort-pile").addEventListener("click",function(){o=c==="pile"?-o:1,c="pile",v()}),document.querySelectorAll(".select-player-checkbox").forEach(y=>{y.addEventListener("change",function(){let h=parseInt(this.getAttribute("data-playerid"));this.checked?he.includes(h)||he.push(h):he=he.filter(E=>E!==h)})})},0);var x=document.createElement("div");x.className="ut-button-group";var C=document.createElement("button");C.style="justify-content: center;color: #000000;",C.onclick=async function(){document.getElementsByClassName("blurredDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()};var B=document.createElement("span");B.className="btn-text",B.innerText="Retour",B.style="font-size: smaller;color: #ffffff;";var w=document.createElement("button");w.style="justify-content: center;background: #fff700;color: #000000;",w.onclick=async function(){Xn(),document.getElementsByClassName("blurredDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()};var f=document.createElement("span");f.className="btn-text",f.innerText="Générer avec les joueurs sélectionnés",document.getElementsByClassName("ut-root-view")[0].prepend(e),n.appendChild(t),t.appendChild(i),i.appendChild(r),t.appendChild(s),s.appendChild(l),t.appendChild(x),x.appendChild(w),w.appendChild(f),x.appendChild(C),C.appendChild(B)}function Gr(n,e){var t=document.body,i=document.createElement("div");i.className="blurredDialog",i.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;";var r=document.createElement("div");r.className="ut-name-squad",r.style="width: 40em;position: absolute;right: 37%;top: 10%;z-index: 9999;background: rgb(21, 22, 22);text-align: center;";var s=document.createElement("header"),l=document.createElement("h2");l.innerText=n;var c=document.createElement("div");c.className="bodySection";var o=document.createElement("div");o.innerHTML=` <div>   

<div style="background: #ff2525;padding-top: 5px;padding-bottom: 5px;">${e}</div>

<div style="text-align-last: center;place-self: center;padding-top: 10px;padding-bottom: 20px;display: flex;flex-direction: column;width: 100%;">
<div style="padding-bottom: 10px;">
    <span>There was an error creating the SBC. This could mean that you don't have enough players to complete the challenge or an AI error.
You can report the problematic sbc to our Discord:</span>
    <a href="about:blank#removed-promotion" target="_blank">about:blank#removed-promotion</span>
</div>
</div>       
`;var u=document.createElement("div");u.className="ut-button-group";var d=document.createElement("button");d.style="justify-content: center;background: #fff700;color: #000000;",d.onclick=async function(){document.getElementsByClassName("blurredDialog")[0].remove(),document.getElementsByClassName("ut-name-squad")[0].remove()};var m=document.createElement("span");m.className="btn-text",m.innerText="OK",document.getElementsByClassName("ut-root-view")[0].prepend(i),t.appendChild(r),r.appendChild(s),s.appendChild(l),r.appendChild(c),c.appendChild(o),r.appendChild(u),u.appendChild(d),d.appendChild(m)}async function so(){services.Item.clearTransferMarketCache();var n=new UTMarketSearchResultsViewController,e=new UTSearchCriteriaDTO,t=I[K][24];for(var i in t)e.hasOwnProperty(i)&&(e[i]=t[i]);e.maxBuy=parseInt(0),e.maxBid=I[K][9]===""?parseInt(I[K][11]):parseInt(I[K][9]);let r=e.maxBid;DebugUtils.Assert(JSUtils.isValid(e),"Missing search criteria object when requesting items."),e&&(services.Module.set(3355443200),n.paginationViewModel.stopAuctionUpdates(),services.Item.searchTransferMarket(e,1).observe(n,async function(s,l){if(s.unobserve(n),!l.success||!JSUtils.isObject(l.data)){J();var c=new Date;O=c.getHours()+":"+c.getMinutes()+":"+c.getSeconds();var o=O+"Trop de requêtes. Faites une pause avant de reprendre les recherches.";return ae(o,"red",O),NetworkErrorManager.checkCriticalStatus(l.status)?void NetworkErrorManager.handleStatus(l.status):(services.Notification.queue([services.Localization.localize("popup.error.searcherror"),UINotificationType.NEGATIVE]),void((a=n.getNavigationController())===null||a===void 0||a.popViewController()))}if(services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Results - List View"}),services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Item - Detail View"}),l&&l.data&&l.data.items.length>0){let u=l.data.items.filter(g=>g._auction.currentBid<parseInt(r)&&g._auction.expires<=parseInt(tt)*60),d=1e3;async function m(g){let x=g.map(v=>v._auction.tradeId).join(","),C;try{C=await fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/trade/status/lite?tradeIds=${x}`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"no-cache","content-type":"application/json","sec-ch-ua":'"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",body:null,method:"GET",mode:"cors",credentials:"omit"})}catch(v){console.error("Error fetching auction status:",v);return}let B={};C&&C.status===200&&(B=await C.json()),g=g.filter(v=>{let y=B.auctionInfo?.find(P=>P.tradeId===parseInt(v._auction.tradeId)),h=v._auction.currentBid===0?v._auction.startingBid:v._auction.currentBid,E;h===0?E=150:h<1e3?E=50:h<1e4?E=100:h<5e4?E=250:h<1e5?E=500:E=1e3;let A=ye?parseInt(r):h+E;return y&&y.currentBid<A});for(let v of g)if(pe!=!0){services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Results - List View"}),services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Item - Detail View"});let y=v._auction.tradeId,h=v._auction.currentBid===0?v._auction.startingBid:v._auction.currentBid,E;h===0?E=150:h<1e3?E=50:h<1e4?E=100:h<5e4?E=250:h<1e5?E=500:E=1e3;let A=ye?parseInt(r):h+E,P=v._staticData.name;if(v._auction._tradeState==="active"&&v._auction.currentBid<A){try{let b=await fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/trade/${y}/bid`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify({bid:A}),method:"PUT",mode:"cors",credentials:"omit"});var w={};b.status==200&&(w=await b.json()),w.status=b.status,rt=!0;var f=new Date;O=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(),w.status==200&&w.auctionInfo[0].bidState!=="outbid"?(document.getElementsByClassName("view-navbar-currency-coins")[0]&&(document.getElementsByClassName("view-navbar-currency-coins")[0].textContent=services.Localization.localizeNumber(w.credits)),(ssTrack("bid",{player:P,price:A,tradeId:y,source:"bid",note:"Enchère acceptée ; achat non encore confirmé."}),ae(O+" Enchère placée sur "+P+" à "+A,"green",O,P,A))):w.status==473?(J(),ae(O+" La pile des éléments non attribués est pleine. Assistant arrêté.","red",O)):w.status==401?(J(),ae(O+" Accès refusé. Assistant arrêté : reconnectez-vous.","red",O)):w.status==461?ae(O+" trouvé "+P+" à "+A+" mais une autre enchère a été placée avant la vôtre.","orange",O,P,A):w.auctionInfo[0].bidState;try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}}catch(b){console.error("Error placing bid:",b)}services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Search"}),await new Promise(b=>setTimeout(b,d))}}}if(await m(u),u.length==0){var c=new Date;O=c.getHours()+":"+c.getMinutes()+":"+c.getSeconds(),ae(O+" Aucun joueur trouvé pour ce filtre. Passage au suivant ou attente avant une nouvelle recherche.","yellow",O)}setTimeout(()=>{L(document.getElementsByClassName("btn-standard")[8]),K++,bn(K),rt=!1},Qe+1e3)}else{console.error("Auction information not found in t.data.auctionInfo"),We=!0;try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}document.getElementsByClassName("ut-number-input-control")[2]==null?(J(),alert("Something went wrong. Please start again. I hope to fix this soon ;) error 0x0009")):ae(O+" aucun joueur trouvé pour "+I[K][0]+" avec les critères : "+JSON.stringify(I[K][24])+". Passage au joueur suivant.","yellow");try{document.getElementsByClassName("SnipingLog")[0].scrollTop=document.getElementsByClassName("SnipingLog")[0].scrollHeight}catch{}setTimeout(()=>{services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer Market Search"}),L(document.getElementsByClassName("btn-standard")[8]),K++,bn(K),rt=!1},Qe+1e3)}}))}async function bn(n){if(K=n,document.getElementsByClassName("title")[0].innerText===services.Localization.localize("navbar.label.search")&&!pe)if(await Pl(n),await Ce(500),Oe=="0"&&(tt="1"),Oe=="1"&&(tt="5"),Oe=="2"&&(tt="10"),Oe=="3"&&(tt="15"),Oe=="4"&&(tt="30"),Oe=="5"&&(tt="45"),Oe=="6"&&(tt="60"),n>=I.length&&(ssSession("round"),Ze=1,Re++),Ze===0){if(I[n][0]==null)var e="Filtre personnalisé";else var e=I[n][0];Pr(Pt),window.setTimeout(async function(){if(pe){J();return}else{var i=new Date;O=i.getHours()+":"+i.getMinutes()+":"+i.getSeconds(),ssTrack("search",{player:e,source:"bid"}),ae(O+" Recherche en cours "+e+" sur le marché","#ffffff",O,e),so()}},Pt)}else{Q=0;var t=new Date;O=t.getHours()+":"+t.getMinutes()+":"+t.getSeconds(),Mr()}else{J();return}}async function lo(){if(document.getElementsByClassName("SearchTransferPrice")[0]&&document.getElementsByClassName("SearchTransferPrice")[0].parentElement.remove(),document.getElementsByClassName("title")[0].innerText===services.Localization.localize("nav.label.transferList"))if(document.getElementsByClassName("listFUTItem selected")[0]&&!document.getElementsByClassName("listFUTItem selected")[0].classList.contains("won")){if(document.getElementsByClassName("listFUTItem selected")[0].children[0].children[0]){var n=parseInt(document.getElementsByClassName("listFUTItem selected")[0].children[0].children[0].innerText.replace(/\D/g,""));if(n>0){var e=document.createElement("div");e.innerHTML=`<div>
                                                        <button class="accordian SearchTransferPrice" style="background: #5c50ae;color: white;">
                                                            <span class="btn-text">Prix le plus bas</span>
                                                            <span class="btn-subtext"></span>
                                                        </button>
                                                    </div>`,document.getElementsByClassName("ut-button-group")[1]&&document.getElementsByClassName("ut-button-group")[1].children[10]&&document.getElementsByClassName("ut-button-group")[1].children[10].parentNode.insertBefore(e,document.getElementsByClassName("ut-button-group")[1].children[10])}document.getElementsByClassName("SearchTransferPrice")[0]&&(document.getElementsByClassName("SearchTransferPrice")[0].addEventListener("click",()=>{Xi(n)}),document.getElementsByClassName("SearchTransferPrice")[0].addEventListener("touchstart",()=>{Xi(n)}))}}else document.getElementsByClassName("SearchTransferPrice")[0]&&document.getElementsByClassName("SearchTransferPrice")[0].parentElement.remove();else document.getElementsByClassName("SearchTransferPrice")[0]&&document.getElementsByClassName("SearchTransferPrice")[0].parentElement.remove()}async function Xi(n){let e="https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/transfermarket",t="num=21&start=0&type=player",i=1/0,r=null;for(;;){let s=i!==1/0?`&maxb=${i}`:"",l=`${e}?${t}&definitionId=${n}${s}`,u=(await(await fetch(l,{method:"GET",headers:{"x-ut-sid":le}})).json()).auctionInfo||[];if(!u.length)break;let d=u.map(C=>C.buyNowPrice).filter(Boolean);if(!d.length)break;let m=Math.min(...d),g=d.sort((C,B)=>C-B).join(","),x=!1;if(m<i?(i=m,r=g,x=!0):g===r&&(i-=1e3,r=null,x=!0),!x)break;await Ce(1e3)}return document.getElementsByClassName("SearchTransferPrice")[0]&&(document.getElementsByClassName("SearchTransferPrice")[0].innerText="Prix le plus bas : "+(i===1/0?"N/A":parseInt(i).toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region)+" coins"),document.getElementsByClassName("SearchTransferPrice")[0].disabled=!0),i===1/0?null:i}async function ui(n=!1){try{var e=await fetch("https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/leaderboards/period/alltime/category/trader/view/friends?platform=local",{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",body:null,method:"GET",mode:"cors",credentials:"omit"}),t=await e.json(),i=services.User.userDao.authDelegate.utasSession.user._personas._collection[services.User.userDao.authDelegate.utasSession.user.selectedPersona].name,r=t.entries.find(s=>s.persona===i);return r?r.score.value:null}catch(s){return n?(console.error("Error fetching transfer profit value after retry, giving up.",s),null):(console.error("Error fetching transfer profit value, retrying in 5 seconds...",s),await new Promise(l=>setTimeout(l,5e3)),await ui(!0))}}async function oo(){var n=null,e=null,t=null;try{let s=await new Promise(function(l,c){window.addEventListener("message",function(o){o.data.message==="getCompleted"&&l(o.data.result)}),window.postMessage({message:"get",keys:["profitToSave","FirstAccessDate","ViewPlansDate"]},"*")});if(n=s.profitToSave,e=s.FirstAccessDate,t=s.ViewPlansDate,n==null)await co();else if(e&&(D==null&&await fe(String(services.User.currentUserId)),D!="Active"))if(t){var i=Math.floor((new Date-new Date(t))/864e5);i>=7&&await Zi(n)}else{var r=Math.floor((new Date-new Date(e))/864e5);r>=4&&await Zi(n)}}catch(s){console.error(s)}}async function Zi(n){var e=await ui();if(e!=null&&n!=null){var t=e-n;t>8e4&&uo(t)}}async function co(){var n=await ui(),e=await new Date().toISOString().split("T")[0];window.postMessage({message:"set",objPassed:ne(["profitToSave","FirstAccessDate"],[n,e])},"*")}function uo(n){var e=document.body,t=document.createElement("div");t.className="blurredDialog",t.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;";var i=n.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),r=document.createElement("div");r.className="containerPaywall",r.innerHTML=`
        <div class="boxPaywall">

            <div class="headerPaywall">
                <div class="headerPaywall-line1">Merci pour votre confiance</div>
                <div> <span>\u{1F451} </span><span class="headerPaywall-line2">Votre progression sur FUT</span><span> \u{1F947}</span></div>
            </div>

            <div id="state1" class="state-content">
                <div class="center-contentPaywall">
                    <span class="text-normal">Vous avez gagné</span>
                    <span class="text-value" id="coin-value">0</span>
                    <span class="text-normal">coins</span>
                    <img style="justify-content: center;align-items: center;width: 15px;height: 15px;"
                        src="./images/coinIcon.png" alt="coin">
                </div>
                <div class="bottom-contentPaywall">
                    Construisez votre équipe et préparez les prochaines compétitions
                </div>
            </div>

            <div id="state2" class="state-content hidden">
                <div class="top-contentPaywall">
                    If you continued for another 30 days \u{1F4C5} <br> you would be able to earn up to 2M coins. \u{1F4B0}
                </div>

                <div class="graph-section">
                    <div class="tooltipPaywall">You: ${i}</div>
                    <div class="user-marker">\u{1F468}\u200D\u{1F4BB}</div>
                    <svg viewBox="0 0 300 100" class="graph-svg" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#CD7F32" />
                                <stop offset="25%" stop-color="#E6A157" />
                                <stop offset="50%" stop-color="#8B5A2B" />
                                <stop offset="75%" stop-color="#CD7F32" />
                                <stop offset="100%" stop-color="#E6A157" />
                            </linearGradient>
                        </defs>
                        <!-- Organic light grey path -->
                        <path id="growing-graph" d="M 10 90 Q 50 80, 100 60 T 200 40 T 290 10" fill="transparent"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </div>

                <div class="lower-contentPaywall">
                    Continuez à développer votre équipe.
                </div>

                <button class="action-btn">\u{1F680} View Plans</button>

                <div class="logoSnippingSoulClass"><img src="${wn}" width="39" height="37" style="vertical-align: text-bottom;"></div>
            </div>

        </div>`;var s=document.createElement("div");s.className="ut-name-squad",s.style="width: 33em;position: absolute;z-index: 100;right: 37%;top: 30%;z-index:9999;text-align: -webkit-center;",s.appendChild(r),document.getElementsByClassName("ut-root-view")[0].prepend(t),e.appendChild(s);var l=document.querySelector(".headerPaywall"),c=document.getElementById("coin-value");setTimeout(()=>{l.classList.add("show")},100),setTimeout(()=>{mo(c,0,n,1500),setTimeout(()=>{po()},3500)},500),document.querySelector(".action-btn").addEventListener("click",()=>{t.remove(),s.remove(),void 0,window.postMessage({message:"set",objPassed:ne(["ViewPlansDate"],[new Date])},"*")})}function mo(n,e,t,i){let r=null,s=l=>{r||(r=l);let c=Math.min((l-r)/i,1),o=1-Math.pow(1-c,4),u=Math.floor(o*(t-e)+e);n.innerHTML=u.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region),c<1?window.requestAnimationFrame(s):n.innerHTML=t.toLocaleString(services.User.userDao.authDelegate.utasSession.locale.language+"-"+services.User.userDao.authDelegate.utasSession.locale.region)};window.requestAnimationFrame(s)}function po(){var n=document.getElementById("growing-graph"),e=document.getElementById("state1"),t=document.getElementById("state2");e.classList.add("hiding"),setTimeout(()=>{e.classList.add("hidden"),e.classList.remove("hiding"),e.style.position="absolute",t.classList.remove("hidden"),t.style.position="relative";let i=n.getTotalLength();n.style.strokeDasharray=i,n.style.strokeDashoffset=i,n.offsetWidth,n.style.transition="stroke-dashoffset 1.5s ease-out",n.style.strokeDashoffset="0"},500)}function fo(){var n=document.body,e=document.createElement("div");e.className="blurredDialog",e.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;";var t=document.createElement("style");t.innerText=`.boxPaywall {
            text-align: center;
            align-items: center;
            padding: 40px 30px;
        }

        .headerPaywall {
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.8s ease;
            margin-bottom: 20px;
        }

        .headerPaywall.show {
            opacity: 1;
            transform: translateY(0);
        }

        .logo-center {
            width: 30px;
            height: 30px;
            color: #ffffff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 900;
            font-size: 32px;
            margin: 0 auto 30px auto;
            box-shadow: 0 0 20px rgba(205, 127, 50, 0.5);
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.8s ease;
        }

        .logo-center.show {
            opacity: 1;
            transform: scale(1);
        }

        .subheadline {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 25px;
            line-height: 1.4;
            background: linear-gradient(135deg, #CD7F32 0%, #E6A157 25%, #8B5A2B 50%, #CD7F32 75%, #E6A157 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.8s ease;
        }

        .subheadline.show {
            opacity: 1;
            transform: translateY(0);
        }

        .body-text {
            font-size: 16px;
            font-weight: 300;
            color: #bbbbbb;
            line-height: 1.6;
            margin-bottom: 35px;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.8s ease;
        }

        .body-text.show {
            opacity: 1;
            transform: translateY(0);
        }

        .action-btn {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.8s ease;
            width: 100%;
            max-width: 300px;
        }

        .action-btn.show {
            opacity: 1;
            transform: translateY(0);
        }`,document.head.appendChild(t);var i=document.createElement("div");i.className="containerPaywall",i.innerHTML=`<div class="boxPaywall">
            <div class="headerPaywall reveal show" id="title">
                <div class="headerPaywall-line1">ACCÈS ACTIVÉ</div>
                <div class="headerPaywall-line2">SnippingSoul PREMIUM</div>
            </div>
             <div class="logo-center reveal show"><img src="${wn}" width="45" height="45" style="vertical-align: text-bottom;"></div>

            <div class="subheadline reveal show" id="subheadline">
                <span>Les fonctions avancées sont disponibles.<br></span>
                <span style="-webkit-text-fill-color: white;font-size: 16px;font-weight: 500;">Are you ready to master
                    FUT trading?</span>
            </div>
            <div class="body-text reveal show" id="body-text">
                <span>Les fonctions avancées sont disponibles :</span><br>
                <span>\u{1F3AF} Unlimited High-frequency sniping \u{1F3AF}</span><br>
                <span>\u{1F9E9} Advanced AI SBC solver \u{1F9E9}</span><br>
                <span>\u{1F4BE} Save and Load your filters \u{1F4BE}</span><br>
                <span>\u{1F4F1} Snipe from your phone \u{1F4F1}</span><br><br>
                <span style="-webkit-text-fill-color: white;font-size: 16px;font-weight: 500;">The power to dominate FUT
                    is now yours.</span>
            </div>
            <button class="action-btn reveal show" id="cta-btn">START DOMINATING NOW \u{1F680}</button>
        </div>`;var r=document.createElement("div");r.className="ut-name-squad",r.style="width: 33em;position: absolute;z-index: 100;right: 37%;top: 30%;z-index:9999;text-align: -webkit-center;",r.appendChild(i),document.getElementsByClassName("ut-root-view")[0].prepend(e),n.appendChild(r);var s=document.getElementsByClassName("reveal");Array.from(s).forEach((l,c)=>{setTimeout(()=>{l.classList.add("show")},200+c*300)}),document.querySelector(".action-btn").addEventListener("click",()=>{e.remove(),r.remove(),window.postMessage({message:"set",objPassed:ne(["userConfirmedFreeTrialDialog"],[new Date])},"*")})}function go(){var n=document.getElementById("SnippingSoulAutoRelistDialog");n&&n.remove();var e=document.createElement("div");e.id="SnippingSoulAutoRelistDialog",e.innerHTML=`
        <div class="SnippingSoul-auto-relist-overlay">
            <div class="SnippingSoul-auto-relist-dialog">
                <button type="button" class="SnippingSoul-auto-relist-close" id="SnippingSoulAutoRelistClose">
                    \xD7
                </button>
                <div class="SnippingSoul-auto-relist-icon">
                    \u21BB
                </div>
                <h2>Remise en vente automatique</h2>
                <p class="SnippingSoul-auto-relist-description">
                    Automatically relist your expired Transfer List items
                    while you keep the Web App open.
                </p>
                <div class="SnippingSoul-auto-relist-warning">
                    <strong>Important</strong>
                    <span>
                        La remise en vente automatique <strong>ne modifie pas vos prix</strong>.
                        Your items will be relisted using their existing prices.
                        Auto Relist will be automatically turned off after 3 hours.
                    </span>
                </div>
                <div class="SnippingSoul-auto-relist-info">
                    <div class="SnippingSoul-auto-relist-info-title">Gardez la Web App ouverte</div>
                    <div class="SnippingSoul-auto-relist-info-text"> Gardez la Web App EA FC ouverte au premier plan pendant la remise en vente automatique.</div>
                </div>
                <label for="SnippingSoulAutoRelistInterval" class="SnippingSoul-auto-relist-label"> Remettre en vente toutes les</label>
                <select id="SnippingSoulAutoRelistInterval" class="SnippingSoul-auto-relist-select">
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                </select>
                <div class="SnippingSoul-auto-relist-buttons">
                    <button type="button" id="SnippingSoulAutoRelistStop" class="SnippingSoul-auto-relist-stop" style="display: none;"> Arrêter la remise en vente</button>
                    <button type="button" id="SnippingSoulAutoRelistStart" class="SnippingSoul-auto-relist-start"> Démarrer la remise en vente</button>
                </div>
            </div>
        </div>
    `;var t=document.body,i=document.createElement("div");i.className="blurredDialog",i.style="width: 1000%;height: 1000%;background-color: #000000bd;filter: blur(8px);-webkit-filter: blur(8px);position: absolute;z-index:999;right: 1em;",e.style="width: 33em;position: absolute;z-index: 100;right: 37%;top: 30%;z-index:9999;background: #101010;text-align: -webkit-center;",document.getElementsByClassName("ut-root-view")[0].prepend(i),t.appendChild(e),document.getElementById("SnippingSoulAutoRelistClose").addEventListener("click",ba),e.querySelector(".SnippingSoul-auto-relist-overlay").addEventListener("click",function(r){r.target===this&&ba()}),document.getElementById("SnippingSoulAutoRelistStart").addEventListener("click",function(){var r=document.getElementById("SnippingSoulAutoRelistInterval"),s=parseInt(r.value,10);yo(s),ba()}),document.getElementById("SnippingSoulAutoRelistStop").addEventListener("click",function(){xn(),ba()})}function ba(){var n=document.getElementById("SnippingSoulAutoRelistDialog");if(n){n.remove();var e=document.querySelector(".blurredDialog");e&&e.remove()}}function yo(n){if(!_s.includes(n)){console.error("[SnippingSoul] Invalid Auto Relist interval:",n);return}xn(!1),At=n,Xe=!0,console.log(`[SnippingSoul] Auto Relist started. Interval: ${At} minutes`),jr(),Ea=setTimeout(function(){Xe&&(console.log("[SnippingSoul] Auto Relist maximum duration reached (3 hours)"),xn())},10800*1e3),mi()}function jr(){if(!(!Xe||!At)){clearTimeout(sa);var n=At*60*1e3;console.log(`[SnippingSoul] Next Auto Relist in ${At} minutes`),sa=setTimeout(async function(){if(Xe){try{await ho()}catch(e){console.error("[SnippingSoul] Auto Relist error:",e)}Xe&&jr()}},n)}}function xn(n=!0){Xe=!1,sa!==null&&(clearTimeout(sa),sa=null),Ea!==null&&(clearTimeout(Ea),Ea=null),At=null,console.log("[SnippingSoul] Auto Relist stopped"),n&&mi()}async function ho(){if(Xe){console.log("[SnippingSoul] Performing Auto Relist...");try{services.PIN.sendData(PINEventType.PAGE_VIEW,{type:"menu",pgid:"Transfer List - List View"}),services.Item.relistExpiredAuctions(),fetch("https://utas.mob.v1.prd.futc-ext.gcp.ea.com/ut/game/fc27/tradepile",{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"no-cache","content-type":"application/json","x-ut-sid":le},referrer:"https://www.ea.com/",body:null,method:"GET",mode:"cors",credentials:"omit"}),console.log("[SnippingSoul] Auto Relist completed")}catch(n){throw console.error("[SnippingSoul] Failed to perform Auto Relist:",n),n}}}function vo(n){var e=document.getElementById("SnippingSoulAutoRelistButton");if(!e){var t=document.createElement("button");t.id="SnippingSoulAutoRelistButton",t.className="btn-standard section-header-btn mini",t.style="background: darkgrey;margin-right: 1em;padding: 1px 9px;",t.addEventListener("click",function(){Xe?xn():go()}),n.parentElement.insertBefore(t,n.parentElement.children[2]),mi()}}function mi(){var n=document.getElementById("SnippingSoulAutoRelistButton");n&&(Xe?(n.textContent="Arrêter la remise en vente",n.classList.add("SnippingSoul-auto-relist-active")):(n.textContent="Remise en vente automatique",n.classList.remove("SnippingSoul-auto-relist-active")))}function pi(n,e,t){if(e._item==null&&(e._item=e),e?._item?.type==="manager"||e?._item?.definitionId===0)return;n.querySelectorAll(".SnippingSoul-custom-data").forEach(v=>v.remove());var i=document.createElement("div");i.className="SnippingSoul-custom-data";var r=e._item.definitionId;let s=null;Array.isArray(He)&&(s=He.find(v=>v.definedID===r)),!s&&Array.isArray(xe)&&(s=xe.find(v=>v.definedID===r));var l=document.createElement("div");l.className="SnippingSoul-price",t&&(l.className+="-big");var c=document.createElement("img");c.src="./images/coinIcon.png",c.style.cssText="justify-content: center;align-items: center;width: 10px;height: 10px;";var o=document.createElement("span");o.style="left: 2px;position: relative;",s!=null?o.textContent=s?.marketAverage==null||s?.marketAverage===-1?"-":s.marketAverage<1e3?Wn(s.marketAverage):services.Localization.localizeNumberShort(s.marketAverage,1):o.textContent=e._item._marketAverage==null||e._item._marketAverage===-1?"-":e._item._marketAverage<1e3?Wn(e._item._marketAverage):services.Localization.localizeNumberShort(e._item._marketAverage,1),l.appendChild(c),l.appendChild(o),i.appendChild(l);var u=document.createElement("div");u.className="SnippingSoul-positions",t&&(u.className+="-big");var d=e._item.basePossiblePositions;Array.isArray(d)&&d.forEach(v=>{if(v!==e.generalPosition){var y=UTLocalizationUtil.positionIdToName(v,services.Localization,e._item.gender);if(y){var h=document.createElement("div");h.className="SnippingSoul-position",t&&(h.className+="-big"),h.textContent=y,u.appendChild(h)}}}),i.appendChild(u);var m=document.createElement("div");m.className="SnippingSoul-right-info";var g=document.createElement("div");g.className="SnippingSoul-preferred-foot",t&&(g.className+="-big"),e._item._preferredFoot===1?g.textContent="R":e._item._preferredFoot===2?g.textContent="L":g.textContent="-",m.appendChild(g);var x=document.createElement("div");x.className="SnippingSoul-grading-score",t&&(x.className+="-big"),x.textContent=s?.gradingScore==null?"-\u{1F539}":s.gradingScore+"\u{1F539}",i.appendChild(x);var C=document.createElement("div");C.className="SnippingSoul-skills",t&&(C.className+="-big");var B=document.createElement("span");B.className="SnippingSoul-skill-moves",t&&(B.className+="-big"),B.textContent=e._item._skillMoves??"-";var w=document.createElement("span");w.className="SnippingSoul-star",w.textContent="\u2605",w.style="font-size: 7px;";var f=document.createElement("span");f.className="SnippingSoul-weak-foot",t&&(f.className+="-big"),f.textContent=e._item._weakFoot??"-",C.appendChild(B),C.appendChild(w),C.appendChild(f),m.appendChild(C),i.appendChild(m),n.appendChild(i),i.parentElement.style.overflow="visible"}function bo(n,e,t,i){e===void 0&&(e=!0),t===void 0&&(t=!0),i===void 0&&(i=!0),this.getRootElement().setAttribute("index",n.index.toString()),this._slotIndex=n.index,this._uniquePosition=n.uniquePosition,e=this._renderItem(n,e,t,i),this.renderPedestal(n,t),t&&this.renderChemistryPoints(n),e&&this._itemView&&this.getRootElement().appendChild(this._itemView.getRootElement()),n!=null&&n._item!=null&&pi(this.getRootElement(),n._item,!1)}function xo(n){var e,t;n===void 0&&(n=!1),DebugUtils.Assert(JSUtils.isValid(this.data),"Missing item data in list row component."),this.data&&(this.itemComponent&&this.itemComponent.canRender(this.data)||(this.itemComponent&&this.itemComponent.dealloc(),this.itemComponent=UTItemViewFactory.createSmallItem(this.data),(t=this.itemComponent)!=null&&t.init(),this.itemComponent&&this.__entityContainer.insertBefore(this.itemComponent.getRootElement(),this.__entityContainer.firstChild)),this.renderItemData(),(t=this.itemComponent)!=null&&t.render(this.data,(t=this.slotData)!=null?t:void 0),this.renderName(),this.dataComponent&&this.isDirty&&(this.dataComponent.dealloc(),this.dataComponent=null),this.dataComponent?this._updateDataComponent(this.dataComponent,this.data,(t=this.comparisonData)!=null?t:void 0,(t=this.slotData)!=null?t:void 0):this.setDataComponent(this._generateDataComponent(this.data,this.comparisonData)),!this.activeTagComponent&&n&&this.setActiveTagComponent(this._generateActiveTagComponent()),this.slotData&&!this.slotData.isValid()&&this.data.isPlayer()&&(this.__name.textContent=BLANK_STR),this.dataComponent&&(this.__entityContainer.appendChild(this.dataComponent.getRootElement()),this.dataComponent instanceof UTPlayerStatsListDataView&&this.slotData?this.dataComponent.render(this.data,(t=this.comparisonData)!=null?t:void 0,this.slotData.generalPosition):this.dataComponent instanceof UTPlayStyleListDataView?(t=(n=this.data).isPlayer()?n.playStyle:n.subtype,e=n.isPlayer()?n.isGK():n.isGKStyleModifier(),t=repositories.PlayStyle.getPlayStyleBonusById(t,e),this.dataComponent.render(t,e,(t=this.overrideGender)!=null?t:n.gender)):!this.dataComponent||this.dataComponent instanceof UTStringListDataView?this.dataComponent instanceof UTStringListDataView&&this.addClass("has-substring"):this.dataComponent.render(this.data,this.comparisonData)),this.activeTagComponent&&(this.addClass("is-active"),this.__rowContent.appendChild(this.activeTagComponent.getRootElement()),this.activeTagComponent.render()),this.chemistryTagComponent&&(this.__rowContent.appendChild(this.chemistryTagComponent.getRootElement()),this.chemistryTagComponent.render()),this.chemistryPointsComponent&&this.itemComponent&&this.itemComponent.renderChemistryPoints(this.chemistryPointsComponent),this._highlightUnassignedBought(),this.isDirty=!1,this.onTimedUpdate()),this.data!=null&&pi(this.itemComponent.getRootElement(),this.data,!1)}function wo(n,e,t){let i=Object.getPrototypeOf(UTLargePlayerItemView.prototype);var r,s,l,c,o,u,d,m,g,x,C=this;n.isValid()&&(n.concept?(e=this.createConceptRarity(),this.setLocalShell(n,ItemViewSize.LARGE)):this.setShell(n,ItemViewSize.LARGE,e.getGuid()),!this._traitsCanvas&&0<n.getNumPlusPlayStyles()&&(this._traitsCanvas=new UTItemTraitsCanvasView,this._traitsCanvas.init(),this.addSubview(this._traitsCanvas),this.layoutSubviews(),this._traitsCanvas.setAssets(this.assets)),this.getRootElement(),o=n.getStaticData(),r=e.getLargeColorMap(n.getTier()),this._canvas&&(this._canvas.setSize(ItemViewSize.LARGE),(l=this._traitsCanvas)!=null&&l.setSize(ItemViewSize.LARGE),r&&(this._canvas.setColorMap(r),(l=this._traitsCanvas)!=null)&&l.setColorMap(r),this._canvas.renderConcept=n.concept),UTPlayerItemView.prototype.renderItem.call(this,n,e,t),this.__playerName.textContent=o.name,l=n.isGK(),(e=n.hasHyperCosmetics()&&0<n.getHiddenStatsSubtype())?this.__playerName.classList.add("hidden-stats-signature-font"):this.__playerName.classList.remove("hidden-stats-signature-font"),s=services.Localization,t="cards.cardfront.".concat(l?"divingAbbr":"paceAbbr"),o="cards.cardfront.".concat(l?"handlingAbbr":"shootingAbbr"),u="cards.cardfront.".concat(l?"kickAbbr":"passingAbbr"),d="cards.cardfront.".concat(l?"reflexAbbr":"dribblingAbbr"),m="cards.cardfront.".concat(l?"speedAbbr":"defendingAbbr"),l="cards.cardfront.".concat(l?"positionAbbr":"headingAbbr"),(c=function(B,w){DOMKit.findElements(C.__styleViewDiv,B).forEach(function(f){return f.innerHTML=w})})(".statLabel.Pace",s.localize(t,[],{gender:n.gender})),c(".statLabel.Shooting",s.localize(o,[],{gender:n.gender})),c(".statLabel.Passing",s.localize(u,[],{gender:n.gender})),c(".statLabel.Dribbling",s.localize(d,[],{gender:n.gender})),c(".statLabel.Defending",s.localize(m,[],{gender:n.gender})),c(".statLabel.Header",s.localize(l,[],{gender:n.gender})),e?this._statsView&&(this.__mainViewDiv.contains(this._statsView.getRootElement())&&this.__mainViewDiv.removeChild(this._statsView.getRootElement()),this._statsView.dealloc(),this._statsView=null):(c=this.getStatsView(),this.__mainViewDiv.contains(c.getRootElement())||this.__mainViewDiv.appendChild(c.getRootElement()),c.setStatValues(n.getAttribute(PlayerAttribute.ONE),n.getAttribute(PlayerAttribute.TWO),n.getAttribute(PlayerAttribute.THREE),n.getAttribute(PlayerAttribute.FOUR),n.getAttribute(PlayerAttribute.FIVE),n.getAttribute(PlayerAttribute.SIX)),c.setStatLabels(s.localize(t,[],{gender:n.gender}),s.localize(o,[],{gender:n.gender}),s.localize(u,[],{gender:n.gender}),s.localize(d,[],{gender:n.gender}),s.localize(m,[],{gender:n.gender}),s.localize(l,[],{gender:n.gender})),r&&c.applyStatColors(r.attributeValues,r.footer)),r&&(this.applyColors(".playerOverview",r.header),this.applyColors(".name",r.name),this.applyColors(".playStyle span",r.playStyleText),this.applyColors(".playStyle",r.playStyleIcon)),r&&this.applyColors(".ut-item-view--bio",r.name),this.renderRestrictions&&(n.isSuspended()?(DOMKit.toggleDisplayStyle(this.__statsRowInjury,!0),this.__injuryLabel.textContent=services.Localization.localize("item.status.suspended"),this.__injury.textContent=services.Localization.localize("item.status.outnummatches",[n.getCurrentRedCards().toString()])):n.isInjured()?(e=s.localize("item.status.injured",[],{gender:n.gender}),t=UTLocalizationUtil.injuryTypeToName(n.injuryType,services.Localization),DOMKit.toggleDisplayStyle(this.__statsRowInjury,!0),this.__injuryLabel.textContent="".concat(e," ").concat(t),this.__injury.textContent=services.Localization.localize("item.status.outnummatches",[n.injuryGames.toString()])):DOMKit.toggleDisplayStyle(this.__statsRowInjury,!1)),r&&this.applyColors(".ut-item-view--stats",r.name),o=n.playStyle,u=UTLocalizationUtil.playStyleIdToName(o,services.Localization,n.gender),DOMKit.addClass(this.__playStyle,"chemstyle"+o),n.isValid()&&(d=repositories.PlayStyle.getPlayStyleBonusById(o,n.isGK()),this.applyChevrons(d)),this.__playStyleName.textContent=u,DOMKit.addClass(this.__playStyleLarge,"chemstyle"+o),r&&(this.applyColors(".ut-item-view--style",r.name),this._barSet1.applyStatBarColors(r.attributeValues),this._barSet2.applyStatBarColors(r.attributeValues),this._barSet3.applyStatBarColors(r.attributeValues),this._barSet4.applyStatBarColors(r.attributeValues),this._barSet5.applyStatBarColors(r.attributeValues),this._barSet6.applyStatBarColors(r.attributeValues)),m=n.getPlayerKeySubAttributes(),g=[this.__keyAttVal1,this.__keyAttVal2,this.__keyAttVal3,this.__keyAttVal4,this.__keyAttVal5],x=[this.__keyAttLabel1,this.__keyAttLabel2,this.__keyAttLabel3,this.__keyAttLabel4,this.__keyAttLabel5],m&&5<=m.length&&m.forEach(function(B,w){B.highlight&&DOMKit.addClass(g[w],"ut-item-view--strength-key-attribute"),g[w].textContent=B.value().toString(),x[w].textContent=s.localize("item.subattribute.".concat(ItemSubAttribute[B.type])),B.type!==ItemSubAttribute.weakfoot&&B.type!==ItemSubAttribute.skillmove||((B=new EAImageView).src="images/star.png",B.addClass("ut-skill-star"),g[w].prepend(B.getRootElement()))}),this.renderTraits(n,[this.__traitLabel1,this.__traitLabel2,this.__traitLabel3,this.__traitLabel4,this.__traitLabel5],[this.__traitIcon1,this.__traitIcon2,this.__traitIcon3,this.__traitIcon4,this.__traitIcon5],5),r)&&(this.applyColors(".ut-item-view--strength",r.name),this.applyColors(".ut-item-view--traits",r.name),this.applyColors(".ut-item-view--positions-header",r.name)),n._item!=null&&pi(this.getRootElement(),n._item,!0)}async function Co(){var n=Z=="pc"?"pc":"ps5";if(ha&&Ni==n)return ha;console.log("[FUT.GG] Downloading price database for:",n);var e=await Zn(Ei+"manifest.json?t="+Date.now()),t=JSON.parse(e);async function i(x){var C=Ei+x+".v1."+t[x]+".json";console.log("[FUT.GG] Downloading:",C);var B=await Zn(C);return JSON.parse(B)}var r=n=="pc"?"player-prices-pc":"player-prices-ps5",s=n=="pc"?"player-prices-pc-dyn":"player-prices-ps5-dyn",l=await i("player-prices-index"),c=await i(s),o=await i(r),u=await i("fc-core-data"),d=new Map,m=l.id0;d.set(m,{price:Number(o.p[0])||0,dynamicPrice:Number(c.p[0])||0});var g=new Map;return(u.rarities||[]).forEach(function(x){x.name&&g.set(String(x.name).toLowerCase(),Number(x.eaId))}),l.d.forEach(function(x,C){m+=x,d.set(m,{price:Number(o.p[C+1])||0,dynamicPrice:Number(c.p[C+1])||0})}),ha={prices:d,rarities:g},Ni=n,console.log("[FUT.GG] Price map loaded:",d.size,"players"),ha}function Zn(n){return new Promise(function(e,t){function i(r){r.data&&r.data.message==="fetchCompleted"&&(window.removeEventListener("message",i),e(r.data.res))}window.addEventListener("message",i),window.postMessage({message:"fetchPls",urlToFetch:encodeURIComponent(n)},"*")})}async function Eo(n){console.log("[FUT.GG] Recherche en cours cheapest players for rating:",n);var e=await Co(),t=e.prices,i=e.rarities,r=new Map,s="https://www.fut.gg/api/fut/players/v2/27/?page=1&overall__gte="+n+"&overall__lte="+n+"&response_format=card-image&rarity_id=%5B0%5D&sorts=current_price&market_players=true",l=await Zn(s),c=JSON.parse(l),o=c.data||[];console.log("[FUT.GG] Players returned:",o.length);for(var u=0;u<o.length;u++){var d=o[u],m=String(d.rarityName||"");if(!(m!="Rare"&&m!="Common")){var g=i.get(m.toLowerCase()),x=t.get(d.eaId);if(x){var C=Number(x.price)||0;if(C<=0&&(C=Number(x.dynamicPrice)||0),!(C<=0)){var B=C-C*.05;B=yn(B);var w=d.commonName||d.cardName||"Unknown",f=String(d.rating||n),v=d.rarityName,y=d.commonName||d.cardName||w,h=[w,f,v,C,g,B,y];r.set(d.eaId,h)}}}}var E=Array.from(r.values()).sort(function(A,P){return parseInt(A[3])-parseInt(P[3])});return console.log("[FUT.GG] "+E.length+" joueurs correspondants trouvés."),E}function No(n){var e=0,t=this.pileSizes.get(n);switch(n){case ItemPile.PURCHASED:return!1;case ItemPile.TRANSFER:e=this.transfer.length;break;case ItemPile.INBOX:e=this.inbox.length;break;case ItemPile.STORAGE:e=this.storage.length;break;case ItemPile.CLUB:case ItemPile.EVOLUTION:return!1}return(t||0)<=e}function Le(n){return Array.isArray(n)?n:n&&typeof n=="object"?Object.keys(n).map(function(e){return n[e]}):[]}function Hr(n){if(n==null)return null;var e=Number(n);return isNaN(e)?String(n):e}function zt(n){return n=Number(n)||0,n.toLocaleString("en-US")}function $r(n){return new Promise(function(e){setTimeout(e,n)})}async function Bo(){try{var n=await new Promise(function(t,i){var r=function(s){s.data&&s.data.message==="getCompleted"&&(window.removeEventListener("message",r),t(s.data.result))};window.addEventListener("message",r),window.postMessage({message:"get",keys:[xa]},"*")});if(n&&n[xa]){var e=n[xa];if(e&&e.players)return _e=e.players||{},dt=e.syncedAt||null,console.log("SnippingSoul Gallery sync loaded:",Object.keys(_e).length,"players"),!0}return _e={},dt=null,!1}catch(t){return console.error("SnippingSoul Gallery load error:",t),_e={},dt=null,!1}}function Kr(){try{var n={version:bs,syncedAt:dt,players:_e};return window.postMessage({message:"set",objPassed:ne([xa],[n])},"*"),!0}catch(e){return console.error("SnippingSoul Gallery save error:",e),!1}}function So(n){return new Promise(function(e,t){var i=function(r){r.data&&(r.data.message==="fetchCompleted"&&(window.removeEventListener("message",i),e(r.data.res)),r.data.message==="fetchError"&&(window.removeEventListener("message",i),t(r.data.error||"Fetch error")))};window.addEventListener("message",i),window.postMessage({message:"fetchPls",urlToFetch:encodeURIComponent(n)},"*")})}function Mo(){var n=document.querySelector(".ut-tab-bar");if(n&&!n.querySelector(".SnippingSoulGallery")){var e=document.createElement("button");e.className="ut-tab-bar-item SnippingSoulGallery",e.innerHTML=`
        <img src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/images/sbc/dustpoint.png" style="justify-content: center;align-items: center;width: 30px;height: 30px;">
        <span>Galerie SnippingSoul</span>
    `,e.style="order: 6;",e.addEventListener("mouseover",function(t){Ut(e,!0)}),e.addEventListener("mouseout",function(t){Ut(e,!1)}),n.appendChild(e)}}function Rn(){if(document.querySelector(".SnippingSoul-gallery")){document.getElementsByClassName("SnippingSoulGallery")[0].classList.remove("selected");var n=document.querySelector(".ut-navigation-container-view--content");if(!n)return;var e=document.querySelector(".SnippingSoul-gallery");e&&e.remove()}}function _o(){var n=document.createElement("div");n.id="SnippingSoul-loading",n.innerHTML=`
        <div class="SnippingSoul-loading-spinner"></div>
        <div>Chargement…</div>
    `,n.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: white;
        font-size: 14px;
        font-family: Arial, sans-serif;
        z-index: 999999;
    `;var e=document.createElement("style");e.id="SnippingSoul-loading-style",e.textContent=`
        .SnippingSoul-loading-spinner {
            width: 35px;
            height: 35px;
            border: 4px solid rgba(255, 247, 0, 0.2);
            border-top-color: #fff700;
            border-radius: 50%;
            animation: SnippingSoulLoadingSpin 0.7s linear infinite;
        }

        @keyframes SnippingSoulLoadingSpin {
            to { transform: rotate(360deg); }
        }
    `,document.head.appendChild(e),document.body.appendChild(n)}function To(){var n=document.getElementById("SnippingSoul-loading"),e=document.getElementById("SnippingSoul-loading-style");n&&n.remove(),e&&e.remove()}async function Po(){pn!=null&&pn.length===0&&await Ko(),document.getElementsByClassName("ut-tab-bar-item SnippingSoulGallery")[0].classList.add("selected");var n=document.getElementsByClassName("ut-navigation-container-view--content")[0].parentElement;if(n){_o();try{await Bo()}catch(r){console.error(r)}finally{To()}var e=document.createElement("div");e.className="SnippingSoul-gallery",n.appendChild(e),e.innerHTML=`
        <div class="SnippingSoul-gallery-header">

            <div>
                <div class="SnippingSoul-gallery-title">
                    Galerie FUT
                </div>

                <div class="SnippingSoul-gallery-subtitle">
                    Collectionnez les joueurs et complétez la galerie du club
                </div>
            </div>

            <button class="SnippingSoul-gallery-sync-button">
                <span class="SnippingSoul-sync-icon">\u21BB</span>
                Synchroniser le club
            </button>

        </div>

        <div class="SnippingSoul-gallery-sync-area"></div>

        <div class="SnippingSoul-gallery-body"></div>
    `;var t=e.querySelector(".SnippingSoul-gallery-body");try{var i=await So("https://www.fut.gg/api/fut/gallery/fc27/hub/");Mn=JSON.parse(i),fi(t,Mn)}catch(r){console.log("SnippingSoul Gallery error:",r),t.innerHTML=`
            <div class="SnippingSoul-gallery-error">
                Impossible de charger la galerie.
            </div>
        `}e.querySelector(".SnippingSoul-gallery-sync-button").addEventListener("click",function(){wa||Ro(e,Mn)})}}function fi(n,e){n.innerHTML="";var t=Le(e&&e.data&&e.data.categories),i=document.createElement("div");i.className="SnippingSoul-gallery-category-grid",t.forEach(function(r){var s=document.createElement("div");s.className="SnippingSoul-gallery-category";var l,c;r.name==="Premier League / Barclays WSL"?(l=13,c=2216):r.name==="LALIGA EA SPORTS / Liga F Moeve"?(l=53,c=2222):r.name==="Bundesliga / Frauen-Bundesliga"?(l=19,c=2215):r.name==="Serie A Enilive"?l=31:r.name==="Ligue 1 McDonald's / Arkema PL"?(l=16,c=2218):l=-1;var o="";if(l!==-1){var u=[l];c!==void 0&&u.push(c),u.forEach(function(d){try{var m=AssetLocationUtils.getLeagueImageUri(d,!0);m&&(o+=`<img class="SnippingSoul-gallery-category-league-logo" src="${m}">`)}catch{}})}else r.name==="Rarities"?o='<img src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000002-076c17f6-1ddc.png" style="width: 50px;height: 50px;">':o='<img src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000021-cd13db71-9eec.png" style="width: 50px;height: 50px;">';r.name.substring(0,r.name.indexOf("/")+1)===""?s.innerHTML=`
            <div class="SnippingSoul-gallery-category-icon">
                ${`<div class="SnippingSoul-gallery-category-leagues">${o}</div>`}
            </div>

            <div class="SnippingSoul-gallery-category-name">
                ${r.name||"Category"}
            </div>

            <div class="SnippingSoul-gallery-category-count">
                ${Le(r.sets).length} sets
            </div>
        `:s.innerHTML=`
            <div class="SnippingSoul-gallery-category-icon">
                ${`<div class="SnippingSoul-gallery-category-leagues">${o}</div>`}
            </div>

            <div class="SnippingSoul-gallery-category-name">
                ${r.name.substring(0,r.name.indexOf("/")+1)||"Category"}
            </div>

            <div class="SnippingSoul-gallery-category-name">
                ${r.name.substring(r.name.indexOf("/")+1).trim()||"Category"}
            </div>

            <div class="SnippingSoul-gallery-category-count">
                ${Le(r.sets).length} sets
            </div>
        `,s.addEventListener("click",function(){Qr(n,e,r)}),i.appendChild(s)}),n.appendChild(i)}function ko(n,e){var t=Le(n&&n.data&&n.data.sets);return t.find(function(i){return Number(i.setId)===Number(e)})||null}function Qr(n,e,t){n.innerHTML="";var i=document.createElement("div");i.className="SnippingSoul-gallery-view",i.innerHTML=`
    <div class="SnippingSoul-gallery-navigation">
        <button class="SnippingSoul-gallery-back">
            \u2190 Categories
        </button>

        <div class="SnippingSoul-gallery-view-title">
            ${t.name||""}
        </div>
    </div>

    <div class="SnippingSoul-gallery-set-grid"></div>
`,n.appendChild(i),i.querySelector(".SnippingSoul-gallery-back").addEventListener("click",function(){Ge=!1,fi(n,e)});var r=i.querySelector(".SnippingSoul-gallery-set-grid"),s=Le(t.sets);s.forEach(function(l){var c=ko(e,l.id);c!=null&&c.items!=null&&c.items!=null&&c.items.length!=0&&Io(l,c,r,e,t)})}function Io(n,e,t,i,r){var s=document.createElement("div");s.className="SnippingSoul-gallery-set";var l=n.name||e&&e.name||"Set",c={"Premier League":13,"Barclays WSL":2216,"LALIGA EA SPORTS":53,"Liga F Moeve":2222,Bundesliga:19,"Frauen-Bundesliga":2215,"Serie A Enilive":31,"Ligue 1 McDonald's":16,"Arkema PL":2218},o="",u=c[l];if(u!==void 0)try{var d=AssetLocationUtils.getLeagueImageUri(u,!0);d&&(o=`<img class="SnippingSoul-gallery-set-badge SnippingSoul-gallery-set-league-badge" src="${d}">`)}catch{}else n.name==="Season 1"?o='<img class="SnippingSoul-gallery-set-badge" src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000002-076c17f6-1ddc.png">':n.name==="TOTW"?o='<img class="SnippingSoul-gallery-set-badge" src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000046-ca53a4b3-87bc.png">':n.name==="Heroes"?o='<img class="SnippingSoul-gallery-set-badge" src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000042-3326d01a-70e4.png">':n.name==="Holographics"?o='<img class="SnippingSoul-gallery-set-badge" src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000002-076c17f6-1ddc.png">':n.name==="Squad Foundations"?o='<img class="SnippingSoul-gallery-set-badge" src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/sbc/companion/sets/images/sbc_set_image_1000041-56ccf8aa-1393.png">':n.name==="Starter Set"&&(o='<img class="SnippingSoul-gallery-set-badge" src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/images/logo/Logo@1x.png">');if(!o){var m=n.clubEaId||e&&e.clubEaId;if(m!=null)try{var g=AssetLocationUtils.getBadgeImageUri(m,!0);o=`<img class="SnippingSoul-gallery-set-badge" src="${g}">`}catch{}}var x=Yr(e);x.total!==0&&(s.innerHTML=`
    <div class="SnippingSoul-gallery-set-top">

        <div class="SnippingSoul-gallery-set-badge-wrapper">
            ${o}
        </div>

        <div class="SnippingSoul-gallery-set-info">

            <div class="SnippingSoul-gallery-set-name">
                ${l}
            </div>

            <div class="SnippingSoul-gallery-set-count">
                ${x.collected} / ${x.total} players
            </div>
        </div>
        <div class="SnippingSoul-gallery-set-dustpoints">
        <span style="font-size: 11px;opacity: 0.5;">${n.totalTokens}</span>
        <div class="SnippingSoul-dustpoint-circle">
            <img src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/images/sbc/dustpoint.png" alt="Dustpoint">
        </div>

        </div>

    </div>

    <div class="SnippingSoul-gallery-grades">
        ${Lo(e,x.points)}
    </div>

    <div class="SnippingSoul-gallery-set-progress">

        <div class="SnippingSoul-gallery-progress-label">
            <span>Collection</span>
            <span>${x.percentage}%</span>
        </div>

        <div class="SnippingSoul-gallery-progress-track">
            <div
                class="SnippingSoul-gallery-progress-fill"
                style="width:${x.percentage}%"
            ></div>
        </div>

    </div>
`,s.addEventListener("click",function(){Ao(t.closest(".SnippingSoul-gallery-view")?t.closest(".SnippingSoul-gallery-view").parentNode:t,i,r,n,e)}),t.appendChild(s))}function Yr(n){if(!n)return{collected:0,total:0,points:0,percentage:0};var e=Le(n.costTiers),t={},i=0,r=0,s=0;return e.forEach(function(l){var c=Le(l.items);c.forEach(function(o){if(o.eaId!==null){var u=String(o.eaId);if(!t[u]){t[u]=!0,i++;var d=_e[u];d&&d.isCollected===!0&&(r++,s+=Number(d.gradingScore)||0)}}})}),{collected:r,total:i,points:s,percentage:i>0?Math.round(r/i*100):0}}function Lo(n,e){if(!n||!n.grades)return"";var t=Le(n.grades);if(!t.length)return"";t.sort(function(r,s){return Number(r.threshold||0)-Number(s.threshold||0)});var i=`
        <div class="SnippingSoul-grade-progress">
    `;return t.forEach(function(r,s){var l=Number(r.threshold)||0,c=s>0&&Number(t[s-1].threshold)||0,o=l-c,u=0;e>=l?u=100:e>c&&o>0&&(u=(e-c)/o*100),i+=`
            <div class="SnippingSoul-grade">

                <div class="SnippingSoul-grade-label">
                    <span>${r.name||""}</span>
                    <span>${zt(l)}</span>
                </div>

                <div class="SnippingSoul-grade-track">

                    <div
                        class="SnippingSoul-grade-fill"
                        style="width:${Math.min(100,Math.max(0,u))}%"
                    ></div>

                </div>

            </div>
        `}),i+="</div>",i}function Ao(n,e,t,i,r){n.innerHTML="";var s=document.createElement("div");s.className="SnippingSoul-gallery-view";var l=i.name||r&&r.name||"Set",c="";i&&i.clubEaId!==void 0&&i.clubEaId!==null&&(c=AssetLocationUtils.getBadgeImageUri(i.clubEaId,!0));var o=Yr(r);s.innerHTML=`
        <div class="SnippingSoul-gallery-navigation">

            <button class="SnippingSoul-gallery-back">
                \u2190 ${t.name||"Category"}
            </button>

            <div class="SnippingSoul-gallery-view-title SnippingSoul-gallery-set-title">

                ${c?`<img
                            src="${c}"
                            class="SnippingSoul-gallery-set-badge"
                        >`:""}

                <span>${l}</span>

            </div>

        </div>

        <div class="SnippingSoul-gallery-set-summary">

            <div class="SnippingSoul-summary-stat">
                <strong>${o.collected}</strong>
                <span>Obtenus</span>
            </div>

            <div class="SnippingSoul-summary-stat">
                <strong>${o.total}</strong>
                <span>Total des joueurs</span>
            </div>

            <div class="SnippingSoul-summary-stat">
                <strong>${zt(o.points)}</strong>
                <span>Points</span>
            </div>

        </div>

        <div class="SnippingSoul-gallery-player-tiers"></div>
    `,n.appendChild(s),s.querySelector(".SnippingSoul-gallery-back").addEventListener("click",function(){Ge=!1,Qr(n,e,t)});var u=s.querySelector(".SnippingSoul-gallery-player-tiers"),d=Le(r&&r.costTiers);Ot=[],Ge=!0,d.forEach(function(m,g){Oo(u,m,g)})}function Oo(n,e,t){var i=["D","C","B","A","S"],r=Le(e.items);if(Ot=Ot.concat(r),!!r.length){var s=0,l=0;r.forEach(function(m){var g=_e[String(m.eaId)];g&&g.isCollected===!0&&(l++,s+=Number(g.gradingScore)||0)});var c=document.createElement("div");c.className="SnippingSoul-gallery-tier",c.innerHTML=`
        <div class="SnippingSoul-gallery-tier-header">

            <div>
                <div class="SnippingSoul-gallery-tier-title"></div>
            </div>
            <div class="SnippingSoul-gallery-tier-cost">Completion cost: ${zt(e.cost||0)}
            <img src="./images/coinIcon.png" style="justify-content: center; align-items: center; width: 10px; height: 10px;">
            </div>

            <div class="SnippingSoul-gallery-tier-actions">
                <button class="SnippingSoul-gallery-tier-buy" data-action="buy">Acheter</button>
                <button class="SnippingSoul-gallery-tier-buy-resell" data-action="buy-resell">Achat-revente</button>
            </div>

            <div class="SnippingSoul-gallery-tier-points">
                <strong>
                    ${zt(s)}
                </strong>
                points

                <span>
                    ${l}/${r.length}
                </span>
            </div>

        </div>

        <div class="SnippingSoul-gallery-player-grid"></div>
    `,n.appendChild(c),c.children[0].children[0].children[0].setAttribute("data-tier",i[t]);var o=c.querySelector(".SnippingSoul-gallery-tier-buy"),u=c.querySelector(".SnippingSoul-gallery-tier-buy-resell");o.addEventListener("click",async function(){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?er(De,e,t,!1):Ie("BUY GALLERY PLAYERS","Get SnippingSoul Premium in order to buy gallery players.")}),u.addEventListener("click",async function(){D==null&&await fe(String(services.User.currentUserId)),D==="Active"?er(De,e,t,!0):Ie("BUY GALLERY PLAYERS","Get SnippingSoul Premium in order to buy gallery players.")});var d=c.querySelector(".SnippingSoul-gallery-player-grid");De=[],r.forEach(function(m){var g=_e[String(m.eaId)];Do(m,g,d)})}}function er(n,e,t,i){if(n.length===0){console.log("No players selected for purchase."),Ae("No players selected","Please select a player to buy to proceed.",!0);return}var r=[];console.log(De),n.forEach(function(s){var l=_e[String(s.id)];(!l||l.isCollected!==!0)&&r.push(s)}),console.log("SnippingSoul Tier:",t),console.log("Is resell enabled:",i),console.log("Players to buy:",r),n.length===r.length?Ho(r,i):(console.log("Some selected players are already collected."),Ae("Error","Some selected players are already collected. Please deselect them before proceeding.",!0))}function Do(n,e,t){var i=null,r=$o(n.eaId);if(e==null)return;try{i=repositories.Item.getStaticDataByDefId(r)}catch{}var s=i&&i.firstName?i.firstName:"",l=i&&i.lastName?i.lastName:"",c=(s+" "+l).trim();c||(c="Unknown Player");var o=e&&e.isCollected===!0,u=e&&Number(e.gradingScore)?Number(e.gradingScore):0,d=pn.some(function(A){return A===n.eaId}),m=n.price||0,g=De.findIndex(function(A){return A.id===n.eaId}),x=g!==-1,C=document.createElement("div");C.className="SnippingSoul-gallery-player",o?C.classList.add("is-collected"):C.classList.add("is-not-collected"),x&&C.classList.add("is-selected");var B=factories.Item.createItem(e.itemData),w=UTItemViewFactory.createLargeItem(B);w.init();var f=w.getRootElement();C.dataset.playerId=String(n.eaId),C.appendChild(f),w.render(B);var v=document.createElement("div");v.className="SnippingSoul-price-big",v.innerHTML=`<img src="./images/coinIcon.png" style="justify-content: center; align-items: center; width: 10px; height: 10px;"><span style="left: 2px; position: relative;">${zt(m)}</span>`,v.style="z-index: 1;left: 50%;",d||C.appendChild(v);var y=document.createElement("div");y.className="SnippingSoul-grading-score-big",y.innerHTML=`<img src="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/images/sbc/dustpoint.png" style="justify-content: center; align-items: center; width: 10px; height: 10px;"><span style="left: 2px; position: relative;">${zt(u)}</span>`,y.style="z-index: 1;left: 50%;",C.appendChild(y);var h=document.createElement("div");h.className="SnippingSoul-player-status";function E(){h.classList.remove("is-collected","is-selected"),o?(h.classList.add("is-collected"),h.innerHTML="\u2713"):x?(h.classList.add("is-selected"),h.innerHTML="\u2713"):h.innerHTML="",h.title=o?"Joueur obtenu":x?"Deselect player":"Select player"}E(),d||C.appendChild(h),C.addEventListener("click",function(){if(!(o||d)){var A=De.findIndex(function(P){return P.id===n.eaId});A!==-1?(De.splice(A,1),x=!1):(De.push({id:n.eaId,name:c,coins:m,pts:u}),x=!0),C.classList.toggle("is-selected",x),E(),console.log("Selected SnippingSoul players:",De)}}),t.appendChild(C)}async function Ro(n,e){var t=Ot&&Ot.length>0?Ot:null;if(!wa){wa=!0,xs=0;var i=n.querySelector(".SnippingSoul-gallery-sync-area"),r=n.querySelector(".SnippingSoul-gallery-body");i.innerHTML=`
        <div class="SnippingSoul-sync-panel">

            <div class="SnippingSoul-sync-header">

                <div>
                    <strong>
                        ${Ge?"Syncing set":"Syncing your club"}
                    </strong>

                    <span class="SnippingSoul-sync-status">
                        Préparation…
                    </span>
                </div>

                <div class="SnippingSoul-sync-percentage">
                    0%
                </div>

            </div>

            <div class="SnippingSoul-sync-progress-track">
                <div
                    class="SnippingSoul-sync-progress-fill"
                    style="width:0%"
                ></div>
            </div>

            <div class="SnippingSoul-sync-detail">
                Préparation de la liste de joueurs…
            </div>

        </div>
    `,r.innerHTML="";try{var s=[];if(Ge){Ht(i,0,"Preparing set players...");var l={};t.forEach(function(m){if(!(m.eaId===void 0||m.eaId===null)&&m.eaId!==null){var g=String(m.eaId);l[g]||(l[g]=!0,s.push(m.eaId))}}),console.log("SnippingSoul SET PLAYER IDS:",s.length,s)}else{Ht(i,0,"Loading EA player database...");var c=await Fo();if(!c)throw new Error("assetsVersion not found");Ht(i,1,"Downloading player database...");var o=await Uo(c);if(console.log("SnippingSoul PLAYERS.JSON:",o.length,o.slice(0,5)),!o.length)throw new Error("No players found in players.json");var l={};o.forEach(function(g){var x=Hr(g.id);if(x!==null){var C=String(x);l[C]||(l[C]=!0,s.push(x))}}),console.log("SnippingSoul PLAYER IDS:",s.length,s.slice(0,20))}if(!s.length)throw new Error(Ge?"No players found in this set":"No player IDs found");await zo(s,function(m,g){var x=Math.round(m/g*100);Ht(i,x,Ge?"Syncing set players...":"Syncing club players...")},!Ge),dt=Date.now(),Kr(),Ht(i,100,"Sync completed");var u=i.querySelector(".SnippingSoul-sync-status"),d=i.querySelector(".SnippingSoul-sync-detail");u&&(u.textContent=Ge?"Set synced successfully":"Club synced successfully"),d&&(d.textContent=Go(dt)),await $r(700),i.innerHTML="",fi(r,e)}catch(m){console.log("SnippingSoul Gallery sync error:",m),i.innerHTML=`
            <div class="SnippingSoul-sync-error">
                Sync failed.
                Please try again.
            </div>
        `}finally{wa=!1,Ge=!1}}}async function Fo(){var n=await fetch("https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/config/companion/remoteConfig.json",{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"no-cache","content-type":"application/json"},referrer:"https://www.ea.com/ea-sports-fc/ultimate-team/web-app/",method:"GET",mode:"cors",credentials:"include"});if(!n.ok)throw new Error("remoteConfig HTTP "+n.status);var e=await n.json();return Wr(e,"assetsVersion")}function Wr(n,e){if(!n||typeof n!="object")return null;if(Object.prototype.hasOwnProperty.call(n,e))return n[e];for(var t=Object.keys(n),i=0;i<t.length;i++){var r=Wr(n[t[i]],e);if(r!=null)return r}return null}async function Uo(n){var e="https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fut/items/web/players.json?_="+encodeURIComponent(n),t=await fetch(e,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"no-cache"},referrer:"https://www.ea.com/ea-sports-fc/ultimate-team/web-app/",method:"GET",mode:"cors",credentials:"include"});if(!t.ok)throw new Error("players.json HTTP "+t.status);var i=await t.json();return Le(i.Players||i.players)}async function zo(n,e,t){t&&(_e={});for(var i=250,r=Math.ceil(n.length/i),s=0;s<n.length;s+=i){var l=n.slice(s,s+i),c=await Vo(l),o=Le(c.itemData);console.log("SnippingSoul RETURNED PLAYERS:",o.length),o.forEach(function(d){var m=d.defId!==void 0?d.defId:d.id;m!=null&&m!==null&&(d.dream=!1,_e[String(m)]={isCollected:d.isCollected,gradingScore:Number(d.gradingScore)||0,itemData:d})}),console.log("SnippingSoul STORED PLAYERS:",Object.keys(_e).length);var u=Math.floor(s/i)+1;e&&e(u,r),s+i<n.length&&await $r(1500)}}async function Vo(n){var e=n.join(","),t="https://utas.mob.v1.prd.futc-ext.gcp.ea.com/ut/game/fc27/defid?count=250&sort=desc&start=0&type=player&defId="+encodeURIComponent(e),i=await fetch(t,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","x-ut-sid":le},referrer:"https://www.ea.com/",method:"GET",mode:"cors",credentials:"omit"});if(!i.ok)throw new Error("defid HTTP "+i.status);var r=await i.json();return console.log("SnippingSoul DEFID RESPONSE:",r),r}function Ht(n,e,t){var i=n.querySelector(".SnippingSoul-sync-percentage"),r=n.querySelector(".SnippingSoul-sync-progress-fill"),s=n.querySelector(".SnippingSoul-sync-detail");i&&(i.textContent=e+"%"),r&&(r.style.width=e+"%"),s&&(s.textContent=t||"")}function Go(n){if(!n)return"";var e=new Date(n);return"Last sync: "+e.toLocaleString()}async function ei(n,e,t,i,r,s,l=0){return new Promise(async function(c,o){try{services.Item.clearTransferMarketCache(),services.Item.itemDao.itemRepo.pileSizes._collection[ItemPile.PURCHASED]=5e3;var u=new UTMarketSearchResultsViewController,d=new UTSearchCriteriaDTO,m=services.User.getUser().marketSearchCriteria,g=Object.create(Object.getPrototypeOf(m),Object.getOwnPropertyDescriptors(m));for(var x in g)d.hasOwnProperty(x)&&(d[x]=g[x]);l==0?d.minBid=0:l==1?d.minBid=150:l==2&&(d.minBid=200),d.maskedDefId=e,d.maxBuy=parseInt(t),d.type="player",d._type="player",d.sortBy="ovr",u.initWithSearchCriteria(d);var C=await jo(e,t,d.minBid),B=C.auctionInfo||[];if(!B||B.length===0){if(l<2){var w=tr(t);s&&s("No player found at "+parseInt(t).toLocaleString()+" crédits. Nouvel essai avec "+w.toLocaleString()+" crédits… (Essai "+(l+1)+"/3)"),await Ce(2e3),c(await ei(n,e,w,i,r,s,l+1));return}c({status:"not_found",attempts:l,lastPrice:parseInt(t)});return}const ssDetected=performance.now();var f=B.reduce(function(F,V){return V.buyNowPrice<F.buyNowPrice?V:F}),v=f.tradeId,y=f.buyNowPrice,h=factories.Item.createItem(f.itemData),E=r;if(f.tradeState!=="active"){c({status:"not_active",playerName:E});return}s&&s("Achat de "+E+" pour "+y.toLocaleString()+" crédits…",E),rt=!0;const ssSent=performance.now();var A=await fetch(`https://utas.mob.v5.prd.futc-ext.gcp.ea.com/ut/game/fc27/trade/${v}/bid`,{headers:{accept:"*/*","accept-language":"it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json","sec-ch-ua":'"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-ut-sid":le},referrer:"https://www.ea.com/",referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify({bid:y}),method:"PUT",mode:"cors",credentials:"omit"}),P={};if(A.status==200)try{P=await A.json()}catch{throw new Error("Failed to parse purchase response.")}const ssFinished=performance.now(),ssTiming={reactionMs:ssSent-ssDetected,responseMs:ssFinished-ssSent,totalMs:ssFinished-ssDetected};if(A.status==461)ssTrack("missed",{player:E,price:y,tradeId:v,timing:ssTiming,source:"gallery",note:"Un autre utilisateur a acheté cet élément."});if(P.status=A.status,P.status==200){ssTrack("purchase",{id:"purchase:"+v,player:E,price:y,itemId:h.id,tradeId:v,rating:h.rating,timing:ssTiming,targetPrice:i?t:null,source:"gallery"});var b=!1,M=_e[String(n.id)];if(M&&(M.isCollected=!0),i){var T=parseInt(t);if(parseInt(t)<950?T-=50:parseInt(t)<9500?T-=100:parseInt(t)<99500?T-=250:T-=1e3,!repositories.Item.isPileFull(ItemPile.TRANSFER))services.Item.move(h,ItemPile.TRANSFER),services.Item.list(h,T,parseInt(t),3600),b=!0;else throw new Error("Transfer List is full. Cannot relist "+E+".")}else repositories.Item.isPileFull(ItemPile.TRANSFER)?(ni(h),services.Item.move(h,ItemPile.PURCHASED)):services.Item.move(h,ItemPile.TRANSFER);if(ii(),ri(),document.getElementsByClassName("view-navbar-currency-coins")[0]&&(document.getElementsByClassName("view-navbar-currency-coins")[0].textContent=services.Localization.localizeNumber(P.credits)),D==null&&await fe(String(services.User.currentUserId)),D!="Active"){ke--;var Y=new Date().toISOString().split("T")[0];if(window.postMessage({message:"set",objPassed:ne(["snipedOnDate","limitRemainingPlayersToBuyToday"],[Y,ke])},"*"),ke<=0)throw new Error("Daily snipes limit reached.")}s&&s(b?"Acheté "+E+" pour "+y.toLocaleString()+" crédits, puis remis en vente.":"Acheté "+E+" pour "+y.toLocaleString()+" crédits."),c({status:"bought",playerName:E,buyPrice:y,relisted:b});return}if(P.status==461){if(l<2){var w=tr(t);s&&s(E+" a été acheté par un autre utilisateur à "+y.toLocaleString()+" crédits. Nouvel essai avec un plafond de "+w.toLocaleString()+" crédits… (Essai "+(l+1)+"/3)"),await Ce(2e3),c(await ei(n,e,w,i,r,s,l+1));return}c({status:"missed",playerName:E,buyPrice:y,attempts:l,lastPrice:parseInt(t)});return}throw P.status==473?new Error("Unassigned Pile is full. Stopping the process."):P.status==401?new Error("Unauthorized. Please log in again."):new Error("Purchase failed. HTTP status: "+P.status)}catch(F){o(F)}})}async function jo(n,e,t){var i=new URL("https://utas.mob.v1.prd.futc-ext.gcp.ea.com/ut/game/fc27/transfermarket");i.searchParams.set("num","21"),i.searchParams.set("start","0"),i.searchParams.set("type","player"),i.searchParams.set("maskedDefId",String(n)),i.searchParams.set("maxb",String(parseInt(e))),t!==void 0&&i.searchParams.set("micr",String(t));var r=await fetch(i.toString(),{method:"GET",headers:{accept:"*/*","content-type":"application/json","x-ut-sid":le},credentials:"omit"});if(!r.ok)throw new Error("Market search failed: HTTP "+r.status+" Actualisez la Web App.");return await r.json()}function tr(n){return n=parseInt(n),n<950?n+=50:n<9500?n+=100:n<99500?n+=250:n+=1e3,n}function Ae(n,e,t){if(!me){me=document.createElement("div"),me.id="SnippingSoul-gallery-buy-dialog",me.innerHTML=`
            <div class="SnippingSoul-gallery-buy-dialog-overlay">
                <div class="SnippingSoul-gallery-buy-dialog-box">

                    <div class="SnippingSoul-gallery-buy-dialog-title"></div>

                    <div class="SnippingSoul-gallery-buy-dialog-message"></div>

                    <div class="SnippingSoul-gallery-buy-dialog-spinner"></div>

                    <button class="SnippingSoul-gallery-buy-dialog-close">
                        Fermer
                    </button>

                </div>
            </div>
        `;var i=document.createElement("style");i.textContent=`
            .SnippingSoul-gallery-buy-dialog-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.45);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
            }

            .SnippingSoul-gallery-buy-dialog-box {
                width: 420px;
                max-width: calc(100% - 40px);
                background: #121212f7;
                border-radius: 12px;
                padding: 25px;
                box-sizing: border-box;
                text-align: center;
                color: white;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            }

            .SnippingSoul-gallery-buy-dialog-title {
                font-size: 21px;
                font-weight: 700;
                margin-bottom: 15px;
            }

            .SnippingSoul-gallery-buy-dialog-message {
                font-size: 15px;
                line-height: 1.5;
                margin-bottom: 20px;
            }

            .SnippingSoul-gallery-buy-dialog-spinner {
                width: 28px;
                height: 28px;
                margin: 0 auto 20px auto;
                border: 3px solid rgba(255,255,255,0.2);
                border-top: 3px solid #fff700;
                border-radius: 50%;
                animation: SnippingSoulGalleryBuySpinner 0.8s linear infinite;
            }

            .SnippingSoul-gallery-buy-dialog-close {
                display: none;
                border: 0;
                border-radius: 6px;
                padding: 9px 20px;
                background: #fff700;
                color: #000;
                font-weight: 700;
                cursor: pointer;
            }

            @keyframes SnippingSoulGalleryBuySpinner {
                from {
                    transform: rotate(0deg);
                }

                to {
                    transform: rotate(360deg);
                }
            }
        `,document.head.appendChild(i),document.body.appendChild(me),me.querySelector(".SnippingSoul-gallery-buy-dialog-close").addEventListener("click",function(){me.remove(),me=null})}var r=me.querySelector(".SnippingSoul-gallery-buy-dialog-title"),s=me.querySelector(".SnippingSoul-gallery-buy-dialog-message"),l=me.querySelector(".SnippingSoul-gallery-buy-dialog-spinner"),c=me.querySelector(".SnippingSoul-gallery-buy-dialog-close");r.textContent=n,s.textContent=e,t?(r.textContent="Erreur d’achat",r.style.color="#ff5555",l.style.display="none",c.style.display="inline-block"):(r.style.color="#fff",l.style.display="block",c.style.display="none"),me.parentNode||document.body.appendChild(me)}async function Ho(n,e){if(!n||n.length===0){Ae("Erreur d’achat","There are no players to buy.",!0);return}Ae("Galerie SnippingSoul","Préparation des achats…",!1);try{for(var t=0;t<n.length;t++){var i=n[t];Ae("Achat du joueur "+(t+1)+" / "+n.length,"Recherche de "+(i.name||"player")+"...",!1);var r=i.name||"player",s=await ei(i,i.id,i.coins,e,r,function(d){Ae("Achat du joueur "+(t+1)+" / "+n.length,d,!1)},0);if(s.status=="not_found")Ae("Joueur introuvable","No "+r+" trouvé sur le marché.",!1);else if(s.status=="missed")Ae("Joueur déjà acheté",s.playerName+" trouvé à "+s.buyPrice.toLocaleString()+" crédits, mais un autre utilisateur l’a acheté avant vous.",!1);else if(s.status=="not_active")Ae("Enchère terminée",(s.playerName||r)+" n’est plus disponible.",!1);else if(s.status=="bought"){var l=document.querySelectorAll('.SnippingSoul-gallery-player[data-player-id="'+String(i.id)+'"]');l&&l.forEach(function(d){d.classList.remove("is-not-collected","is-selected"),d.classList.add("is-collected");var m=d.querySelector(".SnippingSoul-player-status");m&&(m.classList.remove("is-selected"),m.classList.add("is-collected"),m.innerHTML="\u2713",m.title="Joueur obtenu")});var c=De.findIndex(function(d){return String(d.id)===String(i.id)});c!==-1&&De.splice(c,1)}t<n.length-1&&await Ce(5e3)}if(dt=Date.now(),Kr(),Ae("Achats terminés","Tous les joueurs ont été traités. Pour les joueurs non achetés, réessayez plus tard ou lancez une recherche avec l’assistant.",!1),me){var o=me.querySelector(".SnippingSoul-gallery-buy-dialog-spinner"),u=me.querySelector(".SnippingSoul-gallery-buy-dialog-close");o&&(o.style.display="none"),u&&(u.style.display="inline-block")}}catch(d){console.error("SnippingSoul Gallery purchase process error:",d),Ae("Erreur d’achat",d&&d.message?d.message:"Une erreur inattendue a interrompu les achats.",!0)}}function $o(n){var e=Hr(n);if(e===null)return null;try{if(typeof ItemIdMask<"u"&&ItemIdMask.DATABASE!==void 0)return e&ItemIdMask.DATABASE}catch{}return e}async function Ko(n=1){var e,t,i=50;try{for(;n!=null&&i>0;){i--,e="https://www.fut.gg/api/fut/players/v2/27/?page="+n+"&excluded_market_players=true&is_sbc=true&is_objective=true&is_season_pass=true&response_format=card-image",t=await new Promise(function(s,l){window.addEventListener("message",function c(o){o.data.message==="fetchCompleted"&&(window.removeEventListener("message",c),s(o.data.res))}),window.postMessage({message:"fetchPls",urlToFetch:encodeURIComponent(e)},"*")});var r=JSON.parse(t);if(r.data&&Array.isArray(r.data)&&r.data.forEach(function(s){pn.push(s.eaId)}),r.next==null||r.next==n)break;n=r.next,await new Promise(function(s){setTimeout(s,500)})}i===0&&console.warn("SnippingSoul: raggiunto il limite massimo di pagine.")}catch(s){console.error(s)}}});Qo();})();

    alert('Licence valide. SnippingSoul mobile est chargé : ouvre le marché et choisis Assistant SnippingSoul. Aucun achat ne démarre avant ton action. Pour arrêter complètement le signet, actualise la page.');
  } catch (error) {
    alert('SnippingSoul mobile : chargement impossible. Vérifie ta connexion et actualise la Web App avant de réessayer. ' + (error?.message || ''));
  } finally { window.__ssMobileLoading = false; }
})();
