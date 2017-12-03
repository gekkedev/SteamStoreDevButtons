// ==UserScript==
// @name         Steam Store Developer Buttons
// @namespace    https://github.com/gekkedev/SteamStoreDevButtons
// @version      0.1
// @description  Adds helpful administration buttons to Steam store pages for Steamworks developers.
// @author       gekkedev
// @match        *://store.steampowered.com/app/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/gekkedev/SteamStoreDevButtons/master/SteamStoreDevButtons.user.js
// @downloadURL  https://raw.githubusercontent.com/gekkedev/SteamStoreDevButtons/master/SteamStoreDevButtons.user.js
// ==/UserScript==

(function() {
    var url = window.location.pathname;
    var start = url.indexOf('/app/') + 5;//5 is the length of the searchstring "/app/"
    var end = url.substring(start).indexOf('/');
    var id = url.substring(start, start + end);
    var SSDB_thisismygame  = GM_getValue ("SSDB_thisismygame_" + id,  false);console.log(SSDB_thisismygame);

    var SSDB_my = (SSDB_thisismygame) ? "not my" : "my";
    GM_registerMenuCommand("This is " + SSDB_my + " game!", SSDB_mygame);

    function SSDB_mygame() {
        if (SSDB_thisismygame) {
            GM_setValue("SSDB_thisismygame_" + id, false);
            alert("Developer buttons will not show up on this game anymore. Repeat this step to redo.");
        } else {
            GM_setValue("SSDB_thisismygame_" + id, true);
            alert("Developer buttons will now show up on this game. Repeat this step to undo.");
        }
        location.reload();
    }

    if (SSDB_thisismygame) {
        document.getElementsByClassName("apphub_AppName")[0].innerHTML += '<a target="_blank" class="btnv6_blue_hoverfade btn_medium" href="http://partner.steamgames.com/apps/landing/' + id + '"><span>Developer Hub</span></a>';
    }
})();
